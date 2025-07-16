import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown } from 'lucide-react';
import { SupremeChallengeModal } from '@/components/challenge/SupremeChallengeModal';
import { SupremeChallengeStats } from './supreme-challenge/SupremeChallengeStats';
import { SupremeChallengeFeatures } from './supreme-challenge/SupremeChallengeFeatures';
import { SupremeChallengeActions } from './supreme-challenge/SupremeChallengeActions';
import { SupremeChallengeCountdown } from './supreme-challenge/SupremeChallengeCountdown';
import { useSupremeChallengeLogic } from './supreme-challenge/SupremeChallengeLogic';
import { useToast } from '@/hooks/use-toast';

export function SupremeChallengeCard() {
  const {
    showSupremeModal,
    challengeQuestions,
    attemptsLeft,
    hasWonBefore,
    canStartChallenge,
    handleStartChallenge,
    handleCloseSupremeModal,
    handleVictory,
    handleChallengeEnd,
    resetAttempts
  } = useSupremeChallengeLogic();
  const { toast } = useToast();

  // Show victory modal after winning
  if (hasWonBefore) {
    return <div className="relative group transition-all duration-500 hover:scale-[1.02] md:-mt-4 lg:-mt-6">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-yellow-300 rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Badge Container */}
        <div className="absolute -top-3 left-0 right-0 z-20 flex justify-center">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold shadow-xl border-0 rounded-full animate-pulse">
            <Trophy className="w-3 h-3 mr-1 fill-current" />
            🏆 Desafio Conquistado!
          </Badge>
        </div>
        
        <Card className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] flex flex-col shadow-yellow-500/20 ring-2 ring-yellow-200/50">
          <CardHeader className="text-center pb-3 sm:pb-4 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 flex-shrink-0 bg-gradient-to-br from-yellow-600 to-orange-700">
            {/* Icon with enhanced gradient */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent bg-yellow-400 animate-pulse"></div>
              <Crown className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white relative z-10" />
            </div>

            {/* Plan Name and Description */}
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-white">PARABÉNS!</CardTitle>
            <CardDescription className="text-sm sm:text-base lg:text-lg font-medium text-zinc-200 px-2">
              Você conquistou o Desafio Surpresa! Resgate seu prêmio abaixo.
            </CardDescription>

            {/* Pricing */}
            <div className="mt-4 sm:mt-6 lg:mt-8 mb-2">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-400 line-through">R$ 49,90</span>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">R$ 29,90</span>
                <span className="text-sm sm:text-lg lg:text-xl font-medium ml-1 text-zinc-200">/ mês </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 flex-1 flex flex-col bg-gradient-to-br from-yellow-600 to-orange-700">
            {/* Victory Content */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🎉 SEU CUPOM DE DESCONTO 🎉</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 border-2 border-white/30">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Badge className="bg-gradient-to-r from-white to-gray-100 text-black text-lg sm:text-2xl font-bold px-4 sm:px-6 py-2 sm:py-3 animate-pulse">
                    SUPREME
                  </Badge>
                  <button onClick={() => {
                    navigator.clipboard.writeText('SUPREME');
                    toast({
                      title: 'Cupom copiado!',
                      description: 'Cole no checkout para aplicar o desconto.',
                    });
                  }} className="bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    📋 Copiar
                  </button>
                </div>
                <p className="text-white/80 text-xs sm:text-sm mt-2">
                  Use este cupom no checkout para garantir seu desconto especial!
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8 flex-1">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
                </div>
                <span className="font-medium leading-relaxed text-xs sm:text-sm lg:text-base text-white">
                  Plano Premium pelo preço do Básico
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
                </div>
                <span className="font-medium leading-relaxed text-xs sm:text-sm lg:text-base text-white">
                  Economia de R$ 20,00/mês
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-2 sm:space-y-3">
              <button onClick={() => {
                window.open('https://buy.stripe.com/bJeaEX08TeQE38v8xi7ss02', '_blank');
              }} className="w-full py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] rounded-2xl border-0 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black animate-pulse">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span className="text-xs sm:text-sm lg:text-base">🏆 RESGATAR PRÊMIO PREMIUM</span>
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </div>
              </button>
              
              <button onClick={resetAttempts} className="w-full py-2 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base font-medium rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
                🔄 Resetar Tentativas
              </button>
            </div>
          </CardContent>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/5 to-orange-500/10 dark:via-yellow-500/2 dark:to-orange-500/5 pointer-events-none rounded-3xl"></div>
        </Card>

        {/* Supreme Challenge Modal */}
        <SupremeChallengeModal isOpen={showSupremeModal} onClose={handleCloseSupremeModal} onVictory={handleVictory} onChallengeEnd={handleChallengeEnd} questions={challengeQuestions} />
      </div>;
  }

  return <div id="supreme-challenge-card" className="relative group transition-all duration-500 hover:scale-[1.02] md:-mt-4 lg:-mt-6">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-300 via-red-400 to-red-300 rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Badge Container */}
      <div className="absolute -top-3 left-0 right-0 z-20 flex justify-center">
        <Badge className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-4 py-2 text-sm font-bold shadow-xl border-0 rounded-full">
          <Trophy className="w-3 h-3 mr-1 fill-current" />
          Vai encarar?
        </Badge>
      </div>
      
      <Card className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] lg:min-h-[650px] flex flex-col shadow-red-500/20 ring-2 ring-red-200/50">
        <CardHeader className="text-center pb-4 pt-8 px-6 lg:px-8 flex-shrink-0 bg-red-950">
          {/* Icon with enhanced gradient */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent bg-gradient-to-r from-yellow-500 to-orange-600 animate-pulse"></div>
            <Crown className="w-7 h-7 lg:w-9 lg:h-9 text-white relative z-10" />
          </div>

          {/* Countdown Timer */}
          <SupremeChallengeCountdown />

          {/* Plan Name and Description */}
          <CardTitle className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-white">DESAFIO SURPRESA</CardTitle>
          <CardDescription className="text-base lg:text-lg font-medium text-zinc-300">
            Acerte 10 questões oficiais e ganhe o plano Premium pelo preço do Básico!
          </CardDescription>

          {/* Pricing */}
          <div className="mt-6 lg:mt-8 mb-2">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-400 line-through">R$ 49,90</span>
              <span className="lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-lime-400 text-2xl">R$ 29,90</span>
              <span className="text-lg lg:text-xl font-medium ml-1 text-zinc-500">/mês</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="lg:px-8 pb-6 lg:pb-8 flex-1 flex flex-col px-[25px] bg-red-950">
          {/* Challenge Stats */}
          <SupremeChallengeStats attemptsLeft={attemptsLeft} />

          {/* Features List */}
          <SupremeChallengeFeatures />

          {/* Action Button */}
          <div className="mt-auto">
            <SupremeChallengeActions hasWonBefore={hasWonBefore} canStartChallenge={canStartChallenge} onStartChallenge={handleStartChallenge} onResetAttempts={resetAttempts} attemptsLeft={attemptsLeft} />
          </div>
        </CardContent>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-red-500/10 dark:via-red-500/2 dark:to-red-500/5 pointer-events-none rounded-3xl"></div>
      </Card>

      {/* Supreme Challenge Modal */}
      <SupremeChallengeModal isOpen={showSupremeModal} onClose={handleCloseSupremeModal} onVictory={handleVictory} onChallengeEnd={handleChallengeEnd} questions={challengeQuestions} />
    </div>;
}
