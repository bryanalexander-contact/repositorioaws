// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

function safeParse(v) {
  if (!v) return null;
  if (typeof v === "string") {
    try { return JSON.parse(v); } catch { return null; }
  }
  return v;
}

function loadStoredUser() {
  // Chequea varias keys que tu stack podría usar
  const candidates = [
    localStorage.getItem("currentUser"),
    localStorage.getItem("userLogueado"),
    localStorage.getItem("user"),
    sessionStorage.getItem("userLogueado"),
  ];
  for (const c of candidates) {
    if (!c) continue;
    const parsed = safeParse(c);
    if (parsed && typeof parsed === "object") return parsed;
  }
  return null;
}

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // cargar carrito de sessionStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("carrito")) || [];
      setCarrito(stored);
    } catch {
      setCarrito([]);
    }
  }, []);

  const guardarCarrito = (nuevo) => {
    const carritoReducido = nuevo.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad,
      precio: p.precio,
      precioOferta: p.precioOferta,
      imagenURL: p.imagenURL || p.imagen || p.imagen_url || "",
    }));
    setCarrito(nuevo);
    try {
      sessionStorage.setItem("carrito", JSON.stringify(carritoReducido));
    } catch (error) {
      console.warn("⚠️ No se pudo guardar el carrito:", error);
    }
  };

  const addToCart = (producto, cantidad = 1) => {
    const prod = { ...producto };
    // si alguien pasa .imagen como File
    if (prod.imagen instanceof File) {
      prod.imagenURL = URL.createObjectURL(prod.imagen);
    }

    const existente = carrito.find((i) => String(i.id) === String(prod.id));
    let nuevo;
    if (existente) {
      nuevo = carrito.map((i) =>
        String(i.id) === String(prod.id) ? { ...i, cantidad: (i.cantidad || 0) + cantidad } : i
      );
    } else {
      nuevo = [...carrito, { ...prod, cantidad }];
    }
    guardarCarrito(nuevo);
  };

  const removeFromCart = (id) => {
    guardarCarrito(carrito.filter((i) => String(i.id) !== String(id)));
  };

  const updateQuantity = (id, cantidad) => {
    guardarCarrito(carrito.map((i) => (String(i.id) === String(id) ? { ...i, cantidad } : i)));
  };

  const clearCart = () => {
    carrito.forEach((p) => {
      if (p.imagenURL && p.imagen instanceof File) URL.revokeObjectURL(p.imagenURL);
    });
    setCarrito([]);
    sessionStorage.removeItem("carrito");
  };

  const total = carrito.reduce((sum, i) => {
    const precioUnitario =
      i.precioOferta && i.precioOferta < i.precio ? i.precioOferta : i.precio || 0;
    return sum + precioUnitario * (i.cantidad || 0);
  }, 0);

  // Checkout local (compatibilidad con antiguos lugares que usaban 'email' o 'correo')
  const checkout = (datosForm) => {
    const camposRequeridos = ["nombre", /* accept both */ "correo", "email", "direccion"];
    const tieneNombre = datosForm.nombre && datosForm.nombre.toString().trim();
    const tieneDireccion = datosForm.direccion && datosForm.direccion.toString().trim();
    const tieneCorreo =
      (datosForm.correo && datosForm.correo.toString().trim()) ||
      (datosForm.email && datosForm.email.toString().trim());

    if (!tieneNombre || !tieneDireccion || !tieneCorreo) {
      return { ok: false, redirect: "/compra-fallida" };
    }

    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
    const numeroCompra = historial.length + 1;

    // normaliza comprador: usar 'correo' como campo definitivo
    const compradorNorm = {
      ...datosForm,
      correo: datosForm.correo || datosForm.email || "",
    };

    const nuevaCompra = {
      numeroCompra,
      fecha: new Date().toISOString(),
      comprador: compradorNorm,
      productos: carrito.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
        precioOferta: p.precioOferta,
        imagenURL: p.imagenURL || p.imagen || p.imagen_url || "",
      })),
      total,
      // no dependemos de otros contexts; miramos localmente si hay usuario
      userId: (() => {
        const u = loadStoredUser();
        return u?.id ?? null;
      })(),
    };

    localStorage.setItem("historialCompras", JSON.stringify([...historial, nuevaCompra]));
    setTimeout(() => clearCart(), 400);

    return { ok: true, redirect: "/compra-exitosa", data: nuevaCompra };
  };

  // datosCheckout: leer usuario guardado localmente (si existe)
  const storedUser = loadStoredUser();
  const datosCheckout = {
    nombre: storedUser?.nombre || "",
    apellidos: storedUser?.apellidos || "",
    correo: storedUser?.correo || storedUser?.email || "",
    direccion: storedUser?.direccion || "",
    region: storedUser?.region || "",
    comuna: storedUser?.comuna || "",
    departamento: storedUser?.departamento || "",
    indicacion: storedUser?.indicacion || "",
  };

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
