import React from "react";
import { useUsuarios } from "../context/UsuariosContext";

export default function ListarUsuarios() {
  const { usuarios, eliminarUsuario } = useUsuarios();

  return (
    <div className="p-4">
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo Usuario</th>
            <th>Región - Comuna</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr><td colSpan="7">No hay usuarios registrados</td></tr>
          ) : (
            usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.run}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td>{u.tipoUsuario}</td>
                <td>{u.region} - {u.comuna}</td>
                <td>{u.direccion}</td>
                <td className="flex gap-2">
                  <button onClick={() => {
                    localStorage.setItem("editarUsuarioId", u.id);
                    window.location.href = "/editar-usuario";
                  }} className="bg-yellow-500 text-white px-2">Editar</button>
                  <button onClick={() => {
                    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) eliminarUsuario(u.id);
                  }} className="bg-red-500 text-white px-2">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
