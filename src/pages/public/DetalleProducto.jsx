import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

export default function DetalleProducto() {
  const { productos } = useProducts();
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (productos.length > 0) {
      const prod = productos.find((p) => p.id === parseInt(id));
      if (prod) {
        setProducto({
          ...prod,
          precio: Number(prod.precio) || 0,
          precioOferta: prod.precioOferta ? Number(prod.precioOferta) : null,
        });
      }
    }
  }, [productos, id]);

  if (!producto) return <p className="p-4">Producto no encontrado.</p>;

  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 8)
    .map((p) => ({
      ...p,
      precio: Number(p.precio) || 0,
      precioOferta: p.precioOferta ? Number(p.precioOferta) : null,
    }));

  return (
    <>
      <Header />

      <div className="detalle-producto p-4">
        <div className="flex gap-4">
          <img
            src={producto.imagen || "/img/placeholder.png"}
            alt={producto.nombre}
            className="w-64 h-64 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{producto.nombre}</h2>
            <p className="text-lg">${producto.precio.toFixed(2)}</p>
            <p>{producto.descripcion}</p>
            <div className="mt-2">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                className="border p-1 w-16 ml-2"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-2"
              onClick={() => addToCart(producto, cantidad)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="related-products mt-6">
            <h3 className="font-bold mb-2">Productos relacionados</h3>
            <div className="grid grid-cols-4 gap-4">
              {relacionados.map((p) => (
                <div
                  key={p.id}
                  className="related-item cursor-pointer border p-2"
                  onClick={() => navigate(`/detalle/${p.id}`)}
                >
                  <img
                    src={p.imagen || "/img/placeholder.png"}
                    alt={p.nombre}
                    className="w-full h-32 object-cover"
                  />
                  <h4 className="font-bold">{p.nombre}</h4>
                  <p>${p.precio.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
