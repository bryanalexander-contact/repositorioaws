// src/pages/admin/EditarProducto.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import "../../assets/css/admin/editar-producto.css";

function EditarProducto() {
  const { id } = useParams(); // obtiene el :id desde la URL
  const productoId = parseInt(id, 10);
  const { productos, actualizarProducto, categorias } = useProducts();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const p = productos.find(p => p.id === productoId);
    if (p) {
      setForm({ ...p });
    } else {
      // si no encuentra producto, redirige al listado
      navigate("/admin/MostrarProductos");
    }
  }, [productos, productoId, navigate]);

  if (!form) {
    return (
      <p style={{ padding: "20px", textAlign: "center" }}>
        Cargando producto...
      </p>
    );
  }

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
    alert("✅ Producto actualizado correctamente");
    navigate("/admin/MostrarProductos"); // redirige al listado después de guardar
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li><Link to="/admin/MostrarProductos">Mostrar Productos</Link></li>
          <li><Link to="/admin/NuevoProducto">Nuevo Producto</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Editar Producto</h1>

        <form onSubmit={handleSubmit} className="form-editar">
          <label>Código</label>
          <input name="codigo" value={form.codigo || ""} onChange={handleChange} required />

          <label>Nombre</label>
          <input name="nombre" value={form.nombre || ""} onChange={handleChange} required />

          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion || ""} onChange={handleChange} />

          <label>Precio</label>
          <input type="number" name="precio" value={form.precio || 0} onChange={handleChange} required />

          <label>Precio Oferta (opcional)</label>
          <input type="number" name="precioOferta" value={form.precioOferta || ""} onChange={handleChange} />

          <label>Stock</label>
          <input type="number" name="stock" value={form.stock || 0} onChange={handleChange} required />

          <label>Categoría</label>
          <select name="categoria" value={form.categoria || categorias[0]} onChange={handleChange}>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label>Imagen (archivo)</label>
          <input type="file" name="imagenArchivo" onChange={handleChange} />

          <label>O URL de imagen</label>
          <input type="text" name="imagen" value={form.imagen || ""} onChange={handleChange} />

          <button type="submit">Guardar Cambios</button>
        </form>
      </main>
    </div>
  );
}

export default EditarProducto;
