// src/pages/admin/Categorias.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoriaService from "../../services/CategoriaService";
import "../../assets/css/admin/categorias.css";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [loading, setLoading] = useState(true);

  // cargar categorías desde la API
  const cargarCategorias = async () => {
    try {
      const res = await CategoriaService.getAll();
      setCategorias(res.data);
    } catch (err) {
      console.error("Error cargando categorías:", err);
      alert("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // agregar categoría
  const handleAgregar = async (e) => {
    e.preventDefault();
    const nombre = nuevaCategoria.trim();

    if (!nombre) return;

    try {
      await CategoriaService.create({ nombre });
      setNuevaCategoria("");
      cargarCategorias();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al crear categoría");
    }
  };

  // eliminar categoría
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría?")) return;

    try {
      await CategoriaService.delete(id);
      cargarCategorias();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar categoría");
    }
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

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="tabla-categorias">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(c.id)}
                    >
                      Eliminar
                    </button>
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
