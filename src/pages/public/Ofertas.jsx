import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductoCard from "../components/ProductoCard";

export default function Ofertas() {
  const { productosEnOferta } = useContext(ProductsContext);

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {productosEnOferta.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
