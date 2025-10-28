import React from "react";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/mostrar-usuarios.css";
import { Link } from "react-router-dom"; // ✅ necesario
function MostrarUsuarios() {
  const { usuarios, eliminarUsuario } = useUsers();

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/mostrar-usuarios" className="active">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/nuevo-usuario">Nuevo Usuario</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Mostrar Usuarios</h1>
        <table>
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Región / Comuna</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.run}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td>{u.tipoUsuario}</td>
                <td>{u.region} / {u.comuna}</td>
                <td>{u.direccion}</td>
                <td>
                  <button>Editar</button>
                  <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default MostrarUsuarios;
