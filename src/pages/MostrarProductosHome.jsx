import React from "react";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

export default function MostrarProductosHome() {
  const { productos } = useProducts();
  const { addToCart } = useCart();

  if (productos.length === 0) return <p className="p-4">No hay productos disponibles.</p>;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {productos.map((p) => (
        <div key={p.id} className="producto border p-2 cursor-pointer" onClick={() => {
          localStorage.setItem("detalleProductoId", p.id);
          window.location.href = "/detalle-producto";
        }}>
          <img src={p.imagen || "/img/placeholder.png"} alt={p.nombre} className="w-full h-32 object-cover"/>
          <h3 className="font-bold">{p.nombre}</h3>
          <p>{p.descripcion || ""}</p>
          <p className="text-lg">${p.precio.toFixed(2)}</p>
          <button
            className="bg-green-500 text-white px-2 py-1 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(p, 1);
            }}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
3