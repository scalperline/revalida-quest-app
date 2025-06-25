
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
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 border-b-2 border-blue-200/50 dark:border-blue-700/50 sticky top-0 z-40 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Revalida Quest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/questions' && location.pathname === '/questoes') ||
                (item.path === '/stats' && location.pathname === '/estatisticas') ||
                (item.path === '/profile' && location.pathname === '/perfil') ||
                (item.path === '/missions' && location.pathname === '/missoes');
              
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`font-medium transition-all duration-300 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm xl:text-base transform hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30" 
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 hover:shadow-md"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side content */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4">
            {user && (
              <>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 border border-blue-200/50 dark:border-blue-700/50">
                  <StreakDisplay />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-shadow duration-300">
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold text-sm">Nv. {userProgress.level}</span>
                </div>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 hover:scale-105">
                      <Avatar className="h-10 w-10 border-2 border-blue-300 dark:border-blue-600 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50 rounded-xl shadow-2xl" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-t-lg">
                      <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">{user.email}</p>
                      <p className="text-xs leading-none text-gray-600 dark:text-gray-400">
                        Nível {userProgress.level} • {userProgress.xp} XP
                      </p>
                    </div>
                    <DropdownMenuSeparator className="bg-blue-200/50 dark:bg-blue-700/50" />
                    <DropdownMenuItem asChild className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-lg m-1">
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-lg m-1">
                      <Link to="/stats" className="flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Estatísticas
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-blue-200/50 dark:bg-blue-700/50" />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-800/20 rounded-lg m-1">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {!user && (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl px-6 py-2.5 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden min-h-[48px] min-w-[48px] rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t-2 border-blue-200/30 dark:border-blue-700/30 bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 backdrop-blur-sm rounded-b-xl">
            <div className="flex flex-col space-y-2">
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
                      className={`w-full justify-start gap-3 text-lg py-4 min-h-[56px] rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30" 
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 hover:shadow-md"
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
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t-2 border-blue-200/30 dark:border-blue-700/30">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 border border-blue-200/50 dark:border-blue-700/50">
                  <StreakDisplay />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg shadow-yellow-500/30">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold text-base">Nv. {userProgress.level}</span>
                </div>
              </div>
            )}
            
            {/* Mobile Auth Button */}
            {!user && (
              <div className="mt-6 pt-4 border-t-2 border-blue-200/30 dark:border-blue-700/30">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
                    Entrar / Cadastrar
                  </Button>
                </Link>
              </div>
            )}
            
            {user && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-2 border-red-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:border-red-600 dark:hover:from-red-900/20 dark:hover:to-red-800/20 rounded-xl transition-all duration-300"
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
