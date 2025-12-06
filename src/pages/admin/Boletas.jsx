// src/pages/admin/Boletas.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BoletaService from "../../services/BoletaService";
import UsuarioService from "../../services/UsuarioService";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import "../../assets/css/admin/boletas.css";

/* helpers */
function safeParseJson(v) {
  if (v === null || v === undefined) return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  return v;
}
function resolveUserId(u) {
  if (!u) return null;
  return u.id ?? u.userId ?? (u.usuario && u.usuario.id) ?? u._id ?? null;
}
function resolveUserRole(u) {
  if (!u) return null;
  return (
    (u.rol ?? u.role ?? u.tipoUsuario ?? u.tipo_usuario ?? "").toString().toLowerCase() ||
    null
  );
}
function isAdminOrSeller(roleStr) {
  if (!roleStr) return false;
  const r = roleStr.toLowerCase();
  return ["admin", "administrator", "superadmin", "vendedor", "seller"].includes(r);
}

export default function Boletas() {
  const navigate = useNavigate();
  const [boletas, setBoletas] = useState([]);
  const [user, setUser] = useState(() => UsuarioService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBoletas = useCallback(
    async (u) => {
      setError(null);
      setLoading(true);

      try {
        const role = resolveUserRole(u);

        if (isAdminOrSeller(role)) {
          // carga TODAS las boletas para admin/vendedor
          const res = await BoletaService.getAll();
          const rows = Array.isArray(res?.data) ? res.data : [];
          const normalized = rows.map((r) => ({
            ...r,
            comprador: safeParseJson(r.comprador) || {},
            productos: safeParseJson(r.productos) || [],
            total: r.total !== undefined && r.total !== null ? Number(r.total) : 0,
            numero_compra: r.numero_compra ?? null,
          }));
          setBoletas(normalized);
          return;
        }

        // usuarios normales: filtrar por su id (seguridad: panel no debería permitirlos)
        const uid = resolveUserId(u);
        if (!uid) {
          setBoletas([]);
          return;
        }
        const res = await BoletaService.getByUser(uid);
        const rows = Array.isArray(res?.data) ? res.data : [];
        const normalized = rows.map((r) => ({
          ...r,
          comprador: safeParseJson(r.comprador) || {},
          productos: safeParseJson(r.productos) || [],
          total: r.total !== undefined && r.total !== null ? Number(r.total) : 0,
          numero_compra: r.numero_compra ?? null,
        }));
        setBoletas(normalized);
      } catch (err) {
        console.error("Error cargando boletas:", err);
        setBoletas([]);
        if (err?.response?.data?.message) setError(err.response.data.message);
        else if (err?.message) setError(err.message);
        else setError("Error cargando boletas");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const current = UsuarioService.getCurrentUser();
    setUser(current);
    fetchBoletas(current);

    const handler = (ev) => {
      const newUser = ev?.detail || UsuarioService.getCurrentUser();
      setUser(newUser);
      fetchBoletas(newUser);
    };
    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, [fetchBoletas]);

  if (!user)
    return (
      <>
        <Header />
        <div className="boletas-container">
          <h2>Debes iniciar sesión para ver tus boletas.</h2>
        </div>
        <Footer />
      </>
    );

  const limpiarBoletas = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar todas las boletas?")) return;
    try {
      await BoletaService.deleteByUser(resolveUserId(user));
      setBoletas([]);
      alert("Boletas eliminadas.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar boletas.");
    }
  };

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatearDinero = (monto) =>
    monto?.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const irADetalleBoleta = (b) => {
    const id = b?.id ?? b?.numero_compra ?? b;
    navigate(`/detalle-boleta/${id}`);
  };

  return (
    <>
      <Header />
      <div className="boletas-container">
        <div className="boletas-header">
          <h2>📜 Historial de Boletas</h2>
          {boletas.length > 0 && (
            <button className="btn-limpiar" onClick={limpiarBoletas}>
              🗑️ Limpiar boletas
            </button>
          )}
        </div>

        {loading ? (
          <p>Cargando boletas...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : boletas.length > 0 ? (
          <div className="boletas-lista">
            {boletas.map((b) => (
              <div key={b.id} className="boleta-card" onClick={() => irADetalleBoleta(b)} style={{ cursor: "pointer" }}>
                <h3>Boleta N° {b.numero_compra ?? b.id}</h3>
                <p>
                  <strong>Fecha:</strong> {formatearFecha(b.fecha)}
                </p>
                <p>
                  <strong>Total:</strong> {formatearDinero(b.total)}
                </p>
                <p>
                  <strong>Comprador:</strong> {b.comprador?.nombre || "Desconocido"}
                </p>

                <ul>
                  {Array.isArray(b.productos) && b.productos.length > 0 ? (
                    b.productos.map((p, i) => (
                      <li key={i}>
                        {p.nombre} × {p.cantidad} — {formatearDinero(p.precio)}
                      </li>
                    ))
                  ) : (
                    <li>No hay productos</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-boletas">No hay boletas registradas aún.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
