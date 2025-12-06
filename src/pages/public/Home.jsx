import React, { useEffect, useState } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import heroImg from "../../assets/img/tienda-online.jpeg";
import "../../assets/css/index.css";
import "../../assets/css/modelo.css";
import "../../assets/css/hero.css";
import ProductCard from "../../components/molecules/ProductCard";
import ProductService from "../../services/ProductService";

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ProductService.getAll()
      .then((res) => {
        // suponer res.data = array de productos
        setProductos(res.data || []);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setProductos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const destacados = productos.slice(0, 4);

  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-texto">
          <h2>Tienda Online</h2>
          <p>Encuentra los mejores productos al mejor precio</p>
          <a href="/productos" className="btn">
            Ver productos
          </a>
        </div>
        <div className="hero-imagen">
          <img src={heroImg} alt="Imagen de la tienda" />
        </div>
      </section>

      <section className="productos">
        <h2>Productos destacados</h2>
        <div id="productos-home" className="grid-productos row">
          {loading ? (
            <p>Cargando productos...</p>
          ) : destacados.length > 0 ? (
            destacados.map((p) => (
              <div className="col-md-3" key={p.id}>
                <ProductCard producto={p} />
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
