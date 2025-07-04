
import { Menu, X } from 'lucide-react';

interface MobileHamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function MobileHamburgerButton({
  isOpen,
  onToggle,
  className = ''
}: MobileHamburgerButtonProps) {
  return (
    <button 
      onClick={onToggle} 
      className={`
        relative p-2 rounded-lg transition-all duration-200 
        bg-gradient-to-r from-gray-50 to-white 
        hover:from-gray-100 hover:to-gray-50 
        text-gray-700 shadow-lg hover:shadow-xl 
        border border-gray-200
        transform hover:scale-105 active:scale-95
        ${className}
      `} 
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className="relative w-5 h-5">
        <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
        <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`} />
      </div>
    </button>
  );
}
