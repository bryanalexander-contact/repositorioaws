import React from "react";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ProductGrid from "../../components/organisms/ProductGrid";
import CartSection from "../../components/organisms/CartSection";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/carrito.css";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { productos } = useProducts();
  const {
    carrito,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", { state: { carrito, total } });
  };

  return (
    <>
      <Header />

      <main className="carrito-container container-fluid py-5">
        <div className="row gx-4 gy-4">
          <section className="col-12 col-lg-7 border-end-lg pe-lg-4">
            <h3 className="mb-4 text-center text-lg-start fw-bold">
              🛍 Productos Disponibles
            </h3>

            <ProductGrid
              productos={productos}
              onAdd={addToCart}   // 🔥 SOLO CartContext
            />
          </section>

          <aside className="col-12 col-lg-5 ps-lg-4 mt-5 mt-lg-0">
            <CartSection
              items={carrito.map((p) => ({
                ...p,
                imagen: p.imagenURL || p.imagen || p.imagen_url || "",
              }))}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
              onClear={clearCart}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
