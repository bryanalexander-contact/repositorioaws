import React from "react";
import { render } from "@testing-library/react";

// Componente de ejemplo para pruebas
const ProductList = ({ productos }) => {
  return (
    <div>
      {productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {productos.map(producto => (
            <li key={producto.id} data-testid="product-item">
              <span data-testid="product-name">{producto.nombre}</span> - 
              <span data-testid="product-price">${producto.precio}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Componente con renderizado condicional
const Alert = ({ type, message, show }) => {
  if (!show) return null;
  
  return (
    <div className={`alert alert-${type}`} data-testid="alert-message">
      {message}
    </div>
  );
};

describe("PRUEBAS DE RENDERIZADO", () => {
  
  describe("1. Renderizado Correcto - Lista de productos", () => {
    const mockProducts = [
      { id: 1, nombre: "Laptop Gaming", precio: 1500 },
      { id: 2, nombre: "Mouse Inalámbrico", precio: 50 },
      { id: 3, nombre: "Teclado Mecánico", precio: 120 }
    ];

    it("debería renderizar todos los elementos de la lista de productos", () => {
      const { getAllByTestId } = render(<ProductList productos={mockProducts} />);
      
      const productItems = getAllByTestId("product-item");
      const productNames = getAllByTestId("product-name");
      const productPrices = getAllByTestId("product-price");
      
      expect(productItems.length).toBe(3);
      expect(productNames.length).toBe(3);
      expect(productPrices.length).toBe(3);
      
      // Verificar nombres
      expect(productNames[0].textContent).toBe("Laptop Gaming");
      expect(productNames[1].textContent).toBe("Mouse Inalámbrico");
      expect(productNames[2].textContent).toBe("Teclado Mecánico");
      
      // Verificar precios
      expect(productPrices[0].textContent).toBe("$1500");
      expect(productPrices[1].textContent).toBe("$50");
      expect(productPrices[2].textContent).toBe("$120");
    });

    it("debería mostrar mensaje cuando no hay productos", () => {
      const { getByText } = render(<ProductList productos={[]} />);
      expect(getByText("No hay productos disponibles")).toBeDefined();
    });
  });

  describe("2. Renderizado Condicional - Componente Alert", () => {
    it("debería mostrar el mensaje cuando show=true", () => {
      const { getByTestId, getByText } = render(
        <Alert type="error" message="Error de conexión" show={true} />
      );
      
      expect(getByTestId("alert-message")).toBeDefined();
      expect(getByText("Error de conexión")).toBeDefined();
    });

    it("debería ocultar el mensaje cuando show=false", () => {
      const { queryByTestId } = render(
        <Alert type="error" message="Error de conexión" show={false} />
      );
      
      expect(queryByTestId("alert-message")).toBeNull();
    });

    it("debería aplicar la clase CSS correcta según el tipo", () => {
      const { getByTestId } = render(
        <Alert type="success" message="Operación exitosa" show={true} />
      );
      
      const alert = getByTestId("alert-message");
      expect(alert.className).toContain("alert-success");
    });
  });
});
