import React, { useContext } from "react";
import "../../assets/css/productos.css";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../../components/molecules/ProductCard";

const Productos = () => {
  const { productos } = useContext(ProductsContext);

  return (
    <>
      <Header />
      <main className="productos-page">
        <section className="productos-container">
          <h1>Productos</h1>

          <div className="productos-grid">
            {productos.length > 0 ? (
              productos.map((p) => (
                <div key={p.id} className="col-producto">
                  <ProductCard producto={p} />
                </div>
              ))
            ) : (
              <p className="sin-productos">No hay productos disponibles.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Productos;
