
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  BarChart3, 
  User, 
  Trophy,
  Target,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserProgressBar } from './UserProgressBar';

interface Props {
  className?: string;
}

export function MobileHamburgerMenu({ className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, emoji: '📊' },
    { name: 'Questões', href: '/questions', icon: FileText, emoji: '📚' },
    { name: 'Missões', href: '/missions', icon: Target, emoji: '🎯' },
    { name: 'Progresso', href: '/stats', icon: BarChart3, emoji: '📈' },
    { name: 'Ranking', href: '/ranking', icon: Trophy, emoji: '👥' },
    { name: 'Perfil', href: '/profile', icon: User, emoji: '⚙️' },
  ];

  const menuActions = [
    { name: 'Ajuda', icon: HelpCircle, emoji: '❓', action: () => window.open('mailto:suporte@revalidaquest.com', '_blank') },
    { name: 'Sair', icon: LogOut, emoji: '🚪', action: () => signOut() },
  ];

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Positioned below navbar */}
      <button
        onClick={toggleMenu}
        className={`
          fixed top-20 right-5 z-[9999] 
          w-11 h-11 
          bg-gradient-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800
          rounded-lg shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
          border border-blue-500/20
          ${className}
          xs:w-10 xs:h-10 xs:top-[72px] xs:right-4
        `}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
          {/* Hamburger Lines */}
          <span 
            className={`
              block absolute h-0.5 w-5 bg-white 
              transition-all duration-300 ease-in-out
              ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}
            `}
          />
          <span 
            className={`
              block absolute h-0.5 w-5 bg-white 
              transition-all duration-300 ease-in-out
              ${isOpen ? 'opacity-0' : 'opacity-100'}
            `}
          />
          <span 
            className={`
              block absolute h-0.5 w-5 bg-white 
              transition-all duration-300 ease-in-out
              ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}
            `}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Side Menu */}
      <div className={`
        fixed top-0 right-0 h-full z-[9999]
        w-[280px] xs:w-[260px]
        bg-white dark:bg-gray-900
        shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Revalida Quest
            </span>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Progress Section - Mobile Only */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <UserProgressBar />
        </div>

        {/* Navigation Menu */}
        <div className="py-6">
          <nav className="space-y-2 px-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium 
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 dark:hover:text-blue-300'
                    }
                  `}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mx-4" />

        {/* Action Items */}
        <div className="py-4">
          <nav className="space-y-2 px-4">
            {menuActions.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  item.action();
                  closeMenu();
                }}
                className="
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium 
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-800
                  dark:hover:from-gray-800/30 dark:hover:to-gray-700/30 dark:hover:text-gray-200
                  transition-all duration-200
                "
              >
                <span className="text-lg">{item.emoji}</span>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="font-semibold text-blue-600 dark:text-blue-400">Revalida Quest</p>
            <p className="text-xs">Sua jornada médica</p>
          </div>
        </div>
      </div>
    </>
  );
}
