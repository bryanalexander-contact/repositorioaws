import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import ProductCard from "../../components/molecules/ProductCard";
import "../../assets/css/detalle-producto.css";

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

      <div className="detalle-producto">
        <div className="detalle-producto-contenido">
          <img
            src={producto.imagen || "/img/placeholder.png"}
            alt={producto.nombre}
          />

          <div className="detalle-info">
            <h2>{producto.nombre}</h2>

            {producto.precioOferta && producto.precioOferta < producto.precio ? (
              <p className="precio">
                <span className="precio-original">
                  ${producto.precio.toLocaleString()}
                </span>
                <span className="precio-oferta">
                  ${producto.precioOferta.toLocaleString()}
                </span>
              </p>
            ) : (
              <p className="precio">${producto.precio.toLocaleString()}</p>
            )}

            <p className="descripcion">{producto.descripcion}</p>

            <div className="cantidad-control">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              />
            </div>

            <button
              className="btn-agregar"
              onClick={() => addToCart(producto, cantidad)}
            >
              🛒 Añadir al carrito
            </button>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="related-products">
            <h3>Productos relacionados</h3>
            <div className="grid">
              {relacionados.map((p) => (
                <ProductCard key={p.id} producto={p} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
