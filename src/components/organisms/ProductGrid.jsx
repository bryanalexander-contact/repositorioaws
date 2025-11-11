// src/components/organisms/ProductGrid.jsx
import React from "react";
import ProductGridItem from "../molecules/ProductGridItem";

export default function ProductGrid({ productos, onAdd }) {
  return (
    <div className="row">
      {productos.map((p) => (
        <ProductGridItem key={p.id} producto={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
