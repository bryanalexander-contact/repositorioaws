// src/pages/public/Ofertas.jsx
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext"; 
import ProductCard from "../../components/molecules/ProductCard"; 
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

export default function Ofertas() {
  const { productosEnOferta } = useContext(ProductsContext);

  return (
    <>
      <Header />

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Productos en Oferta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productosEnOferta.length > 0 ? (
            productosEnOferta.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))
          ) : (
            <p>No hay productos en oferta por el momento.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
