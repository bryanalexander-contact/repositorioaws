import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Productos from "./pages/public/Productos";
import DetalleProducto from "./pages/public/DetalleProducto";
import Registro from "./pages/public/Registro";
import Login from "./pages/public/Login";
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import Carrito from "./pages/public/Carrito";

import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { UsersProvider } from "./context/UsersContext";

export default function App() {
  return (
    <Router>
      <UsersProvider>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </UsersProvider>
    </Router>
  );
}
