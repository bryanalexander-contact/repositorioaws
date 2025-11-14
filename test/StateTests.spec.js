import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

// Componente con estado para pruebas
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.email) newErrors.email = "Email es requerido";
    if (!formData.password) newErrors.password = "Password es requerido";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simular envío exitoso - NO limpiar campos para la prueba
      setSubmitted(true);
      // En una app real aquí harías la llamada API
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          data-testid="email-input"
        />
        {errors.email && <span data-testid="email-error">{errors.email}</span>}
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
        {errors.password && <span data-testid="password-error">{errors.password}</span>}
      </div>
      
      <button type="submit" data-testid="submit-button">
        Iniciar Sesión
      </button>
      
      {submitted && <div data-testid="success-message">¡Formulario enviado!</div>}
    </form>
  );
};

describe("PRUEBAS DE ESTADO (STATE)", () => {
  
  describe("1. Cambios en el estado del formulario", () => {
    it("debería actualizar el estado del email cuando el usuario escribe", () => {
      const { getByTestId } = render(<LoginForm />);
      const emailInput = getByTestId("email-input");
      
      fireEvent.change(emailInput, { target: { value: "usuario@test.com" } });
      expect(emailInput.value).toBe("usuario@test.com");
    });

    it("debería actualizar el estado del password cuando el usuario escribe", () => {
      const { getByTestId } = render(<LoginForm />);
      const passwordInput = getByTestId("password-input");
      
      fireEvent.change(passwordInput, { target: { value: "mipassword123" } });
      expect(passwordInput.value).toBe("mipassword123");
    });
  });

  describe("2. Validación y manejo de errores en el estado", () => {
    it("debería mostrar errores cuando se envía el formulario vacío", () => {
      const { getByTestId, queryByTestId } = render(<LoginForm />);
      const submitButton = getByTestId("submit-button");
      
      // Inicialmente no debería haber errores
      expect(queryByTestId("email-error")).toBeNull();
      expect(queryByTestId("password-error")).toBeNull();
      
      // Enviar formulario vacío
      fireEvent.click(submitButton);
      
      // Deberían aparecer errores
      expect(getByTestId("email-error")).toBeDefined();
      expect(getByTestId("password-error")).toBeDefined();
    });

    it("debería mostrar mensaje de éxito cuando el formulario se envía correctamente", () => {
      const { getByTestId, queryByTestId } = render(<LoginForm />);
      const emailInput = getByTestId("email-input");
      const passwordInput = getByTestId("password-input");
      const submitButton = getByTestId("submit-button");
      
      // Llenar formulario correctamente
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      
      // Enviar formulario
      fireEvent.click(submitButton);
      
      // Debería mostrar mensaje de éxito y mantener los datos
      expect(getByTestId("success-message")).toBeDefined();
      expect(emailInput.value).toBe("test@test.com");
      expect(passwordInput.value).toBe("password");
    });
  });
});
