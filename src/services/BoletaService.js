// src/services/BoletaService.js
import api from "./AxiosConfig";

const BASE_BOLETAS = "http://54.167.28.38:4006/boletas";
const BASE_DETALLE = "http://54.167.28.38:4004/detalle";

function safeParseJsonIfString(v) {
  if (v === null || v === undefined) return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  return v;
}

function normalizeRow(row = {}) {
  const comprador = safeParseJsonIfString(row.comprador) || {};
  const productos = safeParseJsonIfString(row.productos) || [];
  const total = row.total !== undefined && row.total !== null ? Number(row.total) : 0;
  const numero_compra = row.numero_compra ?? null;
  return {
    ...row,
    comprador,
    productos,
    total,
    numero_compra,
  };
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(normalizeRow);
}

class BoletaService {
  // Obtener todas las boletas (admin/testing)
  // Devuelve una estructura similar a axios: { data: [ ... ] }
  getAll() {
    return api
      .get(BASE_BOLETAS)
      .then((res) => ({ data: normalizeRows(res.data) }))
      .catch((err) => {
        // propaga error con más contexto
        return Promise.reject(err);
      });
  }

  // Obtener boletas por usuario (userId puede ser string o number)
  // Si userId no viene, devolvemos { data: [] } para que el frontend lo maneje.
  getByUser(userId) {
    if (userId === undefined || userId === null || userId === "") {
      return Promise.resolve({ data: [] });
    }
    const id = Number(userId);
    const safeId = Number.isNaN(id) ? encodeURIComponent(String(userId)) : id;
    return api
      .get(`${BASE_BOLETAS}/${safeId}`)
      .then((res) => ({ data: normalizeRows(res.data) }))
      .catch((err) => Promise.reject(err));
  }

  // Obtener boleta por número de compra
  getByNumero(numero) {
    if (numero === undefined || numero === null || numero === "") {
      return Promise.reject(new Error("Número de compra requerido"));
    }
    return api
      .get(`${BASE_BOLETAS}/numero/${encodeURIComponent(String(numero))}`)
      .then((res) => ({ data: normalizeRow(res.data) }))
      .catch((err) => Promise.reject(err));
  }

  // Crear boleta
  create(data) {
    if (!data || typeof data !== "object") {
      return Promise.reject(new Error("Payload inválido"));
    }
    const payload = { ...data };

    if (!payload.productos || !Array.isArray(payload.productos) || payload.productos.length === 0) {
      return Promise.reject(new Error("Productos requeridos (array no vacío)"));
    }
    if (!payload.comprador || !payload.comprador.nombre || !payload.comprador.correo) {
      return Promise.reject(new Error("Datos del comprador requeridos (nombre y correo)"));
    }

    // Normalizar user_id
    if (payload.user_id !== undefined && payload.user_id !== null) {
      const n = Number(payload.user_id);
      payload.user_id = Number.isNaN(n) ? null : n;
    } else {
      payload.user_id = null;
    }

    // Normalizar numero_compra si viene
    if (payload.numero_compra !== undefined && payload.numero_compra !== null) {
      const nc = Number(payload.numero_compra);
      if (!Number.isNaN(nc)) payload.numero_compra = nc;
      else delete payload.numero_compra;
    }

    // Fecha ISO o ahora
    if (!payload.fecha) {
      payload.fecha = new Date().toISOString();
    } else {
      try {
        const d = new Date(payload.fecha);
        if (!Number.isNaN(d.getTime())) payload.fecha = d.toISOString();
      } catch (e) {}
    }

    payload.total = payload.total !== undefined ? Number(payload.total) || 0 : 0;

    // Post a la API (dejamos que el servidor maneje jsonb)
    return api
      .post(BASE_BOLETAS, payload)
      .then((res) => ({ data: normalizeRow(res.data) }))
      .catch((err) => Promise.reject(err));
  }

  // Borrar boletas de un usuario
  deleteByUser(userId) {
    const id = Number(userId);
    const safeId = Number.isNaN(id) ? encodeURIComponent(String(userId)) : id;
    return api.delete(`${BASE_BOLETAS}/${safeId}`);
  }

  // Obtener detalle por número de compra (usa la API detalle)
  getDetalle(numeroCompra) {
    if (numeroCompra === undefined || numeroCompra === null || numeroCompra === "") {
      return Promise.reject(new Error("Número de compra requerido"));
    }
    return api
      .get(`${BASE_DETALLE}/${encodeURIComponent(String(numeroCompra))}`)
      .then((res) => ({ data: normalizeRow(res.data) }))
      .catch((err) => Promise.reject(err));
  }

  // Helper: construir payload desde carrito
  buildPayloadFromCart({ carrito = [], comprador = {}, userId = null, numero_compra = undefined }) {
    const productos = carrito.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad || 1,
      precio: p.precio !== undefined ? Number(p.precio) || 0 : 0,
      precioOferta:
        p.precioOferta !== undefined ? (p.precioOferta === null ? null : Number(p.precioOferta) || null) : null,
      imagen: p.imagen || p.imagenURL || "",
    }));

    const total = productos.reduce((acc, it) => {
      const precio = it.precioOferta && it.precioOferta < it.precio ? it.precioOferta : it.precio;
      return acc + precio * (it.cantidad || 1);
    }, 0);

    return {
      numero_compra,
      fecha: new Date().toISOString(),
      comprador,
      productos,
      total,
      user_id: userId !== undefined && userId !== null ? Number(userId) : null,
    };
  }
}

export default new BoletaService();
