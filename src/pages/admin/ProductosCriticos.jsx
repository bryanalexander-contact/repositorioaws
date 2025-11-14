import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import "../../assets/css/admin/productos.css";

export default function ProductosCriticos() {
  const { productos } = useProducts();

  // 🔹 Definir el umbral crítico (puedes ajustar)
  const UMBRAL_CRITICO = 5;

  // 🔹 Filtrar productos con bajo stock
  const productosCriticos = productos.filter(
    (p) => Number(p.stock) <= UMBRAL_CRITICO
  );

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li>
            <Link to="/admin/MostrarProductos">Mostrar Productos</Link>
          </li>
          <li>
            <Link to="/admin/NuevoProducto">Añadir Nuevo Producto</Link>
          </li>
          <li>
            <Link to="/admin/EditarProducto">Editar Productos</Link>
          </li>
          <li>
            <Link to="/admin/ProductosCriticos" className="activo">
              Productos Críticos ⚠️
            </Link>
          </li>
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
              {productosCriticos.map((p) => (
                <tr key={p.id} className={p.stock === 0 ? "sin-stock" : ""}>
                  <td>{p.id}</td>
                  <td>
                    <img
                      src={p.imagen || "/no-image.png"}
                      alt={p.nombre}
                      style={{ width: "60px", borderRadius: "8px" }}
                    />
                  </td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <strong
                      style={{
                        color: p.stock === 0 ? "red" : "orange",
                      }}
                    >
                      {p.stock}
                    </strong>
                  </td>
                  <td>${p.precio?.toLocaleString()}</td>
                  <td>
                    {p.enOferta ? (
                      <span className="oferta">
                        ${p.precioOferta?.toLocaleString()}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
