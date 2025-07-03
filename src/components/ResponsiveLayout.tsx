
import { ReactNode } from 'react';
import { ResponsiveNavbar } from './ResponsiveNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveNavbar />
      
      {/* Main Content with responsive padding */}
      <main className={`
        pt-14 sm:pt-16 lg:pt-18
        px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12
        pb-4 sm:pb-6 lg:pb-8
        max-w-7xl mx-auto
        ${className}
      `}>
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
