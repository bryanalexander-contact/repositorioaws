import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const location = useLocation();

  const links = [
    { to: "/admin/mostrar-productos", label: "Productos" },
    { to: "/admin/mostrar-usuarios", label: "Usuarios" },
    { to: "/admin/ofertas", label: "Ofertas" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 space-y-3">
      <h2 className="text-xl font-bold mb-4">Panel Admin</h2>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`block p-2 rounded ${location.pathname === link.to ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
