
import { useGamification } from '@/hooks/useGamification';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Trophy, Target, Coins } from 'lucide-react';

export function MobileUserProgress() {
  const { userProgress } = useGamification();

  const progressPercentage = Math.min((userProgress.xp / (userProgress.level * 100)) * 100, 100);

  return (
    <div className="p-4 space-y-4">
      {/* User Level and XP */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Nível {userProgress.level}</p>
            <p className="text-xs text-gray-600">{userProgress.xp} XP</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {userProgress.level * 100 - userProgress.xp} XP para próximo nível
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progresso</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <p className="text-xs font-semibold text-blue-800">{userProgress.correctAnswers}</p>
          <p className="text-xs text-blue-600">Acertos</p>
        </div>
        <div className="p-2 bg-green-50 rounded-lg">
          <Trophy className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <p className="text-xs font-semibold text-green-800">{userProgress.achievements.length}</p>
          <p className="text-xs text-green-600">Conquistas</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <Coins className="w-4 h-4 text-purple-600 mx-auto mb-1" />
          <p className="text-xs font-semibold text-purple-800">{userProgress.totalQuestions}</p>
          <p className="text-xs text-purple-600">Questões</p>
        </div>
      </div>
    </div>
  );
}
