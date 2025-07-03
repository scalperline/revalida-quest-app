
interface Props {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MobileHamburgerButton({ isOpen, onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-8 h-8 
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
      <div className="relative w-3.5 h-3.5 flex flex-col justify-center items-center">
        {/* Hamburger Lines - ajustadas para o tamanho menor harmonioso */}
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-white rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-white rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-white rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}
          `}
        />
      </div>
    </button>
  );
}
