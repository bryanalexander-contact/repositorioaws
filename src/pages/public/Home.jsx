// src/pages/public/Home.jsx
import React, { useContext } from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import heroImg from '../../assets/img/tienda-online.jpeg';
import '../../assets/css/index.css';
import '../../assets/css/modelo.css';
import { ProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/molecules/ProductCard'; // ⚠️ o el componente que uses para mostrar 1 producto

function Home() {
  const { productos } = useContext(ProductsContext);

  // Mostrar solo los primeros 4 productos como “destacados”
  const destacados = productos.slice(0, 4);

  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-texto">
          <h2>Tienda Online</h2>
          <p>Encuentra los mejores productos al mejor precio</p>
          <a href="/productos" className="btn">Ver productos</a>
        </div>
        <div className="hero-imagen">
          <img src={heroImg} alt="Imagen de la tienda" />
        </div>
      </section>

      <section className="productos">
        <h2>Productos destacados</h2>
        <div id="productos-home" className="grid-productos">
          {destacados.length > 0 ? (
            destacados.map((p) => <ProductCard key={p.id} producto={p} />)
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
