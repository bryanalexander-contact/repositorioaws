import { Link } from "react-router-dom";
import cart from "../../assets/img/cart.jpg";
import "../../assets/css/modelo.css";

export default function Header() {
  return (
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
      <div className="carrito">
        <Link to="/carrito">
          <img src={cart} alt="Carrito de compras" />
        </Link>
      </div>
    </header>
  );
}
