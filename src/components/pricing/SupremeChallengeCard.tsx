
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown } from 'lucide-react';
import { SupremeChallengeModal } from '@/components/challenge/SupremeChallengeModal';
import { SupremeChallengeStats } from './supreme-challenge/SupremeChallengeStats';
import { SupremeChallengeFeatures } from './supreme-challenge/SupremeChallengeFeatures';
import { SupremeChallengeActions } from './supreme-challenge/SupremeChallengeActions';
import { useSupremeChallengeLogic } from './supreme-challenge/SupremeChallengeLogic';

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

  return (
    <div className="relative group transition-all duration-500 hover:scale-[1.02] md:-mt-4 lg:-mt-6">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-300 via-red-400 to-red-300 rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Badge Container */}
      <div className="absolute -top-3 left-0 right-0 z-20 flex justify-center">
        <Badge className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-4 py-2 text-sm font-bold shadow-xl border-0 rounded-full">
          <Trophy className="w-3 h-3 mr-1 fill-current" />
          Desafio Épico
        </Badge>
      </div>
      
      <Card className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] lg:min-h-[650px] flex flex-col shadow-red-500/20 ring-2 ring-red-200/50">
        <CardHeader className="text-center pb-4 pt-8 px-6 lg:px-8 flex-shrink-0 bg-orange-950">
          {/* Icon with enhanced gradient */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent bg-amber-400"></div>
            <Crown className="w-7 h-7 lg:w-9 lg:h-9 text-white relative z-10" />
          </div>

          {/* Plan Name and Description */}
          <CardTitle className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-white">DESAFIO SUPREMO</CardTitle>
          <CardDescription className="text-base lg:text-lg font-medium text-white">
            Acerte 10 questões oficiais e ganhe o plano Premium pelo preço do Básico!
          </CardDescription>

          {/* Pricing */}
          <div className="mt-6 lg:mt-8 mb-2">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-white">R$ 29,00</span>
              <span className="text-lg lg:text-xl font-medium ml-1 text-white">/ mês </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="lg:px-8 pb-6 lg:pb-8 flex-1 flex flex-col px-[25px] bg-orange-950">
          {/* Challenge Stats */}
          <SupremeChallengeStats attemptsLeft={attemptsLeft} />

          {/* Features List */}
          <SupremeChallengeFeatures />

          {/* Action Button */}
          <div className="mt-auto">
            <SupremeChallengeActions
              hasWonBefore={hasWonBefore}
              canStartChallenge={canStartChallenge}
              onStartChallenge={handleStartChallenge}
              onResetAttempts={resetAttempts}
            />
          </div>
        </CardContent>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-red-500/10 dark:via-red-500/2 dark:to-red-500/5 pointer-events-none rounded-3xl"></div>
      </Card>

      {/* Supreme Challenge Modal */}
      <SupremeChallengeModal 
        isOpen={showSupremeModal} 
        onClose={handleCloseSupremeModal} 
        onVictory={handleVictory} 
        onChallengeEnd={handleChallengeEnd} 
        questions={challengeQuestions} 
      />
    </div>
  );
}
