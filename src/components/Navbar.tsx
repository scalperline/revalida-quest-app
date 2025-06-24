import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StreakDisplay } from "./StreakDisplay";
import { useGamification } from "@/hooks/useGamification";
import { Menu, X, Trophy, FileText, BarChart3, User, Home, Stethoscope, Flag } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userProgress } = useGamification();

  const navItems = [
    { name: "Início", path: "/", icon: Home },
    { name: "Provas", path: "/questions", icon: FileText },
    { name: "Simulado", path: "/simulado", icon: Trophy },
    { name: "Quests", path: "/missions", icon: Flag },
    { name: "Estatísticas", path: "/stats", icon: BarChart3 },
    { name: "Perfil", path: "/profile", icon: User },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revalida Quest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/questoes" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Questões
            </Link>
            <Link 
              to="/simulado" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Simulado
            </Link>
            <Link 
              to="/missoes" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Quests
            </Link>
            <Link 
              to="/ranking" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Ranking
            </Link>
            <Link 
              to="/estatisticas" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Estatísticas
            </Link>
            <Link 
              to="/perfil" 
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Perfil
            </Link>
          </div>

          {/* Streak Display & Level */}
          <div className="hidden md:flex items-center gap-4">
            <StreakDisplay />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
              <Trophy className="w-4 h-4" />
              <span className="font-bold text-sm">Nv. {userProgress.level}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path === '/questions' && location.pathname === '/questoes') ||
                  (item.path === '/stats' && location.pathname === '/estatisticas') ||
                  (item.path === '/profile' && location.pathname === '/perfil');
                
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start gap-2 ${
                        isActive 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                          : ""
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Streak & Level */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <StreakDisplay />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                <Trophy className="w-4 h-4" />
                <span className="font-bold text-sm">Nv. {userProgress.level}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
