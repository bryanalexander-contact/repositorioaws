import { Link } from 'react-router-dom';
import cartImg from '../assets/img/cart.jpg';

function Header() {
  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h4">TiendaOnline</h1>

        {/* Botón Offcanvas para móviles */}
        <button
          className="btn btn-outline-light d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          ☰
        </button>

        {/* Menú para pantallas medianas y grandes */}
        <nav className="d-none d-md-flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/blogs">Blog</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registro">Registro</Link>
        </nav>

        <div className="carrito">
          <img src={cartImg} alt="Carrito" width={28} />
        </div>
      </div>

      {/* Offcanvas para móviles */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">Menu</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2">
          <Link to="/" className="text-dark">Home</Link>
          <Link to="/productos" className="text-dark">Productos</Link>
          <Link to="/nosotros" className="text-dark">Nosotros</Link>
          <Link to="/blogs" className="text-dark">Blog</Link>
          <Link to="/contacto" className="text-dark">Contacto</Link>
          <Link to="/login" className="text-dark">Iniciar Sesión</Link>
          <Link to="/registro" className="text-dark">Registro</Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
