import Button from "../atoms/Button";

export default function CartItem({ item, onRemove, onUpdate }) {
  const precioUnitario = item.precioOferta && item.precioOferta < item.precio 
    ? item.precioOferta 
    : item.precio;

  const subtotal = precioUnitario * (item.cantidad || 1);

  return (
    <div className="grid grid-cols-6 items-center border-b py-2">
      <div>
        <img
          src={item.imagen || "/img/placeholder.png"}
          alt={item.nombre}
          className="w-16 h-16 object-cover rounded"
        />
      </div>
      <div>{item.nombre}</div>
      <div>${precioUnitario.toLocaleString()}</div>
      <div>
        <input
          type="number"
          min="1"
          value={item.cantidad || 1}
          className="w-16 border p-1 rounded"
          onChange={(e) => onUpdate && onUpdate(item.id, parseInt(e.target.value) || 1)}
        />
      </div>
      <div>${subtotal.toLocaleString()}</div>
      <div>
        <Button
          variant="danger"
          onClick={() => onRemove && onRemove(item.id)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
