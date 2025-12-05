// src/components/organisms/Header.jsx
import { Link } from "react-router-dom";
import "../../assets/css/modelo.css";
import { useCart } from "../../context/CartContext";
import UsuarioService from "../../services/UsuarioService";
import { useEffect, useState } from "react";

export default function Header({ user: propUser, logout: propLogout }) {
  const { total } = useCart();
  const [user, setUser] = useState(propUser ?? UsuarioService.getCurrentUser());

  useEffect(() => {
    setUser(propUser ?? UsuarioService.getCurrentUser());
  }, [propUser]);

  const rol = user?.tipo_usuario;

  const formatoCLP = (valor) =>
    Number(valor || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const handleLogout = async () => {
    if (propLogout) {
      await propLogout();
    } else {
      UsuarioService.clearCurrentUser();
      await import("../../services/UsuarioService").then((m) => m.Auth.logout());
    }
    setUser(null);
  };

  return (
    <header className="header">
      <div className="logo"><h1>TiendaOnline</h1></div>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> |
          <li><Link to="/productos">Productos</Link></li> |
          <li><Link to="/categorias">Categorías</Link></li> |
          <li><Link to="/ofertas">Ofertas</Link></li> |
          <li><Link to="/nosotros">Nosotros</Link></li> |
          <li><Link to="/blogs">Blog</Link></li> |
          <li><Link to="/contacto">Contacto</Link></li> |

          {user ? (
            <>
              <li><Link to="/admin/perfil">Perfil</Link></li> |
              {rol === "admin" && <><li><Link to="/admin">Panel Admin</Link></li> |</>}
              {rol === "vendedor" && <><li><Link to="/admin/boletas">Boletas</Link></li> |</>}
              <li>
                <button onClick={handleLogout} style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "#222", fontWeight: "bold"
                }}>Cerrar Sesión</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li> |
              <li><Link to="/registro">Registro</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className="carrito">
        <Link to="/carrito" className="carrito-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" className="me-2">
            <path d="M0 1a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .485.379L3.89 4H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 12H5a.5.5 0 0 1-.49-.402L3.01 2H1a1 1 0 0 1-1-1zM5 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>
          <span className="carrito-total">{formatoCLP(total)}</span>
        </Link>
      </div>
    </header>
  );
}
