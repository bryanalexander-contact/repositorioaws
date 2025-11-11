// src/context/UsersContext.jsx
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

    const usuario = { ...nuevo, id: generarId() };
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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
