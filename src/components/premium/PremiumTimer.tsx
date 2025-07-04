
import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Zap } from 'lucide-react';

interface PremiumTimerProps {
  initialMinutes: number;
  isRunning: boolean;
  onTimeUp: () => void;
  onTimeWarning?: (timeLeft: number) => void;
}

export function PremiumTimer({ initialMinutes, isRunning, onTimeUp, onTimeWarning }: PremiumTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          onTimeUp();
          return 0;
        }

        // Avisos de tempo
        if (newTime === 120 && !isWarning) { // 2 minutos
          setIsWarning(true);
          onTimeWarning?.(newTime);
        }
        
        if (newTime === 60 && !isCritical) { // 1 minuto
          setIsCritical(true);
          onTimeWarning?.(newTime);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp, onTimeWarning, isWarning, isCritical]);

  // Reset states when timer resets
  useEffect(() => {
    if (timeLeft === initialMinutes * 60) {
      setIsWarning(false);
      setIsCritical(false);
    }
  }, [timeLeft, initialMinutes]);

  const getTimerColor = () => {
    if (isCritical) return 'text-red-400 animate-pulse';
    if (isWarning) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getTimerBg = () => {
    if (isCritical) return 'bg-gradient-to-r from-red-500/90 to-red-600/90';
    if (isWarning) return 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90';
    return 'bg-gradient-to-r from-blue-500/90 to-purple-500/90';
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-xl border-2 ${
      isCritical ? 'border-red-400/50' : isWarning ? 'border-yellow-400/50' : 'border-blue-400/50'
    } ${getTimerBg()}`}>
      <div className="relative">
        {isCritical ? (
          <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
        ) : isWarning ? (
          <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />
        ) : (
          <Zap className="w-6 h-6 text-blue-400" />
        )}
      </div>
      
      <div className="text-center">
        <div className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-xs text-white/80">
          {isCritical ? 'TEMPO CRÍTICO!' : isWarning ? 'Tempo acabando' : 'Tempo restante'}
        </div>
      </div>
    </div>
  );
}
