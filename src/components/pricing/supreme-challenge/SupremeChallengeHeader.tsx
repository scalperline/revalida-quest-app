
import { CardHeader } from '@/components/ui/card';
import { Trophy, Crown, Target, Zap, Star } from 'lucide-react';

interface SupremeChallengeHeaderProps {
  hasWonBefore: boolean;
  attemptsLeft: number;
}

export function SupremeChallengeHeader({ hasWonBefore, attemptsLeft }: SupremeChallengeHeaderProps) {
  return (
    <CardHeader className="relative bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-red-600/90 backdrop-blur-xl p-6 sm:p-8 border-b-4 border-yellow-400/50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-red-400/20 animate-pulse"></div>
      
      <div className="relative z-10 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 animate-bounce" />
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                DESAFIO SUPREMO
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-yellow-200 font-semibold animate-pulse">
              {hasWonBefore ? '🏆 CONQUISTADO! Você é um MESTRE!' : '⚡ Prove sua maestria e ganhe desconto ÉPICO!'}
            </p>
          </div>
          <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 animate-bounce delay-300" />
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center max-w-2xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-yellow-400/50">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-green-400">10/10</div>
            <div className="text-xs sm:text-sm text-green-200">Acertos</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-blue-400/50">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-blue-400">10 min</div>
            <div className="text-xs sm:text-sm text-blue-200">Tempo</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-purple-400/50">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-purple-400">{attemptsLeft}</div>
            <div className="text-xs sm:text-sm text-purple-200">Restantes</div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
