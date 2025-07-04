
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
        <div className="w-full max-w-none mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18 xl:h-20">
            {/* Logo - Fixed size and spacing */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0 group hover:scale-105 transition-transform duration-200">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="flex flex-col min-w-0 overflow-hidden">
                <span className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  RevalidaQuest
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground -mt-1 leading-tight hidden xs:block">
                  sua jornada médica
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Show all items with proper spacing */}
            {user && (
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 ml-4 xl:ml-8 flex-1 justify-center max-w-4xl">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  return (
                    <Link key={item.to} to={item.to} className="flex-shrink-0">
                      <Button 
                        variant={isActive ? "default" : "ghost"} 
                        size="sm" 
                        className={`flex items-center gap-1.5 xl:gap-2 h-9 xl:h-10 px-2.5 xl:px-4 text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 flex-shrink-0" />
                        <span className="hidden xl:inline">{item.label}</span>
                        <span className="lg:inline xl:hidden text-2xs">{item.label.substring(0, 4)}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Tablet Navigation - Compact version */}
            {user && (
              <div className="hidden md:flex lg:hidden items-center gap-1 ml-4 flex-1 justify-center">
                {navItems.slice(0, 5).map(item => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  return (
                    <Link key={item.to} to={item.to}>
                      <Button 
                        variant={isActive ? "default" : "ghost"} 
                        size="sm" 
                        className={`flex items-center justify-center w-9 h-9 p-0 transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-md' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                        title={item.label}
                      >
                        <Icon className="w-4 h-4" />
                      </Button>
                    </Link>
                  );
                })}
                
                {/* Tablet More Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsTabletMenuOpen(true)}
                  className="flex items-center justify-center w-9 h-9 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                  title="Mais opções"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Right Side - Progress + Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
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
