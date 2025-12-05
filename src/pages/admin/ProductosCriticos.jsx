import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import "../../assets/css/admin/productos.css";

export default function ProductosCriticos() {
  const [productos, setProductos] = useState([]);
  const UMBRAL_CRITICO_DEFAULT = 5;

  useEffect(() => {
    ProductService.getAll()
      .then(r => setProductos(r.data || []))
      .catch(err => {
        console.error("Error cargando productos:", err);
        setProductos([]);
      });
  }, []);

  const productosCriticos = productos.filter(p => {
    const stock = Number(p.stock) || 0;
    const umbral = p.stock_critico !== null && p.stock_critico !== undefined ? Number(p.stock_critico) : UMBRAL_CRITICO_DEFAULT;
    return stock <= umbral;
  });

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li><Link to="/admin/MostrarProductos">Mostrar Productos</Link></li>
          <li><Link to="/admin/NuevoProducto">Añadir Nuevo Producto</Link></li>
          <li><Link to="/admin/EditarProducto">Editar Productos</Link></li>
          <li><Link to="/admin/ProductosCriticos" className="activo">Productos Críticos ⚠️</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>📉 Productos Críticos</h1>

        {productosCriticos.length === 0 ? (
          <p className="sin-productos">✅ No hay productos críticos por ahora.</p>
        ) : (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Oferta</th>
              </tr>
            </thead>
            <tbody>
              {productosCriticos.map((p) => {
                const precio = Number(p.precio) || 0;
                const precioOferta = p.precio_oferta !== null ? Number(p.precio_oferta) : null;
                return (
                  <tr key={p.id} className={Number(p.stock) === 0 ? "sin-stock" : ""}>
                    <td>{p.id}</td>
                    <td>
                      <img
                        src={p.imagen_url || "/no-image.png"}
                        alt={p.nombre}
                        style={{ width: "60px", borderRadius: "8px" }}
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td><strong style={{ color: Number(p.stock) === 0 ? "red" : "orange" }}>{p.stock}</strong></td>
                    <td>${precio.toLocaleString()}</td>
                    <td>{precioOferta ? `$${precioOferta.toLocaleString()}` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
