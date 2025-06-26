
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  BarChart3, 
  User, 
  Trophy,
  Target,
  Stethoscope,
  LogOut,
  Crown,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { SubscriptionBadge } from './SubscriptionBadge';
import { useSubscription } from '@/hooks/useSubscription';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { openCustomerPortal, subscribed } = useSubscription();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Questões', href: '/questions', icon: FileText },
    { name: 'Missões', href: '/missions', icon: Target },
    { name: 'Estatísticas', href: '/stats', icon: BarChart3 },
    { name: 'Ranking', href: '/ranking', icon: Trophy },
    { name: 'Perfil', href: '/profile', icon: User },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleManageSubscription = () => {
    if (subscribed) {
      openCustomerPortal();
    } else {
      navigate('/pricing');
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Revalida Quest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop User Menu - Gamified Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Plano Atual - Gamified Badge */}
            <div className="flex items-center bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-full px-4 py-2 border-2 border-purple-500 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 h-10">
              <Zap className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
              <div className="text-white font-semibold text-sm drop-shadow-lg">
                <SubscriptionBadge />
              </div>
            </div>
            
            {/* Upgrade Button - Enhanced Orange */}
            <Button
              onClick={handleManageSubscription}
              size="sm"
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white rounded-full px-6 py-2 h-10 text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/40 transform hover:scale-105 animate-pulse hover:animate-none border-2 border-orange-400"
            >
              <Crown className="w-4 h-4 mr-2 text-yellow-300" />
              <span>{subscribed ? 'Gerenciar' : 'Upgrade'}</span>
            </Button>
            
            {/* Logout Button - Enhanced Red */}
            <Button
              onClick={handleSignOut}
              size="sm"
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white rounded-full px-4 py-2 h-10 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/40 transform hover:scale-105 border-2 border-red-500 hover:opacity-90"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Badge */}
            <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-full px-3 py-1.5 border-2 border-purple-500 shadow-lg">
              <Zap className="w-3 h-3 text-yellow-400 mr-1 inline" />
              <div className="text-white text-xs font-semibold inline drop-shadow-lg">
                <SubscriptionBadge />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="border-t border-gray-200 pt-3 space-y-3">
              {/* Mobile Upgrade Button */}
              <Button
                onClick={() => {
                  handleManageSubscription();
                  setIsOpen(false);
                }}
                size="sm"
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/40 border-2 border-orange-400 h-12"
              >
                <Crown className="w-4 h-4 mr-2 text-yellow-300" />
                <span>{subscribed ? 'Gerenciar Assinatura' : 'Fazer Upgrade'}</span>
              </Button>
              
              {/* Mobile Logout Button */}
              <Button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                size="sm"
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/40 border-2 border-red-500 h-12 hover:opacity-90"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
