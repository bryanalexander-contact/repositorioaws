// src/pages/public/Categorias.jsx
import React, { useEffect, useState } from "react";
import CategoriaService from "../../services/CategoriaService";
import ProductService from "../../services/ProductService";
import ProductCard from "../../components/molecules/ProductCard";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const res = await CategoriaService.getNombres();
      setCategorias(res.data);

      if (res.data.length > 0) {
        setCategoriaSeleccionada(res.data[0]);
        cargarProductos(res.data[0]);
      }
    } catch (err) {
      console.error(err);
      alert("Error obteniendo categorías");
    }
  };

  const cargarProductos = async (categoria) => {
    try {
      const res = await ProductService.getByCategoria(categoria);
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      setProductos([]);
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-4">
        <h1 className="mb-4 text-center">Categorías</h1>

        <div className="row mb-5">
          {categorias.map((cat) => (
            <div className="col-6 col-md-3 mb-3" key={cat}>
              <div
                className={`card text-center h-100 ${
                  categoriaSeleccionada === cat ? "border-primary shadow" : ""
                }`}
                onClick={() => {
                  setCategoriaSeleccionada(cat);
                  cargarProductos(cat);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title m-0">{cat}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-4">
          Productos en <span className="text-primary">{categoriaSeleccionada}</span>
        </h2>

        <div className="row">
          {productos.length === 0 ? (
            <p className="text-muted">No hay productos disponibles en esta categoría.</p>
          ) : (
            productos.map((p) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
                <ProductCard producto={p} />
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Categorias;
