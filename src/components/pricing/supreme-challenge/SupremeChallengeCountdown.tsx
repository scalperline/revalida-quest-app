import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SupremeChallengeCountdownProps {
  className?: string;
}

export function SupremeChallengeCountdown({
  className = ""
}: SupremeChallengeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Define a data final do countdown (7 dias a partir de agora)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(difference % (1000 * 60) / 1000);
        
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Determinar se está nos últimos 3 dias para mostrar urgência
  const isUrgent = timeLeft.days <= 3;
  const isVeryUrgent = timeLeft.days <= 1;

  return (
    <div className={`flex flex-col items-center justify-center gap-3 mb-4 ${className}`}>
      {/* Urgency Badge */}
      {isUrgent && (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse ${
          isVeryUrgent 
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
            : 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
        }`}>
          <AlertTriangle className="w-3 h-3" />
          {isVeryUrgent ? 'ÚLTIMA CHANCE!' : 'OFERTA LIMITADA!'}
        </div>
      )}
      
      {/* Countdown Label */}
      <div className="flex items-center gap-2 text-red-200 font-semibold text-sm">
        <Clock className="w-4 h-4" />
        <span>Termina em:</span>
      </div>
      
      {/* Countdown Timer */}
      <div className="flex items-center justify-center gap-1 text-red-200 font-mono text-sm">
        <div className={`px-2 py-1 rounded border ${
          isVeryUrgent 
            ? 'bg-red-600 border-red-400 shadow-lg shadow-red-500/30 animate-pulse' 
            : isUrgent 
            ? 'bg-red-700/70 border-red-500/50 shadow-md' 
            : 'bg-red-800/50 border-red-600/30'
        }`}>
          <span className={`font-bold ${
            isVeryUrgent ? 'text-yellow-300' : 'text-white'
          }`}>
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-red-300 text-xs ml-1">d</span>
        </div>
        <span className="text-red-400">:</span>
        <div className={`px-2 py-1 rounded border ${
          isVeryUrgent 
            ? 'bg-red-600 border-red-400 shadow-lg shadow-red-500/30 animate-pulse' 
            : isUrgent 
            ? 'bg-red-700/70 border-red-500/50 shadow-md' 
            : 'bg-red-800/50 border-red-600/30'
        }`}>
          <span className={`font-bold ${
            isVeryUrgent ? 'text-yellow-300' : 'text-white'
          }`}>
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-red-300 text-xs ml-1">h</span>
        </div>
        <span className="text-red-400">:</span>
        <div className={`px-2 py-1 rounded border ${
          isVeryUrgent 
            ? 'bg-red-600 border-red-400 shadow-lg shadow-red-500/30 animate-pulse' 
            : isUrgent 
            ? 'bg-red-700/70 border-red-500/50 shadow-md' 
            : 'bg-red-800/50 border-red-600/30'
        }`}>
          <span className={`font-bold ${
            isVeryUrgent ? 'text-yellow-300' : 'text-white'
          }`}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-red-300 text-xs ml-1">m</span>
        </div>
        <span className="text-red-400">:</span>
        <div className={`px-2 py-1 rounded border ${
          isVeryUrgent 
            ? 'bg-red-600 border-red-400 shadow-lg shadow-red-500/30 animate-pulse' 
            : isUrgent 
            ? 'bg-red-700/70 border-red-500/50 shadow-md' 
            : 'bg-red-800/50 border-red-600/30'
        }`}>
          <span className={`font-bold ${
            isVeryUrgent ? 'text-yellow-300' : 'text-white'
          }`}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-red-300 text-xs ml-1">s</span>
        </div>
      </div>
      
      {/* Urgency Message */}
      {isUrgent && (
        <div className={`text-center text-xs font-medium px-3 py-1.5 rounded-lg ${
          isVeryUrgent 
            ? 'bg-red-500/20 text-red-200 border border-red-400/30' 
            : 'bg-orange-500/20 text-orange-200 border border-orange-400/30'
        }`}>
          {isVeryUrgent 
            ? '⚡ APENAS HOJE! Não perca esta oportunidade única!' 
            : '🔥 ÚLTIMOS DIAS! Aproveite antes que acabe!'
          }
        </div>
      )}
    </div>
  );
}