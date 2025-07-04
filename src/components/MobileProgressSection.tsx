
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
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200/50">
      {/* Level and XP Section */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-800">Nível {userProgress.level}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Zap className="w-3 h-3 text-orange-500" />
          <span className="font-semibold">{userProgress.xp} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <Target className="w-3 h-3 text-blue-500" />
          <span className="text-gray-600">{userProgress.totalQuestions} questões</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span className="text-gray-600">{accuracy.toFixed(0)}% precisão</span>
        </div>
      </div>
    </div>
  );
}
