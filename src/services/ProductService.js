// src/services/ProductService.js
import api from './AxiosConfig';

const API_URL = 'http://54.234.98.114:4003'; // o la IP que uses

class ProductService {
  getAll() {
    return api.get(`${API_URL}/productos`);
  }

  getByCategory(cat) {
    return api.get(`${API_URL}/productos/categoria/${encodeURIComponent(cat)}`);
  }

  getById(id) {
    return api.get(`${API_URL}/productos/${id}`);
  }

  create(obj) {
    const form = new FormData();
    Object.entries(obj).forEach(([k, v]) => {
      // sólo anexar valores definidos
      if (v !== null && v !== undefined) form.append(k, v);
    });

    // NO fijar Content-Type: dejar que el navegador lo ponga (incluye boundary)
    return api.post(`${API_URL}/productos`, form);
  }

  update(id, obj) {
    const form = new FormData();
    Object.entries(obj).forEach(([k, v]) => {
      if (v !== null && v !== undefined) form.append(k, v);
    });

    // NO fijar Content-Type
    return api.put(`${API_URL}/productos/${id}`, form);
  }

  delete(id) {
    return api.delete(`${API_URL}/productos/${id}`);
  }
}

export default new ProductService();


