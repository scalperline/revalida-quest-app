
interface Props {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function MobileHamburgerButton({ isOpen, onToggle, className = '' }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-11 h-11 
        bg-white/90 dark:bg-gray-800/90 
        hover:bg-white dark:hover:bg-gray-800
        backdrop-blur-sm
        rounded-xl shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        border border-gray-200/50 dark:border-gray-700/50
        hover:border-blue-200 dark:hover:border-blue-600
        touch-manipulation
        ${className}
      `}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      {/* Enhanced Hamburger Icon */}
      <div className="relative w-5 h-5 flex flex-col justify-center items-center">
        <span 
          className={`
            block absolute h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded-full
            transition-all duration-300 ease-out
            ${isOpen 
              ? 'rotate-45 translate-y-0 bg-blue-600 dark:bg-blue-400' 
              : '-translate-y-1.5'
            }
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded-full
            transition-all duration-300 ease-out
            ${isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100'
            }
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded-full
            transition-all duration-300 ease-out
            ${isOpen 
              ? '-rotate-45 translate-y-0 bg-blue-600 dark:bg-blue-400' 
              : 'translate-y-1.5'
            }
          `}
        />
      </div>

      {/* Subtle active state indicator */}
      {isOpen && (
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
      )}
    </button>
  );
}
