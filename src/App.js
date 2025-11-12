// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🏠 Públicas
import Home from "./pages/public/Home";
import Productos from "./pages/public/Productos";
import DetalleProducto from "./pages/public/DetalleProducto";
import Registro from "./pages/public/Registro";
import Login from "./pages/public/Login";
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import Carrito from "./pages/public/Carrito";
import Blogs from "./pages/public/Blogs";
import Checkout from "./pages/public/Checkout";
import CompraExitosa from "./pages/public/CompraExitosa";
import CompraFallida from "./pages/public/CompraFallida";
import CategoriasPublic from "./pages/public/Categorias";
import Ofertas from "./pages/public/Ofertas";

// ⚙️ Admin
import PanelAdmin from "./pages/admin/PanelAdmin";
import PanelProductos from "./pages/admin/PanelProductos";
import PanelUsuarios from "./pages/admin/PanelUsuarios";
import MostrarProductos from "./pages/admin/MostrarProductos";
import MostrarUsuarios from "./pages/admin/MostrarUsuarios";
import NuevoProducto from "./pages/admin/NuevoProducto";
import NuevoUsuario from "./pages/admin/NuevoUsuario";
import EditarProducto from "./pages/admin/EditarProducto";
import EditarUsuario from "./pages/admin/EditarUsuario";
import Perfil from "./pages/admin/Perfil";
import CategoriasAdmin from "./pages/admin/Categorias";
import Reportes from "./pages/admin/Reportes";
import Boletas from "./pages/admin/Boletas";
import DetalleBoleta from "./pages/admin/DetalleBoleta";
import ProductosCriticos from "./pages/admin/ProductosCriticos";
import HistorialCompras from "./pages/admin/HistorialCompras";
// 🧠 Contextos
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
              {/* 🌐 Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/detalle/:id" element={<DetalleProducto />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/compraexitosa" element={<CompraExitosa />} />
              <Route path="/comprafallida" element={<CompraFallida />} />
              <Route path="/categorias" element={<CategoriasPublic />} />
              <Route path="/ofertas" element={<Ofertas />} />

              {/* ⚙️ Rutas Admin */}
              <Route path="/admin" element={<PanelAdmin />} />
              <Route path="/admin/boletas" element={<Boletas />} />
              <Route path="/admin/categorias" element={<CategoriasAdmin />} />
              <Route path="/admin/panelproductos" element={<PanelProductos />} />
              <Route path="/admin/panelusuarios" element={<PanelUsuarios />} />
              <Route path="/admin/reportes" element={<Reportes />} />
              <Route path="/admin/perfil" element={<Perfil />} />
              <Route path="/detalle-boleta/:id" element={<DetalleBoleta />} />
              <Route path="/admin/productoscriticos" element={<ProductosCriticos />} />

              {/* 🧩 Subsecciones Admin */}
              <Route path="/admin/mostrarproductos" element={<MostrarProductos />} />
              <Route path="/admin/mostrarusuarios" element={<MostrarUsuarios />} />
              <Route path="/admin/nuevoproducto" element={<NuevoProducto />} />
              <Route path="/admin/nuevousuario" element={<NuevoUsuario />} />
              <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
              <Route path="/admin/editar-usuario/:id" element={<EditarUsuario />} />
              <Route path="/admin/historial-compras/:id" element={<HistorialCompras />} />

            </Routes>
          </CartProvider>
        </ProductsProvider>
      </UsersProvider>
    </Router>
  );
}
