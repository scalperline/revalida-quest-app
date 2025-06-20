
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, Timer, BarChartBig, User, Home } from "lucide-react";

const navigationItems = [
  { label: "Início", to: "/", icon: Home },
  { label: "Questões", to: "/questoes", icon: Book },
  { label: "Simulados", to: "/simulado", icon: Timer },
  { label: "Estatísticas", to: "/estatisticas", icon: BarChartBig },
  { label: "Perfil", to: "/perfil", icon: User },
];

export function NavigationButtons() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {navigationItems.map(({ label, to, icon: Icon }) => (
        <Button
          key={to}
          asChild
          variant={pathname === to ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-2"
        >
          <Link to={to}>
            <Icon size={16} />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
