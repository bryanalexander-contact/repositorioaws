import React, { useEffect, useState } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { useProducts } from "../../context/ProductsContext";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/reportes.css";

export default function Reportes() {
  const { productos } = useProducts();
  const { usuarios } = useUsers();
  const [historialCompras, setHistorialCompras] = useState([]);

  useEffect(() => {
    // Obtener historial global de compras desde localStorage
    try {
      const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
      setHistorialCompras(historial);
    } catch {
      setHistorialCompras([]);
    }
  }, []);

  const totalCompras = historialCompras.length;
  const totalUsuarios = usuarios.length;
  const totalProductos = productos.length;

  return (
    <>
      <Header />

      <main className="container my-5">
        <h2 className="mb-5 text-center">📊 Dashboard de Reportes</h2>

        <div className="reportes-vertical">
          <div className="report-card">
            <h4>🛒 Compras</h4>
            <p className="metric-number">{totalCompras}</p>
          </div>
          <div className="report-card">
            <h4>📦 Productos</h4>
            <p className="metric-number">{totalProductos}</p>
          </div>
          <div className="report-card">
            <h4>👤 Usuarios</h4>
            <p className="metric-number">{totalUsuarios}</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
