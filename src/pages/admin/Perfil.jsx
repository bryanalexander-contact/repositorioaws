// src/pages/admin/Perfil.jsx
import React from "react";
import { useUsers } from "../../context/UsersContext";
import { Link } from "react-router-dom";
import "../../assets/css/admin/perfil.css";

export default function Perfil() {
  const { user } = useUsers();

  if (!user) return <div style={{ padding: 20 }}>Debes iniciar sesión</div>;

  return (
    <div className="admin-container">
      {/* Sidebar */}
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

      {/* Contenido principal */}
      <main className="admin-content">
        <h1>Mi Perfil</h1>
        <p><strong>Nombre:</strong> {user.nombre} {user.apellidos}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Dirección:</strong> {user.direccion}</p>
        <p><strong>Región:</strong> {user.region}</p>
        <p><strong>Comuna:</strong> {user.comuna}</p>

        <Link to={`/admin/editar-usuario/${user.id}`}>
          <button style={{ marginTop: 20 }}>Editar Perfil</button>
        </Link>
      </main>
    </div>
  );
}
