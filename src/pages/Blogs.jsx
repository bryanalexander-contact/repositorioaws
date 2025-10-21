import React from 'react';
import { Link } from 'react-router-dom';
import cartImg from '../assets/img/cart.jpg';
import blog1Img from '../assets/img/imagen-blog1.jpeg';
import blog2Img from '../assets/img/imagen-blog1-2.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/blogs.css';
import '../assets/css/modelo.css';


function Blogs() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="container my-5">
        <h1 className="mb-4">Noticias importantes</h1>

        {/* Blog 1 */}
        <div className="blog-post d-flex mb-4">
          <div className="blog-info me-3">
            <h2>Explora las últimas tendencias en moda, hogar y electrónica</h2>
            <p>
              Descubre consejos, novedades y productos destacados para renovar tu estilo, tu hogar y tu vida tecnológica. ¡No te pierdas nuestras recomendaciones!
            </p>
            <Link to="/blog1">
              <button className="btn btn-primary">Ver más</button>
            </Link>
          </div>
          <div className="blog-img">
            <img src={blog1Img} alt="Imagen del Blog 1" className="img-fluid rounded" />
          </div>
        </div>

        {/* Blog 2 */}
        <div className="blog-post d-flex mb-4">
          <div className="blog-info me-3">
            <h2>Tips y novedades para tu hogar, ropa y gadgets electrónicos</h2>
            <p>
              Aprende a seleccionar productos ideales para cada categoría y mantente actualizado con las últimas tendencias y consejos prácticos de MiTienda.
            </p>
            <Link to="/blog2">
              <button className="btn btn-primary">Ver más</button>
            </Link>
          </div>
          <div className="blog-img">
            <img src={blog2Img} alt="Imagen del Blog 2" className="img-fluid rounded" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Blogs;
