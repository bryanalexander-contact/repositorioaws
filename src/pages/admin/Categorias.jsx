import React from "react";
import CategoriaForm from "../../components/CategoriaForm";
import ListaCategorias from "../../components/ListaCategorias";
import "../../assets/css/admin/categorias.css";

export default function CategoriasAdmin() {
  return (
    <div className="admin-container">
      <aside className="sidebar-admin">
        <h2>Panel Categorías</h2>
        <ul>
          <li><a href="/admin/categorias" className="active">Categorías</a></li>
          <li><a href="/admin/panelproductos">Productos</a></li>
          <li><a href="/admin/panelusuarios">Usuarios</a></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Gestión de Categorías</h1>

        <div className="form-agregar-container">
          <CategoriaForm />
        </div>

        <div className="lista-categorias">
          <ListaCategorias />
        </div>
      </main>
    </div>
  );
}
