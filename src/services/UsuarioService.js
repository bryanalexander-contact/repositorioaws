import api from "./AxiosConfig";
import { setToken } from "./AuthToken";

const BASE = "http://3.80.84.147:4002/usuarios";

class UsuarioServiceClass {
  constructor() {
    // Recuperar usuario desde localStorage si existe
    const savedUser = localStorage.getItem("currentUser");
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;
  }

  /**
   * Guarda el usuario actual en memoria y localStorage
   * @param {Object|null} user 
   */
  setCurrentUser(user) {
    this.currentUser = user || null;

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }

    // Dispara evento global para sincronizar Header y otros componentes
    try {
      window.dispatchEvent(
        new CustomEvent("userChanged", { detail: this.currentUser })
      );
    } catch (e) {
      console.warn("userChanged event error:", e);
    }
  }

  /**
   * Obtiene el usuario actual desde memoria o localStorage
   * @returns {Object|null}
   */
  getCurrentUser() {
    if (!this.currentUser) {
      const saved = localStorage.getItem("currentUser");
      if (saved) this.currentUser = JSON.parse(saved);
    }
    return this.currentUser;
  }

  /**
   * Borra el usuario actual
   */
  clearCurrentUser() {
    this.setCurrentUser(null);
  }

  // =================== MÉTODOS API ===================
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

  /**
   * Registro de usuario
   */
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

  /**
   * Login mediante API
   * Guarda token y usuario en localStorage
   */
  async login(correo, password) {
    const res = await api.post(`${BASE}/login`, { correo, password });
    const token = res?.data?.token;
    const user = res?.data?.user || null;

    if (token) setToken(token);

    if (!user) throw new Error("Usuario no encontrado");

    this.UsuarioService.setCurrentUser(user); // Memoria + localStorage
    return res;
  }

  /**
   * Logout: borra token y usuario
   */
  logout() {
    setToken(null);
    this.UsuarioService.clearCurrentUser();
  }
}

export const Auth = new AuthService(UsuarioService);
export default UsuarioService;
