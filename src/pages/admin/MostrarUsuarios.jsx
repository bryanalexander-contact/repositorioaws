// src/pages/admin/MostrarUsuarios.jsx
import React, { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import "../../assets/css/admin/mostrar-usuarios.css";
import { Link } from "react-router-dom";

function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const res = await UsuarioService.getAll();
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    try {
      await UsuarioService.delete(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuario eliminado");
    } catch (err) {
      console.error(err);
      alert("Error eliminando usuario");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando usuarios...</p>;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/mostrarusuarios" className="active">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/nuevousuario">Nuevo Usuario</Link></li>
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
                <td>{u.tipo_usuario || u.tipoUsuario}</td>
                <td>{u.region} / {u.comuna}</td>
                <td>{u.direccion}</td>
                <td>
                  <Link to={`/admin/editar-usuario/${u.id}`}><button>Editar</button></Link>
                  <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                  <Link to={`/admin/historial-compras/${u.id}`}><button>Ver Historial</button></Link>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center" }}>No hay usuarios.</td></tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default MostrarUsuarios;
