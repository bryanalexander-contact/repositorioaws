import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

export default function ProductCard({ producto, onAddToCart }) {
  const { nombre, precio, precioOferta, imagen, categoria } = producto;

  const isOffer = precioOferta && precioOferta < precio;

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition relative">
      {isOffer && <div className="absolute top-2 right-2"><Badge label="Oferta" color="red" /></div>}
      <img src={imagen} alt={nombre} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="font-semibold mt-2">{nombre}</h3>
      <p className="text-sm text-gray-500">{categoria}</p>
      <div className="mt-2">
        {isOffer ? (
          <>
            <span className="line-through text-gray-400 mr-2">${precio.toLocaleString()}</span>
            <span className="text-red-600 font-bold">${precioOferta.toLocaleString()}</span>
          </>
        ) : (
          <span className="font-bold">${precio.toLocaleString()}</span>
        )}
      </div>
      <Button onClick={() => onAddToCart(producto)} className="mt-3 w-full">Agregar al carrito</Button>
    </div>
  );
}
