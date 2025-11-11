// src/components/molecules/ProductGridItem.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import StockBadge from "../atoms/StockBadge";
import Alert from "../atoms/Alert";
import { useCart } from "../../context/CartContext";

export default function ProductGridItem({ producto }) {
  const { id, nombre, precio, precioOferta, imagen, stock = 0, categoria } = producto;
  const { addToCart } = useCart();
  const [mensaje, setMensaje] = useState("");

  const isOffer = precioOferta && precioOferta < precio;
  const precioMostrar = isOffer ? precioOferta : precio;

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(producto);
    setMensaje("✅ Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <>
      {mensaje && <Alert type="success" message={mensaje} />}

      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100 shadow-sm position-relative border-0 rounded-4 overflow-hidden hover-scale">
          <Link to={`/detalle/${id}`} className="text-decoration-none text-dark">
            <img
              src={imagen || "/img/placeholder.png"}
              alt={nombre}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
            />
          </Link>

          <div className="card-body d-flex flex-column justify-content-between text-center p-3">
            <div>
              <h5 className="card-title fw-bold mb-2">{nombre}</h5>
              <p className="text-muted small mb-1">{categoria}</p>

              {/* 💚 Stock ahora debajo del nombre */}
              <div className="mb-2">
                <StockBadge stock={stock} />
              </div>

              {isOffer ? (
                <p className="mb-2">
                  <span className="text-decoration-line-through text-danger">
                    ${precio.toLocaleString()}
                  </span>{" "}
                  <span className="fw-bold text-success">
                    ${precioOferta.toLocaleString()}
                  </span>
                </p>
              ) : (
                <p className="fw-bold mb-2">${precioMostrar.toLocaleString()}</p>
              )}
            </div>

            <Button
              onClick={handleAdd}
              className="btn btn-primary w-100 mt-2"
              disabled={stock === 0}
            >
              {stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
