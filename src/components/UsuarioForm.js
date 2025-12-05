import React, { useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService";
import { useNavigate, useParams } from "react-router-dom";

const UsuarioForm = () => {
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        UsuarioService.getAll().then(res => {
            const u = res.data.find(x => x.id == id);
            if (u) {
                setCorreo(u.correo);
                setRol(u.rol);
            }
        });
    }, [id]);

    const guardar = (e) => {
        e.preventDefault();
        UsuarioService.update(id, { correo, rol })
            .then(() => navigate("/usuarios"));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Editar Usuario</h2>

            <form className="card p-3">
                <div className="mb-2">
                    <label>Correo:</label>
                    <input className="form-control"
                           value={correo}
                           onChange={e => setCorreo(e.target.value)} />
                </div>

                <div className="mb-2">
                    <label>Rol:</label>
                    <input className="form-control"
                           value={rol}
                           onChange={e => setRol(e.target.value)} />
                </div>

                <button className="btn btn-success" onClick={guardar}>
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default UsuarioForm;
