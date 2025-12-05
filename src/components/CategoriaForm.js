import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriaService from "../services/CategoriaService";

const CategoriaForm = () => {
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    const guardar = (e) => {
        e.preventDefault();
        CategoriaService.create({ nombre })
            .then(() => navigate("/categorias"))
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Agregar Categoría</h2>

            <form className="card p-3">
                <div className="mb-2">
                    <label>Nombre:</label>
                    <input className="form-control"
                           value={nombre}
                           onChange={e => setNombre(e.target.value)} />
                </div>

                <button className="btn btn-success" onClick={guardar}>
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default CategoriaForm;
