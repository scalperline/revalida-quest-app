
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ResponsiveButtonProps {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  hideTextOnMobile?: boolean;
}

export function ResponsiveButton({
  children,
  icon: Icon,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  className = '',
  hideTextOnMobile = false
}: ResponsiveButtonProps) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm';
      case 'lg':
        return 'h-12 sm:h-14 px-4 sm:px-6 lg:px-8 text-base sm:text-lg';
      default:
        return 'h-9 sm:h-10 lg:h-11 px-3 sm:px-4 lg:px-6 text-sm sm:text-base';
    }
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {Icon && (
        <Icon className={`
          w-4 h-4 sm:w-5 sm:h-5
          ${hideTextOnMobile ? '' : 'mr-2'}
        `} />
      )}
      
      {hideTextOnMobile ? (
        <span className="hidden sm:inline">{children}</span>
      ) : (
        children
      )}
    </Button>
  );
}
