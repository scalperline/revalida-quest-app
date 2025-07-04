
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserProgressBar } from './UserProgressBar';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { MobileProgressIndicator } from './MobileProgressIndicator';
import { Stethoscope } from 'lucide-react';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 py-2 group transition-all duration-300 hover:scale-105"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse">
                RevalidaQuest
              </span>
              <span className="hidden sm:block text-xs text-gray-500 -mt-1">
                Sua jornada médica
              </span>
            </div>
          </Link>

          {/* Desktop User Progress */}
          {user && (
            <div className="hidden md:flex items-center">
              <UserProgressBar />
            </div>
          )}

          {/* Mobile: Progress + Menu */}
          {user && (
            <div className="flex md:hidden items-center gap-2">
              <MobileProgressIndicator />
              <MobileHamburgerMenu />
            </div>
          )}

          {/* Desktop: Menu when not logged in */}
          {!user && (
            <div className="flex items-center gap-4">
              <Link 
                to="/auth" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Entrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
