
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy, Sparkles, Zap, Crown } from 'lucide-react';

interface SupremeChallengeContentProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  hasWonBefore: boolean;
  challengeReady: boolean;
  onStartChallenge: () => void;
  onResetAttempts: () => void;
}

export function SupremeChallengeContent({
  canStartChallenge,
  attemptsLeft,
  hasWonBefore,
  challengeReady,
  onStartChallenge,
  onResetAttempts
}: SupremeChallengeContentProps) {
  return <CardContent className="relative z-10 text-center p-6 sm:p-8 backdrop-blur-sm bg-red-950 px-[24px]">
      {/* Epic Reward */}
      <div className="bg-red-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-yellow-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-300/10 animate-pulse"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-3 text-gray-50">
            RECOMPENSA SUPREMA
          </h3>
          <div className="text-center mb-6">
            <div className="text-3xl sm:text-5xl font-bold mb-2">
              <span className="line-through text-xl sm:text-2xl text-zinc-400">R$ 49,90</span>
              <span className="ml-4 text-lime-400 text-2xl">
                R$ 29,90
              </span>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-zinc-50">
              💰 Desconto de R$ 20,00/mês no Plano Premium!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-yellow-300 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-white">Acesso Premium completo</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
              <span className="text-white">IA personalizada avançada</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <span className="text-white">Simulados ilimitados</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-white">Suporte prioritário</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Action */}
      <div className="flex flex-col items-center gap-6">
        {hasWonBefore ? <div className="text-center">
            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 mb-4">
              🏆 DESAFIO CONQUISTADO! Você é um MESTRE!
            </Badge>
            <p className="text-yellow-300 mb-4 text-sm sm:text-base">Parabéns! Você já conquistou este desafio épico.</p>
            <Button onClick={onResetAttempts} variant="outline" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
              🔄 Resetar para Tentar Novamente
            </Button>
          </div> : canStartChallenge ? <div className="text-center">
            <Button onClick={onStartChallenge} disabled={!challengeReady} className="relative group bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-500 text-black text-lg sm:text-2xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 animate-pulse"></div>
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                {challengeReady ? 'ACEITAR DESAFIO SUPREMO' : '⏳ Carregando questões...'}
                <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </Button>
            
            <p className="mt-4 text-sm sm:text-base text-white">
              💡 Tentativas restantes: <span className="text-yellow-400 font-bold">{attemptsLeft}</span>
            </p>
            
            {process.env.NODE_ENV === 'development' && <Button onClick={onResetAttempts} variant="ghost" size="sm" className="mt-2 text-yellow-500 text-xs">
                🔧 Dev: Resetar tentativas
              </Button>}
          </div> : <div className="text-center">
            <Badge variant="destructive" className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 mb-4 bg-red-800/80 text-yellow-300">
              ❌ Tentativas Esgotadas
            </Badge>
            <p className="text-yellow-300 mb-4 text-sm sm:text-base">Você utilizou todas as 3 tentativas disponíveis.</p>
            <Button onClick={onResetAttempts} variant="outline" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
              🔄 Resetar Tentativas (Debug)
            </Button>
          </div>}
      </div>
    </CardContent>;
}
