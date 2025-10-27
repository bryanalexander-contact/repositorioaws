import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductoCard from "../components/ProductoCard";

export default function Categorias() {
  const { categorias, productosPorCategoria } = useContext(ProductsContext);
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  return (
    <div className="p-6">
      <div className="flex gap-3 justify-center mb-6">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCategoriaActiva(c)}
            className={`p-3 rounded-xl ${
              categoriaActiva === c ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {categoriaActiva && (
        <>
          <h2 className="text-2xl mb-4 text-center">{categoriaActiva}</h2>
          <div className="grid grid-cols-4 gap-6">
            {productosPorCategoria(categoriaActiva).map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
