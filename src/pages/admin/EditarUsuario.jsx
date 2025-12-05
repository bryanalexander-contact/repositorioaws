// src/pages/admin/EditarUsuario.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import useUserAuth from "../../hooks/useUserAuth";
import "../../assets/css/admin/editar-usuario.css";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, updateUser } = useUserAuth();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
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
    let mounted = true;
    (async () => {
      try {
        const res = await UsuarioService.getById(id);
        if (!mounted) return;
        setUsuario(res.data);
        setForm({
          run: res.data.run || "",
          nombre: res.data.nombre || "",
          apellidos: res.data.apellidos || "",
          correo: res.data.correo || "",
          fechaNacimiento: res.data.fecha_nacimiento ? res.data.fecha_nacimiento.split("T")[0] : "",
          tipoUsuario: res.data.tipo_usuario || "cliente",
          region: res.data.region || "",
          comuna: res.data.comuna || "",
          direccion: res.data.direccion || "",
        });
      } catch (err) {
        console.error("Error cargando usuario:", err);
        navigate("/admin/MostrarUsuarios");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      run: form.run,
      nombre: form.nombre,
      apellidos: form.apellidos,
      correo: form.correo,
      fecha_nacimiento: form.fechaNacimiento || null,
      tipo_usuario: form.tipoUsuario,
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion,
    };
    const res = await updateUser(id, payload);
    if (res.ok) {
      alert("Usuario actualizado correctamente!");
      navigate("/admin/MostrarUsuarios");
    } else {
      alert("Error al actualizar: " + JSON.stringify(res.error));
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando...</p>;
  if (!usuario)
    return (
      <div className="admin-container">
        <main className="admin-main">
          <h2>Usuario no encontrado 😕</h2>
          <Link to="/admin/MostrarUsuarios">Volver</Link>
        </main>
      </div>
    );

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
