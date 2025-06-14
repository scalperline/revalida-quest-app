
import { Link, useLocation } from "react-router-dom";
import { Book, Timer, FileText } from "lucide-react";

const links = [
  { label: "Dashboard", to: "/", icon: FileText },
  { label: "Banco de Questões", to: "/questoes", icon: Book },
  { label: "Simulado", to: "/simulado", icon: Timer },
  { label: "Estatísticas", to: "/estatisticas", icon: FileText },
];

export function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-4 shadow-sm z-30 sticky top-0">
      <div className="text-2xl font-bold tracking-tight text-primary flex-1">
        RevalidaQuest
      </div>
      <ul className="flex gap-4">
        {links.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            <Link
              to={to}
              className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors ${
                pathname === to ? "text-primary font-semibold bg-primary/10" : "text-gray-700"
              }`}
            >
              <Icon size={18} className="mr-1" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
