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
    correo: "",
    password: "",
    confirmar: "",
    telefono: "",
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

    navigate("/"); // redirige a home después de registro
  };

  return (
    <>
      <Header />
      <main className="registro">
        <div className="form-container">
          <h2>Registro de Usuario</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Nombre Completo</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

            <label>Correo</label>
            <input type="email" name="correo" value={form.correo} onChange={handleChange} required />

            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />

            <label>Confirmar Contraseña</label>
            <input type="password" name="confirmar" value={form.confirmar} onChange={handleChange} required />

            <label>Teléfono (opcional)</label>
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} />

            <label>Región</label>
            <select name="region" value={form.region} onChange={handleChange} required>
              <option value="">--Seleccione la Región--</option>
              <option value="arica">Arica y Parinacota</option>
              <option value="tarapaca">Tarapacá</option>
              <option value="antofagasta">Antofagasta</option>
              <option value="atacama">Atacama</option>
              <option value="coquimbo">Coquimbo</option>
              <option value="valparaiso">Valparaíso</option>
              <option value="ohiggins">O’Higgins</option>
              <option value="maule">Maule</option>
              <option value="nuble">Ñuble</option>
              <option value="biobio">Biobío</option>
              <option value="araucania">La Araucanía</option>
              <option value="rios">Los Ríos</option>
              <option value="lagos">Los Lagos</option>
              <option value="aysen">Aysén</option>
              <option value="magallanes">Magallanes</option>
              <option value="metropolitana">Metropolitana</option>
            </select>

            <label>Comuna</label>
            <select name="comuna" value={form.comuna} onChange={handleChange} required>
              <option value="">--Seleccione la Comuna--</option>
              <option value="santiago">Santiago</option>
              <option value="providencia">Providencia</option>
              <option value="las-condes">Las Condes</option>
              <option value="maipu">Maipú</option>
              <option value="puente-alto">Puente Alto</option>
              <option value="valparaiso">Valparaíso</option>
              <option value="vina">Viña del Mar</option>
              <option value="temuco">Temuco</option>
              <option value="concepcion">Concepción</option>
              <option value="iquique">Iquique</option>
              <option value="arica">Arica</option>
            </select>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
