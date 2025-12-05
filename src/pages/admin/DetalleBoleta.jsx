import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import BoletaService from "../../services/BoletaService";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/checkout.css";

export default function DetalleBoleta() {
  const { user } = useUsers();
  const { id } = useParams();  // id = numero_compra
  const navigate = useNavigate();
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    BoletaService.getByNumero(id)
      .then((res) => setBoleta(res.data))
      .catch(() => setBoleta(null));
  }, [id]);

  if (!user)
    return (
      <div className="boletas-container">
        <h2>Debes iniciar sesión para ver tus boletas.</h2>
      </div>
    );

  if (!boleta)
    return (
      <div className="boletas-container text-center">
        <h3>❌ No se encontró la boleta #{id}</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          🔙 Volver
        </button>
      </div>
    );

  const { comprador, productos, total, fecha, numero_compra } = boleta;

  return (
    <>
      <Header />

      <main className="container my-5">
        <div className="text-center mb-4">
          <h2 className="text-primary fw-bold">🧾 Detalle de Boleta</h2>
          <p className="text-muted">Resumen completo de tu compra #{numero_compra}</p>
        </div>

        <div className="border rounded shadow-sm p-4 mb-4 bg-light">
          <h5 className="fw-bold mb-3">
            🧾 N° de Compra:{" "}
            <span className="text-primary">
              #{String(numero_compra).padStart(4, "0")}
            </span>
          </h5>

          {/* Datos del comprador */}
          <div className="mb-4">
            <h6 className="fw-bold border-bottom pb-2">Datos del Comprador</h6>

            <div className="row">
              <div className="col-md-6"><strong>Nombre:</strong> {comprador?.nombre} {comprador?.apellidos}</div>
              <div className="col-md-6"><strong>Correo:</strong> {comprador?.correo}</div>
              <div className="col-md-6"><strong>Dirección:</strong> {comprador?.direccion}</div>
              {comprador?.departamento && (
                <div className="col-md-6"><strong>Departamento:</strong> {comprador.departamento}</div>
              )}
              <div className="col-md-6"><strong>Región:</strong> {comprador?.region}</div>
              <div className="col-md-6"><strong>Comuna:</strong> {comprador?.comuna}</div>
              {comprador?.indicacion && (
                <div className="col-12"><strong>Indicaciones:</strong> {comprador.indicacion}</div>
              )}
            </div>
          </div>

          {/* Productos */}
          <h6 className="fw-bold border-bottom pb-2">Productos Comprados</h6>

          <div className="checkout-products mt-3">
            <div className="cart-header">
              <div>Imagen</div>
              <div>Nombre</div>
              <div>Precio</div>
              <div>Cantidad</div>
              <div>Subtotal</div>
            </div>

            {productos.map((item) => {
              const precio = item.precioOferta && item.precioOferta < item.precio
                ? item.precioOferta
                : item.precio;

              return (
                <div key={item.id} className="cart-item">
                  <div><img src={item.imagenURL || item.imagen} alt={item.nombre} className="producto-imagen" /></div>
                  <div className="nombre">{item.nombre}</div>
                  <div className="precio">${precio.toLocaleString()}</div>
                  <div className="cantidad">{item.cantidad}</div>
                  <div className="subtotal">${(precio * item.cantidad).toLocaleString()}</div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <h4 className="fw-bold">
              💰 Total Pagado: <span className="text-success">${total.toLocaleString()}</span>
            </h4>
            <p className="text-muted mt-2">
              Fecha de compra: {new Date(fecha).toLocaleString()}
            </p>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-secondary px-4" onClick={() => navigate(-1)}>🔙 Volver</button>
            <button className="btn btn-danger px-4">🖨️ Imprimir PDF</button>
            <button className="btn btn-primary px-4">📧 Enviar por correo</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
