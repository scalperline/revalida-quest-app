
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { StreakDisplay } from "./StreakDisplay";
import { useGamification } from "@/hooks/useGamification";
import { Menu, X, Trophy, FileText, BarChart3, User, Home, Stethoscope, Flag, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userProgress } = useGamification();

  const navItems = [
    { name: "Início", path: "/", icon: Home },
    { name: "Provas", path: "/questoes", icon: FileText },
    { name: "Quests", path: "/missoes", icon: Flag },
    { name: "Ranking", path: "/ranking", icon: Crown },
    { name: "Estatísticas", path: "/estatisticas", icon: BarChart3 },
    { name: "Perfil", path: "/perfil", icon: User },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <Typography variant="h4" color="gradient" className="font-bold">
              Revalida Quest
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link key={item.path} to={item.path}>
                  <div className={cn(
                    "nav-item",
                    isActive ? "nav-item-active" : "nav-item-inactive"
                  )}>
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Stats */}
          <div className="hidden md:flex items-center gap-4">
            <StreakDisplay />
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg mobile-touch">
              <Trophy className="w-4 h-4" />
              <Typography variant="button" className="text-white font-bold">
                Nv. {userProgress.level}
              </Typography>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mobile-touch"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mobile-menu">
            <div className="flex flex-col">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <div className={cn(
                      "mobile-menu-item flex items-center gap-4",
                      isActive 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                        : "text-gray-700 dark:text-gray-300"
                    )}>
                      <Icon className="w-5 h-5" />
                      <Typography variant="button" className="font-medium">
                        {item.name}
                      </Typography>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Stats */}
            <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
              <StreakDisplay />
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                <Trophy className="w-5 h-5" />
                <Typography variant="button" className="text-white font-bold">
                  Nv. {userProgress.level}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
