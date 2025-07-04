
import { Menu, X } from 'lucide-react';

interface MobileHamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function MobileHamburgerButton({ isOpen, onToggle, className = '' }: MobileHamburgerButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative p-2 rounded-lg transition-all duration-200 
        bg-gradient-to-r from-blue-500 to-purple-600 
        hover:from-blue-600 hover:to-purple-700 
        text-white shadow-lg hover:shadow-xl 
        transform hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className="relative w-5 h-5">
        <Menu 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <X 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
          }`} 
        />
      </div>
    </button>
  );
}
