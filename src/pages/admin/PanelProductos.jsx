import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/admin/productos.css";

function PanelProductos() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li><Link to="/admin/mostrarproductos">Mostrar Productos</Link></li>
          <li><Link to="/admin/nuevoproducto">Añadir Nuevo Producto</Link></li>
          <li><Link to="/admin/editarproducto">Editar Productos</Link></li>
          <li><Link to="/admin/productoscriticos">Listado de Productos Críticos</Link></li>
          <li><Link to="/admin/reporte-productos">Reporte Productos</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Bienvenido al Panel de Productos</h1>
        <p>Selecciona una opción en el menú de la izquierda para administrar los productos.</p>
      </main>
    </div>
  );
}

export default PanelProductos;
