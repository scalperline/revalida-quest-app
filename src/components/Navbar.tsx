
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FileText, BarChart3, User, Trophy, Flag, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from './UserProgressBar';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { MobileProgressDrawer } from './MobileProgressDrawer';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [{
    name: 'Início',
    href: '/',
    icon: Home
  }, {
    name: 'Questões',
    href: '/questions',
    icon: FileText
  }, {
    name: 'Missões',
    href: '/missions',
    icon: Flag
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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo - Responsive sizing */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 hover:scale-105 transition-transform min-w-0 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden xxs:block">
                RevalidaQuest
              </span>
              {/* Abbreviated logo for very small screens */}
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block xxs:hidden">
                RQ
              </span>
            </Link>

            {/* Desktop/Tablet Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center max-w-4xl">
              <nav className="flex items-center gap-1 xl:gap-2">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className={`
                        h-9 xl:h-10 px-3 xl:px-4 
                        text-sm xl:text-base font-medium 
                        text-gray-700 hover:text-blue-600 
                        hover:bg-blue-50 transition-all duration-200 
                        border border-transparent hover:border-blue-200 
                        hover:shadow-sm rounded-xl
                        ${isActive ? 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm' : ''}
                      `}
                    >
                      <Link to={item.href} className="flex items-center gap-1.5 xl:gap-2">
                        <item.icon className="w-4 h-4" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </div>

            {/* Tablet Navigation - Visible only on medium screens */}
            <div className="hidden md:flex lg:hidden items-center gap-1 flex-1 justify-center max-w-2xl">
              <nav className="flex items-center gap-0.5">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className={`
                        h-8 px-2 text-xs font-medium 
                        text-gray-700 hover:text-blue-600 
                        hover:bg-blue-50 transition-all duration-200 
                        border border-transparent hover:border-blue-200 
                        hover:shadow-sm rounded-lg
                        ${isActive ? 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm' : ''}
                      `}
                    >
                      <Link to={item.href} className="flex items-center gap-1">
                        <item.icon className="w-3.5 h-3.5" />
                        {/* Hide text on smaller tablets, show icons only */}
                        <span className="hidden md-lg:block whitespace-nowrap text-xs">{item.name}</span>
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </div>

            {/* User Progress Section - Responsive positioning */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
              <div className="hidden md:block pl-3 lg:pl-4 border-l border-blue-200">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2 md:px-3 py-1 lg:py-1.5 shadow-md border border-gray-200">
                  <UserProgressBar />
                </div>
              </div>
              
              {/* Simplified progress for small tablets */}
              <div className="block md:hidden">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md border border-gray-200">
                  <UserProgressBar />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button - Responsive sizing */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              {/* Mobile progress indicator */}
              <div className="block sm:hidden">
                <MobileProgressDrawer />
              </div>
              <MobileHamburgerMenu />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Slide down on very small tablets */}
        <div className="block md:hidden">
          <div className="border-t border-blue-100 bg-white/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <nav className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-hide">
                {navigation.slice(0, 4).map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className={`
                        h-8 px-2 text-xs font-medium min-w-0 flex-shrink-0
                        text-gray-700 hover:text-blue-600 
                        hover:bg-blue-50 transition-all duration-200 
                        border border-transparent hover:border-blue-200 
                        hover:shadow-sm rounded-lg
                        ${isActive ? 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm' : ''}
                      `}
                    >
                      <Link to={item.href} className="flex flex-col items-center gap-0.5">
                        <item.icon className="w-3.5 h-3.5" />
                        <span className="text-xs whitespace-nowrap">{item.name}</span>
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Progress Drawer */}
      <MobileProgressDrawer />
    </>
  );
}
