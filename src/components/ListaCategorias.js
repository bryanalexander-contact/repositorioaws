import React, { useEffect, useState } from "react";
import CategoriaService from "../services/CategoriaService";
import { Link } from "react-router-dom";

const ListaCategorias = () => {
    const [categorias, setCategorias] = useState([]);

    const cargar = () => {
        CategoriaService.getAll()
            .then(res => setCategorias(res.data))
            .catch(err => console.log(err));
    };

    const eliminar = (id) => {
        if (!window.confirm("¿Eliminar categoría?")) return;

        CategoriaService.delete(id)
            .then(() => cargar())
            .catch(err => console.log(err));
    };

    useEffect(() => cargar(), []);

    return (
        <div className="container mt-4">
            <h2 className="text-center">Categorías</h2>

            <Link className="btn btn-primary mb-3" to="/add-categoria">
                Agregar Categoría
            </Link>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {categorias.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nombre}</td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => eliminar(c.id)}>
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

export default ListaCategorias;
