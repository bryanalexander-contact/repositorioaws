import Button from "../atoms/Button";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center border-b py-3">
      <div className="flex items-center gap-4">
        <img src={item.imagen} alt={item.nombre} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h4 className="font-semibold">{item.nombre}</h4>
          <p>${item.precio.toLocaleString()}</p>
        </div>
      </div>
      <Button variant="danger" onClick={() => onRemove(item.id)}>Eliminar</Button>
    </div>
  );
}
