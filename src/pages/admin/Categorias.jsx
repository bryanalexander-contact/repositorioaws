import React, { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import "../../assets/css/admin/categorias.css";

export default function CategoriasAdmin() {
  const { categorias, productos, agregarCategoria, eliminarCategoria } =
    useProducts();

  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const handleAgregar = (e) => {
    e.preventDefault();
    const cat = nuevaCategoria.trim();
    if (!cat) return;
    if (categorias.includes(cat)) {
      alert("La categoría ya existe");
      return;
    }
    agregarCategoria(cat);
    setNuevaCategoria("");
  };

  const handleEliminar = (cat) => {
    const productosAsociados = productos.filter((p) => p.categoria === cat);
    if (productosAsociados.length > 0) {
      if (
        !window.confirm(
          `Existen productos en esta categoría. ¿Deseas eliminarla igual?`
        )
      )
        return;
    }
    eliminarCategoria(cat);
  };

  return (
    <div className="admin-container">
      <aside className="sidebar-admin">
        <h2>Panel Categorías</h2>
        <ul>
          <li>
            <Link to="/admin/categorias" className="active">Categorías</Link>
          </li>
          <li>
            <Link to="/admin/panelproductos">Productos</Link>
          </li>
          <li>
            <Link to="/admin/panelusuarios">Usuarios</Link>
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Gestión de Categorías</h1>

        <div className="form-agregar-container">
          <form onSubmit={handleAgregar} className="form-agregar-categoria">
            <input
              type="text"
              placeholder="Nueva categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              required
            />
            <button type="submit">Agregar</button>
          </form>
        </div>

        <table className="tabla-categorias">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat, i) => (
              <tr key={i}>
                <td>{cat}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(cat)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
