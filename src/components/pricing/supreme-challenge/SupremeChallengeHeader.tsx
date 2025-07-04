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
  return <CardHeader className="relative bg-blue-900/90 backdrop-blur-xl p-6 sm:p-8 border border-blue-600/30">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/5 to-cyan-600/5 bg-slate-900"></div>
      
      <div className="relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 animate-bounce delay-300" />
          
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text animate-pulse text-3xl text-yellow-300">
                DESAFIO SUPREMO
              </span>
            </h2>
            <p className="text-lg sm:text-xl font-semibold animate-pulse text-gray-100">
              {hasWonBefore ? '🏆 CONQUISTADO! Você é um MESTRE!' : 'Acerte 10 questões e ganhe o plano Premium pelo preço do Básico'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center max-w-2xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-blue-600/50">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white bg-transparent">10/10</div>
            <div className="text-xs sm:text-sm text-slate-100 bg-transparent">Acerte 10 questões oficiais</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-blue-600/50">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white">10min</div>
            <div className="text-xs sm:text-sm text-yellow-300">tempo regressivo</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-blue-600/50">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white">{attemptsLeft}</div>
            <div className="text-xs sm:text-sm text-yellow-300">Tentativas
restantes</div>
          </div>
        </div>
      </div>
    </CardHeader>;
}
