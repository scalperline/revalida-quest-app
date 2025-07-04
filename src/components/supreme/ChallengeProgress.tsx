
import { Trophy, Target, Zap, Flame } from 'lucide-react';

interface ChallengeProgressProps {
  current: number;
  total: number;
  score: number;
  streak: number;
  combo: number;
}

export function ChallengeProgress({ current, total, score, streak, combo }: ChallengeProgressProps) {
  const percentage = (current / total) * 100;
  const accuracy = current > 0 ? (score / current) * 100 : 0;

  return (
    <div className="flex items-center gap-6">
      {/* Progresso das questões */}
      <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 font-medium">Questão {current}/{total}</span>
        </div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="bg-gradient-to-r from-green-900/80 to-emerald-900/80 backdrop-blur-sm rounded-xl p-4 border border-green-600/30">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-green-300 font-bold text-lg">{score}</div>
            <div className="text-green-400 text-sm">acertos</div>
          </div>
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="bg-gradient-to-r from-yellow-900/80 to-orange-900/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-600/30">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            <div>
              <div className="text-yellow-300 font-bold text-lg">{streak}</div>
              <div className="text-yellow-400 text-sm">streak</div>
            </div>
          </div>
        </div>
      )}

      {/* Combo */}
      {combo >= 3 && (
        <div className="bg-gradient-to-r from-orange-900/80 to-red-900/80 backdrop-blur-sm rounded-xl p-4 border border-orange-600/30">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
            <div>
              <div className="text-orange-300 font-bold text-lg">{combo}x</div>
              <div className="text-orange-400 text-sm">combo</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
