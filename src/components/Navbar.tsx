
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  BarChart3, 
  User, 
  Trophy, 
  Target, 
  Menu, 
  X,
  Home,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Início", href: "/", icon: Home },
  { name: "Questões", href: "/questions", icon: BookOpen },
  { name: "Missões", href: "/missions", icon: Target },
  { name: "Estatísticas", href: "/stats", icon: BarChart3 },
  { name: "Ranking", href: "/ranking", icon: Users },
  { name: "Perfil", href: "/profile", icon: User },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-blue-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Revalida Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Sua jornada rumo ao sucesso
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/questions" && location.pathname === "/questoes") ||
                (item.href === "/missions" && location.pathname === "/missoes") ||
                (item.href === "/stats" && location.pathname === "/estatisticas") ||
                (item.href === "/profile" && location.pathname === "/perfil");
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 hover:scale-105"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === "/questions" && location.pathname === "/questoes") ||
                  (item.href === "/missions" && location.pathname === "/missoes") ||
                  (item.href === "/stats" && location.pathname === "/estatisticas") ||
                  (item.href === "/profile" && location.pathname === "/perfil");
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
