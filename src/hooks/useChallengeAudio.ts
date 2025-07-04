
import { useCallback } from 'react';

type SoundType = 'click' | 'correct' | 'incorrect' | 'tick' | 'timeWarning' | 'timeCritical' | 'complete' | 'coin';

export function useChallengeAudio() {
  const playSound = useCallback((type: SoundType, volume: number = 0.3) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const createTone = (frequency: number, duration: number, fadeOut: boolean = false) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        
        if (fadeOut) {
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        } else {
          gainNode.gain.setValueAtTime(volume, audioContext.currentTime + duration - 0.01);
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
        }
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (type) {
        case 'click':
          createTone(800, 0.1);
          break;
        case 'correct':
          createTone(523, 0.15); // C5
          setTimeout(() => createTone(659, 0.15), 80); // E5
          setTimeout(() => createTone(784, 0.2), 150); // G5
          break;
        case 'incorrect':
          createTone(300, 0.3, true);
          break;
        case 'tick':
          createTone(1000, 0.05);
          break;
        case 'timeWarning':
          createTone(880, 0.2);
          setTimeout(() => createTone(880, 0.2), 300);
          break;
        case 'timeCritical':
          createTone(1100, 0.1);
          setTimeout(() => createTone(1100, 0.1), 150);
          setTimeout(() => createTone(1100, 0.1), 300);
          break;
        case 'complete':
          createTone(523, 0.2);
          setTimeout(() => createTone(659, 0.2), 100);
          setTimeout(() => createTone(784, 0.2), 200);
          setTimeout(() => createTone(1047, 0.3), 300);
          break;
        case 'coin':
          createTone(1319, 0.1); // E6
          setTimeout(() => createTone(1568, 0.15), 50); // G6
          break;
      }
    } catch (error) {
      console.log('Audio não disponível');
    }
  }, []);

  return { playSound };
}
