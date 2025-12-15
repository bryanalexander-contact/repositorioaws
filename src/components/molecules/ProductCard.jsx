import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import Alert from "../atoms/Alert";
import "../../assets/css/product-card.css";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const {
    id,
    nombre,
    precio = 0,
    precio_oferta,
    imagen_url,
    categoria,
    stock = 0,
  } = producto;

  const [mensaje, setMensaje] = useState("");

  const isOffer =
    precio_oferta !== null &&
    precio_oferta !== undefined &&
    Number(precio_oferta) < Number(precio);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(producto);
    setMensaje("✅ Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <>
      {mensaje && <Alert type="success" message={mensaje} />}

      <div className="product-card mb-4 position-relative">
        {isOffer && (
          <div className="position-absolute top-2 end-2">
            <Badge label="Oferta" color="red" />
          </div>
        )}

        <Link
          to={`/detalle/${id}`}
          className="d-block text-decoration-none text-dark p-3"
        >
          <img
            src={imagen_url || "/img/placeholder.png"}
            alt={nombre}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/img/placeholder.png";
            }}
          />

          <h3 className="mt-2">{nombre}</h3>
          <p className="categoria">{categoria}</p>
          <p className="text-muted mb-1">Stock disponible: {stock}</p>

          <div className="mt-2">
            {isOffer ? (
              <>
                <span className="precio-original">
                  ${Number(precio).toLocaleString()}
                </span>
                <span className="precio-oferta">
                  ${Number(precio_oferta).toLocaleString()}
                </span>
              </>
            ) : (
              <span className="precio-normal">
                ${Number(precio).toLocaleString()}
              </span>
            )}
          </div>
        </Link>

        <div className="p-3 pt-0">
          <Button
            onClick={handleAddToCart}
            className="btn-agregar btn btn-primary w-100"
            disabled={stock === 0}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </>
  );
}
