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
  return <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b-2 border-blue-100 fixed top-0 left-0 right-0 z-[9999] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16 sm:h-16 lg:h-18">
          {/* Logo - sempre visível com nome */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2 group transition-all duration-300 hover:scale-105">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <Stethoscope className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              {/* Nome sempre visível, mas responsivo */}
              <div className="flex flex-col">
                <span className="sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse text-xl">
                  RevalidaQuest
                </span>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  Sua jornada médica
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - visível em telas grandes */}
          <div className="hidden xl:flex items-center justify-center flex-1 max-w-2xl mx-4">
            <div className="flex items-center bg-gray-50/90 backdrop-blur-sm rounded-2xl px-1 py-1 border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              {navigation.map(item => {
              const isActive = location.pathname === item.href;
              return <Link key={item.name} to={item.href} className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap group ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 z-10' : 'text-gray-700 hover:bg-white/90 hover:text-blue-600 hover:shadow-md hover:scale-[1.02]'}`}>
                    <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                    <span>{item.name}</span>
                  </Link>;
            })}
            </div>
          </div>

          {/* Desktop User Progress - visível em telas médias+ */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-200">
              <UserProgressBar />
            </div>
          </div>

          {/* Mobile Menu Button - melhorado */}
          <div className="xl:hidden flex items-center">
            <MobileHamburgerMenu />
          </div>
        </div>
      </div>
    </nav>;
}