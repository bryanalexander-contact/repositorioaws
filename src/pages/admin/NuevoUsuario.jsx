// src/pages/admin/NuevoUsuario.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../services/UsuarioService";
import "../../assets/css/admin/nuevo-usuario.css";

function NuevoUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    tipoUsuario: "cliente",
    region: "",
    comuna: "",
    direccion: "",
    password: "123456", // si quieres pedir password en formulario, añade campo
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        run: form.run,
        nombre: form.nombre,
        apellidos: form.apellidos,
        correo: form.correo,
        password: form.password,
        fechaNacimiento: form.fechaNacimiento,
        tipoUsuario: form.tipoUsuario,
        direccion: form.direccion,
        region: form.region,
        comuna: form.comuna,
      };
      await Auth.register(payload);
      alert("Usuario agregado correctamente!");
      navigate("/admin/MostrarUsuarios");
    } catch (err) {
      console.error(err);
      alert("Error creando usuario");
    } finally {
      setLoading(false);
    }
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
          <input name="run" value={form.run} onChange={handleChange} placeholder="Ej: 19011022K" />
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
          <label>Apellidos</label>
          <input name="apellidos" value={form.apellidos} onChange={handleChange} required />
          <label>Correo</label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
          <label>Contraseña</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label>Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
          <label>Tipo Usuario</label>
          <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange}>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <label>Región</label>
          <input name="region" value={form.region} onChange={handleChange} />
          <label>Comuna</label>
          <input name="comuna" value={form.comuna} onChange={handleChange} />
          <label>Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Agregar Usuario"}</button>
        </form>
      </main>
    </div>
  );
}

export default NuevoUsuario;
