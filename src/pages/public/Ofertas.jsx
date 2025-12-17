// src/pages/Ofertas.jsx
import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/ofertas.css";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { ProductsContext } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/molecules/ProductCard";
import ProductService from "../../services/ProductService";
import UsuarioService from "../../services/UsuarioService";

export default function Ofertas() {
  const productosContext = useContext(ProductsContext);
  // productosEnOferta puede venir del context (si está) o lo cargamos aquí
  const productosEnOfertaCtx = productosContext?.productosEnOferta;
  const { addToCart } = useCart();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedIds, setAddedIds] = useState([]); // para feedback visual
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // cargar user si existe (opcional, para mostrar quién está logueado)
    try {
      const u = UsuarioService.getCurrentUser();
      if (u) setUsuario(u);
    } catch (e) {
      setUsuario(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const normalize = (p) => ({
      ...p,
      precio: Number(p.precio ?? p.price ?? 0) || 0,
      precioOferta:
        p.precio_oferta !== undefined
          ? p.precio_oferta === null
            ? null
            : Number(p.precio_oferta)
          : p.precioOferta !== undefined
          ? p.precioOferta
          : null,
      imagen_url: p.imagen_url || p.imagen || p.imagenURL || p.imagen_url || "",
    });

    const loadFromContext = () => {
      if (Array.isArray(productosEnOfertaCtx) && productosEnOfertaCtx.length > 0) {
        const normalized = productosEnOfertaCtx.map(normalize);
        if (mounted) {
          setProductos(normalized);
          setLoading(false);
        }
        return true;
      }
      return false;
    };

    const fetchAndFilter = async () => {
      try {
        const res = await ProductService.getAll();
        const items = res?.data || [];
        // criterios: tiene precio de oferta no nulo o campo precio_oferta o flag 'oferta' true
        const ofertas = items.filter((it) => {
          const po =
            it.precio_oferta !== undefined
              ? it.precio_oferta
              : it.precioOferta !== undefined
              ? it.precioOferta
              : null;
          const hasOfertaFlag = it.oferta === true || it.onSale === true || it.en_oferta === true;
          return (po !== null && po !== undefined && po !== "") || hasOfertaFlag;
        });
        const normalized = ofertas.map(normalize);
        if (mounted) {
          setProductos(normalized);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error cargando productos (Ofertas):", err);
        if (mounted) {
          setError("No se pudieron cargar las ofertas. Revisa la API de productos.");
          setLoading(false);
        }
      }
    };

    // Primero intentar leer del context si está poblado
    const usedContext = loadFromContext();
    if (!usedContext) {
      fetchAndFilter();
    }

    return () => {
      mounted = false;
    };
  }, [productosEnOfertaCtx]);

  const handleAdd = (producto) => {
    // Normalizamos objeto que el carrito espera
    const p = {
      id: producto.id,
      nombre: producto.nombre || producto.title || producto.name || "Producto",
      precio: producto.precio || 0,
      precioOferta:
        producto.precioOferta !== undefined
          ? producto.precioOferta
          : producto.precio_oferta !== undefined
          ? producto.precio_oferta
          : null,
      imagen: producto.imagen || producto.imagen_url || producto.imagenURL || "",
      cantidad: 1,
      // Mantener cualquier otro campo útil
    };

    try {
      addToCart(p, 1);
      // feedback visual: marcar como agregado temporalmente
      setAddedIds((prev) => [...prev, p.id]);
      setTimeout(() => setAddedIds((prev) => prev.filter((i) => i !== p.id)), 1500);
    } catch (err) {
      console.error("Error añadiendo al carrito:", err);
      alert("No se pudo añadir el producto al carrito. Revisa la consola.");
    }
  };

  return (
    <>
      <Header />

      <main className="ofertas-page">
        <section className="ofertas-container">
          <h1>Productos en Oferta</h1>

          {usuario && (
            <div style={{ marginBottom: 12 }}>
              <small>
                Compra como: <strong>{usuario.nombre}</strong> ({usuario.correo})
              </small>
            </div>
          )}

          {loading && <p>Cargando ofertas...</p>}
          {error && (
            <div style={{ background: "#fdecea", padding: 10, borderRadius: 6, marginBottom: 12 }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="ofertas-grid">
            {!loading && productos.length === 0 && (
              <p className="sin-ofertas">No hay productos en oferta por el momento.</p>
            )}

            {productos.map((p) => {
              // asegurar id y normalización final
              const productoNormalizado = {
                ...p,
                precio: Number(p.precio) || 0,
                precioOferta:
                  p.precio_oferta !== null && p.precio_oferta !== undefined
                    ? Number(p.precio_oferta)
                    : p.precioOferta !== null && p.precioOferta !== undefined
                    ? Number(p.precioOferta)
                    : null,
                imagen_url: p.imagen_url || p.imagen || "",
              };

              const isAdded = addedIds.includes(productoNormalizado.id);

              return (
                <div key={productoNormalizado.id} className="col-producto">
                  <ProductCard
                    producto={productoNormalizado}
                    onAdd={() => handleAdd(productoNormalizado)}
                    added={isAdded}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
