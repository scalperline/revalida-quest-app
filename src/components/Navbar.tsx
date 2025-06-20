
import { Link, useLocation } from "react-router-dom";
import { Book, Timer, BarChartBig, User, Stethoscope } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";

const links = [
  { label: "Questões", to: "/questoes", icon: Book },
  { label: "Simulados", to: "/simulado", icon: Timer },
  { label: "Desempenho", to: "/estatisticas", icon: BarChartBig },
  { label: "Perfil", to: "/perfil", icon: User },
];

export function Navbar() {
  const { pathname } = useLocation();
  const { userProgress } = useGamification();
  const { playSound } = useAudio();
  
  return (
    <nav className="w-full bg-background border-b border-border px-3 md:px-7 py-2 flex items-center gap-4 shadow-sm z-30 sticky top-0">
      <Link 
        to="/" 
        className="flex items-center gap-1 text-blue-600 font-bold text-lg md:text-xl mr-6 hover:opacity-80 transition-opacity hover-scale whitespace-nowrap"
        onClick={() => playSound('click')}
      >
        <Stethoscope className="w-8 h-8 text-blue-600" />
        <span className="tracking-tight">Revalida Quest</span>
      </Link>
      
      <ul className="flex gap-1 sm:gap-2 md:gap-4 flex-1">
        {links.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            <Link
              to={to}
              onClick={() => playSound('click')}
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
      
      <div className="hidden lg:block min-w-[200px]">
        <ProgressBar
          level={userProgress.level}
          xp={userProgress.xp}
          xpToNextLevel={userProgress.xpToNextLevel}
        />
      </div>
    </nav>
  );
}
