import React, { useState } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/contacto.css";
import "../../assets/css/modelo.css";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias por contactarte, ${formData.nombre}. ¡Te responderemos pronto!`);
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="formulario-contacto container my-5">
        <h1>Contacto</h1>
        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingresa tu nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ingresa tu correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribe tu mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn btn-primary">
            Enviar mensaje
          </button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Contacto;
