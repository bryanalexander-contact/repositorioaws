import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/admin/boletas.css";

export default function Boletas() {
  const { user, actualizarUsuario } = useUsers();
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="boletas-container">
        <h2>Debes iniciar sesión para ver tus boletas.</h2>
      </div>
    );

  const limpiarBoletas = () => {
    if (window.confirm("¿Seguro que quieres eliminar todas las boletas?")) {
      actualizarUsuario(user.id, { historialCompras: [] });
    }
  };

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    return d.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearDinero = (monto) =>
    monto?.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const boletasOrdenadas = [...(user.historialCompras || [])].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  const irADetalleBoleta = (numeroCompra) => {
    navigate(`/detalle-boleta/${numeroCompra}`);
  };

  return (
    <>
      <Header />
      <div className="boletas-container">
        <div className="boletas-header">
          <h2>📜 Historial de Boletas</h2>
          {user.historialCompras?.length > 0 && (
            <button className="btn-limpiar" onClick={limpiarBoletas}>
              🗑️ Limpiar boletas
            </button>
          )}
        </div>

        {boletasOrdenadas.length > 0 ? (
          <div className="boletas-lista">
            {boletasOrdenadas.map((b, i) => (
              <div
                key={`boleta-${b.numeroCompra || i}`}
                className="boleta-card"
                onClick={() => irADetalleBoleta(b.numeroCompra)}
              >
                <h3>Boleta N° {b.numeroCompra}</h3>
                <p>
                  <strong>Fecha:</strong> {formatearFecha(b.fecha)}
                </p>
                <p>
                  <strong>Total:</strong> {formatearDinero(b.total)}
                </p>
                <p>
                  <strong>Comprador:</strong>{" "}
                  {b.comprador?.nombre || "Desconocido"}
                </p>
                <ul>
                  {b.productos?.map((p, idx) => (
                    <li key={`producto-${b.numeroCompra}-${idx}`}>
                      {p.nombre} × {p.cantidad} — {formatearDinero(p.precio)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-boletas">No hay boletas registradas aún.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
