import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import "../../assets/css/admin/reporte-productos.css";

export default function ReporteProductos() {
  const [productos, setProductos] = useState([]);
  const [stockCritico, setStockCritico] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [productosOferta, setProductosOferta] = useState(0);

  useEffect(() => {
    ProductService.getAll()
      .then(res => setProductos(res.data || []))
      .catch(err => {
        console.error("Error cargando productos:", err);
        setProductos([]);
      });
  }, []);

  useEffect(() => {
    const critico = productos.filter(p => {
      const stock = Number(p.stock) || 0;
      const sc = p.stock_critico !== undefined && p.stock_critico !== null ? Number(p.stock_critico) : 5;
      return stock <= sc;
    }).length;

    const oferta = productos.filter(p => p.en_oferta === true || p.en_oferta === "true").length;

    setStockCritico(critico);
    setTotalProductos(productos.length);
    setProductosOferta(oferta);
  }, [productos]);

  const cards = [
    { id: 1, title: "⚠️ Stock Crítico", value: stockCritico },
    { id: 2, title: "📦 Total Productos", value: totalProductos },
    { id: 3, title: "🏷️ Productos en Oferta", value: productosOferta },
  ];

  return (
    <main className="container my-5">
      <h2 className="mb-5 text-center">📊 Reporte de Productos</h2>

      <div className="reportes-horizontal">
        {cards.map((card) => (
          <div key={card.id} className="report-card">
            <h4>{card.title}</h4>
            <p className="metric-number">{card.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
