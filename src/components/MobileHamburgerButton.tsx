
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
        bg-gray-900 dark:bg-white
        hover:bg-gray-800 dark:hover:bg-gray-100
        rounded-xl
        flex items-center justify-center
        transition-all duration-200
        ${className}
      `}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className="relative w-3.5 h-3.5 flex flex-col justify-center items-center">
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-white dark:bg-gray-900 rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-white dark:bg-gray-900 rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            block absolute h-0.5 w-3.5 bg-white dark:bg-gray-900 rounded-full
            transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}
          `}
        />
      </div>
    </button>
  );
}
