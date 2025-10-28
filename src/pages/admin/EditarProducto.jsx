import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import "../../assets/css/admin/editar-producto.css";
import { Link } from "react-router-dom"; // ✅ necesario

function EditarProducto({ productoId }) {
  const { productos, actualizarProducto } = useProducts();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const p = productos.find(p => p.id === productoId);
    if (p) setForm(p);
  }, [productos, productoId]);

  if (!form) return <p>Cargando producto...</p>;

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "imagenArchivo" && files[0]) {
      const reader = new FileReader();
      reader.onload = () => setForm(prev => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    actualizarProducto(productoId, form);
    alert("Producto actualizado!");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li><Link to="/admin/mostrar-productos">Mostrar Productos</Link></li>
          <li><Link to="/admin/nuevo-producto">Nuevo Producto</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Editar Producto</h1>
        <form onSubmit={handleSubmit}>
          <label>Código</label>
          <input name="codigo" value={form.codigo} onChange={handleChange} required />
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
          <label>Precio</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} required />
          <label>Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />
          <label>Categoría</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="Electrónica">Electrónica</option>
            <option value="Ropa">Ropa</option>
            <option value="Hogar">Hogar</option>
          </select>
          <label>Imagen (archivo)</label>
          <input type="file" name="imagenArchivo" onChange={handleChange} />
          <label>O URL de imagen</label>
          <input type="text" name="imagen" value={form.imagen} onChange={handleChange} />
          <button type="submit">Guardar Cambios</button>
        </form>
      </main>
    </div>
  );
}

export default EditarProducto;
