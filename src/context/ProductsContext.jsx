// src/context/ProductsContext.jsx
import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    "Categoria 1",
    "Categoria 2",
    "Categoria 3",
    "Categoria 4",
  ]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(stored);
  }, []);

  const guardarProductos = (lista) => {
    setProductos(lista);
    localStorage.setItem("productos", JSON.stringify(lista));
  };

  const generarId = () =>
    productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;

  const agregarProducto = (prod) => {
    const nuevo = { ...prod, id: generarId(), enOferta: false };
    const nuevos = [...productos, nuevo];
    guardarProductos(nuevos);
  };

  const actualizarProducto = (id, datos) => {
    const nuevos = productos.map((p) => (p.id === id ? { ...p, ...datos } : p));
    guardarProductos(nuevos);
  };

  const eliminarProducto = (id) => {
    const nuevos = productos.filter((p) => p.id !== id);
    guardarProductos(nuevos);
  };

  const productosEnOferta = productos.filter((p) => p.enOferta);
  const productosPorCategoria = (categoria) =>
    productos.filter((p) => p.categoria === categoria);

  return (
    <ProductsContext.Provider
      value={{
        productos,
        categorias,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        productosEnOferta,
        productosPorCategoria,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
