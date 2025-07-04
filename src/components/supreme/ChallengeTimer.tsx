
import { Clock, AlertTriangle } from 'lucide-react';

interface ChallengeTimerProps {
  timeLeft: number;
}

export function ChallengeTimer({ timeLeft }: ChallengeTimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 120; // Últimos 2 minutos
  const isCritical = timeLeft <= 60; // Último minuto

  return (
    <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border-2 transition-all duration-300 ${
      isCritical 
        ? 'bg-gradient-to-r from-red-900/80 to-red-800/80 border-red-400/50 animate-pulse'
        : isLowTime
        ? 'bg-gradient-to-r from-yellow-900/80 to-orange-900/80 border-yellow-400/50'
        : 'bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-blue-400/50'
    }`}>
      {isCritical ? (
        <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
      ) : (
        <Clock className="w-6 h-6 text-blue-400" />
      )}
      
      <div className="text-2xl font-bold">
        <span className={isCritical ? 'text-red-300' : isLowTime ? 'text-yellow-300' : 'text-blue-300'}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      
      <div className="text-sm text-gray-400">
        restantes
      </div>
    </div>
  );
}
