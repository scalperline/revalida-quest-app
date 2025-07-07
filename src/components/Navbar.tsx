
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                RevalidaQuest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-2">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className={`text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 ${
                        isActive ? 'bg-blue-100 text-blue-700' : ''
                      }`}
                    >
                      <Link to={item.href} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    </Button>
                  );
                })}
              </nav>
              
              {/* User Progress Section */}
              <div className="flex items-center gap-3 pl-4 border-l border-blue-200">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md border border-gray-200">
                  <UserProgressBar />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <MobileHamburgerMenu />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Progress Drawer */}
      <MobileProgressDrawer />
    </>
  );
}
