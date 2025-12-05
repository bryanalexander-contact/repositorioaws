import React, { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";
import CategoriaService from "../../services/CategoriaService";
import "../../assets/css/admin/nuevo-producto.css";
import { Link, useNavigate } from "react-router-dom";

function NuevoProducto() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    precio_oferta: "",
    stock: 0,
    stock_critico: 0,
    categoria: "",
    imagenURL: "", // URL text
    imagenFile: null, // file
    en_oferta: false,
  });

  useEffect(() => {
    CategoriaService.getAll()
      .then((r) => setCategorias(r.data.map(c => c.nombre)))
      .catch(() => setCategorias(["Electrónica","Ropa","Hogar","Gamer"]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file" && files && files[0]) {
      setForm((p) => ({ ...p, imagenFile: files[0] }));
      return;
    }
    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("codigo", form.codigo || "");
      fd.append("nombre", form.nombre || "");
      fd.append("descripcion", form.descripcion || "");
      fd.append("categoria", form.categoria || "");
      fd.append("precio", form.precio ?? 0);
      if (form.precio_oferta) fd.append("precio_oferta", form.precio_oferta);
      fd.append("stock", form.stock ?? 0);
      fd.append("stock_critico", form.stock_critico ?? 0);
      fd.append("en_oferta", form.en_oferta ? "true" : "false");

      if (form.imagenFile) fd.append("imagen", form.imagenFile);
      else if (form.imagenURL) fd.append("imagen", form.imagenURL);

      await ProductService.create(fd);
      alert("Producto agregado correctamente!");
      navigate("/admin/MostrarProductos");
    } catch (err) {
      console.error("Error creando producto:", err);
      alert("No se pudo crear el producto");
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Productos</h2>
        <ul>
          <li><Link to="/admin/MostrarProductos">Mostrar Productos</Link></li>
          <li><Link to="/admin/NuevoProducto" className="active">Nuevo Producto</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Agregar Nuevo Producto</h1>
        <form onSubmit={handleSubmit}>
          <label>Código Producto</label>
          <input name="codigo" value={form.codigo} onChange={handleChange} required />

          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />

          <label>Precio</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} required />

          <label>Precio Oferta (opcional)</label>
          <input type="number" name="precio_oferta" value={form.precio_oferta} onChange={handleChange} />

          <label>Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />

          <label>Stock Crítico</label>
          <input type="number" name="stock_critico" value={form.stock_critico} onChange={handleChange} />

          <label>Categoría</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="">Seleccione categoría</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <label>Imagen (archivo)</label>
          <input type="file" name="imagenFile" onChange={handleChange} />

          <label>O URL de imagen</label>
          <input type="text" name="imagenURL" value={form.imagenURL} onChange={handleChange} />

          <label>
            <input type="checkbox" name="en_oferta" checked={!!form.en_oferta} onChange={handleChange} />
            En oferta
          </label>

          <button type="submit">Agregar Producto</button>
        </form>
      </main>
    </div>
  );
}

export default NuevoProducto;
