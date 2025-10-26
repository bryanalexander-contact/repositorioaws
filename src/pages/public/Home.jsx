import Header from '../components/Header';
import Footer from '../components/Footer';
import heroImg from '../assets/img/tienda-online.jpeg';
import '../assets/css/index.css';
import '../assets/css/modelo.css';

function Home() {
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
          {/* Aquí se pintarán los productos usando React */}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
