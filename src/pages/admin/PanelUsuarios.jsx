import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/admin/usuarios.css";

function PanelUsuarios() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/MostrarUsuarios">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/NuevoUsuario">Nuevo Usuario</Link></li>
          <li><Link to="/admin/EditarUsuario">Editar Usuarios</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Bienvenido al Panel de Usuarios</h1>
        <p>Selecciona una opción en el menú de la izquierda para administrar los usuarios.</p>
      </main>
    </div>
  );
}

export default PanelUsuarios;
