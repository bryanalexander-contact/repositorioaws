// components/ListaBoletas.jsx
import React, { useState } from "react";
import BoletaService from "../services/BoletaService";

const ListaBoletas = () => {
  const [boletas, setBoletas] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarBoletas = async () => {
    if (!userId) {
      alert("Ingresa un ID de usuario para buscar.");
      return;
    }
    setLoading(true);
    try {
      const res = await BoletaService.getByUser(userId);
      setBoletas(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Error al buscar boletas.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBoletas = async () => {
    if (!userId) return;
    if (!window.confirm("¿Eliminar todas las boletas del usuario?")) return;
    try {
      await BoletaService.deleteByUser(userId);
      setBoletas([]);
      alert("Boletas eliminadas.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar boletas.");
    }
  };

  return (
    <div className="boletas-container">
      <h2 className="mb-3">Boletas por Usuario</h2>

      <div className="boletas-input-group">
        <input
          type="text"
          className="form-control"
          placeholder="ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarBoletas()}
        />
        <button className="btn btn-primario" onClick={buscarBoletas} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
        <button className="btn btn-peligro ms-2" onClick={deleteBoletas}>
          Eliminar
        </button>
      </div>

      {/* Desktop: tabla */}
      {boletas.length > 0 ? (
        <>
          <table className="boletas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {boletas.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.fecha}</td>
                  <td>${Number(b.total).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: cards (visually the same data) */}
          <div className="boletas-lista" style={{ marginTop: 12 }}>
            {boletas.map((b) => (
              <div className="boleta-card" key={`card-${b.id}`}>
                <div>
                  <h3>Boleta #{b.id}</h3>
                  <div className="meta">Fecha: {b.fecha}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                    ${Number(b.total).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-boletas mt-3">
          {loading ? "Cargando..." : "No hay boletas para mostrar."}
        </div>
      )}
    </div>
  );
};

export default ListaBoletas;
