
import { Target, Clock, Zap } from 'lucide-react';

export function ChallengeRequirements() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-10">
      <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-400/20">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Target className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
          <span className="font-bold text-base md:text-lg text-gray-300">10 Questões</span>
        </div>
        <p className="text-blue-200 text-xs md:text-sm">Uma por vez, com feedback imediato</p>
      </div>

      <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-green-400/20">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Clock className="w-5 h-5 md:w-7 md:h-7 text-green-400" />
          <span className="font-bold text-base md:text-lg text-green-200">10 Minutos</span>
        </div>
        <p className="text-green-200 text-xs md:text-sm">Sistema de combo e recompensas</p>
      </div>

      <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-400/20">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Zap className="w-5 h-5 md:w-7 md:h-7 text-purple-400" />
          <span className="font-bold text-base md:text-lg text-fuchsia-200">100% Acerto</span>
        </div>
        <p className="text-purple-200 text-xs md:text-sm">Perfeição total + bônus XP</p>
      </div>
    </div>
  );
}
