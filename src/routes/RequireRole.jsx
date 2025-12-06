// src/routes/RequireRole.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UsuarioService from "../services/UsuarioService";

/**
 * Normaliza un rol a una forma canonical:
 * - "administrador" -> "admin"
 * - deja "vendedor" como "vendedor"
 * - todo lowercase y sin espacios
 */
function normalizeRole(r) {
  if (!r) return "";
  const s = String(r).toLowerCase().trim();
  if (s === "administrador" || s === "administrador(a)" || s === "administrador(a)") return "admin";
  if (s === "admin") return "admin";
  if (s === "vendedor" || s === "seller") return "vendedor";
  // otros alias que puedas usar:
  if (s === "cliente") return "cliente";
  // por defecto devuelve la cadena simplificada
  return s.replace(/\s+/g, "");
}

export default function RequireRole({ children, roles = [] }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const currentUser = UsuarioService.getCurrentUser();
      setUser(currentUser);
      setReady(true);
    };

    loadUser();

    const handler = (e) => loadUser();
    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);

  // Mientras verificamos el usuario, no renderizamos nada (evita redirecciones prematuras)
  if (!ready) return null;

  if (!user) {
    // no hay usuario -> ir a login
    return <Navigate to="/login" replace />;
  }

  const userRol = normalizeRole(user.tipo_usuario || user.tipoUsuario || "");
  const allowed = roles.map((r) => normalizeRole(r));

  if (!allowed.includes(userRol)) {
    // usuario sin permiso -> home
    return <Navigate to="/" replace />;
  }

  return children;
}
