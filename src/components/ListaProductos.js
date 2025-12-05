import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        listarProductos();
    }, []);

    const listarProductos = async () => {
        try {
            const res = await ProductService.getAllProductos();
            setProductos(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProducto = async (id) => {
        if (window.confirm("¿Eliminar producto?")) {
            try {
                await ProductService.deleteProducto(id);
                listarProductos();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-center mb-4">Inventario</h2>

            <Link to="/add-producto" className="btn btn-primary mb-3">
                Agregar Producto
            </Link>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>${p.precio}</td>
                            <td>
                                <Link className="btn btn-info mx-2" to={`/edit-producto/${p.id}`}>
                                    Editar
                                </Link>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteProducto(p.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaProductos;
