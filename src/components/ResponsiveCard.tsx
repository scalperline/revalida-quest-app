
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResponsiveCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function ResponsiveCard({ 
  title, 
  description, 
  children, 
  className = '',
  padding = 'md',
  hover = true
}: ResponsiveCardProps) {
  
  const getPaddingClasses = () => {
    switch (padding) {
      case 'sm':
        return 'p-3 sm:p-4';
      case 'lg':
        return 'p-4 sm:p-6 lg:p-8';
      default:
        return 'p-4 sm:p-6';
    }
  };

  return (
    <Card className={`
      ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
      ${className}
    `}>
      {(title || description) && (
        <CardHeader className="pb-3 sm:pb-4">
          {title && (
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={getPaddingClasses()}>
        {children}
      </CardContent>
    </Card>
  );
}
