// src/pages/admin/HistorialCompras.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/admin/mostrar-usuarios.css";

function HistorialCompras() {
  const { id } = useParams();
  const { usuarios } = useUsers();

  const usuario = usuarios.find(u => u.id === parseInt(id));

  if (!usuario) return <p style={{ padding: "20px" }}>Usuario no encontrado.</p>;

  const historial = usuario.historialCompras || [];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Historial de Compras</h2>
        <ul>
          <li><Link to="/admin/MostrarUsuarios">Volver a Usuarios</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Historial de Compras de {usuario.nombre}</h1>
        {historial.length === 0 ? (
          <p>No hay compras registradas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Número Compra</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
              {historial.map(c => (
                <tr key={c.numeroCompra}>
                  <td>{c.numeroCompra}</td>
                  <td>{new Date(c.fecha).toLocaleString()}</td>
                  <td>${c.total}</td>
                  <td>
                    {c.productos.map(p => (
                      <div key={p.id}>
                        {p.nombre} x{p.cantidad} (${p.precio})
                      </div>
                    ))}
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

export default HistorialCompras;
