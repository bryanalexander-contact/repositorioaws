import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        ProductService.getProductoById(id)
            .then((res) => setProducto(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!producto) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <h2>Detalle del Producto</h2>
            <p><b>ID:</b> {producto.id}</p>
            <p><b>Nombre:</b> {producto.nombre}</p>
            <p><b>Precio:</b> ${producto.precio}</p>
        </div>
    );
};

export default DetalleProducto;
