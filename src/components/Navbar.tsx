import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProgressBar } from '@/components/UserProgressBar';
import { MobileHamburgerMenu } from '@/components/MobileHamburgerMenu';
import { NavbarBrand } from '@/components/navigation/NavbarBrand';
import { NavbarLinks } from '@/components/navigation/NavbarLinks';
import { NavbarActions } from '@/components/navigation/NavbarActions';
import { useAuth } from '@/hooks/useAuth';
import { Search, Target, Trophy, BarChart3, User, Crown, Stethoscope } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
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
    to: '/missions',
    icon: Crown,
    label: 'Missões'
  }, {
    to: '/simulado',
    icon: Stethoscope,
    label: 'Simulado'
  }];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavbarBrand />
            
            <NavbarLinks items={navItems} />
            
            <div className="flex items-center space-x-2">
              {user && (
                <div className="hidden sm:block">
                  <UserProgressBar />
                </div>
              )}
              
              <NavbarActions 
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>

        <MobileHamburgerMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          isActivePath={isActivePath}
        />
      </nav>
    </>
  );
}