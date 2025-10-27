// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(stored);
  }, []);

  const guardarCarrito = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

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

  const removeFromCart = (id) => {
    const nuevo = carrito.filter((i) => i.id !== id);
    guardarCarrito(nuevo);
  };

  const updateQuantity = (id, cantidad) => {
    const nuevo = carrito.map((i) =>
      i.id === id ? { ...i, cantidad } : i
    );
    guardarCarrito(nuevo);
  };

  const clearCart = () => guardarCarrito([]);

  const total = carrito.reduce(
    (sum, i) =>
      sum + (i.enOferta ? i.precioOferta : i.precio) * i.cantidad,
    0
  );

  // 🧾 Checkout
  const checkout = (datosForm) => {
    const camposRequeridos = ["nombre", "email", "direccion"];
    const incompleto = camposRequeridos.some((f) => !datosForm[f]?.trim());
    if (incompleto) {
      return { ok: false, redirect: "/compra-fallida" };
    }

    clearCart();
    return { ok: true, redirect: "/compra-exitosa" };
  };

  const datosCheckout = user
    ? {
        nombre: user.nombre,
        email: user.correo,
        direccion: user.direccion,
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
