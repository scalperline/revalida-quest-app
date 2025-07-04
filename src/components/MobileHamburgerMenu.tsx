
import { useState, useEffect } from 'react';
import { MobileSidebar } from './MobileSidebar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileHamburgerMenu({ isOpen, onClose }: Props) {
  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

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
      onClose={onClose} 
    />
  );
}
