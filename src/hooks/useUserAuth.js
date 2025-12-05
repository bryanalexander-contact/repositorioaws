// src/hooks/useUserAuth.js
import { useEffect, useState } from "react";
import UsuarioService, { Auth } from "../services/UsuarioService";

/**
 * useUserAuth
 * - mantiene el user actual (sin Context).
 * - expone funciones: login, logout, register, updateUser, refreshUserFromStorage.
 */
export default function useUserAuth() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userLogueado"));
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // sincronizar si alguien modificó localStorage externamente
    const onStorage = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("userLogueado")));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async (correo, password) => {
    setLoading(true);
    try {
      const res = await Auth.login(correo, password);
      // Auth.login already writes token + user to localStorage
      const u = res.data?.user || JSON.parse(localStorage.getItem("userLogueado"));
      setUser(u || null);
      return { ok: true, data: res.data };
    } catch (err) {
      return { ok: false, error: err.response?.data || err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
  };

  const register = async (userPayload) => {
    setLoading(true);
    try {
      const res = await Auth.register(userPayload);
      if (res.data?.user) {
        // keep semantics similar to old context: auto-login on register
        localStorage.setItem("userLogueado", JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
      return { ok: true, data: res.data };
    } catch (err) {
      return { ok: false, error: err.response?.data || err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, datos) => {
    setLoading(true);
    try {
      const res = await UsuarioService.update(id, datos);
      // API returns { ok: true, user: ... } from your index_usuarios
      const updated = res.data?.user || res.data;
      if (user?.id === Number(id)) {
        localStorage.setItem("userLogueado", JSON.stringify(updated));
        setUser(updated);
      }
      return { ok: true, data: updated };
    } catch (err) {
      return { ok: false, error: err.response?.data || err.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshUserFromStorage = () => {
    try {
      setUser(JSON.parse(localStorage.getItem("userLogueado")));
    } catch {
      setUser(null);
    }
  };

  return {
    user,
    setUser,
    loading,
    login,
    logout,
    register,
    updateUser,
    refreshUserFromStorage,
    UsuarioService, // export service for direct calls (getAll, getCompras, etc.)
  };
}
