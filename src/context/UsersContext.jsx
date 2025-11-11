import { createContext, useState, useEffect, useContext } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState(null); // Usuario logueado

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(storedUsers);

    const loggedUser = JSON.parse(localStorage.getItem("userLogueado"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const guardarUsuarios = (lista) => {
    setUsuarios(lista);
    localStorage.setItem("usuarios", JSON.stringify(lista));
  };

  const generarId = () =>
    usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

  const registrar = (nuevo) => {
    if (usuarios.some(u => u.correo.toLowerCase() === nuevo.correo.toLowerCase())) {
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
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
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
      localStorage.setItem("userLogueado", JSON.stringify(actualizado));
    }
  };

  // ============================================================
  // ✅ Registrar compra (con control de ejecución doble y número secuencial)
  // ============================================================
  const registrarCompra = (compra) => {
    // 🔹 Previene ejecuciones duplicadas simultáneas (por doble render, etc)
    if (sessionStorage.getItem("compra_en_progreso") === "true") {
      console.warn("⚠️ Compra ya se está registrando, evitando duplicado.");
      return parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
    }
    sessionStorage.setItem("compra_en_progreso", "true");

    try {
      // 🔹 Generar número de compra incremental y confiable
      let ultimo = parseInt(localStorage.getItem("ultimoNumeroCompra")) || 0;
      const numeroCompra = ultimo + 1;
      localStorage.setItem("ultimoNumeroCompra", numeroCompra);

      const compraConNumero = { ...compra, numeroCompra };

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

        localStorage.setItem("userLogueado", JSON.stringify(actualizado));
      }

      return numeroCompra;
    } finally {
      // 🔹 Libera el bloqueo al terminar correctamente
      sessionStorage.removeItem("compra_en_progreso");
    }
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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
