
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface SupremeChallengeCountdownProps {
  className?: string;
}

export function SupremeChallengeCountdown({ className = "" }: SupremeChallengeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Define a data final do countdown (3 dias a partir de agora)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center gap-2 mb-4 ${className}`}>
      <Clock className="w-4 h-4 text-red-300 animate-pulse" />
      <div className="flex items-center gap-1 text-red-200 font-mono text-sm">
        <div className="bg-red-800/50 px-2 py-1 rounded border border-red-600/30">
          <span className="text-white font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-red-300 text-xs ml-1">d</span>
        </div>
        <span className="text-red-400">:</span>
        <div className="bg-red-800/50 px-2 py-1 rounded border border-red-600/30">
          <span className="text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-red-300 text-xs ml-1">h</span>
        </div>
        <span className="text-red-400">:</span>
        <div className="bg-red-800/50 px-2 py-1 rounded border border-red-600/30">
          <span className="text-white font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-red-300 text-xs ml-1">m</span>
        </div>
        <span className="text-red-400">:</span>
        <div className="bg-red-800/50 px-2 py-1 rounded border border-red-600/30">
          <span className="text-white font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-red-300 text-xs ml-1">s</span>
        </div>
      </div>
    </div>
  );
}
