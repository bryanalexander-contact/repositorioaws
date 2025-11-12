import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { user } = useContext(UsersContext) || {};

  // 🔹 Cargar carrito desde sessionStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("carrito")) || [];
      setCarrito(stored);
    } catch {
      setCarrito([]);
    }
  }, []);

  // 🔹 Guardar carrito con campos esenciales
  const guardarCarrito = (nuevo) => {
    const carritoReducido = nuevo.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad,
      precio: p.precio,
      precioOferta: p.precioOferta,
      imagenURL: p.imagenURL || "", // ⚡ nunca File/Base64
    }));

    setCarrito(nuevo);
    try {
      sessionStorage.setItem("carrito", JSON.stringify(carritoReducido));
    } catch (error) {
      console.warn("⚠️ No se pudo guardar el carrito:", error);
    }
  };

  // 🔹 Agregar producto
  const addToCart = (producto, cantidad = 1) => {
    let prod = { ...producto };

    // Si el producto es File (imagen subida localmente)
    if (producto.imagen instanceof File) {
      prod.imagenURL = URL.createObjectURL(producto.imagen);
    }

    const existente = carrito.find((i) => i.id === prod.id);
    let nuevo;
    if (existente) {
      nuevo = carrito.map((i) =>
        i.id === prod.id ? { ...i, cantidad: i.cantidad + cantidad } : i
      );
    } else {
      nuevo = [...carrito, { ...prod, cantidad }];
    }
    guardarCarrito(nuevo);
  };

  // 🔹 Eliminar producto
  const removeFromCart = (id) => {
    const prod = carrito.find((i) => i.id === id);
    if (prod?.imagenURL && prod.imagen instanceof File) URL.revokeObjectURL(prod.imagenURL);
    guardarCarrito(carrito.filter((i) => i.id !== id));
  };

  // 🔹 Cambiar cantidad
  const updateQuantity = (id, cantidad) => {
    guardarCarrito(
      carrito.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );
  };

  // 🔹 Vaciar carrito
  const clearCart = () => {
    carrito.forEach((p) => {
      if (p.imagenURL && p.imagen instanceof File) URL.revokeObjectURL(p.imagenURL);
    });
    setCarrito([]);
    sessionStorage.removeItem("carrito");
  };

  // 🔹 Calcular total
  const total = carrito.reduce((sum, i) => {
    const precioUnitario =
      i.precioOferta && i.precioOferta < i.precio ? i.precioOferta : i.precio;
    return sum + precioUnitario * i.cantidad;
  }, 0);

  // 🔹 Checkout validado
  const checkout = (datosForm) => {
    const camposRequeridos = ["nombre", "email", "direccion"];
    const incompleto = camposRequeridos.some((f) => !datosForm[f]?.trim());
    if (incompleto) return { ok: false, redirect: "/compra-fallida" };

    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
    const numeroCompra = historial.length + 1;

    const nuevaCompra = {
      numeroCompra,
      fecha: new Date().toISOString(),
      comprador: datosForm,
      productos: carrito.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
        precioOferta: p.precioOferta,
        imagenURL: p.imagenURL || "", // ⚡ nunca File/Base64
      })),
      total,
      userId: user?.id || null,
    };

    localStorage.setItem(
      "historialCompras",
      JSON.stringify([...historial, nuevaCompra])
    );

    setTimeout(() => clearCart(), 500);

    return {
      ok: true,
      redirect: "/compra-exitosa",
      data: nuevaCompra,
    };
  };

  // 🔹 Datos prellenados si el usuario está logueado
  const datosCheckout = user
    ? {
        nombre: user.nombre || "",
        email: user.correo || "",
        direccion: user.direccion || "",
      }
    : { nombre: "", email: "", direccion: "" };

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        checkout,
        datosCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
