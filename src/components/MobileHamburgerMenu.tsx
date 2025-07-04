
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavItem {
  to: string;
  icon: React.ComponentType<any>;
  label: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isActivePath: (path: string) => boolean;
}

export function MobileHamburgerMenu({ isOpen, onClose, navItems, isActivePath }: Props) {
  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-72 xs:w-80 max-w-[85vw] bg-white dark:bg-gray-900 
        shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 xs:p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white">Menu de Navegação</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="sr-only">Fechar menu</span>
              <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-3 xs:p-4">
            <div className="space-y-1.5 xs:space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.to);
                
                return (
                  <Link key={item.to} to={item.to} onClick={onClose}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start h-11 xs:h-12 text-left px-3 xs:px-4 ${
                        isActive 
                          ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 xs:w-5 xs:h-5 mr-3 flex-shrink-0" />
                      <span className="font-medium text-sm xs:text-base">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-current rounded-full"></div>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-3 xs:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                RevalidaQuest - Sua jornada médica
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
