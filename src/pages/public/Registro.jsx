// src/pages/public/Registro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/registro.css";
import "../../assets/css/modelo.css";

import { Auth, default as UsuarioService } from "../../services/UsuarioService";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "", apellidos: "", correo: "", password: "", confirmar: "",
    direccion: "", region: "", comuna: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);

    try {
      const { confirmar, ...userData } = form;
      const res = await Auth.register(userData);
      setLoading(false);

      if (res?.data?.user) {
        UsuarioService.setCurrentUser(res.data.user);
        navigate("/");
        return;
      }

      setError(res?.data?.message || "Error registrando usuario");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error registrando usuario");
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <main className="registro">
        <div className="form-container">
          <h2>Registro de Usuario</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
            <label>Apellidos</label>
            <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required />
            <label>Correo</label>
            <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <label>Confirmar Contraseña</label>
            <input type="password" name="confirmar" value={form.confirmar} onChange={handleChange} required />
            <label>Dirección de Entrega</label>
            <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
            <label>Región</label>
            <input type="text" name="region" value={form.region} onChange={handleChange} required />
            <label>Comuna</label>
            <input type="text" name="comuna" value={form.comuna} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrar"}</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
