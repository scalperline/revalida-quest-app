
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, Gift, Zap } from 'lucide-react';

export function LimitedOfferCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="mb-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-2 border-orange-200 shadow-xl">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-red-500 animate-bounce" />
            <h3 className="text-2xl font-bold text-red-600">⚡ OFERTA RELÂMPAGO</h3>
            <Flame className="w-6 h-6 text-red-500 animate-bounce" />
          </div>
          
          <p className="text-lg text-gray-700 mb-4">
            🎯 Upgrade agora e ganhe <span className="font-bold text-purple-600">+500 XP</span> + 
            <span className="font-bold text-blue-600"> Badge Exclusiva</span>!
          </p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Tempo restante:</span>
          </div>

          <div className="flex justify-center gap-2 mb-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gradient-to-b from-red-500 to-red-600 text-white rounded-lg p-3 min-w-[60px] shadow-lg">
                <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase">{unit === 'hours' ? 'hrs' : unit === 'minutes' ? 'min' : 'seg'}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
              <Zap className="w-4 h-4 mr-1" />
              +500 XP Bônus
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1">
              <Gift className="w-4 h-4 mr-1" />
              Badge Exclusiva
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
