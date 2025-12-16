import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/blog1.css";
import "../../assets/css/modelo.css";

const Blog2 = () => {
  return (
    <>
      {/* HEADER */}
      <header>
        <div className="logo">
          <h1>TiendaOnline</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li> |
            <li><Link to="/productos">Productos</Link></li> |
            <li><Link to="/nosotros">Nosotros</Link></li> |
            <li><Link to="/blogs">Blog</Link></li> |
            <li><Link to="/contacto">Contacto</Link></li> |
            <li><Link to="/login">Iniciar Sesión</Link></li> |
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main>
        <h1>Consejos y Novedades de Productos</h1>

        {/* POST 1 */}
        <article className="blog-entry">
          <h2>Cómo seleccionar la ropa ideal según tu estilo</h2>
          <p><strong>Publicado el 28 de septiembre de 2025</strong></p>
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Moda y estilo"
          />
          <p>
            Elegir ropa no debería ser complicado. La clave está en conocerte a ti mismo y
            tener claro qué prendas representan tu personalidad. La moda cambia cada
            temporada, pero tu estilo personal siempre te acompañará.
          </p>
          <p>
            En <strong>TiendaOnline</strong> recomendamos optar por básicos atemporales:
            una buena chaqueta, jeans de corte clásico y camisetas en tonos neutros. A partir
            de allí puedes añadir accesorios y colores de temporada para refrescar tu look sin
            gastar de más.
          </p>
        </article>

        {/* POST 2 */}
        <article className="blog-entry">
          <h2>Gadgets imprescindibles para tu hogar moderno</h2>
          <p><strong>Publicado el 22 de septiembre de 2025</strong></p>
          <img
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Gadgets para el hogar"
          />
          <p>
            Vivimos en una era donde la tecnología puede facilitarnos casi todo. Los
            asistentes virtuales permiten controlar luces, música y electrodomésticos con
            simples comandos de voz.
          </p>
          <p>
            Si quieres dar un primer paso hacia el hogar inteligente, empieza con un parlante
            con asistente y bombillas inteligentes. Te sorprenderá cómo algo tan simple puede
            cambiar la rutina.
          </p>
        </article>

        {/* POST 3 */}
        <article className="blog-entry">
          <h2>Decoración y organización: transforma tu espacio</h2>
          <p><strong>Publicado el 18 de septiembre de 2025</strong></p>
          <img
            src="../assets/img/decoracion-hogar.jpg"
            alt="Decoración y hogar"
          />
          <p>
            La decoración no se trata de llenar espacios, sino de darles significado. Con
            pequeños cambios, puedes lograr un ambiente más acogedor y organizado.
          </p>
          <p>
            Nuestro consejo es combinar elementos funcionales con detalles estéticos:
            repisas flotantes, canastas de almacenamiento y plantas naturales que aportan
            frescura. Menos es más, y el orden es parte de la belleza.
          </p>
        </article>

        {/* POST 4 */}
        <article className="blog-entry">
          <h2>Tecnología portátil: lo último en wearables</h2>
          <p><strong>Publicado el 10 de septiembre de 2025</strong></p>
          <img
            src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Tecnología portátil"
          />
          <p>
            Los wearables llegaron para quedarse. Desde smartwatches que monitorean tu salud
            hasta auriculares inalámbricos que ofrecen libertad total de movimiento.
          </p>
          <p>
            En <strong>TiendaOnline</strong> creemos que lo mejor de esta tecnología es su
            capacidad para integrarse en tu día a día. Ya no se trata solo de moda, sino de
            bienestar y productividad.
          </p>
        </article>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2025 TiendaOnline - Blog de Ropa | Hogar | Electrónica</p>
      </footer>
    </>
  );
};

export default Blog2;
