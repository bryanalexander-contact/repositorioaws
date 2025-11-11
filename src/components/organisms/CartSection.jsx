// src/components/organisms/CartSection.jsx
import React from "react";
import CartItem from "../molecules/CartItem";
import Button from "../atoms/Button";
import "../../assets/css/cart-section.css";

export default function CartSection({
  items = [],
  onRemove,
  onUpdate,
  onClear,
  onCheckout,
}) {
  const total = Array.isArray(items)
    ? items.reduce((sum, i) => {
        const precio =
          i.precioOferta && i.precioOferta < i.precio
            ? i.precioOferta
            : i.precio;
        return sum + precio * (i.cantidad || 1);
      }, 0)
    : 0;

  return (
    <div className="cart-section card shadow-sm p-3">
      <h4 className="mb-3 text-center">🛒 Carrito de Compras</h4>

      {(!items || items.length === 0) ? (
        <p className="text-muted text-center py-4">
          Tu carrito está vacío
        </p>
      ) : (
        <div className="cart-table">
          {/* Encabezado tipo tabla */}
          <div className="cart-header">
            <div>Imagen</div>
            <div>Nombre</div>
            <div>Precio</div>
            <div>Cantidad</div>
            <div>Subtotal</div>
            <div>Acciones</div>
          </div>

          {/* Filas con los items */}
          <div className="cart-body">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            ))}
          </div>

          {/* Total y botones */}
          <div className="cart-footer">
            <div className="cart-actions">
              <Button className="btn btn-danger me-2" onClick={onClear}>
                Limpiar
              </Button>
              <Button className="btn btn-success" onClick={onCheckout}>
                Comprar ahora
              </Button>
            </div>
            <h5 className="cart-total">
              Total:{" "}
              <span className="text-success fw-bold">
                ${total.toLocaleString()}
              </span>
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}
