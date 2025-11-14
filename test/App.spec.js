import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App";

describe("Componente App", () => {
  it("debería renderizar la aplicación completa sin errores", () => {
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });

  it("debería crear el contenedor principal de la aplicación", () => {
    const { container } = render(<App />);
    // Usar matchers básicos compatibles
    expect(container).toBeDefined();
    expect(container).not.toBeNull();
  });

  it("debería ser un componente de React válido", () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });
});
