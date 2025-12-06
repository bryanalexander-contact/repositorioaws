import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/organisms/SidebarAdmin";
import "../../assets/css/admin/index.css";

export default function PanelAdmin() {
  const navigate = useNavigate();

  const tarjetas = [
    { titulo: "Boletas", ruta: "/admin/boletas", icono: "🧾" },
    { titulo: "Categorías", ruta: "/admin/categorias", icono: "📦" },
    { titulo: "Usuarios", ruta: "/admin/panelusuarios", icono: "👥" },
    { titulo: "Reportes", ruta: "/admin/reportes", icono: "📊" },
    { titulo: "Perfil", ruta: "/admin/perfil", icono: "⚙️" },
    { titulo: "Productos", ruta: "/admin/panelproductos", icono: "🛒" },
    { titulo: "Nuevo Producto", ruta: "/admin/nuevoproducto", icono: "➕" },
    { titulo: "Ver Productos", ruta: "/admin/mostrarproductos", icono: "📋" },
  ];

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-content">
        <h1>Panel de Administración</h1>
        <p>Selecciona una opción para gestionar tu tienda.</p>

        <div className="tarjetas-grid">
          {tarjetas.map((t, i) => (
            <div key={i} className="tarjeta" onClick={() => navigate(t.ruta)}>
              <div className="tarjeta-icono">{t.icono}</div>
              <h3>{t.titulo}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
