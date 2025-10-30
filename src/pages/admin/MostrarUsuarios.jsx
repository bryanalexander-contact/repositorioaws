import React from "react";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/mostrar-usuarios.css";
import { Link } from "react-router-dom";

function MostrarUsuarios() {
  const { usuarios, eliminarUsuario } = useUsers();

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/MostrarUsuarios" className="active">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/NuevoUsuario">Nuevo Usuario</Link></li>
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
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.run}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td>{u.tipoUsuario}</td>
                <td>{u.region} / {u.comuna}</td>
                <td>{u.direccion}</td>
                <td>
                  <Link to={`/admin/EditarUsuario/${u.id}`}>
                    <button>Editar</button>
                  </Link>
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
