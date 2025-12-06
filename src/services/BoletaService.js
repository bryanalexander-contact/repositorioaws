import api from './AxiosConfig';

const BASE_BOLETAS = 'http://3.80.84.147:4006/boletas';
const BASE_DETALLE = 'http://54.234.98.114:4004/detalle';

class BoletaService {

  // ============================================
  //                BOLETAS
  // ============================================

  // Obtener todas las boletas (admin)
  getAll() {
    return api.get(BASE_BOLETAS);
  }

  // Obtener boletas por usuario
  getByUser(userId) {
    return api.get(`${BASE_BOLETAS}/${userId}`);
  }

  // Obtener boleta por número de compra
  getByNumero(numero) {
    return api.get(`${BASE_BOLETAS}/numero/${numero}`);
  }

  // Crear boleta (con productos incluidos)
  create(data) {
    // data: { comprador, productos: [], total, user_id }
    return api.post(BASE_BOLETAS, data);
  }

  // Borrar boletas de un usuario
  deleteByUser(userId) {
    return api.delete(`${BASE_BOLETAS}/${userId}`);
  }


  // ============================================
  //            DETALLE DE BOLETA
  // ============================================

  // Obtener detalle por número de compra
  getDetalle(numeroCompra) {
    return api.get(`${BASE_DETALLE}/${numeroCompra}`);
  }
}

export default new BoletaService();
