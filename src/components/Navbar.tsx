
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from '@/components/UserProgressBar';
import { MobileHamburgerButton } from '@/components/MobileHamburgerButton';
import { MobileHamburgerMenu } from '@/components/MobileHamburgerMenu';
import { useAuth } from '@/hooks/useAuth';
import { Search, Target, Trophy, BarChart3, User, Crown } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    user
  } = useAuth();
  const location = useLocation();
  const navItems = [{
    to: '/',
    icon: Search,
    label: 'Início'
  }, {
    to: '/questions',
    icon: Target,
    label: 'Questões'
  }, {
    to: '/ranking',
    icon: Trophy,
    label: 'Ranking'
  }, {
    to: '/stats',
    icon: BarChart3,
    label: 'Estatísticas'
  }, {
    to: '/profile',
    icon: User,
    label: 'Perfil'
  }, {
    to: '/pricing',
    icon: Crown,
    label: 'Premium'
  }];
  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  return <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-left">
                  RevalidaQuest
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 text-left">
                  sua jornada médica
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {user && <div className="hidden lg:flex items-center -space-x-px">
                {navItems.map(item => {
              const Icon = item.icon;
              const isActive = isActivePath(item.to);
              return <Link key={item.to} to={item.to}>
                      <Button variant={isActive ? "default" : "ghost"} size="sm" className={`flex items-center gap-2 h-9 xl:h-10 px-3 xl:px-4 text-sm xl:text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md ${isActive ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 shadow-gray-900/20' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 hover:shadow-gray-500/10'}`}>
                        <Icon className="w-4 h-4 xl:w-5 xl:h-5" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>;
            })}
              </div>}

            {/* User Progress & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-3">
              {user && <UserProgressBar />}
              
              {user && <div className="lg:hidden">
                  <MobileHamburgerButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </div>}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {user && <MobileHamburgerMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navItems={navItems} isActivePath={isActivePath} />}
    </>;
}
