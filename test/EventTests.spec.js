import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

// Componente LoginForm para pruebas de eventos
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form data-testid="login-form">
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          data-testid="email-input"
        />
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          data-testid="password-input"
        />
      </div>
    </form>
  );
};

// Componente para pruebas de eventos
const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div data-testid="product-card">
      <h3>{product.nombre}</h3>
      <p>Precio: ${product.precio}</p>
      <p>Stock: {product.stock}</p>
      
      <button 
        onClick={() => onAddToCart(product)}
        data-testid="add-to-cart-btn"
      >
        Agregar al Carrito
      </button>
      
      <button 
        onClick={() => onViewDetails(product.id)}
        data-testid="view-details-btn"
      >
        Ver Detalles
      </button>
      
      <button 
        onClick={handleFavoriteClick}
        data-testid="favorite-btn"
        className={isFavorite ? "favorite active" : "favorite"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

// Componente contador para pruebas de eventos múltiples
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div data-testid="counter">
      <span data-testid="count-value">{count}</span>
      <button onClick={increment} data-testid="increment-btn">+</button>
      <button onClick={decrement} data-testid="decrement-btn">-</button>
      <button onClick={reset} data-testid="reset-btn">Reset</button>
    </div>
  );
};

describe("PRUEBAS DE EVENTOS", () => {
  
  describe("1. Simulación de eventos de click", () => {
    const mockProduct = {
      id: 1,
      nombre: "Smartphone Samsung",
      precio: 899,
      stock: 15
    };

    it("debería ejecutar onAddToCart cuando se hace clic en 'Agregar al carrito'", () => {
      const mockAddToCart = jasmine.createSpy('mockAddToCart');
      const { getByTestId } = render(
        <ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={() => {}} />
      );
      
      fireEvent.click(getByTestId("add-to-cart-btn"));
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it("debería ejecutar onViewDetails cuando se hace clic en 'Ver detalles'", () => {
      const mockViewDetails = jasmine.createSpy('mockViewDetails');
      const { getByTestId } = render(
        <ProductCard product={mockProduct} onAddToCart={() => {}} onViewDetails={mockViewDetails} />
      );
      
      fireEvent.click(getByTestId("view-details-btn"));
      expect(mockViewDetails).toHaveBeenCalledWith(mockProduct.id);
    });
  });

  describe("2. Cambio de estado interno mediante eventos", () => {
    it("debería cambiar el estado de favorito al hacer clic en el corazón", () => {
      const { getByTestId } = render(
        <ProductCard product={{ id: 1, nombre: "Test", precio: 100, stock: 10 }} 
          onAddToCart={() => {}} onViewDetails={() => {}} />
      );
      
      const favoriteButton = getByTestId("favorite-btn");
      
      // Estado inicial
      expect(favoriteButton.className).toContain("favorite");
      expect(favoriteButton.textContent).toBe("🤍");
      
      // Primer click - agregar a favoritos
      fireEvent.click(favoriteButton);
      expect(favoriteButton.className).toContain("active");
      expect(favoriteButton.textContent).toBe("❤️");
      
      // Segundo click - quitar de favoritos
      fireEvent.click(favoriteButton);
      expect(favoriteButton.className).not.toContain("active");
      expect(favoriteButton.textContent).toBe("🤍");
    });
  });

  describe("3. Múltiples eventos y estado complejo", () => {
    it("debería manejar incremento, decremento y reset del contador", () => {
      const { getByTestId } = render(<Counter />);
      const countValue = getByTestId("count-value");
      const incrementBtn = getByTestId("increment-btn");
      const decrementBtn = getByTestId("decrement-btn");
      const resetBtn = getByTestId("reset-btn");
      
      // Valor inicial
      expect(countValue.textContent).toBe("0");
      
      // Incrementar
      fireEvent.click(incrementBtn);
      expect(countValue.textContent).toBe("1");
      
      fireEvent.click(incrementBtn);
      expect(countValue.textContent).toBe("2");
      
      // Decrementar
      fireEvent.click(decrementBtn);
      expect(countValue.textContent).toBe("1");
      
      // Reset
      fireEvent.click(resetBtn);
      expect(countValue.textContent).toBe("0");
    });

    it("debería manejar eventos de input y cambio", () => {
      const { getByTestId } = render(<LoginForm />);
      const emailInput = getByTestId("email-input");
      const passwordInput = getByTestId("password-input");
      
      // Simular escritura en inputs
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "securepassword" } });
      
      expect(emailInput.value).toBe("test@example.com");
      expect(passwordInput.value).toBe("securepassword");
    });
  });
});
