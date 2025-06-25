import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StreakDisplay } from "./StreakDisplay";
import { useGamification } from "@/hooks/useGamification";
import { cn } from "@/lib/utils";
import { Menu, X, Trophy, FileText, BarChart3, User, Home, Stethoscope, Flag, Crown } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userProgress } = useGamification();

  const navItems = [
    { name: "Início", path: "/", icon: Home },
    { name: "Provas", path: "/questions", icon: FileText },
    { name: "Quests", path: "/missions", icon: Flag },
    { name: "Ranking", path: "/ranking", icon: Crown },
    { name: "Estatísticas", path: "/stats", icon: BarChart3 },
    { name: "Perfil", path: "/profile", icon: User },
  ];

  const isActivePath = (itemPath: string) => {
    return location.pathname === itemPath || 
      (itemPath === '/questions' && location.pathname === '/questoes') ||
      (itemPath === '/stats' && location.pathname === '/estatisticas') ||
      (itemPath === '/profile' && location.pathname === '/perfil') ||
      (itemPath === '/missions' && location.pathname === '/missoes');
  };

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">
              Revalida Quest
            </span>
            <span className="font-bold text-lg gradient-text sm:hidden">
              RQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={cn(
                    "nav-menu-item text-sm xl:text-base px-3 py-2 rounded-lg",
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Streak Display & Level */}
          <div className="hidden md:flex items-center gap-3">
            <StreakDisplay />
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200">
              <Trophy className="w-4 h-4" />
              <span className="font-bold text-sm">Nv. {userProgress.level}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden touch-target"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        )}>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "nav-menu-item w-full",
                      isActive 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                        : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Streak & Level */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <StreakDisplay />
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                <Trophy className="w-5 h-5" />
                <span className="font-bold text-base">Nv. {userProgress.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
