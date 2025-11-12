// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { user } = useContext(UsersContext) || {};

  // 🔹 Cargar carrito desde sessionStorage (más liviano)
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("carrito")) || [];
      setCarrito(stored);
    } catch {
      setCarrito([]);
    }
  }, []);

  // 🔹 Guardar carrito (sin imágenes ni datos grandes)
  const guardarCarrito = (nuevo) => {
    // Reducimos peso: eliminamos imágenes u otros campos grandes
    const carritoReducido = nuevo.map(({ imagen, descripcion, ...rest }) => rest);

    setCarrito(nuevo);
    try {
      sessionStorage.setItem("carrito", JSON.stringify(carritoReducido));
    } catch (error) {
      console.warn("⚠️ No se pudo guardar el carrito:", error);
    }
  };

  // 🔹 Agregar producto
  const addToCart = (producto, cantidad = 1) => {
    const existente = carrito.find((i) => i.id === producto.id);
    let nuevo;
    if (existente) {
      nuevo = carrito.map((i) =>
        i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad }];
    }
    guardarCarrito(nuevo);
  };

  // 🔹 Eliminar producto
  const removeFromCart = (id) => {
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
    setCarrito([]);
    sessionStorage.removeItem("carrito");
  };

  // 🔹 Calcular total
  const total = carrito.reduce((sum, i) => {
    const precioUnitario =
      i.precioOferta && i.precioOferta < i.precio ? i.precioOferta : i.precio;
    return sum + precioUnitario * i.cantidad;
  }, 0);

  // 🔹 Obtener número correlativo de compra
  const obtenerNumeroCompra = () => {
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    if (historial.length === 0) return 1;
    const ult = Math.max(...historial.map((c) => c.numeroCompra || 0));
    return ult + 1;
  };

  // 🔹 Checkout validado
  const checkout = (datosForm) => {
    const camposRequeridos = ["nombre", "email", "direccion"];
    const incompleto = camposRequeridos.some((f) => !datosForm[f]?.trim());
    if (incompleto) return { ok: false, redirect: "/compra-fallida" };

    const numeroCompra = obtenerNumeroCompra();
    const nuevaCompra = {
      numeroCompra,
      fecha: new Date().toLocaleString(),
      comprador: datosForm,
      productos: carrito.map(({ imagen, descripcion, ...p }) => p), // también reducimos aquí
      total,
      userId: user?.id || null,
    };

    const historial =
      JSON.parse(localStorage.getItem("historialCompras")) || [];
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
