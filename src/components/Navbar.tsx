
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from '@/components/UserProgressBar';
import { MobileHamburgerButton } from '@/components/MobileHamburgerButton';
import { MobileHamburgerMenu } from '@/components/MobileHamburgerMenu';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Target, Trophy, BarChart3, User, Crown } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: BookOpen, label: 'Início', color: 'text-blue-600' },
    { to: '/questions', icon: Target, label: 'Questões', color: 'text-green-600' },
    { to: '/ranking', icon: Trophy, label: 'Ranking', color: 'text-yellow-600' },
    { to: '/stats', icon: BarChart3, label: 'Estatísticas', color: 'text-purple-600' },
    { to: '/profile', icon: User, label: 'Perfil', color: 'text-indigo-600' },
    { to: '/pricing', icon: Crown, label: 'Premium', color: 'text-pink-600' }
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RevalidaQuest
              </span>
            </Link>

            {/* Desktop Navigation */}
            {user && (
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  
                  return (
                    <Link key={item.to} to={item.to}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`flex items-center gap-2 h-9 xl:h-10 px-3 xl:px-4 text-sm xl:text-base font-medium transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700' 
                            : `hover:bg-gray-100 dark:hover:bg-gray-800 ${item.color} hover:text-opacity-80 hover:scale-105`
                        }`}
                      >
                        <Icon className="w-4 h-4 xl:w-5 xl:h-5" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* User Progress & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-3">
              {user && <UserProgressBar />}
              
              {user && (
                <div className="lg:hidden">
                  <MobileHamburgerButton
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {user && (
        <MobileHamburgerMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          isActivePath={isActivePath}
        />
      )}
    </>
  );
}
