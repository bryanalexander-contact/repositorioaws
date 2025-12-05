import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/admin/mostrar-productos.css";

function MostrarProductos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const res = await ProductService.getAll();
      setProductos(res.data || []);
    } catch (err) {
      console.error("No se pudo cargar productos:", err);
      setProductos([]);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await ProductService.delete(id);
      setProductos((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li>
            <Link to="/admin/MostrarProductos" className="active">Mostrar Productos</Link>
          </li>
          <li>
            <Link to="/admin/NuevoProducto">Nuevo Producto</Link>
          </li>
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
            {productos.map((p) => {
              const precio = Number(p.precio) || 0;
              const precioOferta = p.precio_oferta !== null ? Number(p.precio_oferta) : null;
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>
                    {precioOferta && precioOferta < precio ? (
                      <>
                        <span style={{ textDecoration: "line-through", marginRight: 6 }}>
                          ${precio.toLocaleString()}
                        </span>
                        <strong style={{ color: "green" }}>
                          ${precioOferta.toLocaleString()}
                        </strong>
                      </>
                    ) : (
                      <span>${precio.toLocaleString()}</span>
                    )}
                  </td>
                  <td>{p.stock}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <Link to={`/admin/editar-producto/${p.id}`}>Editar</Link>{" | "}
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminar(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default MostrarProductos;
