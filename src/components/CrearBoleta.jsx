// components/CrearBoleta.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoletaService from "../services/BoletaService";

const CrearBoleta = () => {
  const [userId, setUserId] = useState("");
  const [total, setTotal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await BoletaService.create({ userId, total: Number(total) });
      navigate("/admin/boletas");
    } catch (err) {
      console.error("Error creando boleta:", err);
      alert("Ocurrió un error al crear la boleta.");
    }
  };

  return (
    <div className="boletas-container">
      <h2>Crear Boleta</h2>

      <form className="card p-3" onSubmit={handleSubmit} style={{ borderRadius: 12 }}>
        <div className="mb-2">
          <label className="form-label">ID Usuario:</label>
          <input
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ingrese ID de usuario"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Total:</label>
          <input
            className="form-control"
            type="number"
            min="0"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primario btn-accion">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearBoleta;
