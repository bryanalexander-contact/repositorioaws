import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import BoletaService from "../../services/BoletaService";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/admin/boletas.css";

export default function Boletas() {
  const { user } = useUsers();
  const navigate = useNavigate();
  const [boletas, setBoletas] = useState([]);

  useEffect(() => {
    if (user) {
      BoletaService.getByUser(user.id)
        .then((res) => setBoletas(res.data))
        .catch(() => setBoletas([]));
    }
  }, [user]);

  if (!user)
    return (
      <div className="boletas-container">
        <h2>Debes iniciar sesión para ver tus boletas.</h2>
      </div>
    );

  const limpiarBoletas = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar todas las boletas?")) return;
    await BoletaService.deleteByUser(user.id);
    setBoletas([]);
  };

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatearDinero = (monto) =>
    monto?.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const irADetalleBoleta = (numero) => {
    navigate(`/detalle-boleta/${numero}`);
  };

  return (
    <>
      <Header />
      <div className="boletas-container">
        <div className="boletas-header">
          <h2>📜 Historial de Boletas</h2>

          {boletas.length > 0 && (
            <button className="btn-limpiar" onClick={limpiarBoletas}>
              🗑️ Limpiar boletas
            </button>
          )}
        </div>

        {boletas.length > 0 ? (
          <div className="boletas-lista">
            {boletas.map((b) => (
              <div
                key={b.id}
                className="boleta-card"
                onClick={() => irADetalleBoleta(b.numero_compra)}
              >
                <h3>Boleta N° {b.numero_compra}</h3>
                <p>
                  <strong>Fecha:</strong> {formatearFecha(b.fecha)}
                </p>
                <p>
                  <strong>Total:</strong> {formatearDinero(b.total)}
                </p>
                <p>
                  <strong>Comprador:</strong> {b.comprador?.nombre || "Desconocido"}
                </p>

                <ul>
                  {b.productos?.map((p, i) => (
                    <li key={i}>
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
