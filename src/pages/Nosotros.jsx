import Header from '../components/Header';
import Footer from '../components/Footer';
import equipoImg from '../assets/img/equipo-colaborando.webp';
import tecnologiaImg from '../assets/img/tecnologia.jpg';
import profesionalesImg from '../assets/img/profesionales.jpg';

// Importar CSS global
import '../assets/css/nosotros.css';
import '../assets/css/modelo.css';

function Nosotros() {
  return (
    <>
      <Header />

      <main>
        <h1>Sobre Nosotros</h1>

        <section className="about-section">
          <div className="about-image">
            <img
              src={equipoImg}
              alt="Equipo de profesionales colaborando"
            />
          </div>
          <div className="about-content">
            <h3>Nuestra Historia</h3>
            <p>
              Fundada en 2010, nuestra empresa nació con la visión de revolucionar
              el sector mediante soluciones innovadoras y un servicio excepcional.
              Comenzamos como un pequeño equipo de apasionados y hemos crecido
              hasta convertirnos en líderes del mercado, sin perder nunca nuestro
              compromiso con la calidad y la satisfacción del cliente.
            </p>
            <p>
              Nuestra trayectoria está marcada por hitos importantes, incluyendo
              la expansión internacional en 2018 y el lanzamiento de nuestra
              premiada línea de productos en 2021.
            </p>
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-image">
            <img
              src={tecnologiaImg}
              alt="Concepto moderno de tecnología e innovación"
            />
          </div>
          <div className="about-content">
            <h3>Nuestra Misión</h3>
            <p>
              Nos dedicamos a crear productos excepcionales que mejoren la vida de
              nuestras comunidades y contribuyan a un futuro más sostenible.
              Creemos en la innovación responsable y en el poder de la tecnología
              para resolver problemas complejos.
            </p>
            <p>
              Cada decisión que tomamos está guiada por nuestros valores
              fundamentales: integridad, excelencia y compromiso con el impacto
              positivo en la sociedad y el medio ambiente.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-image">
            <img src={profesionalesImg} alt="Equipo diverso celebrando éxito" />
          </div>
          <div className="about-content">
            <h3>Nuestro Equipo</h3>
            <p>
              Contamos con un equipo multidisciplinario de más de 50 profesionales
              apasionados, provenientes de 15 países diferentes. Esta diversidad
              nos permite abordar los desafíos desde múltiples perspectivas y
              crear soluciones verdaderamente innovadoras.
            </p>
            <p>
              Invertimos constantemente en el desarrollo profesional de nuestro
              equipo, fomentando un ambiente de colaboración, aprendizaje continuo
              y crecimiento mutuo.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Nosotros;
