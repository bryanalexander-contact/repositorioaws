import { createContext, useState, useEffect, useContext } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState(null); // Usuario logueado

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
      setUsuarios(storedUsers);

      const loggedUser = JSON.parse(localStorage.getItem("userLogueado"));
      if (loggedUser) setUser(loggedUser);
    } catch (err) {
      console.error("Error cargando usuarios del localStorage:", err);
      localStorage.clear(); // Limpia si el JSON está corrupto
    }
  }, []);

  const guardarUsuarios = (lista) => {
    setUsuarios(lista);
    try {
      localStorage.setItem("usuarios", JSON.stringify(lista));
    } catch (err) {
      console.warn("⚠️ localStorage lleno, no se guardaron todos los usuarios.");
    }
  };

  const generarId = () =>
    usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

  const registrar = (nuevo) => {
    if (
      usuarios.some(
        (u) => u.correo.toLowerCase() === nuevo.correo.toLowerCase()
      )
    ) {
      return { ok: false, message: "Ya existe un usuario con ese correo" };
    }

    const usuario = { ...nuevo, id: generarId(), historialCompras: [] };
    const nuevos = [...usuarios, usuario];
    guardarUsuarios(nuevos);

    setUser(usuario);
    localStorage.setItem("userLogueado", JSON.stringify(usuario));

    return { ok: true, user: usuario };
  };

  const login = (correo, password) => {
    const encontrado = usuarios.find(
      (u) =>
        u.correo.toLowerCase() === correo.toLowerCase() &&
        u.password === password
    );
    if (encontrado) {
      setUser(encontrado);
      localStorage.setItem("userLogueado", JSON.stringify(encontrado));
      return { ok: true, user: encontrado };
    }
    return { ok: false, message: "Credenciales inválidas" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userLogueado");
  };

  const eliminarUsuario = (id) => {
    const nuevos = usuarios.filter((u) => u.id !== id);
    guardarUsuarios(nuevos);
  };

  const actualizarUsuario = (id, datos) => {
    const nuevos = usuarios.map((u) => (u.id === id ? { ...u, ...datos } : u));
    guardarUsuarios(nuevos);
    if (user?.id === id) {
      const actualizado = { ...user, ...datos };
      setUser(actualizado);
      try {
        localStorage.setItem("userLogueado", JSON.stringify(actualizado));
      } catch (err) {
        console.warn("⚠️ No se pudo actualizar userLogueado (storage lleno).");
      }
    }
  };

  // ============================================================
  // ✅ Registrar compra (solo si fue EXITOSA)
  // ============================================================
  const registrarCompra = (compra) => {
    if (sessionStorage.getItem("compra_en_progreso") === "true") {
      console.warn("⚠️ Compra ya se está registrando, evitando duplicado.");
      return parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
    }
    sessionStorage.setItem("compra_en_progreso", "true");

    try {
      let ultimo = parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
      const numeroCompra = ultimo + 1;
      localStorage.setItem("ultimoNumeroCompra", numeroCompra);

      // 🔹 Guardamos una versión LIGERA de la compra (sin imágenes ni data innecesaria)
      const compraConNumero = {
        numeroCompra,
        fecha: new Date().toISOString(),
        total: compra.total,
        comprador: compra.comprador,
        productos: (compra.productos || []).map((p) => ({
          id: p.id,
          nombre: p.nombre,
          cantidad: p.cantidad,
          precio: p.precio,
        })),
      };

      if (user) {
        const actualizado = {
          ...user,
          historialCompras: [...(user.historialCompras || []), compraConNumero],
        };

        setUser(actualizado);

        const nuevosUsuarios = usuarios.map((u) =>
          u.id === user.id ? actualizado : u
        );
        guardarUsuarios(nuevosUsuarios);

        // ✅ Guardamos solo una versión resumida del userLogueado
        const userLigero = {
          id: actualizado.id,
          nombre: actualizado.nombre,
          correo: actualizado.correo,
          historialCompras: actualizado.historialCompras.slice(-10), // solo las últimas 10 compras
        };

        try {
          localStorage.setItem("userLogueado", JSON.stringify(userLigero));
        } catch {
          console.warn("⚠️ No se pudo guardar userLogueado (storage lleno).");
        }
      }

      return numeroCompra;
    } finally {
      sessionStorage.removeItem("compra_en_progreso");
    }
  };

  // ============================================================
  // 🚫 Generar número TEMPORAL para compras fallidas
  // (no se guarda ni incrementa el contador)
  // ============================================================
  const generarNumeroCompraFallida = () => {
    const ultimo = parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
    return ultimo + 1; // Solo muestra el que habría tocado
  };

  // ============================================================

  return (
    <UsersContext.Provider
      value={{
        usuarios,
        user,
        registrar,
        login,
        logout,
        eliminarUsuario,
        actualizarUsuario,
        registrarCompra,
        generarNumeroCompraFallida, // 👈 Para CompraFallida.jsx
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
