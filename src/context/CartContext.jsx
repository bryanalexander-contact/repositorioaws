// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const usersContext = useContext(UsersContext);
  const user = usersContext?.user || null;

  // Cargar carrito desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(stored);
  }, []);

  // Guardar carrito
  const guardarCarrito = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  // Agregar producto
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

  // Eliminar producto
  const removeFromCart = (id) => {
    guardarCarrito(carrito.filter((i) => i.id !== id));
  };

  // Cambiar cantidad
  const updateQuantity = (id, cantidad) => {
    guardarCarrito(
      carrito.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );
  };

  // Vaciar carrito
  const clearCart = () => guardarCarrito([]);

  // ✅ Calcular total correctamente
  const total = carrito.reduce((sum, i) => {
    const precioUnitario =
      i.precioOferta && i.precioOferta < i.precio
        ? i.precioOferta
        : i.precio;
    return sum + precioUnitario * i.cantidad;
  }, 0);

  // Checkout simple
  const checkout = (datosForm) => {
    const camposRequeridos = ["nombre", "email", "direccion"];
    const incompleto = camposRequeridos.some((f) => !datosForm[f]?.trim());
    if (incompleto) return { ok: false, redirect: "/compra-fallida" };

    clearCart();
    return { ok: true, redirect: "/compra-exitosa" };
  };

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
