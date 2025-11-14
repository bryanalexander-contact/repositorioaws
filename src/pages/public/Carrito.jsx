// src/pages/public/Carrito.jsx
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
  const { carrito, addToCart, removeFromCart, updateQuantity, clearCart, checkout } = useCart();

  // 🔹 Función de checkout simulada
  const handleCheckout = () => {
    const result = checkout({
      nombre: "Juan Pérez",
      email: "juan@example.com",
      direccion: "Calle Falsa 123",
    });
    if (result.ok) alert(`Compra realizada con éxito! N° ${result.data.numeroCompra}`);
    else alert("Faltan datos para completar la compra.");
  };

  return (
    <>
      {/* Header global */}
      <Header />

      <main className="carrito-container container-fluid py-5">
        <div className="row gx-4 gy-4">
          {/* 🛍 Productos disponibles */}
          <section className="col-12 col-lg-7 border-end-lg pe-lg-4">
            <h3 className="mb-4 text-center text-lg-start fw-bold">
              🛍 Productos Disponibles
            </h3>
            <ProductGrid productos={productos} onAdd={addToCart} />
          </section>

          {/* 🛒 Carrito */}
          <aside className="col-12 col-lg-5 ps-lg-4 mt-5 mt-lg-0">
            <CartSection
              items={carrito.map((p) => ({
                ...p,
                imagen: p.imagenURL || p.imagen, // 🔹 usar URL local primero
              }))}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
              onClear={clearCart}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      </main>

      {/* Footer global */}
      <Footer />
    </>
  );
}
