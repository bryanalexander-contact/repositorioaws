import { createContext, useState, useEffect, useContext } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
      setUsuarios(storedUsers);

      const loggedUser = JSON.parse(localStorage.getItem("userLogueado"));
      if (loggedUser) setUser(loggedUser);
    } catch (err) {
      console.error("Error cargando usuarios del localStorage:", err);
      localStorage.clear();
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

  const registrarCompra = (compra) => {
    if (sessionStorage.getItem("compra_en_progreso") === "true") {
      console.warn("⚠️ Compra ya en progreso, evitando duplicado.");
      return parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
    }
    sessionStorage.setItem("compra_en_progreso", "true");

    try {
      let ultimo = parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
      const numeroCompra = ultimo + 1;

      localStorage.setItem("ultimoNumeroCompra", numeroCompra.toString());

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
          imagen: p.imagenURL || "", // ⚡ nunca File/Base64
        })),
      };

      if (user) {
        const historial = user.historialCompras || [];
        const yaExiste = historial.some(
          (c) =>
            c.total === compra.total &&
            Math.abs(new Date(c.fecha) - new Date()) < 2000
        );
        if (yaExiste) return numeroCompra;

        const nuevoHistorial = [...historial, compraConNumero].slice(-10);
        const actualizado = { ...user, historialCompras: nuevoHistorial };
        setUser(actualizado);

        const nuevosUsuarios = usuarios.map((u) =>
          u.id === user.id ? actualizado : u
        );
        guardarUsuarios(nuevosUsuarios);

        localStorage.setItem(
          "userLogueado",
          JSON.stringify({
            ...actualizado,
            historialCompras: nuevoHistorial,
          })
        );
      }

      return numeroCompra;
    } finally {
      sessionStorage.removeItem("compra_en_progreso");
    }
  };

  const generarNumeroCompraFallida = () => {
    const ultimo = parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
    return ultimo + 1;
  };

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
        generarNumeroCompraFallida,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
