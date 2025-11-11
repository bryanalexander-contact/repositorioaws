import React from "react";
import { useUsers } from "../../context/UsersContext";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

export default function Perfil() {
  const { user } = useUsers();

  if (!user) return <div>Debes iniciar sesión</div>;

  return (
    <>
      <Header />
      <main style={{ padding: 20 }}>
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Región:</strong> {user.region}</p>
        <p><strong>Comuna:</strong> {user.comuna}</p>
      </main>
      <Footer />
    </>
  );
}
