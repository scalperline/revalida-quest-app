import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart3, User, Trophy, Target, HelpCircle, LogOut, X, Stethoscope } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MobileUserProgress } from './MobileUserProgress';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export function MobileSidebar({
  isOpen,
  onClose
}: Props) {
  const location = useLocation();
  const {
    signOut
  } = useAuth();
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
    name: 'Estatísticas',
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
  return <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 backdrop-blur-sm" onClick={onClose} />}

      {/* Side Menu */}
      <div className={`
        fixed inset-y-0 right-0 z-[9999]
        w-[300px] sm:w-[280px]
        bg-white dark:bg-gray-900
        shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
        flex flex-col
        h-screen
      `}>
        {/* Header - Professional spacing with complete logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 py-2 group transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse">
                RevalidaQuest
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Sua jornada médica
              </span>
            </div>
          </Link>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Progress Section - Compact container */}
        <div className="border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gradient-to-r from-gray-50/80 to-blue-50/30 dark:from-gray-800/80 dark:to-gray-700/30 py-0 px-0">
          <MobileUserProgress />
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-4">
          <nav className="px-4 space-y-1">
            {navigation.map(item => {
            const isActive = location.pathname === item.href;
            return <Link key={item.name} to={item.href} onClick={onClose} className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium 
                    transition-all duration-200 group
                    ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'}
                  `}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                </Link>;
          })}
          </nav>
        </div>

        {/* Action Items */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gradient-to-r from-gray-50/80 to-blue-50/30 dark:from-gray-800/80 dark:to-gray-700/30">
          <nav className="space-y-1">
            {menuActions.map(item => <button key={item.name} onClick={() => {
            item.action();
            onClose();
          }} className="
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium 
                  text-gray-600 dark:text-gray-400 
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                  transition-all duration-200
                ">
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.name}</span>
              </button>)}
          </nav>
        </div>

        {/* Footer - Compact spacing */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">© 2024 RevalidaQuest</p>
            <p className="text-xs mt-1">Versão 2.0.1</p>
          </div>
        </div>
      </div>
    </>;
}
