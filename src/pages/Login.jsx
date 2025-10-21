// src/pages/Registro.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// CSS específicos
import "../assets/css/registro.css";
import "../assets/css/modelo.css";

export default function Registro() {
  return (
    <>
      <Header />

      <main className="registro">
        <div className="form-container">
          <h2>Registro de Usuario</h2>
          <form id="registroForm" method="post">
            <label htmlFor="nombre">Nombre Completo</label>
            <input type="text" id="nombre" name="nombre" required />

            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" required />

            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input type="password" id="confirmar" name="confirmar" required />

            <label htmlFor="telefono">Teléfono (opcional)</label>
            <input type="tel" id="telefono" name="telefono" />

            {/* Selección de Región y Comuna */}
            <div className="selects">
              <div className="select-box">
                <label htmlFor="region">Región</label>
                <select id="region" name="region" required>
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
                <select id="comuna" name="comuna" required>
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
      </main>

      <Footer />
    </>
  );
}
