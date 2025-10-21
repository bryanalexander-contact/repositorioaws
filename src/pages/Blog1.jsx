import React from "react";
import '../assets/css/blog1.css';
import '../assets/css/modelo.css';


const Blog1 = () => {
  return (
    <div>
      {/* HEADER */}
      <header>
        <div className="logo">
          <h1>TiendaOnline</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li> |
            <li><a href="/productos">Productos</a></li> |
            <li><a href="/nosotros">Nosotros</a></li> |
            <li><a href="/blogs">Blog</a></li> |
            <li><a href="/contacto">Contacto</a></li> |
            <li><a href="/login">Iniciar Sesión</a></li> |
            <li><a href="/registro">Registro</a></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main>
        <h1>Últimas Entradas del Blog</h1>

        {/* POST 1 */}
        <article className="blog-entry">
          <h2>
            La revolución de la electrónica en el hogar
          </h2>
          <p><strong>Publicado el 1 de octubre de 2025</strong></p>
          <p>
            La electrónica moderna está cambiando la forma en que vivimos.
            Desde aspiradoras inteligentes hasta asistentes virtuales,
            cada rincón de nuestra casa puede estar conectado y optimizado.
            Lo interesante no es solo la comodidad, sino cómo estos avances
            están marcando un antes y un después en nuestra rutina diaria.
          </p>
          <p>
            Muchos expertos recomiendan comenzar poco a poco: una lámpara inteligente,
            un enchufe programable o un parlante con asistente.
            Estos pequeños cambios permiten familiarizarse con la tecnología
            sin necesidad de gastar grandes sumas de dinero.
          </p>
        </article>

        {/* POST 2 */}
        <article className="blog-entry">
          <h2>Decoración minimalista: el estilo que nunca pasa de moda</h2>
          <p><strong>Publicado el 20 de septiembre de 2025</strong></p>
          <p>
            El minimalismo no es solo una tendencia estética, es una filosofía de vida.
            Se trata de reducir el exceso, mantener lo esencial y darle importancia
            a la funcionalidad sin perder la belleza.
          </p>
          <p>
            Un consejo práctico es elegir colores neutros, usar muebles funcionales
            y evitar recargar los espacios. El resultado es un hogar más ordenado,
            relajante y fácil de mantener.
          </p>
        </article>

        {/* POST 3 */}
        <article className="blog-entry">
          <h2>Moda 2025: qué prendas no pueden faltar en tu armario</h2>
          <p><strong>Publicado el 15 de septiembre de 2025</strong></p>
          <p>
            Este año la moda se centra en la comodidad sin perder estilo.
            Prendas como los pantalones anchos, zapatillas urbanas y chaquetas oversize
            se han convertido en básicos del día a día.
          </p>
          <p>
            Sin embargo, lo importante es aprender a combinar las tendencias con tu estilo personal.
            Recuerda que la moda cambia constantemente, pero tu esencia no.
          </p>
        </article>

        {/* POST 4 */}
        <article className="blog-entry">
          <h2>Consejos para elegir el producto perfecto</h2>
          <p><strong>Publicado el 5 de septiembre de 2025</strong></p>
          <p>
            Comprar puede ser abrumador con tantas opciones en el mercado.
            La clave está en definir primero qué necesitas realmente
            y luego comparar precios, calidad y opiniones de otros compradores.
          </p>
          <p>
            En nuestra tienda recomendamos siempre revisar la garantía,
            leer la letra chica y, si es posible, probar antes de comprar.
            Esto evitará decepciones y te permitirá invertir mejor tu dinero.
          </p>
        </article>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2025 TiendaOnline - Blog de Ropa | Hogar | Electrónica</p>
      </footer>
    </div>
  );
};

export default Blog1;
