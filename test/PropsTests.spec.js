import React from "react";
import { render } from "@testing-library/react";

// Componente Button para pruebas de props
const Button = ({ children, onClick, variant = "primary", disabled = false }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      data-testid="test-button"
    >
      {children}
    </button>
  );
};

// Componente UserCard para pruebas de props complejas
const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div data-testid="user-card">
      <h3>{user.nombre}</h3>
      <p>Email: {user.email}</p>
      <p>Rol: {user.rol}</p>
      <button onClick={() => onEdit(user.id)}>Editar</button>
      <button onClick={() => onDelete(user.id)}>Eliminar</button>
    </div>
  );
};

describe("PRUEBAS DE PROPIEDADES (PROPS)", () => {
  
  describe("1. Recepción y uso de propiedades básicas", () => {
    it("debería recibir y mostrar el texto del botón correctamente", () => {
      const { getByTestId, getByText } = render(
        <Button>Click aquí</Button>
      );
      
      const button = getByTestId("test-button");
      expect(getByText("Click aquí")).toBeDefined();
      expect(button.className).toContain("btn-primary");
    });

    it("debería aplicar la variante de estilo correcta", () => {
      const { getByTestId } = render(
        <Button variant="danger">Eliminar</Button>
      );
      
      const button = getByTestId("test-button");
      expect(button.className).toContain("btn-danger");
    });

    it("debería estar deshabilitado cuando recibe disabled=true", () => {
      const { getByTestId } = render(
        <Button disabled>No clickable</Button>
      );
      
      const button = getByTestId("test-button");
      expect(button.disabled).toBe(true);
    });
  });

  describe("2. Recepción y uso de propiedades complejas", () => {
    const mockUser = {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@example.com",
      rol: "Administrador"
    };

    it("debería recibir y mostrar datos de usuario complejos", () => {
      const { getByTestId, getByText } = render(
        <UserCard user={mockUser} onEdit={() => {}} onDelete={() => {}} />
      );
      
      expect(getByTestId("user-card")).toBeDefined();
      expect(getByText(mockUser.nombre)).toBeDefined();
      expect(getByText(`Email: ${mockUser.email}`)).toBeDefined();
      expect(getByText(`Rol: ${mockUser.rol}`)).toBeDefined();
    });
  });
});
