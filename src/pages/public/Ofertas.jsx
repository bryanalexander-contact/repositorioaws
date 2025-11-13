import React, { useContext } from "react";
import "../../assets/css/ofertas.css";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../../components/molecules/ProductCard";

export default function Ofertas() {
  const { productosEnOferta } = useContext(ProductsContext);

  return (
    <>
      <Header />
      <main className="ofertas-page">
        <section className="ofertas-container">
          <h1>Productos en Oferta</h1>

          <div className="ofertas-grid">
            {productosEnOferta.length > 0 ? (
              productosEnOferta.map((p) => (
                <div key={p.id} className="col-producto">
                  <ProductCard producto={p} />
                </div>
              ))
            ) : (
              <p className="sin-ofertas">No hay productos en oferta por el momento.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
