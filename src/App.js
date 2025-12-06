import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public
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

// Admin pages
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
import ReporteProductos from "./pages/admin/ReporteProductos";

// CRUD nuevos
import ListaProductos from "./components/ListaProductos";
import ProductoComponent from "./components/ProductoComponent";

// Contextos
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { UsersProvider } from "./context/UsersContext";

// Route protection
import RequireRole from "./routes/RequireRole";

export default function App() {
  return (
    <Router>
      <UsersProvider>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              {/* --- PUBLICAS --- */}
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

              {/* CRUD simples */}
              <Route path="/lista-productos" element={<ListaProductos />} />
              <Route path="/add-producto" element={<ProductoComponent />} />
              <Route path="/edit-producto/:id" element={<ProductoComponent />} />

              {/* --------------- ADMIN + VENDEDOR --------------- */}
              <Route
                path="/admin"
                element={
                  <RequireRole roles={["admin", "vendedor"]}>
                    <PanelAdmin />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/boletas"
                element={
                  <RequireRole roles={["admin", "vendedor"]}>
                    <Boletas />
                  </RequireRole>
                }
              />

              <Route
                path="/detalle-boleta/:id"
                element={
                  <RequireRole roles={["admin", "vendedor"]}>
                    <DetalleBoleta />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/mostrarproductos"
                element={
                  <RequireRole roles={["admin", "vendedor"]}>
                    <MostrarProductos />
                  </RequireRole>
                }
              />

              {/* --------------- SOLO ADMIN --------------- */}
              <Route
                path="/admin/panelproductos"
                element={
                  <RequireRole roles={["admin"]}>
                    <PanelProductos />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/panelusuarios"
                element={
                  <RequireRole roles={["admin"]}>
                    <PanelUsuarios />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/nuevoproducto"
                element={
                  <RequireRole roles={["admin"]}>
                    <NuevoProducto />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/nuevousuario"
                element={
                  <RequireRole roles={["admin"]}>
                    <NuevoUsuario />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/categorias"
                element={
                  <RequireRole roles={["admin"]}>
                    <CategoriasAdmin />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/editar-producto/:id"
                element={
                  <RequireRole roles={["admin"]}>
                    <EditarProducto />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/editar-usuario/:id"
                element={
                  <RequireRole roles={["admin"]}>
                    <EditarUsuario />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/reportes"
                element={
                  <RequireRole roles={["admin"]}>
                    <Reportes />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/productoscriticos"
                element={
                  <RequireRole roles={["admin"]}>
                    <ProductosCriticos />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/reporte-productos"
                element={
                  <RequireRole roles={["admin"]}>
                    <ReporteProductos />
                  </RequireRole>
                }
              />

              <Route
                path="/admin/historial-compras/:id"
                element={
                  <RequireRole roles={["admin"]}>
                    <HistorialCompras />
                  </RequireRole>
                }
              />
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </UsersProvider>
    </Router>
  );
}
