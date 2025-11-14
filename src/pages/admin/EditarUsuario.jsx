import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/editar-usuario.css";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarios, actualizarUsuario } = useUsers();

  const usuario = usuarios.find((u) => u.id === Number(id));

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
  });

  useEffect(() => {
    if (usuario) setForm(usuario);
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarUsuario(Number(id), form);
    alert("Usuario actualizado correctamente!");
    navigate("/admin/MostrarUsuarios");
  };

  if (!usuario) {
    return (
      <div className="admin-container">
        <main className="admin-main">
          <h2>Usuario no encontrado 😕</h2>
          <Link to="/admin/MostrarUsuarios">Volver</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Usuarios</h2>
        <ul>
          <li><Link to="/admin/MostrarUsuarios">Mostrar Usuarios</Link></li>
          <li><Link to="/admin/NuevoUsuario">Nuevo Usuario</Link></li>
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
          <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
          <label>Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento || ""} onChange={handleChange} />
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
          <button type="submit">Guardar Cambios</button>
        </form>
      </main>
    </div>
  );
}

export default EditarUsuario;
