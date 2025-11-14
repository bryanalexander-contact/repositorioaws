// src/components/organisms/ProductList.jsx
import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ProductCard from "../molecules/ProductCard";

const ProductList = () => {
  const { productos } = useContext(ProductsContext);
  const { addToCart } = useCart(); // ✅ función para pasar a ProductCard

  if (!productos || productos.length === 0) {
    return <p className="no-products">No hay productos disponibles.</p>;
  }

  return (
    <section className="product-list">
      <h2 className="section-title">Productos disponibles</h2>
      <div className="product-grid">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAddToCart={() => addToCart(producto)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
