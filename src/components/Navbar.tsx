
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
    { to: '/', icon: BookOpen, label: 'Início' },
    { to: '/questions', icon: Target, label: 'Questões' },
    { to: '/ranking', icon: Trophy, label: 'Ranking' },
    { to: '/stats', icon: BarChart3, label: 'Estatísticas' },
    { to: '/profile', icon: User, label: 'Perfil' },
    { to: '/pricing', icon: Crown, label: 'Premium' }
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center">
                <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-white dark:text-gray-900" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
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
                        className={`flex items-center gap-2 h-9 xl:h-10 px-3 xl:px-4 text-sm xl:text-base font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
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
