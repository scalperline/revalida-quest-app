
import { useGamification } from '@/hooks/useGamification';
import { Trophy, Target, Zap, TrendingUp, Star, Award } from 'lucide-react';

export function ProgressBalance() {
  const { userProgress, getAccuracy } = useGamification();
  
  const progressPercentage = userProgress.xpToNextLevel > 0 
    ? ((userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel) * 100
    : 0;

  const accuracy = getAccuracy();

  return (
    <div className="space-y-5">
      {/* Seção Principal - Nível e XP */}
      <div className="text-center relative">
        {/* Badge de Nível */}
        <div className="relative inline-flex items-center justify-center mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-60"></div>
          <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
            <Trophy className="w-5 h-5" />
            <span className="text-xl font-bold">Nível {userProgress.level}</span>
          </div>
        </div>
        
        {/* Barra de Progresso XP Profissional */}
        <div className="relative w-full bg-gray-200 rounded-full h-4 mb-3 overflow-hidden shadow-inner">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
        </div>
        
        {/* Informações de XP */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1 text-gray-700">
            <Zap className="w-3 h-3 text-orange-500" />
            <span className="font-semibold">{userProgress.xp} XP</span>
          </div>
          <div className="text-gray-600 font-medium">
            {userProgress.xpToNextLevel} XP
          </div>
        </div>
      </div>

      {/* Grid de Estatísticas Profissional */}
      <div className="grid grid-cols-2 gap-3">
        {/* Questões */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/80 rounded-xl p-3 text-center border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center gap-1 mb-2">
            <div className="p-1 bg-blue-500 rounded-md">
              <Target className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-800">Questões</span>
          </div>
          <div className="text-lg font-bold text-blue-900 mb-1">{userProgress.totalQuestions}</div>
          <div className="text-xs text-blue-700 font-medium">{userProgress.correctAnswers} corretas</div>
        </div>

        {/* Precisão */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100/80 rounded-xl p-3 text-center border border-green-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center gap-1 mb-2">
            <div className="p-1 bg-green-500 rounded-md">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-800">Precisão</span>
          </div>
          <div className="text-lg font-bold text-green-900 mb-1">{accuracy.toFixed(0)}%</div>
          <div className="text-xs text-green-700">performance</div>
        </div>

        {/* Sequência */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/80 rounded-xl p-3 text-center border border-purple-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center gap-1 mb-2">
            <div className="p-1 bg-purple-500 rounded-md">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-purple-800">Sequência</span>
          </div>
          <div className="text-lg font-bold text-purple-900 mb-1">{userProgress.streakDias}</div>
          <div className="text-xs text-purple-700">dias consecutivos</div>
        </div>

        {/* Simulados */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/80 rounded-xl p-3 text-center border border-orange-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center gap-1 mb-2">
            <div className="p-1 bg-orange-500 rounded-md">
              <Award className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-orange-800">Simulados</span>
          </div>
          <div className="text-lg font-bold text-orange-900 mb-1">{userProgress.simuladosCompletos}</div>
          <div className="text-xs text-orange-700">finalizados</div>
        </div>
      </div>

      {/* Motivação/Status */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-3 border border-gray-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Continue evoluindo!</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {Math.round(progressPercentage)}% completo
          </div>
        </div>
      </div>
    </div>
  );
}
