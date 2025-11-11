// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const usersContext = useContext(UsersContext);
  const user = usersContext?.user || null;

  // 🔹 Cargar carrito al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(stored);
  }, []);

  // 🔹 Guardar carrito
  const guardarCarrito = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  // 🔹 Agregar producto
  const addToCart = (producto, cantidad = 1) => {
    const existente = carrito.find((i) => i.id === producto.id);
    let nuevo;
    if (existente) {
      nuevo = carrito.map((i) =>
        i.id === producto.id
          ? { ...i, cantidad: i.cantidad + cantidad }
          : i
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
  const clearCart = () => guardarCarrito([]);

  // 🔹 Calcular total
  const total = carrito.reduce((sum, i) => {
    const precioUnitario =
      i.precioOferta && i.precioOferta < i.precio
        ? i.precioOferta
        : i.precio;
    return sum + precioUnitario * i.cantidad;
  }, 0);

  // 🔹 Obtener siguiente número de compra (incremental)
  const obtenerNumeroCompra = () => {
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    if (historial.length === 0) return 1;
    const ult = Math.max(...historial.map((c) => c.numeroCompra || 0));
    return ult + 1;
  };

  // 🔹 Checkout con validación + registro de compra
  const checkout = (datosForm) => {
    const camposRequeridos = ["nombre", "email", "direccion"];
    const incompleto = camposRequeridos.some((f) => !datosForm[f]?.trim());
    if (incompleto) return { ok: false, redirect: "/compra-fallida" };

    const numeroCompra = obtenerNumeroCompra();
    const nuevaCompra = {
      numeroCompra,
      fecha: new Date().toLocaleString(),
      comprador: datosForm,
      productos: carrito,
      total,
      userId: user?.id || null,
    };

    // Guardar en historial global
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    localStorage.setItem("historialCompras", JSON.stringify([...historial, nuevaCompra]));

    // Esperamos que CompraExitosa muestre productos antes de limpiar
    setTimeout(() => clearCart(), 500);

    return {
      ok: true,
      redirect: "/compra-exitosa",
      data: { ...nuevaCompra },
    };
  };

  // 🔹 Datos automáticos del usuario logueado
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
