// src/pages/public/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../../hooks/useUserAuth";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/login.css";
import "../../assets/css/modelo.css";

export default function Login() {
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(form.correo, form.password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error?.message || "Credenciales inválidas");
      return;
    }
    navigate("/");
  };

  return (
    <>
      <Header />
      <main className="login-container">
        <h1>MiTienda</h1>
        <div className="login-form">
          <h2>Inicio de sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Correo</label>
            <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{loading ? "Ingresando..." : "Iniciar sesión"}</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
