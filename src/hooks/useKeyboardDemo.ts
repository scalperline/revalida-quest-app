import { useEffect, useCallback } from 'react';

interface UseKeyboardDemoProps {
  onTestXP: () => void;
}

export function useKeyboardDemo({ onTestXP }: UseKeyboardDemoProps) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'a') {
      event.preventDefault();
      onTestXP();
    }
  }, [onTestXP]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
}