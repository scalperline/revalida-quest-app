
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
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

  const closeSheet = () => setIsOpen(false);

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-[9980]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 min-h-[64px]">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 medical-gradient rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Stethoscope className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm sm:text-lg md:text-xl font-bold gradient-text leading-tight hidden xs:block">
                  Revalida Quest
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - visível apenas em telas lg+ */}
            <div className="hidden lg:flex items-center space-x-2">
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

            {/* Desktop User Progress Bar - visível apenas em telas lg+ */}
            <div className="hidden lg:block flex-shrink-0">
              <UserProgressBar />
            </div>

            {/* Mobile: Spacer to prevent overlap with hamburger menu */}
            <div className="lg:hidden w-12 h-12 flex-shrink-0">
              {/* Espaço reservado para evitar sobreposição com o menu hambúrguer */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Menu - Only visible on mobile/tablet */}
      <div className="lg:hidden">
        <MobileHamburgerMenu />
      </div>
    </>
  );
}
