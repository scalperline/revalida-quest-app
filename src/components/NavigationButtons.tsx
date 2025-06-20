
import { Link, useLocation } from "react-router-dom";
import { Book, Timer, BarChartBig, User, Home } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

const navigationItems = [
  { label: "Início", to: "/", icon: Home },
  { label: "Questões", to: "/questoes", icon: Book },
  { label: "Simulados", to: "/simulado", icon: Timer },
  { label: "Desempenho", to: "/estatisticas", icon: BarChartBig },
  { label: "Perfil", to: "/perfil", icon: User },
];

export function NavigationButtons() {
  const { pathname } = useLocation();
  const { playSound } = useAudio();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {navigationItems.map(({ label, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={() => playSound('click')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium border ${
            pathname === to || (pathname.startsWith(to) && to !== "/")
              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
              : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
          }`}
        >
          <Icon size={18} />
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </div>
  );
}
