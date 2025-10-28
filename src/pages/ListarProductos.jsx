import React from "react";
import { useProducts } from "../context/ProductsContext";

export default function ListarProductos() {
  const { productos, eliminarProducto } = useProducts();

  return (
    <div className="p-4">
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>${p.precio.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>{p.categoria}</td>
              <td className="flex gap-2">
                <button onClick={() => {
                  localStorage.setItem("editarProductoId", p.id);
                  window.location.href = "/editar-producto";
                }} className="bg-yellow-500 text-white px-2">Editar</button>
                <button onClick={() => eliminarProducto(p.id)} className="bg-red-500 text-white px-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
