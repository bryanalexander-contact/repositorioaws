import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ necesario
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/editar-usuario.css";

function EditarUsuario({ userId }) {
  const { usuarios, actualizarUsuario } = useUsers();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const u = usuarios.find(u => u.id === userId);
    if (u) setForm(u);
  }, [usuarios, userId]);

  if (!form) return <p>Cargando usuario...</p>;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    actualizarUsuario(userId, form);
    alert("Usuario actualizado!");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/mostrar-usuarios">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/nuevo-usuario">Nuevo Usuario</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Editar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <label>RUN</label>
          <input name="run" value={form.run} onChange={handleChange} required />
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
          <label>Apellidos</label>
          <input name="apellidos" value={form.apellidos} onChange={handleChange} required />
          <label>Correo</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} required />
          <label>Tipo Usuario</label>
          <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange}>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <button type="submit">Guardar Cambios</button>
        </form>
      </main>
    </div>
  );
}

export default EditarUsuario;
