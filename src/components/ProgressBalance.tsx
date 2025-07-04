
import { useGamification } from '@/hooks/useGamification';
import { Trophy, Target, Zap, TrendingUp, Star, Sparkles } from 'lucide-react';

export function ProgressBalance() {
  const { userProgress, getAccuracy } = useGamification();
  
  const progressPercentage = userProgress.xpToNextLevel > 0 
    ? ((userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel) * 100
    : 0;

  const accuracy = getAccuracy();

  return (
    <div className="space-y-6 p-1">
      {/* Enhanced Level and XP Section */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          {/* Level Badge with Glow Effect */}
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl relative">
            <Trophy className="w-8 h-8 text-white drop-shadow-sm" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200">
            <span className="text-sm font-bold text-gray-700">{userProgress.level}</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Nível {userProgress.level}
          </h2>
          <p className="text-sm text-gray-600 font-medium">Aventureiro Médico</p>
        </div>
        
        {/* Enhanced XP Progress Bar */}
        <div className="space-y-3">
          <div className="relative">
            <div className="w-full h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                <div className="absolute right-0 top-0 w-2 h-full bg-white/50 rounded-full"></div>
              </div>
            </div>
            {/* Progress Indicator */}
            <div className="absolute -top-8 right-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{userProgress.xp} XP</span>
            <span className="text-gray-600">{userProgress.xpToNextLevel} XP para próximo nível</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid with Better Visual Hierarchy */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg shadow-md">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Questões</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-blue-900">{userProgress.totalQuestions}</div>
            <div className="text-xs text-blue-700 font-medium">{userProgress.correctAnswers} corretas</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-500 rounded-lg shadow-md">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Precisão</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-emerald-900">{accuracy.toFixed(0)}%</div>
            <div className="text-xs text-emerald-700 font-medium">Taxa de acerto</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-500 rounded-lg shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-purple-800 uppercase tracking-wide">Sequência</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-purple-900">{userProgress.streakDias}</div>
            <div className="text-xs text-purple-700 font-medium">dias seguidos</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-orange-500 rounded-lg shadow-md">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-orange-800 uppercase tracking-wide">Simulados</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-orange-900">{userProgress.simuladosCompletos}</div>
            <div className="text-xs text-orange-700 font-medium">concluídos</div>
          </div>
        </div>
      </div>

      {/* Enhanced Motivational Section */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 rounded-xl p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-200/30 rounded-full translate-y-8 -translate-x-8"></div>
        
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-green-800">Continue sua jornada médica!</p>
            <p className="text-xs text-green-700 font-medium">
              Faltam apenas {userProgress.xpToNextLevel - userProgress.xp} XP para alcançar o próximo nível
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
