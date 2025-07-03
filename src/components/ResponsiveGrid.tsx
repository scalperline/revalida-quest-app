
import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number; 
    desktop?: number;
  };
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  className = ''
}: ResponsiveGridProps) {
  
  const getGridClasses = () => {
    const colClasses = [
      cols.mobile ? `grid-cols-${cols.mobile}` : 'grid-cols-1',
      cols.tablet ? `md:grid-cols-${cols.tablet}` : 'md:grid-cols-2', 
      cols.desktop ? `lg:grid-cols-${cols.desktop}` : 'lg:grid-cols-3'
    ].join(' ');
    
    const gapClasses = [
      gap.mobile ? `gap-${gap.mobile}` : 'gap-4',
      gap.tablet ? `md:gap-${gap.tablet}` : 'md:gap-6',
      gap.desktop ? `lg:gap-${gap.desktop}` : 'lg:gap-8'
    ].join(' ');
    
    return `grid ${colClasses} ${gapClasses}`;
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  );
}
