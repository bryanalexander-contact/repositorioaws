import React, { useState } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

// CSS
import "../../assets/css/registro.css";
import "../../assets/css/modelo.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí iría la lógica de registro (guardar en contexto o API)
    console.log("Registrando usuario:", {
      nombre,
      correo,
      password,
      telefono,
      region,
      comuna,
    });

    alert("¡Registro simulado! Reemplaza con tu lógica real.");
  };

  return (
    <>
      <Header />

      <main className="registro">
        <div className="form-container">
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              required
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
            />

            <label htmlFor="telefono">Teléfono (opcional)</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            {/* Selección de Región y Comuna */}
            <div className="selects">
              <div className="select-box">
                <label htmlFor="region">Región</label>
                <select
                  id="region"
                  name="region"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
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
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
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
      </main>

      <Footer />
    </>
  );
}
