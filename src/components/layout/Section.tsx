import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'muted' | 'card';
}

export function Section({ 
  children, 
  className = '',
  padding = 'md',
  background = 'none'
}: SectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16'
  };

  const backgroundClasses = {
    none: '',
    muted: 'bg-muted',
    card: 'bg-card'
  };

  return (
    <section className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
}