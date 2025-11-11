// src/pages/public/Checkout.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const carrito = location.state?.carrito || [];
  const total = location.state?.total || 0;

  // Formulario
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [calle, setCalle] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [indicacion, setIndicacion] = useState("");

  // Manejo del pago
  const handlePagar = (e) => {
    e.preventDefault();

    // Validación básica de campos obligatorios
    if (!nombre || !apellidos || !correo || !calle || !region || !comuna) {
      navigate("/checkoutErroneo");
    } else {
      navigate("/checkoutExitoso");
    }
  };

  return (
    <>
      <Header />

      <main className="checkout-container container my-5">
        {/* Caja superior: Carrito de compra y total */}
        <div className="checkout-header d-flex justify-content-between align-items-center mb-4 p-3 border rounded shadow-sm">
          <h3 className="mb-0 d-flex align-items-center">
            <span role="img" aria-label="carrito" className="me-2">🛒</span>
            Carrito de Compra
          </h3>
          <h4 className="mb-0 text-success fw-bold">
            Total: ${total.toLocaleString()}
          </h4>
        </div>

        {/* Listado de productos */}
        <div className="checkout-products mb-4">
          <div className="cart-header d-flex bg-light p-2 rounded">
            <div className="flex-1 text-center">Imagen</div>
            <div className="flex-3">Nombre</div>
            <div className="flex-1 text-end">Precio</div>
            <div className="flex-1 text-center">Cantidad</div>
            <div className="flex-1 text-end">Subtotal</div>
          </div>

          {carrito.map((item) => {
            const precioUnit = item.precioOferta && item.precioOferta < item.precio
              ? item.precioOferta
              : item.precio;
            const subtotal = precioUnit * (item.cantidad || 1);

            return (
              <div key={item.id} className="cart-item d-flex align-items-center p-2 border-bottom">
                <div className="flex-1 text-center">
                  <img src={item.imagen} alt={item.nombre} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                </div>
                <div className="flex-3">{item.nombre}</div>
                <div className="flex-1 text-end">${precioUnit.toLocaleString()}</div>
                <div className="flex-1 text-center">{item.cantidad}</div>
                <div className="flex-1 text-end">${subtotal.toLocaleString()}</div>
              </div>
            );
          })}
        </div>

        {/* Formulario de información */}
        <div className="checkout-form p-4 border rounded shadow-sm">
          <h4 className="mb-3">Información del Cliente</h4>
          <p>Completa la siguiente información</p>

          <form onSubmit={handlePagar}>
            {/* Nombre y Apellidos */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Nombre</label>
                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label>Apellidos</label>
                <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
              </div>
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label>Correo</label>
              <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </div>

            {/* Dirección */}
            <div className="mb-3">
              <label>Dirección de entrega</label>
              <input type="text" className="form-control" placeholder="Ingrese dirección detallada" value={calle} onChange={(e) => setCalle(e.target.value)} required />
            </div>

            {/* Calle / Departamento */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Calle</label>
                <input type="text" className="form-control" value={calle} onChange={(e) => setCalle(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label>Departamento (opcional)</label>
                <input type="text" className="form-control" value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
              </div>
            </div>

            {/* Región / Comuna */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Región</label>
                <select className="form-control" value={region} onChange={(e) => setRegion(e.target.value)} required>
                  <option value="">--Seleccione la Región--</option>
                  <option value="metropolitana">Metropolitana</option>
                  <option value="valparaiso">Valparaíso</option>
                  <option value="biobio">Biobío</option>
                  {/* Agrega todas las regiones necesarias */}
                </select>
              </div>
              <div className="col-md-6">
                <label>Comuna</label>
                <select className="form-control" value={comuna} onChange={(e) => setComuna(e.target.value)} required>
                  <option value="">--Seleccione la Comuna--</option>
                  <option value="santiago">Santiago</option>
                  <option value="providencia">Providencia</option>
                  <option value="las-condes">Las Condes</option>
                  {/* Agrega más comunas según necesidad */}
                </select>
              </div>
            </div>

            {/* Indicaciones */}
            <div className="mb-3">
              <label>Indicaciones para la entrega (opcional)</label>
              <textarea className="form-control" rows="2" value={indicacion} onChange={(e) => setIndicacion(e.target.value)}></textarea>
            </div>

            {/* Botón Pagar ahora con total */}
            <div className="d-flex justify-content-end align-items-center gap-3 mt-4">
              <h5 className="mb-0 text-success fw-bold">Total: ${total.toLocaleString()}</h5>
              <button type="submit" className="btn btn-success">
                Pagar ahora
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
