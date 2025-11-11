// src/pages/public/Productos.jsx
import React, { useContext } from "react";
import "../../assets/css/productos.css";
import "../../assets/css/modelo.css";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { ProductsContext } from "../../context/ProductsContext";
import ProductGridItem from "../../components/molecules/ProductGridItem";

const Productos = () => {
  const { productos } = useContext(ProductsContext);

  return (
    <>
      <Header />
      <main className="productos-page container my-5">
        <h1 className="mb-4">Productos</h1>
        <div className="row">
          {productos.length > 0 ? (
            productos.map((p) => <ProductGridItem key={p.id} producto={p} />)
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Productos;
