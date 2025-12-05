// src/routes/RequireRole.jsx
import { Navigate } from "react-router-dom";
import UsuarioService from "../services/UsuarioService";

export default function RequireRole({ children, roles = [] }) {
  // Obtener user desde service (memoria). Esto evita localStorage.
  const user = UsuarioService.getCurrentUser?.();

  if (!user) return <Navigate to="/login" />;

  if (!roles.includes(user.tipo_usuario)) {
    return <Navigate to="/" />;
  }

  return children;
}
