// src/pages/public/CompraExitosa.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { useCart } from "../../context/CartContext";
import BoletaService from "../../services/BoletaService";
import "../../assets/css/checkout.css";

export default function CompraExitosa() {
  const { clearCart, carrito, total: totalContext, datosCheckout } = useCart();
  const location = useLocation();
  const { total: totalFromState, comprador: compradorFromState } = location.state || {};

  const total = totalFromState ?? totalContext;
  const compradorInicial = compradorFromState ?? datosCheckout ?? {};

  const [numeroCompra, setNumeroCompra] = useState(0);
  const [productos, setProductos] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const productosReducidos = (carrito || []).map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad,
      precio: p.precio,
      precioOferta: p.precioOferta,
      imagen: p.imagenURL || p.imagen || p.imagen_url || "",
    }));

    setProductos(productosReducidos);

    const payload = BoletaService.buildPayloadFromCart({
      carrito: productosReducidos,
      comprador: compradorInicial,
      userId: (() => {
        // intentar extraer user id de localStorage (compatibilidad)
        try {
          const cu = JSON.parse(localStorage.getItem("currentUser") || localStorage.getItem("userLogueado") || "{}");
          return cu?.id ?? null;
        } catch { return null; }
      })(),
    });

    (async () => {
      try {
        const res = await BoletaService.create(payload);
        const creado = res?.data || res;
        const num = creado?.numero_compra ?? creado?.numeroCompra ?? creado?.id ?? 0;
        setNumeroCompra(num || 0);
      } catch (err) {
        console.warn("Error creando boleta en API:", err);
        setApiError(err?.response?.data?.message || err?.message || "Error al crear boleta en servidor");
        // fallback local: guardar en historialCompras (compatibilidad con tu app previa)
        try {
          const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
          const nuevoNumero = historial.length + 1;
          const nuevaCompraLocal = {
            numeroCompra: nuevoNumero,
            fecha: new Date().toISOString(),
            comprador: compradorInicial,
            productos: productosReducidos,
            total,
            userId: payload.user_id ?? null,
          };
          localStorage.setItem("historialCompras", JSON.stringify([...historial, nuevaCompraLocal]));
          setNumeroCompra(nuevoNumero);
        } catch (e) {
          console.error("Error fallback local:", e);
        }
      } finally {
        clearCart();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ejecutar solo al montar

  if (!compradorInicial || Object.keys(compradorInicial).length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>No hay información de compra.</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="text-center mb-4">
          <h2 className="text-success fw-bold">✅ ¡Compra realizada con éxito!</h2>
          <p className="text-muted">
            Gracias por tu compra, {compradorInicial.nombre || "cliente"}. A continuación, los detalles de tu pedido:
          </p>
          {apiError && <p className="text-warning">⚠️ {apiError} (se guardó localmente)</p>}
        </div>

        <div className="border rounded shadow-sm p-4 mb-4 bg-light">
          <h5 className="fw-bold mb-3">
            🧾 N° de Compra:{" "}
            <span className="text-primary">#{String(numeroCompra).padStart(4, "0")}</span>
          </h5>

          <div className="mb-4">
            <h6 className="fw-bold border-bottom pb-2">Datos del Comprador</h6>
            <div className="row">
              <div className="col-md-6"><strong>Nombre:</strong> {compradorInicial.nombre} {compradorInicial.apellidos}</div>
              <div className="col-md-6"><strong>Correo:</strong> {compradorInicial.correo}</div>
              <div className="col-md-6"><strong>Dirección:</strong> {compradorInicial.direccion}</div>
              {compradorInicial.departamento && <div className="col-md-6"><strong>Departamento:</strong> {compradorInicial.departamento}</div>}
              <div className="col-md-6"><strong>Región:</strong> {compradorInicial.region}</div>
              <div className="col-md-6"><strong>Comuna:</strong> {compradorInicial.comuna}</div>
              {compradorInicial.indicacion && <div className="col-12"><strong>Indicaciones:</strong> {compradorInicial.indicacion}</div>}
            </div>
          </div>

          <div>
            <h6 className="fw-bold border-bottom pb-2">Productos Comprados</h6>
            <div className="checkout-products mt-3">
              <div className="cart-header">
                <div>Imagen</div>
                <div>Nombre</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Subtotal</div>
              </div>

              {productos.length > 0 ? (
                productos.map((item) => {
                  const precio = item.precioOferta && item.precioOferta < item.precio ? item.precioOferta : item.precio;
                  return (
                    <div key={item.id} className="cart-item">
                      <div>
                        <img src={item.imagen || "/img/placeholder.png"} alt={item.nombre} className="producto-imagen"/>
                      </div>
                      <div className="nombre">{item.nombre}</div>
                      <div className="precio">${precio.toLocaleString()}</div>
                      <div className="cantidad">{item.cantidad}</div>
                      <div className="subtotal">${(precio * item.cantidad).toLocaleString()}</div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted mt-3">No se encontraron productos.</p>
              )}
            </div>

            <div className="text-center mt-4">
              <h4 className="fw-bold">💰 Total Pagado: <span className="text-success">${(total || 0).toLocaleString()}</span></h4>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-danger px-4">🖨️ Imprimir PDF</button>
            <button className="btn btn-primary px-4">📧 Enviar por correo</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
