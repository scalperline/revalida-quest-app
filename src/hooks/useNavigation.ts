import { useLocation } from 'react-router-dom';
import { Search, Target, Trophy, BarChart3, User, Crown, Stethoscope } from 'lucide-react';

export interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export function useNavigation() {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      to: '/',
      icon: Search,
      label: 'Início'
    },
    {
      to: '/questions',
      icon: Target,
      label: 'Questões'
    },
    {
      to: '/ranking',
      icon: Trophy,
      label: 'Ranking'
    },
    {
      to: '/stats',
      icon: BarChart3,
      label: 'Estatísticas'
    },
    {
      to: '/profile',
      icon: User,
      label: 'Perfil'
    },
    {
      to: '/missions',
      icon: Crown,
      label: 'Missões'
    },
    {
      to: '/simulado',
      icon: Stethoscope,
      label: 'Simulado'
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return {
    navItems,
    isActivePath,
    currentPath: location.pathname
  };
}