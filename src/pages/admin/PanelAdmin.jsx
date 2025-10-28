import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/admin/index.css";

function PanelAdmin() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Admin</h2>
        <ul>
          <li><Link to="/admin/productos">Productos</Link></li>
          <li><Link to="/admin/usuarios">Usuarios</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Selecciona una opción en el menú de la izquierda para empezar.</p>
      </main>
    </div>
  );
}

export default PanelAdmin;
