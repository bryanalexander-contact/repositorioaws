import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsContext";

export default function EditarProducto() {
  const { obtenerProducto, actualizarProducto } = useProducts();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("editarProductoId"));
    const prod = obtenerProducto(id);
    if (!prod) {
      alert("Producto no encontrado");
      window.location.href = "/mostrar-productos";
      return;
    }
    setForm({ ...prod });
  }, [obtenerProducto]);

  if (!form) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, imagen: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(form.id, {
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      stockCritico: parseInt(form.stockCritico) || null
    });
    alert("Producto actualizado!");
    window.location.href = "/mostrar-productos";
  };

  return (
    <form className="p-4 flex flex-col gap-2 max-w-md" onSubmit={handleSubmit}>
      <input
        type="text"
        name="codigo"
        value={form.codigo}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        className="border p-2"
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="number"
        name="precio"
        value={form.precio}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="number"
        name="stockCritico"
        value={form.stockCritico || ""}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
        className="border p-2"
      />
      <input type="file" onChange={handleFile} />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Actualizar Producto
      </button>
    </form>
  );
}
