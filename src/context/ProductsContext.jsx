import { createContext, useState, useEffect, useContext } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    "Electrónica",
    "Ropa",
    "Hogar",
    "Gamer",
  ]);
  const [productoEditando, setProductoEditando] = useState(null);

  // Cargar productos y categorías desde localStorage
  useEffect(() => {
    const storedProductos = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(storedProductos);

    const storedCategorias = JSON.parse(localStorage.getItem("categorias")) || [
      "Electrónica",
      "Ropa",
      "Hogar",
      "Gamer",
    ];
    setCategorias(storedCategorias);
  }, []);

  // Guardar productos
  const guardarProductos = (lista) => {
    setProductos(lista);
    localStorage.setItem("productos", JSON.stringify(lista));
  };

  // Guardar categorías
  const guardarCategorias = (lista) => {
    setCategorias(lista);
    localStorage.setItem("categorias", JSON.stringify(lista));
  };

  // ======================================================
  // PRODUCTOS
  // ======================================================
  const generarId = () =>
    productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;

  const agregarProducto = (producto) => {
    const precio = Number(producto.precio) || 0;
    const precioOferta =
      producto.precioOferta !== undefined
        ? Number(producto.precioOferta)
        : null;

    const nuevo = {
      ...producto,
      id: generarId(),
      precio,
      precioOferta,
      enOferta: precioOferta !== null && precioOferta < precio,
    };

    guardarProductos([...productos, nuevo]);
  };

  const actualizarProducto = (id, datos) => {
    const nuevos = productos.map((p) => {
      if (p.id === id) {
        const precio = Number(datos.precio) || p.precio || 0;
        const precioOferta =
          datos.precioOferta !== undefined
            ? Number(datos.precioOferta)
            : p.precioOferta || null;

        return {
          ...p,
          ...datos,
          precio,
          precioOferta,
          enOferta: precioOferta !== null && precioOferta < precio,
        };
      }
      return p;
    });
    guardarProductos(nuevos);
  };

  const eliminarProducto = (id) => {
    guardarProductos(productos.filter((p) => p.id !== id));
  };

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

  const productosPorCategoria = (categoria) =>
    productos.filter((p) => p.categoria === categoria);

  const productosEnOferta = productos.filter((p) => p.enOferta);

  // ======================================================
  // CATEGORÍAS
  // ======================================================
  const agregarCategoria = (categoria) => {
    if (!categorias.includes(categoria)) {
      const nuevas = [...categorias, categoria];
      guardarCategorias(nuevas);
    }
  };

  const eliminarCategoria = (categoria) => {
    const nuevas = categorias.filter((c) => c !== categoria);
    guardarCategorias(nuevas);
    // Opcional: puedes eliminar la categoría de productos asociados
    // setProductos(productos.map(p => p.categoria === categoria ? {...p, categoria: null} : p));
  };

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
        agregarCategoria,
        eliminarCategoria,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
