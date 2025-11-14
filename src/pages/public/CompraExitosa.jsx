// src/pages/public/CompraExitosa.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import { useCart } from "../../context/CartContext";
import { useUsers } from "../../context/UsersContext";
import "../../assets/css/checkout.css";

export default function CompraExitosa() {
  const { clearCart, carrito } = useCart();
  const { user, registrarCompra } = useUsers();
  const location = useLocation();
  const { total, comprador } = location.state || {};
  const [numeroCompra, setNumeroCompra] = useState(0);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosReducidos = carrito.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad,
      precio: p.precio,
      precioOferta: p.precioOferta,
      imagen: p.imagenURL || "", // nunca File/Base64
    }));

    setProductos(productosReducidos);

    const nuevaCompra = {
      fecha: new Date().toLocaleString(),
      comprador: comprador || {},
      productos: productosReducidos,
      total,
      userId: user?.id || null,
    };

    const num = registrarCompra(nuevaCompra);
    setNumeroCompra(num);

    clearCart();
  }, []);

  if (!comprador) {
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
            Gracias por tu compra, {comprador.nombre}. A continuación, los detalles de tu pedido:
          </p>
        </div>

        <div className="border rounded shadow-sm p-4 mb-4 bg-light">
          <h5 className="fw-bold mb-3">
            🧾 N° de Compra:{" "}
            <span className="text-primary">
              #{String(numeroCompra).padStart(4, "0")}
            </span>
          </h5>

          <div className="mb-4">
            <h6 className="fw-bold border-bottom pb-2">Datos del Comprador</h6>
            <div className="row">
              <div className="col-md-6"><strong>Nombre:</strong> {comprador.nombre} {comprador.apellidos}</div>
              <div className="col-md-6"><strong>Correo:</strong> {comprador.correo}</div>
              <div className="col-md-6"><strong>Dirección:</strong> {comprador.direccion}</div>
              {comprador.departamento && <div className="col-md-6"><strong>Departamento:</strong> {comprador.departamento}</div>}
              <div className="col-md-6"><strong>Región:</strong> {comprador.region}</div>
              <div className="col-md-6"><strong>Comuna:</strong> {comprador.comuna}</div>
              {comprador.indicacion && <div className="col-12"><strong>Indicaciones:</strong> {comprador.indicacion}</div>}
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
                        <img src={item.imagen} alt={item.nombre} className="producto-imagen"/>
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
              <h4 className="fw-bold">💰 Total Pagado: <span className="text-success">${total?.toLocaleString()}</span></h4>
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
