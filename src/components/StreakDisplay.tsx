
import { useGamification } from '@/hooks/useGamification';
import { Flame, Zap, Calendar } from 'lucide-react';

export function StreakDisplay() {
  const { userProgress, getStreakBonus } = useGamification();
  
  const getStreakIcon = () => {
    if (userProgress.streakDias >= 30) return <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 animate-pulse" />;
    if (userProgress.streakDias >= 7) return <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-bounce" />;
    if (userProgress.streakDias >= 3) return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
    return <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />;
  };

  const getStreakColor = () => {
    if (userProgress.streakDias >= 30) return 'from-orange-500 to-red-500';
    if (userProgress.streakDias >= 7) return 'from-yellow-500 to-orange-500';
    if (userProgress.streakDias >= 3) return 'from-blue-500 to-purple-500';
    return 'from-gray-400 to-gray-500';
  };

  if (userProgress.streakDias === 0) return null;

  return (
    <div className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full bg-gradient-to-r ${getStreakColor()} text-white shadow-lg min-h-[48px]`}>
      {getStreakIcon()}
      <span className="font-bold text-xs sm:text-sm">
        {userProgress.streakDias} dias
      </span>
      <span className="text-xs opacity-90">
        +{getStreakBonus()} XP
      </span>
    </div>
  );
}
