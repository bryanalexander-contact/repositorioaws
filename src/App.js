<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1';
import Blog2 from './pages/Blog2';
import Login from './pages/Login';
import Registro from './pages/Registro';
// Importa otras páginas cuando las tengas
// import Productos from './pages/Productos';
// import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros/>} />
        <Route path="/Blogs" element={<Blogs/>} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Resistro" element={<Registro/>} />
        {/* Rutas para otras páginas */}
        {/* <Route path="/productos" element={<Productos />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </Router>
=======
import React from "react";
import { CartProvider } from "./context/CartContext";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <CartProvider>
      <Carrito />
    </CartProvider>
>>>>>>> 6f8d0a0 (inicializacion del proyecto)
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> 6f8d0a0 (inicializacion del proyecto)
