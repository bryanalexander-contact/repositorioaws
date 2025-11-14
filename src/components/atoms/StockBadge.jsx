// src/components/atoms/StockBadge.jsx
import React from "react";

export default function StockBadge({ stock }) {
  const color = stock > 10 ? "success" : stock > 0 ? "warning" : "danger";
  const label = stock > 0 ? `${stock} disponibles` : "Sin stock";

  return (
    <span className={`badge bg-${color} ms-2`}>
      {label}
    </span>
  );
}
