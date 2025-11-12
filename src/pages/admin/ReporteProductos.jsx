import React, { useEffect, useState } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { useProducts } from "../../context/ProductsContext";
import "../../assets/css/admin/reporte-productos.css";

export default function ReporteProductos() {
  const { productos } = useProducts();
  const [stockCritico, setStockCritico] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [productosOferta, setProductosOferta] = useState(0);

  useEffect(() => {
    const critico = productos.filter(
      (p) => p.stockCritico !== undefined ? p.stock <= p.stockCritico : p.stock <= 5
    ).length;

    const oferta = productos.filter((p) => p.enOferta).length;

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
    <>
   

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

    </>
  );
}
