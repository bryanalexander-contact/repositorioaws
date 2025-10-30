import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import "../../assets/css/product-card.css";

export default function ProductCard({ producto, onAddToCart }) {
  const { nombre, precio, precioOferta, imagen, categoria, id } = producto;

  const isOffer = precioOferta && precioOferta < precio;

  return (
    <div className="product-card mb-4 position-relative">
      {/* Badge de oferta usando el componente */}
      {isOffer && (
        <div className="position-absolute top-2 end-2">
          <Badge label="Oferta" color="red" />
        </div>
      )}

      {/* Link al detalle */}
      <Link to={`/detalle/${id}`} className="d-block text-decoration-none text-dark p-3">
        <img src={imagen || "/img/placeholder.png"} alt={nombre} />
        <h3 className="mt-2">{nombre}</h3>
        <p className="categoria">{categoria}</p>
        <div className="mt-2">
          {isOffer ? (
            <>
              <span className="precio-original">${precio.toLocaleString()}</span>
              <span className="precio-oferta">${precioOferta.toLocaleString()}</span>
            </>
          ) : (
            <span className="precio-normal">${precio.toLocaleString()}</span>
          )}
        </div>
      </Link>

      {/* Botón agregar al carrito */}
      {onAddToCart && (
        <div className="p-3 pt-0">
          <Button onClick={() => onAddToCart(producto)} className="btn-agregar">
            Agregar al carrito
          </Button>
        </div>
      )}
    </div>
  );
}
