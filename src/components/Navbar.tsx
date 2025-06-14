
import { Link, useLocation } from "react-router-dom";
import { Book, Timer, BarChartBig, Stethoscope } from "lucide-react"; // <- trocou HomeIcon por Stethoscope

const links = [
  { label: "Questões", to: "/questoes", icon: Book },
  { label: "Simulados", to: "/simulado", icon: Timer },
  { label: "Desempenho", to: "/estatisticas", icon: BarChartBig },
];

export function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full bg-background border-b border-border px-3 md:px-7 py-2 flex items-center gap-4 shadow-sm z-30 sticky top-0">
      <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl md:text-2xl mr-6 hover:opacity-80 transition-opacity hover-scale">
        <Stethoscope size={28} className="text-blue-500" /> {/* logo de medicina */}
        <span className="tracking-tighter">RevalidaQuest</span>
      </Link>
      <ul className="flex gap-1 sm:gap-2 md:gap-4 flex-1">
        {links.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            <Link
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 font-medium border border-transparent ${
                pathname.startsWith(to)
                  ? "bg-primary/70 text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:block">
        {/* Placeholder para futuras ações de usuário/configurações */}
      </div>
    </nav>
  );
}
