
import { useState, useEffect } from 'react';
import { MobileSidebar } from './MobileSidebar';

interface Props {
  className?: string;
}

export function MobileHamburgerMenu({ className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <MobileSidebar 
      isOpen={isOpen} 
      onClose={closeMenu} 
    />
  );
}
