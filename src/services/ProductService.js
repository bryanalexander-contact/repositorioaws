// src/services/ProductService.js
import api from "./AxiosConfig";

const API_URL = process.env.REACT_APP_API_PRODUCTOS || "http://13.218.87.235:4003";

class ProductService {
  // GET /productos
  getAll() {
    return api.get(`${API_URL}/productos`);
  }

  // La API que tienes ahora no expone /productos/categoria/:cat
  // Por eso hacemos fetch de todos y filtramos cliente-side.
  // Para datasets grandes deberías crear la ruta en el backend.
  async getByCategory(cat) {
    if (!cat) return this.getAll();
    const res = await api.get(`${API_URL}/productos`);
    const items = res.data || [];
    return { data: items.filter((p) => (p.categoria || "").toString().toLowerCase() === cat.toString().toLowerCase()) };
  }

  // GET /productos/:id
  getById(id) {
    return api.get(`${API_URL}/productos/${id}`);
  }

  // create: acepta FormData o un objeto plano.
  // Si recibe un objeto plano lo transforma a FormData.
  create(payload) {
    if (payload instanceof FormData) {
      return api.post(`${API_URL}/productos`, payload);
    }

    const fd = new FormData();
    Object.entries(payload || {}).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      // Si es un File lo agregamos tal cual
      if (v instanceof File) fd.append(k, v);
      else fd.append(k, String(v));
    });

    return api.post(`${API_URL}/productos`, fd);
  }

  // update: similar a create
  update(id, payload) {
    if (payload instanceof FormData) {
      return api.put(`${API_URL}/productos/${id}`, payload);
    }

    const fd = new FormData();
    Object.entries(payload || {}).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (v instanceof File) fd.append(k, v);
      else fd.append(k, String(v));
    });

    return api.put(`${API_URL}/productos/${id}`, fd);
  }

  // delete
  delete(id) {
    return api.delete(`${API_URL}/productos/${id}`);
  }
}

export default new ProductService();
