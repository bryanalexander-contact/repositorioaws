// src/services/UsuarioService.js
import api from "./AxiosConfig";
import { setToken } from "./AuthToken";

const BASE = process.env.REACT_APP_API_USUARIOS || "http://52.90.132.27:4002/usuarios";

class UsuarioServiceClass {
  constructor() {
    const savedUser = localStorage.getItem("currentUser");
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;
  }

  setCurrentUser(user) {
    this.currentUser = user || null;

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }

    try {
      window.dispatchEvent(new CustomEvent("userChanged", { detail: this.currentUser }));
    } catch (e) {
      console.warn("userChanged event error:", e);
    }
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const saved = localStorage.getItem("currentUser");
      if (saved) this.currentUser = JSON.parse(saved);
    }
    return this.currentUser;
  }

  clearCurrentUser() {
    this.setCurrentUser(null);
  }

  // API methods
  getAll() {
    return api.get(`${BASE}`);
  }

  getById(id) {
    return api.get(`${BASE}/${id}`);
  }

  update(id, obj) {
    return api.put(`${BASE}/${id}`, obj);
  }

  delete(id) {
    return api.delete(`${BASE}/${id}`);
  }

  addCompra(userId, compra) {
    return api.post(`${BASE}/${userId}/compras`, compra);
  }

  getCompras(userId) {
    return api.get(`${BASE}/${userId}/compras`);
  }

  clearCompras(userId) {
    return api.delete(`${BASE}/${userId}/compras`);
  }
}

const UsuarioService = new UsuarioServiceClass();

class AuthService {
  constructor(usuarioService) {
    this.UsuarioService = usuarioService;
  }

  register(user) {
    const payload = {
      run: user.run || "",
      nombre: user.nombre || "",
      apellidos: user.apellidos || "",
      correo: user.correo || "",
      password: user.password || "",
      fechaNacimiento: user.fechaNacimiento || "",
      tipoUsuario: user.tipoUsuario || "cliente",
      direccion: user.direccion || "",
      region: user.region || "",
      comuna: user.comuna || "",
      departamento: user.departamento || "",
      indicacion: user.indicacion || "",
    };
    return api.post(`${BASE}/register`, payload);
  }

  // Login: guarda token en memoria (setToken) y user en UsuarioService
  async login(correo, password) {
    const res = await api.post(`${BASE}/login`, { correo, password });
    const token = res?.data?.token;
    const user = res?.data?.user || null;

    if (token) {
      setToken(token); // mantiene token en memoria para interceptor
      try {
        localStorage.setItem("authToken", token); // opcional: persistir token (si quieres implementar re-hydrate)
      } catch (e) {
        // ignore
      }
    }

    if (!user) throw new Error("Usuario no encontrado");

    this.UsuarioService.setCurrentUser(user);
    return res;
  }

  logout() {
    setToken(null);
    try {
      localStorage.removeItem("authToken");
    } catch (e) {}
    this.UsuarioService.clearCurrentUser();
  }
}

export const Auth = new AuthService(UsuarioService);
export default UsuarioService;
