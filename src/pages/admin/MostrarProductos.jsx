import React from "react";
import { useProducts } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import "../../assets/css/admin/mostrar-productos.css";

function MostrarProductos() {
  const { productos, eliminarProducto } = useProducts();

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li><Link to="/admin/MostrarProductos" className="active">Mostrar Productos</Link></li>
          <li><Link to="/admin/NuevoProducto">Nuevo Producto</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Productos</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.categoria}</td>
                <td>
                  <Link to={`/admin/editar-producto/${p.id}`}>Editar</Link>{" | "}
                  <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default MostrarProductos;
