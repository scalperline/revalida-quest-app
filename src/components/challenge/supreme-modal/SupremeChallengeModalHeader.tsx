import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Coins, Trophy, X, Zap, Flame } from 'lucide-react';

interface SupremeChallengeModalHeaderProps {
  minutes: number;
  seconds: number;
  urgencyLevel: string;
  percentage: number;
  coinSystem: any;
  score: number;
  onClose: () => void;
}

export function SupremeChallengeModalHeader({
  minutes,
  seconds,
  urgencyLevel,
  percentage,
  coinSystem,
  score,
  onClose
}: SupremeChallengeModalHeaderProps) {
  const getTimerColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'caution': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-blue-400/20 bg-slate-900/40 backdrop-blur-sm relative z-10">
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${getTimerColor()}`} />
          <span className={`text-xl sm:text-2xl font-bold ${getTimerColor()}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
        
        <div className="w-20 sm:w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              urgencyLevel === 'critical' ? 'bg-red-500' :
              urgencyLevel === 'warning' ? 'bg-orange-500' :
              urgencyLevel === 'caution' ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
          <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-sm sm:text-base">{coinSystem.sessionCoins}</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          <span className="text-green-400 font-bold text-sm sm:text-base">{score}/10</span>
        </div>

        {coinSystem.combo >= 3 && (
          <Badge 
            className={`text-xs sm:text-sm px-2 sm:px-3 py-1 ${
              coinSystem.combo >= 10 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
              coinSystem.combo >= 5 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              'bg-gradient-to-r from-yellow-500 to-orange-500'
            } text-white animate-pulse`}
          >
            {coinSystem.combo >= 10 ? <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> :
             coinSystem.combo >= 5 ? <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> :
             <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
            {coinSystem.combo}x
          </Badge>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 sm:p-2"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}
