// src/components/organisms/ProductTable.jsx
import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import Button from "../atoms/Button";

const ProductTable = () => {
  const { products, deleteProduct, setEditingProduct } = useContext(ProductsContext);

  if (!products || products.length === 0) {
    return <p className="no-products">No hay productos registrados.</p>;
  }

  return (
    <section className="product-table-section">
      <h2 className="section-title">Gestión de productos</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td className="actions">
                <Button onClick={() => setEditingProduct(p)}>Editar</Button>
                <Button onClick={() => deleteProduct(p.id)} variant="danger">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductTable;
