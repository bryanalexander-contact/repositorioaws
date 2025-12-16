import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import "../../assets/css/admin/perfil.css";

export default function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // cargar usuario inicial desde UsuarioService (localStorage)
    setUser(UsuarioService.getCurrentUser());

    // escuchar cambios de sesión (login / logout)
    const handler = (ev) => {
      setUser(ev?.detail || UsuarioService.getCurrentUser());
    };

    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);

  if (!user) {
    return <div style={{ padding: 20 }}>Debes iniciar sesión</div>;
  }

  return (
    <div className="admin-container">
      <aside className="sidebar-admin">
        <h2>Panel Usuario</h2>
        <ul>
          <li>
            <Link to="/admin/perfil" className="active">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link to={`/admin/editar-usuario/${user.id}`}>
              Editar Perfil
            </Link>
          </li>
          <li>
            <Link to={`/admin/historial-compras/${user.id}`}>
              Historial de Compras
            </Link>
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Mi Perfil</h1>

        <p>
          <strong>Nombre:</strong> {user.nombre} {user.apellidos}
        </p>
        <p>
          <strong>Correo:</strong> {user.correo}
        </p>
        <p>
          <strong>Dirección:</strong> {user.direccion}
        </p>
        <p>
          <strong>Región:</strong> {user.region}
        </p>
        <p>
          <strong>Comuna:</strong> {user.comuna}
        </p>

        <Link to={`/admin/editar-usuario/${user.id}`}>
          <button style={{ marginTop: 20 }}>Editar Perfil</button>
        </Link>
      </main>
    </div>
  );
}
