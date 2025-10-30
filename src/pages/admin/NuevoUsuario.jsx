import React, { useState } from "react";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/nuevo-usuario.css";
import { Link } from "react-router-dom"; // ✅ necesario
function NuevoUsuario() {
  const { registrar } = useUsers();
  const [form, setForm] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    tipoUsuario: "cliente",
    region: "",
    comuna: "",
    direccion: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    registrar(form);
    alert("Usuario agregado correctamente!");
    setForm({
      run: "",
      nombre: "",
      apellidos: "",
      correo: "",
      fechaNacimiento: "",
      tipoUsuario: "cliente",
      region: "",
      comuna: "",
      direccion: ""
    });
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/MostrarUsuarios">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/NuevoUsuario" className="active">Nuevo Usuario</Link></li>
          <li><Link to="/admin/EditarUsuario">Editar Usuarios</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Agregar Nuevo Usuario</h1>
        <form onSubmit={handleSubmit}>
          <label>RUN</label>
          <input name="run" value={form.run} onChange={handleChange} required placeholder="Ej: 19011022K" />
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
          <label>Apellidos</label>
          <input name="apellidos" value={form.apellidos} onChange={handleChange} required />
          <label>Correo</label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
          <label>Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
          <label>Tipo Usuario</label>
          <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange}>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <label>Región</label>
          <select name="region" value={form.region} onChange={handleChange}>
            <option value="">Seleccione una región</option>
            {/* Podrías mapear aquí las regiones desde un hook o JSON */}
          </select>
          <label>Comuna</label>
          <select name="comuna" value={form.comuna} onChange={handleChange}>
            <option value="">Seleccione una comuna</option>
          </select>
          <label>Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} required />
          <button type="submit">Agregar Usuario</button>
        </form>
      </main>
    </div>
  );
}

export default NuevoUsuario;
