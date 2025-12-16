import React, { useEffect, useState } from "react";
import "../../assets/css/productos.css";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import ProductCard from "../../components/molecules/ProductCard";
import ProductService from "../../services/ProductService";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    ProductService.getAll()
      .then(res => setProductos(res.data || []))
      .catch(err => {
        console.error("Error cargando productos:", err);
        setProductos([]);
      });
  }, []);

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
                  <ProductCard producto={{
                    ...p,
                    precio: p.precio ?? p.precio_oferta ?? 0,
                    precioOferta: p.precio_oferta ?? null,
                    imagen_url: p.imagen_url || p.imagen || "",
                  }} />
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
