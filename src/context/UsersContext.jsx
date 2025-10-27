// src/context/UsersContext.jsx
import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState(null);

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

  const validarCorreo = (correo) =>
    /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/.test(correo);

  const registrar = (nuevo) => {
    const usuario = { ...nuevo, id: generarId() };
    const nuevos = [...usuarios, usuario];
    guardarUsuarios(nuevos);
  };

  const login = (correo, password) => {
    const encontrado = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );
    if (encontrado) {
      setUser(encontrado);
      localStorage.setItem("userLogueado", JSON.stringify(encontrado));
      return true;
    }
    return false;
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
