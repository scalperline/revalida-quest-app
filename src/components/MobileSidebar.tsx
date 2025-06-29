
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart3, User, Trophy, Target, HelpCircle, LogOut, X, Stethoscope } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserProgressBar } from './UserProgressBar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: Props) {
  const location = useLocation();
  const { signOut } = useAuth();

  const navigation = [{
    name: 'Dashboard',
    href: '/',
    icon: Home,
    emoji: '📊'
  }, {
    name: 'Questões',
    href: '/questions',
    icon: FileText,
    emoji: '📚'
  }, {
    name: 'Missões',
    href: '/missions',
    icon: Target,
    emoji: '🎯'
  }, {
    name: 'Progresso',
    href: '/stats',
    icon: BarChart3,
    emoji: '📈'
  }, {
    name: 'Ranking',
    href: '/ranking',
    icon: Trophy,
    emoji: '👥'
  }, {
    name: 'Perfil',
    href: '/profile',
    icon: User,
    emoji: '⚙️'
  }];

  const menuActions = [{
    name: 'Ajuda',
    icon: HelpCircle,
    emoji: '❓',
    action: () => window.open('mailto:suporte@revalidaquest.com', '_blank')
  }, {
    name: 'Sair',
    icon: LogOut,
    emoji: '🚪',
    action: () => signOut()
  }];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 backdrop-blur-xs" 
          onClick={onClose} 
        />
      )}

      {/* Side Menu */}
      <div className={`
        fixed top-0 right-0 h-full z-[9999]
        w-[320px] sm:w-[300px]
        bg-white dark:bg-gray-900
        shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent text-lg font-extrabold">
                RevalidaQuest
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Sua jornada médica
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Progress Section - Mobile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex-shrink-0">
          <UserProgressBar />
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-4">
            {navigation.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  onClick={onClose} 
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium 
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
          <nav className="space-y-1 px-4">
            {menuActions.map(item => (
              <button 
                key={item.name} 
                onClick={() => {
                  item.action();
                  onClose();
                }} 
                className="
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium 
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex-shrink-0">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="font-semibold text-blue-600 dark:text-blue-400">© 2024 RevalidaQuest</p>
            <p className="text-xs">Versão 2.0.1</p>
          </div>
        </div>
      </div>
    </>
  );
}
