import React, { useState } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

// CSS
import "../../assets/css/login.css";
import "../../assets/css/modelo.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí iría la lógica de login (validación, API, etc.)
    console.log("Iniciando sesión con:", { correo, contrasena });

    // Ejemplo de redirección o mensaje
    alert("¡Login simulado! Reemplaza con tu lógica real.");
  };

  return (
    <>
      <Header />

      <main className="login-container">
        <h1>MiTienda</h1>
        <div className="login-form">
          <h2>Inicio de sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="correo">CORREO</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="Ingresa tu correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label htmlFor="contrasena">CONTRASEÑA</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="Ingresa tu contraseña"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
