import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

export default function ProductCard({ producto, onAddToCart }) {
  const { nombre, precio, precioOferta, imagen, categoria, id } = producto;

  const isOffer = precioOferta && precioOferta < precio;

  return (
    <div className="relative border rounded-xl shadow hover:shadow-lg transition">
      {isOffer && (
        <div className="absolute top-2 right-2">
          <Badge label="Oferta" color="red" />
        </div>
      )}

      <Link
        to={`/detalle/${id}`}
        className="block p-4 text-decoration-none text-dark"
      >
        <img
          src={imagen || "/img/placeholder.png"}
          alt={nombre}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h3 className="font-semibold mt-2">{nombre}</h3>
        <p className="text-sm text-gray-500">{categoria}</p>
        <div className="mt-2">
          {isOffer ? (
            <>
              <span className="line-through text-red-500 mr-2">
                ${precio.toLocaleString()}
              </span>
              <span className="text-green-600 font-bold">
                ${precioOferta.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-bold">${precio.toLocaleString()}</span>
          )}
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button onClick={() => onAddToCart(producto)} className="w-full">
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}
