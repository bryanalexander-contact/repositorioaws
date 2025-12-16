import React, { useContext } from "react";
import "../../assets/css/ofertas.css";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { ProductsContext } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/molecules/ProductCard";

export default function Ofertas() {
  const { productosEnOferta } = useContext(ProductsContext);
  const { addToCart } = useCart(); // 🔥 CartContext único para carrito

  return (
    <>
      <Header />

      <main className="ofertas-page">
        <section className="ofertas-container">
          <h1>Productos en Oferta</h1>

          <div className="ofertas-grid">
            {productosEnOferta && productosEnOferta.length > 0 ? (
              productosEnOferta.map((p) => {
                const productoNormalizado = {
                  ...p,
                  precio: Number(p.precio) || 0,
                  precioOferta:
                    p.precio_oferta !== null && p.precio_oferta !== undefined
                      ? Number(p.precio_oferta)
                      : null,
                  imagen_url: p.imagen_url || p.imagen || "",
                };

                return (
                  <div key={p.id} className="col-producto">
                    <ProductCard
                      producto={productoNormalizado}
                      onAdd={() => addToCart(productoNormalizado)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="sin-ofertas">
                No hay productos en oferta por el momento.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
