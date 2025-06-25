
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StreakDisplay } from "./StreakDisplay";
import { useGamification } from "@/hooks/useGamification";
import { useAuth } from "@/hooks/useAuth";
import { 
  Menu, X, Trophy, FileText, BarChart3, User, Home, Stethoscope, 
  Flag, Crown, LogOut, Settings 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userProgress } = useGamification();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Início", path: "/", icon: Home },
    { name: "Provas", path: "/questions", icon: FileText },
    { name: "Quests", path: "/missions", icon: Flag },
    { name: "Ranking", path: "/ranking", icon: Crown },
    { name: "Estatísticas", path: "/stats", icon: BarChart3 },
    { name: "Perfil", path: "/profile", icon: User },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revalida Quest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-lg text-sm xl:text-base ${
                  location.pathname === item.path || 
                  (item.path === '/questions' && location.pathname === '/questoes') ||
                  (item.path === '/stats' && location.pathname === '/estatisticas') ||
                  (item.path === '/profile' && location.pathname === '/perfil') ||
                  (item.path === '/missions' && location.pathname === '/missoes')
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side content */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4">
            {user && (
              <>
                <StreakDisplay />
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold text-sm">Nv. {userProgress.level}</span>
                </div>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-blue-200">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Nível {userProgress.level} • {userProgress.xp} XP
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/stats" className="flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Estatísticas
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {!user && (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden min-h-[48px] min-w-[48px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              {user && navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path === '/questions' && location.pathname === '/questoes') ||
                  (item.path === '/stats' && location.pathname === '/estatisticas') ||
                  (item.path === '/profile' && location.pathname === '/perfil') ||
                  (item.path === '/missions' && location.pathname === '/missoes');
                
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="lg"
                      className={`w-full justify-start gap-3 text-lg py-4 min-h-[56px] ${
                        isActive 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                          : ""
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile User Info */}
            {user && (
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <StreakDisplay />
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold text-base">Nv. {userProgress.level}</span>
                </div>
              </div>
            )}
            
            {/* Mobile Auth Button */}
            {!user && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Entrar / Cadastrar
                  </Button>
                </Link>
              </div>
            )}
            
            {user && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
