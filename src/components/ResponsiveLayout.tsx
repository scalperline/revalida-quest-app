
import { ReactNode } from 'react';
import { ResponsiveNavbar } from './ResponsiveNavbar';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      <ResponsiveNavbar />
      
      {/* Main Content ocupa toda a largura da tela */}
      <main className={`
        w-full min-h-screen
        pt-12 xs:pt-14 sm:pt-16 lg:pt-18
        ${className}
      `}>
        {children}
      </main>
    </div>
  );
}
