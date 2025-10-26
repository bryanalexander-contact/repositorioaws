import React, { useState, useEffect } from "react";
import { useUsuarios } from "../context/UsuariosContext";
import { regiones } from "../data/regiones-comunas";

export default function EditarUsuario() {
  const { obtenerUsuario, guardarUsuarios } = useUsuarios();
  const [form, setForm] = useState(null);
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("editarUsuarioId"));
    const user = obtenerUsuario(id);
    if (!user) {
      alert("Usuario no encontrado");
      window.location.href = "/mostrar-usuarios";
      return;
    }
    setForm({ ...user });
  }, [obtenerUsuario]);

  useEffect(() => {
    if (form?.region) {
      const regionObj = regiones.find((r) => r.nombre === form.region);
      setComunas(regionObj ? regionObj.comunas : []);
    }
  }, [form?.region]);

  if (!form) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    if (!/^[0-9]{7,8}[0-9K]$/.test(form.run)) return alert("RUN inválido");
    if (!form.nombre || form.nombre.length > 50) return alert("Nombre inválido");
    if (!form.apellidos || form.apellidos.length > 100) return alert("Apellidos inválidos");
    if (!/(@duoc\.cl|@profesor\.duoc\.cl|@gmail\.com)$/.test(form.correo)) return alert("Correo inválido");
    if (!form.direccion || form.direccion.length > 300) return alert("Dirección inválida");

    guardarUsuarios();
    alert("Usuario editado correctamente!");
    window.location.href = "/mostrar-usuarios";
  };

  return (
    <form className="p-4 flex flex-col gap-2 max-w-md" onSubmit={handleSubmit}>
      <input type="text" name="run" placeholder="RUN" value={form.run} onChange={handleChange} className="border p-2"/>
      <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border p-2"/>
      <input type="text" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} className="border p-2"/>
      <input type="email" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="border p-2"/>
      <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} className="border p-2"/>
      <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange} className="border p-2">
        <option value="">Tipo Usuario</option>
        <option value="admin">Admin</option>
        <option value="usuario">Usuario</option>
      </select>
      <select name="region" value={form.region} onChange={handleChange} className="border p-2">
        <option value="">Seleccione Región</option>
        {regiones.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
      </select>
      <select name="comuna" value={form.comuna} onChange={handleChange} className="border p-2">
        <option value="">Seleccione Comuna</option>
        {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="border p-2"/>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Guardar Cambios</button>
    </form>
  );
}
