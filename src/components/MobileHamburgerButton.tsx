
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
        w-8 h-8 
        bg-gradient-to-r from-slate-50 to-gray-50
        hover:from-slate-100 hover:to-gray-100
        rounded-xl shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        border-2 border-gray-400/60 hover:border-gray-500/70
        touch-manipulation
        mr-2
        ${className}
      `}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className="relative w-3.5 h-3.5 flex flex-col justify-center items-center">
        {/* Hamburger Lines - using darker color for better contrast */}
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-gray-700 rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-gray-700 rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-gray-700 rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}
          `}
        />
      </div>
    </button>
  );
}
