// src/components/organisms/ProductList.jsx
import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../molecules/ProductCard";

const ProductList = () => {
  const { products } = useContext(ProductsContext);

  if (!products || products.length === 0) {
    return <p className="no-products">No hay productos disponibles.</p>;
  }

  return (
    <section className="product-list">
      <h2 className="section-title">Productos disponibles</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
