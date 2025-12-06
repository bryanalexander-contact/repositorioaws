import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/admin/sidebar.css";

const SidebarAdmin = () => {
  return (
    <aside className="sidebar-admin">
      <h2 className="sidebar-title">Panel Admin</h2>
      <nav>
        <ul>
          <li><NavLink to="/admin" end>🏠 Dashboard</NavLink></li>
          <li><NavLink to="/admin/boletas">🧾 Boletas</NavLink></li>
          <li><NavLink to="/admin/categorias">📦 Categorías</NavLink></li>
          <li><NavLink to="/admin/panelproductos">🛍️ Productos</NavLink></li>
          <li><NavLink to="/admin/panelusuarios">👥 Usuarios</NavLink></li>
          <li><NavLink to="/admin/reportes">📊 Reportes</NavLink></li>
          <li><NavLink to="/admin/perfil">⚙️ Perfil</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
