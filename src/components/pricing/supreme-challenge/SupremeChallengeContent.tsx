
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
  return (
    <CardContent className="relative z-10 text-center p-6 sm:p-8">
      {/* Challenge Requirements */}
      <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-gray-600/50">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center gap-3">
          <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
          DESAFIO EXTREMO
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg">
          <div className="flex items-center gap-3 text-gray-200">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <span>10 questões oficiais do Revalida</span>
          </div>
          <div className="flex items-center gap-3 text-gray-200">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">⚡</span>
            </div>
            <span>Cronômetro regressivo de 10 minutos</span>
          </div>
          <div className="flex items-center gap-3 text-gray-200">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">🎯</span>
            </div>
            <span>100% de aproveitamento obrigatório</span>
          </div>
          <div className="flex items-center gap-3 text-gray-200">
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">🔥</span>
            </div>
            <span>Sistema de combos e streaks</span>
          </div>
        </div>
      </div>

      {/* Epic Reward */}
      <div className="bg-gradient-to-br from-yellow-900/80 to-orange-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border-4 border-yellow-400/50 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 animate-pulse"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-bounce" />
            RECOMPENSA SUPREMA
          </h3>
          <div className="text-center mb-6">
            <div className="text-3xl sm:text-5xl font-bold mb-2">
              <span className="text-gray-400 line-through text-xl sm:text-2xl">R$ 49,90</span>
              <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text ml-4">
                R$ 29,90
              </span>
            </div>
            <p className="text-yellow-200 text-lg sm:text-xl font-semibold">
              💰 Desconto de R$ 20,00/mês no Plano Premium!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-gray-200 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
              <span>Acesso Premium completo</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <span>IA personalizada avançada</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <span>Simulados ilimitados</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
              <span>Suporte prioritário</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Action */}
      <div className="flex flex-col items-center gap-6">
        {hasWonBefore ? (
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 mb-4">
              🏆 DESAFIO CONQUISTADO! Você é um MESTRE!
            </Badge>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">Parabéns! Você já conquistou este desafio épico.</p>
            <Button
              onClick={onResetAttempts}
              variant="outline"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              🔄 Resetar para Tentar Novamente
            </Button>
          </div>
        ) : canStartChallenge ? (
          <div className="text-center">
            <Button
              onClick={onStartChallenge}
              disabled={!challengeReady}
              className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white text-lg sm:text-2xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-red-400/20 animate-pulse"></div>
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                {challengeReady ? '🚀 INICIAR DESAFIO SUPREMO' : '⏳ Carregando questões...'}
                <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </Button>
            
            <p className="text-gray-400 mt-4 text-sm sm:text-base">
              💡 Tentativas restantes: <span className="text-yellow-400 font-bold">{attemptsLeft}</span>
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <Button
                onClick={onResetAttempts}
                variant="ghost"
                size="sm"
                className="mt-2 text-gray-500 text-xs"
              >
                🔧 Dev: Resetar tentativas
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Badge variant="destructive" className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 mb-4">
              ❌ Tentativas Esgotadas
            </Badge>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">Você utilizou todas as 3 tentativas disponíveis.</p>
            <Button
              onClick={onResetAttempts}
              variant="outline"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              🔄 Resetar Tentativas (Debug)
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  );
}
