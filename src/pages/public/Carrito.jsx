// ✅ Carrito.jsx corregido
import React from "react";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ProductGrid from "../../components/organisms/ProductGrid";
import CartSection from "../../components/organisms/CartSection";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/carrito.css";

export default function Carrito() {
  const { productos } = useProducts();
  const { carrito, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <>
      {/* Header global */}
      <Header />

      <main className="carrito-container container-fluid py-5">
        <div className="row gx-4 gy-4">
          {/* Productos disponibles */}
          <section className="col-12 col-lg-8 border-end-lg pe-lg-4">
            <h3 className="mb-4 text-center text-lg-start fw-bold">
              🛍 Productos Disponibles
            </h3>
            <ProductGrid productos={productos} onAdd={addToCart} />
          </section>

          {/* Carrito */}
          <aside className="col-12 col-lg-4 ps-lg-4 mt-5 mt-lg-0">
            <CartSection
              items={carrito}        
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
              onClear={clearCart}
              onCheckout={() => alert("Compra realizada!")}
            />
          </aside>
        </div>
      </main>

      {/* Footer global */}
      <Footer />
    </>
  );
}
