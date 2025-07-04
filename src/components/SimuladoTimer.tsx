
import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimuladoTimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
  onForceFinish?: () => void;
  running: boolean;
}

export function SimuladoTimer({ 
  initialMinutes, 
  onTimeUp, 
  onForceFinish, 
  running 
}: SimuladoTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        
        if (prev <= 300 && !showWarning) { // 5 minutes warning
          setShowWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, onTimeUp, showWarning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 300; // 5 minutes
  const isCritical = timeLeft <= 60; // 1 minute

  return (
    <div className={`
      fixed top-20 right-4 z-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 p-4
      ${isCritical ? 'border-red-500 animate-pulse' : isWarning ? 'border-yellow-500' : 'border-blue-200'}
    `}>
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-full
          ${isCritical ? 'bg-red-100 text-red-600' : isWarning ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}
        `}>
          {isWarning ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
        </div>
        
        <div>
          <div className={`
            text-lg font-mono font-bold
            ${isCritical ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-800 dark:text-gray-200'}
          `}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-gray-500">Tempo restante</div>
        </div>
      </div>

      {onForceFinish && (
        <Button
          onClick={onForceFinish}
          variant="outline"
          size="sm"
          className="w-full mt-3 text-xs"
        >
          Finalizar Agora
        </Button>
      )}
    </div>
  );
}
