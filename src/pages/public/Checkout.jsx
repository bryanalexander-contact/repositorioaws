// src/pages/public/Checkout.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUsers();

  const carrito = location.state?.carrito || [];
  const total = location.state?.total || 0;

  // Datos del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    direccion: "",
    departamento: "",
    region: "",
    comuna: "",
    indicacion: "",
  });

  // Autocompletar si hay usuario logueado
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: user.nombre || "",
        apellidos: user.apellidos || "",
        correo: user.correo || "",
        direccion: user.direccion || "",
        region: user.region || "",
        comuna: user.comuna || "",
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePagar = (e) => {
    e.preventDefault();

    const { nombre, apellidos, correo, direccion, region, comuna } = form;

    // Validar que los campos requeridos estén completos
    if (!nombre || !apellidos || !correo || !direccion || !region || !comuna) {
      navigate("/comprafallida");
      return;
    }

    // Si todo está bien
    navigate("/compraexitosa", { state: { total, comprador: form } });
  };

  return (
    <>
      <Header />

      <main className="checkout-container container my-5">
        {/* Cabecera */}
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
          {carrito.map((item) => {
            const precio = item.precioOferta && item.precioOferta < item.precio
              ? item.precioOferta
              : item.precio;
            const subtotal = precio * (item.cantidad || 1);

            return (
              <div key={item.id} className="d-flex align-items-center border-bottom p-2">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8 }}
                />
                <div className="ms-3 flex-grow-1">
                  <p className="m-0 fw-bold">{item.nombre}</p>
                </div>
                <div>${subtotal.toLocaleString()}</div>
              </div>
            );
          })}
        </div>

        {/* Formulario */}
        <div className="checkout-form p-4 border rounded shadow-sm">
          <h4 className="mb-3">Información del Cliente</h4>
          {user ? (
            <p className="text-success">Datos cargados automáticamente desde tu cuenta.</p>
          ) : (
            <p>Completa la siguiente información:</p>
          )}

          <form onSubmit={handlePagar}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Apellidos</label>
                <input
                  name="apellidos"
                  type="text"
                  className="form-control"
                  value={form.apellidos}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label>Correo</label>
            <input
              name="correo"
              type="email"
              className="form-control mb-3"
              value={form.correo}
              onChange={handleChange}
            />

            <label>Dirección de entrega</label>
            <input
              name="direccion"
              type="text"
              className="form-control mb-3"
              placeholder="Ingrese dirección detallada"
              value={form.direccion}
              onChange={handleChange}
            />

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Departamento (opcional)</label>
                <input
                  name="departamento"
                  type="text"
                  className="form-control"
                  value={form.departamento}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Región</label>
                <input
                  name="region"
                  type="text"
                  className="form-control"
                  value={form.region}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label>Comuna</label>
                <input
                  name="comuna"
                  type="text"
                  className="form-control"
                  value={form.comuna}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label>Indicaciones para la entrega (opcional)</label>
            <textarea
              name="indicacion"
              className="form-control mb-3"
              rows="2"
              value={form.indicacion}
              onChange={handleChange}
            ></textarea>

            <div className="d-flex justify-content-end align-items-center gap-3">
              <h5 className="text-success fw-bold mb-0">Total: ${total.toLocaleString()}</h5>
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
