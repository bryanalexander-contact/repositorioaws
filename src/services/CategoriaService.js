import api from './AxiosConfig';

const BASE = 'http://54.234.98.114:4005/categorias';

class CategoriaService {
  // Obtener todas las categorías (id + nombre)
  getAll() {
    return api.get(BASE);
  }

  // Obtener SOLO los nombres (equivale a tu context inicial)
  getNombres() {
    return api.get(`${BASE}/nombres`);
  }

  // Crear categoría
  create(obj) {
    return api.post(BASE, obj);
  }

  // Editar categoría
  update(id, obj) {
    return api.put(`${BASE}/${id}`, obj);
  }

  // Eliminar categoría
  delete(id) {
    return api.delete(`${BASE}/${id}`);
  }

  // Insertar las categorías por defecto (Electrónica, Ropa, etc.)
  seed() {
    return api.post(`${BASE}/seed`);
  }
}

export default new CategoriaService();
