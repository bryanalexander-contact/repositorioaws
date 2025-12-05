import React from "react";
import UsuarioForm from "../../components/UsuarioForm";
import "../../assets/css/admin/editar-usuario.css";

export default function EditarUsuario() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><a href="/admin/MostrarUsuarios">Mostrar Usuarios</a></li>
          <li><a href="/admin/NuevoUsuario">Nuevo Usuario</a></li>
        </ul>
      </aside>

      <main className="admin-main">
        <UsuarioForm />
      </main>
    </div>
  );
}
