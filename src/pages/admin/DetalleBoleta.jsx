// src/pages/admin/DetalleBoleta.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoletaService from "../../services/BoletaService";
import UsuarioService from "../../services/UsuarioService";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/checkout.css";

export default function DetalleBoleta() {
  const { id } = useParams(); // id puede ser id DB o numero_compra
  const navigate = useNavigate();
  const [boleta, setBoleta] = useState(null);
  const [user, setUser] = useState(() => UsuarioService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const safeParseJson = (v) => {
    if (!v) return v;
    if (typeof v === "string") {
      try { return JSON.parse(v); } catch { return v; }
    }
    return v;
  };

  useEffect(() => {
    const current = UsuarioService.getCurrentUser();
    setUser(current);

    const handler = (ev) => {
      const newUser = ev?.detail || UsuarioService.getCurrentUser();
      setUser(newUser);
    };

    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);

  useEffect(() => {
    const fetchDetalle = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Usa getById (intenta detalle, numero y fallback)
        const res = await BoletaService.getById(id);
        const data = res?.data || null;
        if (!data) {
          setBoleta(null);
          setError("Boleta no encontrada");
          return;
        }

        const comprador = safeParseJson(data.comprador) || {};
        const productos = safeParseJson(data.productos) || [];

        setBoleta({ ...data, comprador, productos });
      } catch (err) {
        console.error("Error cargando boleta:", err);
        // Intentar mostrar el mensaje del servidor si existe
        const msg = err?.response?.data?.message || err?.message || "Error cargando boleta";
        setError(msg);
        setBoleta(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id, user]);

  if (!user)
    return (
      <>
        <Header />
        <div className="boletas-container">
          <h2>Debes iniciar sesión para ver tus boletas.</h2>
        </div>
        <Footer />
      </>
    );

  if (loading)
    return (
      <>
        <Header />
        <div className="boletas-container"><h2>Cargando boleta...</h2></div>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <div className="boletas-container text-center">
          <h3>{error}</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>🔙 Volver</button>
        </div>
        <Footer />
      </>
    );

  if (!boleta)
    return (
      <>
        <Header />
        <div className="boletas-container text-center">
          <h3>❌ No se encontró la boleta #{id}</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>🔙 Volver</button>
        </div>
        <Footer />
      </>
    );

  const { comprador, productos, total, fecha, numero_compra } = boleta;

  const formatearDinero = (monto) =>
    monto?.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  return (
    <>
      <Header />

      <main className="container my-5">
        <div className="text-center mb-4">
          <h2 className="text-primary fw-bold">🧾 Detalle de Boleta</h2>
          <p className="text-muted">Resumen completo de tu compra #{numero_compra ?? id}</p>
        </div>

        <div className="border rounded shadow-sm p-4 mb-4 bg-light">
          <h5 className="fw-bold mb-3">
            🧾 N° de Compra:
            <span className="text-primary">
              #{String(numero_compra ?? id).padStart(4, "0")}
            </span>
          </h5>

          <div className="mb-4">
            <h6 className="fw-bold border-bottom pb-2">Datos del Comprador</h6>
            <div className="row">
              <div className="col-md-6"><strong>Nombre:</strong> {comprador?.nombre} {comprador?.apellidos}</div>
              <div className="col-md-6"><strong>Correo:</strong> {comprador?.correo}</div>
              <div className="col-md-6"><strong>Dirección:</strong> {comprador?.direccion}</div>
              {comprador?.departamento && <div className="col-md-6"><strong>Departamento:</strong> {comprador.departamento}</div>}
              <div className="col-md-6"><strong>Región:</strong> {comprador?.region}</div>
              <div className="col-md-6"><strong>Comuna:</strong> {comprador?.comuna}</div>
              {comprador?.indicacion && <div className="col-12"><strong>Indicaciones:</strong> {comprador.indicacion}</div>}
            </div>
          </div>

          <h6 className="fw-bold border-bottom pb-2">Productos Comprados</h6>
          <div className="checkout-products mt-3">
            <div className="cart-header">
              <div>Imagen</div><div>Nombre</div><div>Precio</div><div>Cantidad</div><div>Subtotal</div>
            </div>

            {productos?.length > 0 ? (
              productos.map((item) => {
                const precio = item.precioOferta && item.precioOferta < item.precio
                  ? item.precioOferta
                  : item.precio;

                return (
                  <div key={item.id} className="cart-item">
                    <div>
                      <img
                        src={item.imagenURL || item.imagen || item.imagen_url || "/img/placeholder.png"}
                        alt={item.nombre}
                        className="producto-imagen"
                      />
                    </div>
                    <div className="nombre">{item.nombre}</div>
                    <div className="precio">{formatearDinero(precio)}</div>
                    <div className="cantidad">{item.cantidad}</div>
                    <div className="subtotal">
                      {formatearDinero(precio * item.cantidad)}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted mt-3">No se encontraron productos.</p>
            )}
          </div>

          <div className="text-center mt-4">
            <h4 className="fw-bold">💰 Total Pagado:
              <span className="text-success">{formatearDinero(total)}</span>
            </h4>

            <p className="text-muted mt-2">Fecha de compra: {fecha ? new Date(fecha).toLocaleString() : "-"}</p>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-secondary px-4" onClick={() => navigate(-1)}>🔙 Volver</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
