
import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Zap } from 'lucide-react';
import { useChallengeAudio } from '@/hooks/useChallengeAudio';

interface ChallengeTimerProps {
  initialSeconds: number;
  isRunning: boolean;
  onTimeUp: () => void;
  onTimeWarning?: (timeLeft: number) => void;
}

export function ChallengeTimer({ 
  initialSeconds, 
  isRunning, 
  onTimeUp, 
  onTimeWarning 
}: ChallengeTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [hasWarned2Min, setHasWarned2Min] = useState(false);
  const [hasWarned1Min, setHasWarned1Min] = useState(false);
  const [hasWarned30Sec, setHasWarned30Sec] = useState(false);
  const { playSound } = useChallengeAudio();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setHasWarned2Min(false);
    setHasWarned1Min(false);
    setHasWarned30Sec(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        
        // Efeitos sonoros e avisos
        if (newTime === 120 && !hasWarned2Min) {
          setHasWarned2Min(true);
          playSound('timeWarning');
          onTimeWarning?.(newTime);
        } else if (newTime === 60 && !hasWarned1Min) {
          setHasWarned1Min(true);
          playSound('timeWarning');
          onTimeWarning?.(newTime);
        } else if (newTime === 30 && !hasWarned30Sec) {
          setHasWarned30Sec(true);
          playSound('timeCritical');
          onTimeWarning?.(newTime);
        } else if (newTime <= 10 && newTime > 0) {
          playSound('tick');
        }
        
        if (newTime <= 0) {
          onTimeUp();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, hasWarned2Min, hasWarned1Min, hasWarned30Sec, onTimeUp, onTimeWarning, playSound]);

  const getTimerColor = () => {
    if (timeLeft <= 30) return 'text-red-400 animate-pulse';
    if (timeLeft <= 60) return 'text-orange-400 animate-pulse';
    if (timeLeft <= 120) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getTimerBg = () => {
    if (timeLeft <= 30) return 'bg-gradient-to-r from-red-500/90 to-red-600/90 border-red-400/50';
    if (timeLeft <= 60) return 'bg-gradient-to-r from-orange-500/90 to-red-500/90 border-orange-400/50';
    if (timeLeft <= 120) return 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90 border-yellow-400/50';
    return 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 border-blue-400/50';
  };

  const getIcon = () => {
    if (timeLeft <= 30) return <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />;
    if (timeLeft <= 60) return <AlertTriangle className="w-6 h-6 text-orange-400 animate-pulse" />;
    if (timeLeft <= 120) return <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />;
    return <Zap className="w-6 h-6 text-blue-400" />;
  };

  return (
    <div className={`fixed top-4 right-4 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border-2 shadow-2xl ${getTimerBg()}`}>
      {getIcon()}
      
      <div className="text-center">
        <div className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-xs text-white/80">
          {timeLeft <= 30 ? 'TEMPO CRÍTICO!' : timeLeft <= 60 ? 'Último minuto!' : 'Tempo restante'}
        </div>
      </div>
    </div>
  );
}
