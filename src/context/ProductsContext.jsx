import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categorias] = useState([
    "Accesorios Gamer",
    "Accesorios de Ropa",
    "Accesorios para el Hogar",
    "Accesorios Electrónicos",
  ]);
  const [productoEditando, setProductoEditando] = useState(null);

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(stored);
  }, []);

  // Guardar lista de productos en localStorage
  const guardarProductos = (lista) => {
    setProductos(lista);
    localStorage.setItem("productos", JSON.stringify(lista));
  };

  // Generar ID autoincremental
  const generarId = () =>
    productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;

  // Crear producto nuevo
  const agregarProducto = (producto) => {
    const nuevo = {
      ...producto,
      id: generarId(),
      enOferta: producto.enOferta || false,
      precioOferta: producto.precioOferta || null,
    };
    const nuevos = [...productos, nuevo];
    guardarProductos(nuevos);
  };

  // Editar producto existente
  const actualizarProducto = (id, datos) => {
    const nuevos = productos.map((p) =>
      p.id === id ? { ...p, ...datos } : p
    );
    guardarProductos(nuevos);
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    const nuevos = productos.filter((p) => p.id !== id);
    guardarProductos(nuevos);
  };

  // Marcar o desmarcar un producto en oferta
  const toggleOferta = (id, precioOferta = null) => {
    const nuevos = productos.map((p) =>
      p.id === id
        ? {
            ...p,
            enOferta: !p.enOferta,
            precioOferta: p.enOferta ? null : precioOferta,
          }
        : p
    );
    guardarProductos(nuevos);
  };

  // Obtener productos por categoría
  const productosPorCategoria = (categoria) =>
    productos.filter((p) => p.categoria === categoria);

  // Obtener productos en oferta
  const productosEnOferta = productos.filter((p) => p.enOferta);

  return (
    <ProductsContext.Provider
      value={{
        productos,
        categorias,
        productoEditando,
        setProductoEditando,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        productosPorCategoria,
        productosEnOferta,
        toggleOferta,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
