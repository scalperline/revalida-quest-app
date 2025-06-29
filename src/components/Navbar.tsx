
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FileText, BarChart3, User, Trophy, Target, Stethoscope, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from './UserProgressBar';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [{
    name: 'Início',
    href: '/',
    icon: Home
  }, {
    name: 'Provas',
    href: '/questions',
    icon: FileText
  }, {
    name: 'Missões',
    href: '/missions',
    icon: Target
  }, {
    name: 'Estatísticas',
    href: '/stats',
    icon: BarChart3
  }, {
    name: 'Ranking',
    href: '/ranking',
    icon: Trophy
  }, {
    name: 'Perfil',
    href: '/profile',
    icon: User
  }];
  
  const closeSheet = () => setIsOpen(false);
  
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b-2 border-blue-100 fixed top-0 left-0 right-0 z-[9999] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20 min-h-[64px]">
          {/* Enhanced Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2 group transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="hidden xs:flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse">
                  RevalidaQuest
                </span>
                <span className="text-xs sm:text-sm text-gray-500 -mt-1 hidden sm:block">
                  Sua jornada médica
                </span>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation - visível apenas em telas lg+ */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-3xl mx-6 xl:mx-8">
            <div className="flex items-center bg-gray-50/90 backdrop-blur-sm rounded-2xl px-2 py-2 border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              {navigation.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={`flex items-center gap-2 px-3 xl:px-4 py-2.5 xl:py-3 rounded-xl text-sm xl:text-base font-medium transition-all duration-300 whitespace-nowrap group ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 z-10' 
                        : 'text-gray-700 hover:bg-white/90 hover:text-blue-600 hover:shadow-md hover:scale-102'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                    <span className="hidden xl:inline transition-opacity duration-300">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Enhanced Desktop User Progress Bar - visível apenas em telas lg+ */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-200">
              <UserProgressBar />
            </div>
          </div>

          {/* Enhanced Mobile: Hamburger Menu */}
          <div className="lg:hidden flex items-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200">
              <MobileHamburgerMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
