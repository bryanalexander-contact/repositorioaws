import CartItem from "../molecules/CartItem";

export default function CartList({ items, onRemove }) {
  if (!items.length) return <p>Tu carrito está vacío.</p>;
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
