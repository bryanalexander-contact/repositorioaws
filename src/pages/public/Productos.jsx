// src/pages/public/Productos.jsx
import React, { useContext } from "react";
import "../../assets/css/productos.css";
import "../../assets/css/modelo.css";

import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import ProductList from "../../components/organisms/ProductList";
import { ProductsContext } from "../../context/ProductsContext";

const Productos = () => {
  const { productos } = useContext(ProductsContext); // 👈 Ya no usamos obtenerProductos

  return (
    <>
      <Header />
      <main className="productos-page">
        <h1>Productos</h1>
        <div id="lista-productos" className="productos-grid">
          <ProductList productos={productos} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Productos;
