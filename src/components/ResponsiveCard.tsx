
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function ResponsiveCard({
  title,
  description,
  icon,
  children,
  onClick,
  className,
  variant = 'default',
  size = 'md'
}: ResponsiveCardProps) {
  const baseClasses = "quest-card cursor-pointer group";
  
  const variantClasses = {
    default: "border-blue-200 dark:border-gray-700 hover:border-blue-300",
    primary: "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    secondary: "border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
  };

  const sizeClasses = {
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8"
  };

  return (
    <Card 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        {icon && (
          <div className="quest-card-icon group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
        )}
        
        <h3 className="quest-card-title gradient-text">
          {title}
        </h3>
        
        {description && (
          <p className="quest-card-description">
            {description}
          </p>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
}
