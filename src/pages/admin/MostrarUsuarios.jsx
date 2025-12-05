import React from "react";
import ListaUsuarios from "../../components/ListaUsuarios";
import "../../assets/css/admin/mostrar-usuarios.css";

export default function MostrarUsuarios() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><a href="/admin/mostrarusuarios" className="active">Mostrar Usuarios</a></li>
          <li><a href="/admin/nuevousuario">Nuevo Usuario</a></li>
        </ul>
      </aside>

      <main className="admin-main">
        <ListaUsuarios />
      </main>
    </div>
  );
}
