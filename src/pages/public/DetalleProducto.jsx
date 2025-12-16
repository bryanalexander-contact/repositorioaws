import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import ProductCard from "../../components/molecules/ProductCard";
import ProductService from "../../services/ProductService";
import "../../assets/css/detalle-producto.css";

export default function DetalleProducto() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const res = await ProductService.getById(id);
        const prod = res.data;

        if (!prod) {
          navigate("/productos"); // redirigir si no existe
          return;
        }

        setProducto({
          ...prod,
          precio: Number(prod.precio) || 0,
          precioOferta: prod.precio_oferta ? Number(prod.precio_oferta) : null,
          imagen_url: prod.imagen_url || prod.imagen || "",
        });

        // Cargar productos relacionados
        const catRes = await ProductService.getByCategory(prod.categoria);
        const relacionadosFiltrados = (catRes.data || [])
          .filter((p) => p.id !== prod.id)
          .slice(0, 8)
          .map((p) => ({
            ...p,
            precio: Number(p.precio) || 0,
            precioOferta: p.precio_oferta ? Number(p.precio_oferta) : null,
          }));

        setRelacionados(relacionadosFiltrados);
      } catch (error) {
        console.error("Error cargando producto:", error);
        navigate("/productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id, navigate]);

  if (loading) return <p className="p-4">Cargando producto...</p>;
  if (!producto) return <p className="p-4">Producto no encontrado.</p>;

  return (
    <>
      <Header />

      <div className="detalle-producto">
        <div className="detalle-producto-contenido">
          <img
            src={producto.imagen_url || "/img/placeholder.png"}
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
              onClick={() =>
                addToCart(
                  {
                    ...producto,
                    precio: producto.precio,
                    precioOferta: producto.precioOferta,
                    imagenURL: producto.imagen_url,
                  },
                  cantidad
                )
              }
              disabled={producto.stock === 0}
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
