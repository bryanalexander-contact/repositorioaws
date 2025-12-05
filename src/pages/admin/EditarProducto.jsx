import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import CategoriaService from "../../services/CategoriaService";
import "../../assets/css/admin/editar-producto.css";

function EditarProducto() {
  const { id } = useParams();
  const productoId = Number(id);
  const [form, setForm] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    CategoriaService.getAll()
      .then(r => setCategorias(r.data.map(c => c.nombre)))
      .catch(() => setCategorias(["Electrónica","Ropa","Hogar","Gamer"]));
    // obtener producto desde API
    ProductService.getById(productoId)
      .then(res => {
        const p = res.data;
        setForm({
          codigo: p.codigo || "",
          nombre: p.nombre || "",
          descripcion: p.descripcion || "",
          precio: p.precio ?? 0,
          precio_oferta: p.precio_oferta ?? "",
          stock: p.stock ?? 0,
          stock_critico: p.stock_critico ?? 0,
          categoria: p.categoria || (categorias[0] || ""),
          imagenURL: p.imagen_url || "",
          imagenFile: null,
          en_oferta: !!p.en_oferta,
        });
      })
      .catch(() => {
        alert("Producto no encontrado");
        navigate("/admin/MostrarProductos");
      });
    // eslint-disable-next-line
  }, [productoId]);

  if (!form) return <p style={{ padding: 20, textAlign: "center" }}>Cargando producto...</p>;

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file" && files && files[0]) {
      setForm(prev => ({ ...prev, imagenFile: files[0] }));
      return;
    }
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: checked }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
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

      await ProductService.update(productoId, fd);
      alert("✅ Producto actualizado correctamente");
      navigate("/admin/MostrarProductos");
    } catch (err) {
      console.error("Error actualizando producto:", err);
      alert("No se pudo actualizar el producto");
    }
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
          <input name="codigo" value={form.codigo} onChange={handleChange} required />

          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />

          <label>Precio</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} required />

          <label>Precio Oferta (opcional)</label>
          <input type="number" name="precio_oferta" value={form.precio_oferta || ""} onChange={handleChange} />

          <label>Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />

          <label>Categoría</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <label>Imagen (archivo)</label>
          <input type="file" name="imagenFile" onChange={handleChange} />

          <label>O URL de imagen</label>
          <input type="text" name="imagenURL" value={form.imagenURL} onChange={handleChange} />

          <label>Stock Crítico</label>
          <input type="number" name="stock_critico" value={form.stock_critico} onChange={handleChange} />

          <label>
            <input type="checkbox" name="en_oferta" checked={!!form.en_oferta} onChange={handleChange} />
            En oferta
          </label>

          <button type="submit">Guardar Cambios</button>
        </form>
      </main>
    </div>
  );
}

export default EditarProducto;
