// src/pages/public/Registro.jsx
import React, { useState } from "react";
import { useUsers } from "../../context/UsersContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/registro.css";
import "../../assets/css/modelo.css";

export default function Registro() {
  const { registrar } = useUsers();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    confirmar: "",
    direccion: "",
    region: "",
    comuna: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const { confirmar, ...userData } = form;
    const resultado = registrar(userData);

    if (!resultado.ok) {
      setError(resultado.message);
      return;
    }

    navigate("/"); // Redirige al home después del registro
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

            <button type="submit">Registrar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
