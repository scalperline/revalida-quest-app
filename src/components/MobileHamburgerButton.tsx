
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
        w-10 h-10 
        bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800
        rounded-xl shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        border border-blue-500/20
        touch-manipulation
        ${className}
      `}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className="relative w-5 h-5 flex flex-col justify-center items-center">
        {/* Hamburger Lines - ajustadas para o novo tamanho */}
        <span 
          className={`
            block absolute h-0.5 w-5 bg-white rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-5 bg-white rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-5 bg-white rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}
          `}
        />
      </div>
    </button>
  );
}
