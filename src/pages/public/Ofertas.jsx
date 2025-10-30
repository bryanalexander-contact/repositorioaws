import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext"; 
import ProductCard from "../../components/molecules/ProductCard"; 

export default function Ofertas() {
  const { productosEnOferta } = useContext(ProductsContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Productos en Oferta</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productosEnOferta.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
