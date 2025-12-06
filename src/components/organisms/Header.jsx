// src/components/organisms/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/modelo.css";
import UsuarioService from "../../services/UsuarioService";

export default function Header({ user: userProp, logout: logoutProp }) {
  const navigate = useNavigate();

  // Si se pasa user/logout por props, los usamos; si no, leemos desde UsuarioService
  const [user, setUser] = useState(userProp ?? UsuarioService.getCurrentUser());

  useEffect(() => {
    if (userProp !== undefined) setUser(userProp);
  }, [userProp]);

  useEffect(() => {
    const handler = (e) => {
      setUser(e?.detail ?? UsuarioService.getCurrentUser());
    };
    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);

  // logout: si se pasa por prop usamos logoutProp; si no, usamos UsuarioService.logout
  const logout = logoutProp || (() => {
    UsuarioService.clearCurrentUser();
    navigate("/"); // Redirige al home al cerrar sesión
  });

  const formatoCLP = (valor) =>
    typeof valor === "number"
      ? valor.toLocaleString("es-CL", { style: "currency", currency: "CLP" })
      : "$0";

  const rol = user?.tipo_usuario || user?.tipoUsuario;
  const esAdmin = rol === "admin" || rol === "administrador";
  const esVendedor = rol === "vendedor";

  // Función para ir a Panel Admin, con redirección
  const irPanelAdmin = () => {
    navigate("/admin");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>TiendaOnline</h1>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>{" "}
          |
          <li>
            <Link to="/productos">Productos</Link>
          </li>{" "}
          |
          <li>
            <Link to="/categorias">Categorías</Link>
          </li>{" "}
          |
          <li>
            <Link to="/ofertas">Ofertas</Link>
          </li>{" "}
          |
          <li>
            <Link to="/nosotros">Nosotros</Link>
          </li>{" "}
          |
          <li>
            <Link to="/blogs">Blog</Link>
          </li>{" "}
          |
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>{" "}
          |

          {user ? (
            <>
              <li>
                <Link to="/admin/perfil">Perfil</Link>
              </li>{" "}
              |

              {/* Botón Panel Admin para Admin o Vendedor */}
              {(esAdmin || esVendedor) && (
                <>
                  <li>
                    <button
                      onClick={irPanelAdmin}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#222",
                        fontWeight: "bold",
                      }}
                    >
                      Panel Admin
                    </button>
                  </li>{" "}
                  |
                </>
              )}

              {/* Link directo a Boletas si es vendedor */}
              {esVendedor && (
                <>
                  <li>
                    <Link to="/admin/boletas">Boletas</Link>
                  </li>{" "}
                  |
                </>
              )}

              <li>
                <button
                  onClick={() => logout()}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#222",
                    fontWeight: "bold",
                  }}
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>{" "}
              |
              <li>
                <Link to="/registro">Registro</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Carrito: dejo enlace, sin total (no usamos CartContext) */}
      <div className="carrito">
        <Link to="/carrito" className="carrito-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="me-2"
          >
            <path d="M0 1a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .485.379L3.89 4H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 12H5a.5.5 0 0 1-.49-.402L3.01 2H1a1 1 0 0 1-1-1zM5 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
          </svg>
          <span className="carrito-total">Ver carrito</span>
        </Link>
      </div>
    </header>
  );
}
