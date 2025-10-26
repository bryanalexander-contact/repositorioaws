import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/molecules/CartItem";

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) return <p>Tu carrito está vacío 🛒</p>;

  return (
    <div className="carrito-contenedor">
      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => removeFromCart(item.id)}
          onUpdate={(cantidad) => updateQuantity(item.id, cantidad)}
        />
      ))}
      <h3 id="carrito-total">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Carrito;
