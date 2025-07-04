
import { CardHeader } from '@/components/ui/card';
import { Trophy, Crown, Target, Zap, Star } from 'lucide-react';
interface SupremeChallengeHeaderProps {
  hasWonBefore: boolean;
  attemptsLeft: number;
}
export function SupremeChallengeHeader({
  hasWonBefore,
  attemptsLeft
}: SupremeChallengeHeaderProps) {
  return <CardHeader className="relative bg-gradient-to-r from-yellow-600/90 via-yellow-500/90 to-yellow-400/90 backdrop-blur-xl p-6 sm:p-8 border-b-4 border-yellow-300/70">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 animate-pulse"></div>
      
      <div className="relative z-10 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-800 animate-bounce" />
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-r from-black via-gray-800 to-yellow-900 bg-clip-text animate-pulse text-3xl text-slate-950">
                DESAFIO SUPREMO
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-yellow-900 font-semibold animate-pulse">
              {hasWonBefore ? '🏆 CONQUISTADO! Você é um MESTRE!' : 'Acerte 10 questões e ganhe o plano Premium pelo preço do Básico'}
            </p>
          </div>
          <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-800 animate-bounce delay-300" />
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center max-w-2xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-yellow-400/70">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-green-300">10/10</div>
            <div className="text-xs sm:text-sm text-green-200">Acertos</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-yellow-400/70">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-blue-300">10 min</div>
            <div className="text-xs sm:text-sm text-blue-200">Tempo</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-yellow-400/70">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-yellow-300">{attemptsLeft}</div>
            <div className="text-xs sm:text-sm text-yellow-200">Restantes</div>
          </div>
        </div>
      </div>
    </CardHeader>;
}
