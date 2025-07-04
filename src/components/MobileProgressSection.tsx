
import { useGamification } from '@/hooks/useGamification';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';

export function MobileProgressSection() {
  const {
    userProgress,
    getAccuracy
  } = useGamification();
  
  const progressPercentage = userProgress.xpToNextLevel > 0 ? (userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel * 100 : 0;
  const accuracy = getAccuracy();
  
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">Nível {userProgress.level}</div>
            <div className="text-xs text-gray-600">{userProgress.xp} XP</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-sm font-bold text-gray-800">{accuracy}%</div>
          <div className="text-xs text-gray-600">Precisão</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-gray-800">{userProgress.streakDias}</div>
          <div className="text-xs text-gray-600">Sequência</div>
        </div>
      </div>
    </div>
  );
}
