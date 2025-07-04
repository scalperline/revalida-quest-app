
import { useGamification } from '@/hooks/useGamification';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';

export function ProgressBalance() {
  const { userProgress, getAccuracy } = useGamification();
  
  const progressPercentage = userProgress.xpToNextLevel > 0 
    ? ((userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel) * 100
    : 0;

  const accuracy = getAccuracy();

  return (
    <div className="space-y-4">
      {/* Level and XP */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-2xl font-bold text-gray-800">Nível {userProgress.level}</span>
        </div>
        
        {/* XP Progress Bar */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{userProgress.xp} XP</span>
          <span>{userProgress.xpToNextLevel} XP para próximo nível</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-800">Questões</span>
          </div>
          <div className="text-lg font-bold text-blue-900">{userProgress.totalQuestions}</div>
          <div className="text-xs text-blue-700">{userProgress.correctAnswers} corretas</div>
        </div>

        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-800">Precisão</span>
          </div>
          <div className="text-lg font-bold text-green-900">{accuracy.toFixed(0)}%</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-800">Sequência</span>
          </div>
          <div className="text-lg font-bold text-purple-900">{userProgress.streakDias}</div>
          <div className="text-xs text-purple-700">dias</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-orange-800">Simulados</span>
          </div>
          <div className="text-lg font-bold text-orange-900">{userProgress.simuladosCompletos}</div>
        </div>
      </div>
    </div>
  );
}
