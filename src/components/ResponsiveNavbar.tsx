
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from '@/components/UserProgressBar';
import { MobileHamburgerButton } from '@/components/MobileHamburgerButton';
import { MobileHamburgerMenu } from '@/components/MobileHamburgerMenu';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Target, Trophy, BarChart3, User, Crown, Stethoscope, Menu, X, Flag, Play } from 'lucide-react';

export function ResponsiveNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { to: '/', icon: Search, label: 'Início' },
    { to: '/questions', icon: Target, label: 'Questões' },
    { to: '/missions', icon: Flag, label: 'Missões' },
    { to: '/simulado', icon: Play, label: 'Simulado' },
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

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsTabletMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Logo - Responsive sizing */}
            <Link to="/" className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-left leading-tight">
                  RevalidaQuest
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5 sm:-mt-1 text-left whitespace-nowrap">
                  sua jornada médica
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile and tablet */}
            {user && (
              <div className="hidden xl:flex items-center -space-x-px ml-8 lg:ml-12">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  return (
                    <Link key={item.to} to={item.to}>
                      <Button 
                        variant={isActive ? "default" : "ghost"} 
                        size="sm" 
                        className={`flex items-center gap-2 h-9 xl:h-10 px-3 xl:px-4 text-sm xl:text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                          isActive 
                            ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 shadow-gray-900/20' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 hover:shadow-gray-500/10'
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

            {/* Tablet Navigation - Visible on tablet only */}
            {user && (
              <div className="hidden md:flex xl:hidden items-center gap-1">
                {navItems.slice(0, 5).map(item => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  return (
                    <Link key={item.to} to={item.to}>
                      <Button 
                        variant={isActive ? "default" : "ghost"} 
                        size="sm" 
                        className={`flex items-center justify-center w-10 h-10 p-0 transition-all duration-300 ${
                          isActive 
                            ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                        }`}
                        title={item.label}
                      >
                        <Icon className="w-5 h-5" />
                      </Button>
                    </Link>
                  );
                })}
                
                {/* Tablet More Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsTabletMenuOpen(true)}
                  className="flex items-center justify-center w-10 h-10 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                  title="Mais opções"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Right Side - Progress + Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user && <UserProgressBar />}
              
              {/* Mobile Menu Button - Visible on mobile only */}
              {user && (
                <div className="md:hidden">
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

      {/* Tablet More Menu Modal */}
      {user && isTabletMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:block xl:hidden"
            onClick={() => setIsTabletMenuOpen(false)}
          />
          <div className="fixed top-16 right-4 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 border border-gray-200 dark:border-gray-700 md:block xl:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Menu</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsTabletMenuOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {navItems.slice(5).map(item => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  return (
                    <Link key={item.to} to={item.to}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start h-10 ${
                          isActive 
                            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
