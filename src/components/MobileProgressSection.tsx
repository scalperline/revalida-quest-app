
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
    <div className="space-y-3">
      {/* Nível e XP */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-800">Nível {userProgress.level}</span>
        </div>
        
        {/* Barra de Progresso XP */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>{userProgress.xp} XP</span>
          <span>{userProgress.xpToNextLevel} XP</span>
        </div>
      </div>

      {/* Estatísticas em Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-800">Questões</span>
          </div>
          <div className="text-sm font-bold text-blue-900">{userProgress.totalQuestions}</div>
        </div>

        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-xs font-medium text-green-800">Precisão</span>
          </div>
          <div className="text-sm font-bold text-green-900">{accuracy.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}
