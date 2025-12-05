import React, { useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService";

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    const cargar = () => {
        UsuarioService.getAll()
            .then(res => setUsuarios(res.data))
            .catch(err => console.log(err));
    };

    const eliminar = (id) => {
        if (!window.confirm("¿Eliminar usuario?")) return;

        UsuarioService.delete(id)
            .then(() => cargar())
            .catch(err => console.log(err));
    };

    useEffect(() => cargar(), []);

    return (
        <div className="container mt-4">
            <h2 className="text-center">Usuarios</h2>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.correo}</td>
                            <td>{u.rol}</td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => eliminar(u.id)}>
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

export default ListaUsuarios;
