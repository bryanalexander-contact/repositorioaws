import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <h3>TiendaOnline</h3>
        <p>Category X | Category Y | Category Z</p>
        <div className="tarjetas">
          <span>VISA</span>
          <span>MasterCard</span>
          <span>Amex</span>
        </div>
      </div>

      <div className="footer-right">
        <h3>Quedemos en contacto</h3>
        <form>
          <input type="email" placeholder="Enter email" required />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
