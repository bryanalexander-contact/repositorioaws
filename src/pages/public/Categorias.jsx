import React, { useState } from "react";
import { useProducts } from "../../context/ProductsContext"; 
import ProductCard from "../../components/molecules/ProductCard"; 
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

const Categorias = () => {
  const { categorias, productosPorCategoria } = useProducts();

  // Seleccionamos la primera categoría por defecto
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categorias[0]);

  const productos = categoriaSeleccionada
    ? productosPorCategoria(categoriaSeleccionada)
    : [];

  return (
    <>
      <Header />

      <div className="container mt-4">
        {/* Título de la página */}
        <h1 className="mb-4 text-center">Categorías</h1>

        {/* Tarjetas de categorías */}
        <div className="row mb-5">
          {categorias.map((cat) => (
            <div className="col-6 col-md-3 mb-3" key={cat}>
              <div
                className={`card text-center h-100 ${categoriaSeleccionada === cat ? "border-primary shadow" : ""}`}
                onClick={() => setCategoriaSeleccionada(cat)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title m-0">{cat}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Título de la categoría seleccionada */}
        <h2 className="mb-4">
          Productos en <span className="text-primary">{categoriaSeleccionada}</span>
        </h2>

        {/* Productos filtrados */}
        <div className="row">
          {productos.length === 0 && (
            <p className="text-muted">No hay productos disponibles en esta categoría.</p>
          )}
          {productos.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
              <ProductCard producto={p} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Categorias;
