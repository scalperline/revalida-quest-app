
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileUserProgress } from './MobileUserProgress';
import { LogoutButton } from './LogoutButton';
import {
  Home,
  HelpCircle,
  BarChart3,
  Trophy,
  Target,
  User,
  BookOpen,
  X,
  Zap
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/questions', icon: BookOpen, label: 'Questões' },
  { href: '/stats', icon: BarChart3, label: 'Estatísticas' },
  { href: '/ranking', icon: Trophy, label: 'Ranking' },
  { href: '/missions', icon: Target, label: 'Missões' },
  { href: '/profile', icon: User, label: 'Perfil' },
  { href: '/help', icon: HelpCircle, label: 'Ajuda' },
];

export function MobileSidebar({ isOpen, onClose }: Props) {
  const location = useLocation();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 menu-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw]
        bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50
        dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/30
        backdrop-blur-xl
        shadow-2xl border-l border-blue-200/30 dark:border-blue-700/30
        z-50 sidebar-menu
        ${isOpen ? 'open' : ''}
      `}>
        
        {/* Header com botão de fechar */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200/30 dark:border-blue-700/30 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Progress Section - Otimizada para mobile */}
        <div className="p-3 border-b border-blue-200/20 dark:border-blue-700/20 bg-gradient-to-r from-blue-50/40 to-transparent dark:from-gray-800/20">
          <MobileUserProgress />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    menu-item flex items-center gap-3 px-4 py-3.5 rounded-xl
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:shadow-md'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                  }`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer com logout */}
        <div className="p-3 border-t border-blue-200/20 dark:border-blue-700/20 bg-gradient-to-r from-blue-50/20 to-transparent dark:from-gray-800/10">
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
