import React from 'react';
import '../../assets/css/index.css';
import '../../assets/css/modelo.css';
import cartImg from '../../assets/img/cart.jpg'; // 👈 asegúrate de que esta imagen exista

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>TiendaOnline</h1>
      </div>

      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><span>|</span></li>
          <li><a href="/productos">Productos</a></li>
          <li><span>|</span></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><span>|</span></li>
          <li><a href="/blogs">Blog</a></li>
          <li><span>|</span></li>
          <li><a href="/contacto">Contacto</a></li>
          <li><span>|</span></li>
          <li><a href="/login">Iniciar Sesión</a></li>
          <li><span>|</span></li>
          <li><a href="/registro">Registro</a></li>
        </ul>
      </nav>

      <div className="carrito">
        <a href="/carrito">
          <img src={cartImg} alt="Carrito de compras" />
        </a>
      </div>
    </header>
  );
}

export default Header;
    