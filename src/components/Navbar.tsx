
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  BarChart3, 
  User, 
  Trophy,
  Target,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from './UserProgressBar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Provas', href: '/questions', icon: FileText },
    { name: 'Quests', href: '/missions', icon: Target },
    { name: 'Estatísticas', href: '/stats', icon: BarChart3 },
    { name: 'Ranking', href: '/ranking', icon: Trophy },
    { name: 'Perfil', href: '/profile', icon: User },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[64px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 py-2 mr-4 sm:mr-8">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text leading-tight whitespace-nowrap">
                Revalida Quest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

          {/* Desktop User Progress Bar */}
          <div className="hidden md:block">
            <UserProgressBar />
          </div>

          {/* Mobile: Progress Bar + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Progress Bar */}
            <div className="flex-shrink-0">
              <UserProgressBar />
            </div>
            
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 flex-shrink-0 p-2"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                    <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center shadow-md">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-bold gradient-text">
                      Revalida Quest
                    </span>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2">
                      {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={closeSheet}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                                : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600'
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                  
                  {/* Footer */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-center text-sm text-gray-500">
                      <p>Revalida Quest</p>
                      <p className="text-xs">Sua jornada médica</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
