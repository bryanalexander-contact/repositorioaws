// src/services/UsuarioService.js
import api from './AxiosConfig';

const BASE = 'http://54.234.15.47:4002/usuarios';

class AuthService {
  register(user) {
    return api.post(`${BASE}/register`, user);
  }

  // login guarda token y user (user devuelto por API)
  async login(correo, password) {
    const res = await api.post(`${BASE}/login`, { correo, password });
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
    }
    if (res.data?.user) {
      // Guardar user completo (compatibilidad)
      localStorage.setItem('userLogueado', JSON.stringify(res.data.user));
    }
    return res;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogueado');
  }
}

class UsuarioService {
  // requiere token (AxiosConfig ya envía Authorization)
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

  // HISTORIAL
  addCompra(userId, compra) {
    // compra: { numeroCompra, fecha, total, comprador, productos }
    return api.post(`${BASE}/${userId}/compras`, compra);
  }

  getCompras(userId) {
    return api.get(`${BASE}/${userId}/compras`);
  }

  clearCompras(userId) {
    return api.delete(`${BASE}/${userId}/compras`);
  }
}

export const Auth = new AuthService();
export default new UsuarioService();
