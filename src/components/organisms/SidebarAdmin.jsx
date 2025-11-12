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
          <li><NavLink to="/admin/Boletas">🧾 Boletas</NavLink></li>
          <li><NavLink to="/admin/Categorias">📦 Categorías</NavLink></li>
          <li><NavLink to="/admin/PanelUsuarios">👥 Usuarios</NavLink></li>
          <li><NavLink to="/admin/Reportes">📊 Reportes</NavLink></li>
          <li><NavLink to="/admin/Perfil">⚙️ Perfil</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
