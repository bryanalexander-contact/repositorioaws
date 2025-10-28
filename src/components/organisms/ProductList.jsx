// src/components/organisms/ProductList.jsx
import React from "react";
import ProductCard from "../molecules/ProductCard";

const ProductList = ({ products = [] }) => {
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
