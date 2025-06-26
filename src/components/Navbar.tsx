
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  BarChart3, 
  User, 
  Trophy,
  Target,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from './UserProgressBar';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Provas', href: '/questions', icon: FileText },
    { name: 'Quests', href: '/missions', icon: Target },
    { name: 'Estatísticas', href: '/stats', icon: BarChart3 },
    { name: 'Ranking', href: '/ranking', icon: Trophy },
    { name: 'Perfil', href: '/profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[64px]">
          {/* Logo - Ajustada com melhor proporção e alinhamento */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 py-2 mr-6">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text leading-tight whitespace-nowrap">
                Revalida Quest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Espaçamento melhorado */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop User Progress Bar */}
          <div className="hidden md:block">
            <UserProgressBar />
          </div>

          {/* Mobile menu button and compact progress */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Progresso compacto para mobile */}
            <div className="scale-90">
              <UserProgressBar />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
