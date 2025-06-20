
import { useCallback } from 'react';

type SoundType = 'correct' | 'incorrect' | 'achievement' | 'click' | 'levelup';

export function useAudio() {
  const playSound = useCallback((type: SoundType) => {
    // Create audio context for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    switch (type) {
      case 'correct':
        // Success sound - ascending notes
        createTone(523.25, 0.2); // C5
        setTimeout(() => createTone(659.25, 0.2), 100); // E5
        setTimeout(() => createTone(783.99, 0.3), 200); // G5
        break;
        
      case 'incorrect':
        // Error sound - descending notes
        createTone(392, 0.3, 'sawtooth'); // G4
        setTimeout(() => createTone(311.13, 0.4, 'sawtooth'), 150); // D#4
        break;
        
      case 'achievement':
        // Achievement fanfare
        createTone(523.25, 0.15); // C5
        setTimeout(() => createTone(659.25, 0.15), 100); // E5
        setTimeout(() => createTone(783.99, 0.15), 200); // G5
        setTimeout(() => createTone(1046.5, 0.4), 300); // C6
        break;
        
      case 'levelup':
        // Level up sound - triumphant
        createTone(440, 0.15); // A4
        setTimeout(() => createTone(554.37, 0.15), 100); // C#5
        setTimeout(() => createTone(659.25, 0.15), 200); // E5
        setTimeout(() => createTone(880, 0.4), 300); // A5
        break;
        
      case 'click':
        // Simple click sound
        createTone(800, 0.1, 'square');
        break;
    }
  }, []);

  return { playSound };
}
