// src/pages/admin/HistorialCompras.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import "../../assets/css/admin/mostrar-usuarios.css";

function HistorialCompras() {
  const { id } = useParams();
  const [historial, setHistorial] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [uRes, hRes] = await Promise.all([
          UsuarioService.getById(id),
          UsuarioService.getCompras(id),
        ]);
        if (!mounted) return;
        setUsuario(uRes.data);
        setHistorial(hRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Cargando historial...</p>;
  if (!usuario) return <p style={{ padding: 20 }}>Usuario no encontrado.</p>;

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
                <tr key={c.numeroCompra || JSON.stringify(c)}>
                  <td>{c.numeroCompra}</td>
                  <td>{new Date(c.fecha).toLocaleString()}</td>
                  <td>${c.total?.toLocaleString?.() ?? c.total}</td>
                  <td>
                    {c.productos?.map(p => (
                      <div key={p.id || `${p.nombre}-${Math.random()}`}>
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
