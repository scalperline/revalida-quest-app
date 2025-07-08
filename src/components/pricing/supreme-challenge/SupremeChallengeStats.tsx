
import { Target, Zap, Star } from 'lucide-react';

interface SupremeChallengeStatsProps {
  attemptsLeft: number;
}

export function SupremeChallengeStats({ attemptsLeft }: SupremeChallengeStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6 text-center">
      <div className="rounded-xl p-3 border border-red-200/50 bg-transparent">
        <Target className="w-5 h-5 text-red-600 mx-auto mb-1" />
        <div className="text-sm font-bold text-white">10/10</div>
        <div className="text-xs text-white">Acertos</div>
      </div>
      <div className="rounded-xl p-3 border border-red-200/50 bg-transparent">
        <Zap className="w-5 h-5 text-red-600 mx-auto mb-1" />
        <div className="text-sm font-bold text-white">10min</div>
        <div className="text-xs text-white">Tempo</div>
      </div>
      <div className="rounded-xl p-3 border border-red-200/50 bg-transparent">
        <Star className="w-5 h-5 text-red-600 mx-auto mb-1" />
        <div className="text-sm font-bold text-white">{attemptsLeft}</div>
        <div className="text-xs text-white">Tentativas</div>
      </div>
    </div>
  );
}
