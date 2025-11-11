import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/checkout.css";

export default function CompraFallida() {
  const navigate = useNavigate();
  const location = useLocation();
  const { comprador, total, numeroCompra } = location.state || {};
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Recuperar el carrito (último intento de compra)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const ultimaCompra = JSON.parse(localStorage.getItem("ultimaCompra")) || [];
    setProductos(carrito.length > 0 ? carrito : ultimaCompra);
  }, []);

  const volverAlCheckout = () => {
    navigate("/checkout", {
      state: {
        comprador: comprador || {},
        productos,
        total,
      },
    });
  };

  return (
    <>
      <Header />

      <main className="container my-5">
        <div className="text-center mb-4">
          <h2 className="text-danger fw-bold">❌ No se pudo realizar el pago</h2>
          <p className="text-muted">
            Lamentablemente tu transacción no se completó correctamente.
          </p>
        </div>

        <div className="border rounded shadow-sm p-4 mb-4 bg-light">
          <h5 className="fw-bold mb-3">
            🧾 N° de Compra:{" "}
            <span className="text-danger">
              #{String(numeroCompra || 0).padStart(4, "0")}
            </span>
          </h5>

          <h6 className="fw-semibold text-secondary mb-4">
            📄 Detalle de la compra
          </h6>

          <div className="text-center mb-4">
            <button onClick={volverAlCheckout} className="btn btn-warning px-4 fw-bold">
              🔁 Volver a realizar el pago
            </button>
          </div>

          {/* === Datos del comprador === */}
          <div className="mb-4">
            <h6 className="fw-bold border-bottom pb-2">Datos del Comprador</h6>
            {comprador ? (
              <div className="row">
                <div className="col-md-6">
                  <strong>Nombre:</strong>{" "}
                  {comprador.nombre || <span className="text-danger">No ingresado</span>}
                </div>
                <div className="col-md-6">
                  <strong>Apellidos:</strong>{" "}
                  {comprador.apellidos || <span className="text-danger">No ingresado</span>}
                </div>
                <div className="col-md-6">
                  <strong>Correo:</strong>{" "}
                  {comprador.correo || <span className="text-danger">No ingresado</span>}
                </div>
                <div className="col-md-6">
                  <strong>Dirección:</strong>{" "}
                  {comprador.direccion || <span className="text-danger">No ingresada</span>}
                </div>
                {comprador.departamento && (
                  <div className="col-md-6">
                    <strong>Departamento:</strong> {comprador.departamento}
                  </div>
                )}
                <div className="col-md-6">
                  <strong>Región:</strong>{" "}
                  {comprador.region || <span className="text-danger">No seleccionada</span>}
                </div>
                <div className="col-md-6">
                  <strong>Comuna:</strong>{" "}
                  {comprador.comuna || <span className="text-danger">No seleccionada</span>}
                </div>
                {comprador.indicacion && (
                  <div className="col-12">
                    <strong>Indicaciones:</strong> {comprador.indicacion}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted">No se encontraron datos del comprador.</p>
            )}
          </div>

          {/* === Productos === */}
          <div>
            <h6 className="fw-bold border-bottom pb-2">Productos seleccionados</h6>
            <div className="cart-table mt-3">
              <div className="cart-header">
                <div>Imagen</div>
                <div>Nombre</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Subtotal</div>
              </div>

              <div className="cart-body">
                {productos.length > 0 ? (
                  productos.map((item) => {
                    const precio =
                      item.precioOferta && item.precioOferta < item.precio
                        ? item.precioOferta
                        : item.precio;
                    return (
                      <div key={item.id} className="cart-row">
                        <div>
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                        </div>
                        <div>{item.nombre}</div>
                        <div>${precio.toLocaleString()}</div>
                        <div>{item.cantidad}</div>
                        <div>${(precio * item.cantidad).toLocaleString()}</div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-muted">
                    No se encontraron productos en esta compra.
                  </p>
                )}
              </div>
            </div>

            <div className="text-center mt-4">
              <h4 className="fw-bold">
                💰 Total a pagar:{" "}
                <span className="text-danger">${total?.toLocaleString() || 0}</span>
              </h4>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
