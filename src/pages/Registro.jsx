import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/registro.css";
import "../assets/css/modelo.css";
import cartImg from "../assets/img/cart.jpg";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmar: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Aquí puedes agregar lógica para enviar los datos al backend
  };

  return (
    <div>
      {/* HEADER */}
      <header>
        <div className="logo">
          <h1>TiendaOnline</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blogs">Blog</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
        <div className="carrito">
          <img src={cartImg} alt="Carrito de compras" />
        </div>
      </header>

      {/* FORMULARIO */}
      <section className="registro">
        <div className="form-container">
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={form.nombre}
              onChange={handleChange}
            />

            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              required
              value={form.correo}
              onChange={handleChange}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />

            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              required
              value={form.confirmar}
              onChange={handleChange}
            />

            <label htmlFor="telefono">Teléfono (opcional)</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />

            <div className="selects">
              <div className="select-box">
                <label htmlFor="region">Región</label>
                <select
                  id="region"
                  name="region"
                  required
                  value={form.region}
                  onChange={handleChange}
                >
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
              </div>

              <div className="select-box">
                <label htmlFor="comuna">Comuna</label>
                <select
                  id="comuna"
                  name="comuna"
                  required
                  value={form.comuna}
                  onChange={handleChange}
                >
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
              </div>
            </div>

            <div className="boton">
              <button type="submit">Registrar</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Registro;
