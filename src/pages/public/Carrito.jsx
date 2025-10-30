import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/molecules/CartItem";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";

export default function Carrito() {
  const { carrito, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { productos } = useProducts(); // Aquí sacamos los productos
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/2 grid grid-cols-2 gap-4">
        {productos.length > 0 ? (
          productos.map((p) => (
            <div key={p.id} className="border rounded p-2 shadow hover:shadow-lg">
              <img src={p.imagen || "/img/placeholder.png"} alt={p.nombre} className="w-full h-32 object-cover rounded" />
              <h4 className="font-semibold mt-2">{p.nombre}</h4>
              <p className="text-sm text-gray-500">{p.categoria}</p>
              <div className="mt-1">
                {p.precioOferta && p.precioOferta < p.precio ? (
                  <>
                    <span className="line-through text-red-500 mr-2">${p.precio.toLocaleString()}</span>
                    <span className="text-green-600 font-bold">${p.precioOferta.toLocaleString()}</span>
                  </>
                ) : (
                  <span className="font-bold">${p.precio.toLocaleString()}</span>
                )}
              </div>
              <button
                className="bg-green-500 text-white w-full py-1 mt-2 rounded"
                onClick={() => updateQuantity(p.id, 1)}
              >
                Añadir al carrito
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>

      <div className="w-1/2 border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Tu Carrito</h2>
        <div className="grid grid-cols-6 gap-2 font-semibold border-b pb-2">
          <span>Imagen</span>
          <span>Nombre</span>
          <span>Precio</span>
          <span>Cantidad</span>
          <span>Subtotal</span>
          <span>Acciones</span>
        </div>

        {carrito.length === 0 ? (
          <p className="mt-4 col-span-6">Tu carrito está vacío 🛒</p>
        ) : (
          carrito.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
            />
          ))
        )}

        {carrito.length > 0 && (
          <div className="flex justify-between mt-4">
            <Button variant="danger" onClick={() => clearCart && clearCart()}>
              Limpiar carrito
            </Button>
            <Button variant="success" onClick={() => navigate("/checkout")}>
              Comprar ahora
            </Button>
          </div>
        )}

        <h3 className="mt-4 font-bold">Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}
