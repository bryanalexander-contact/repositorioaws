import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ProductoComponent = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateProducto = async (e) => {
        e.preventDefault();

        const producto = { nombre, precio };

        try {
            if (id) {
                await ProductService.updateProducto(id, producto);
            } else {
                await ProductService.createProducto(producto);
            }
            navigate('/productos');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            ProductService.getProductoById(id)
                .then((res) => {
                    setNombre(res.data.nombre);
                    setPrecio(res.data.precio);
                })
                .catch((err) => console.log(err));
        }
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="card col-md-6 offset-md-3">
                <h2 className="text-center">{id ? "Editar" : "Agregar"} Producto</h2>

                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <label>Precio:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-success" onClick={saveOrUpdateProducto}>
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductoComponent;
