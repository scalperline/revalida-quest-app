import { Link } from "react-router-dom";
import { Trophy, BookOpen, BarChart3, Target, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Revalida Quest
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/questoes"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Questões
            </Link>
            <Link
              to="/missoes"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
            >
              <Target className="w-4 h-4 mr-2" />
              Missões
            </Link>
            <Link
              to="/estatisticas"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Estatísticas
            </Link>
            <Link
              to="/perfil"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Link>
            <Link
              to="/ranking"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Ranking
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4" />
              <span>{user?.email?.split('@')[0] || 'Usuário'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  <Link
                    to="/questoes"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Questões</span>
                  </Link>
                  <Link
                    to="/missoes"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Target className="w-5 h-5" />
                    <span>Missões</span>
                  </Link>
                  <Link
                    to="/estatisticas"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Estatísticas</span>
                  </Link>
                  <Link
                    to="/perfil"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Perfil</span>
                  </Link>
                  <Link
                    to="/ranking"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Ranking</span>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="justify-start text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sair
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
