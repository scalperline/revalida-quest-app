
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Target, Zap, Star, Sparkles, Gift } from 'lucide-react';
import { SupremeChallengeModal } from '@/components/challenge/SupremeChallengeModal';
import { getFixedSupremeChallengeQuestions } from '@/utils/fixedSupremeChallengeQuestions';
import { toast } from 'sonner';

export function SupremeChallengeCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Challenge states
  const [showSupremeModal, setShowSupremeModal] = useState(false);
  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [challengeReady, setChallengeReady] = useState(false);

  // Attempts system
  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('supreme_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });
  const maxAttempts = 3;
  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('supreme_challenge_won') === 'true';

  const handleStartChallenge = async () => {
    console.log('🚀 Iniciando Desafio Supremo');
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!canStartChallenge) {
      toast.error("Você já utilizou todas as 3 tentativas disponíveis!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return;
    }

    try {
      const fixedQuestions = getFixedSupremeChallengeQuestions();
      setChallengeQuestions(fixedQuestions);
      setChallengeReady(true);
      
      // Hide navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('navbar-hidden');
      }
      
      setShowSupremeModal(true);
      
      toast.success("🏆 Desafio Supremo iniciado! Boa sorte!", {
        duration: 2000,
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
      });
    } catch (error) {
      console.error('❌ Erro ao preparar questões fixas:', error);
      toast.error("Erro ao carregar desafio. Tente novamente!");
    }
  };

  const handleCloseSupremeModal = () => {
    setShowSupremeModal(false);
    
    // Show navbar again
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('navbar-hidden');
    }
  };

  const handleVictory = (coins: number, discount: number) => {
    console.log('🏆 VITÓRIA NO DESAFIO SUPREMO! Coins:', coins, 'Discount:', discount);
    setShowSupremeModal(false);
    
    // Mark as won and increment attempts
    localStorage.setItem('supreme_challenge_won', 'true');
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);
    localStorage.setItem('supreme_challenge_attempts', newAttempts.toString());
    
    // Show navbar again
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('navbar-hidden');
    }
    
    toast.success("🏆 DESAFIO SUPREMO CONQUISTADO! Seu prêmio está no card abaixo!", {
      duration: 6000,
      className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
    });
  };

  const handleChallengeEnd = () => {
    // Increment attempts on challenge end (win or lose)
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);
    localStorage.setItem('supreme_challenge_attempts', newAttempts.toString());
  };

  const resetAttempts = () => {
    console.log('🔄 RESETANDO tentativas (modo debug)');
    localStorage.removeItem('supreme_challenge_attempts');
    localStorage.removeItem('supreme_challenge_won');
    setAttemptsUsed(0);
    toast.success("Tentativas resetadas!", {
      duration: 2000,
    });
  };

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
        <CardHeader className="text-center pb-4 pt-8 px-6 lg:px-8 flex-shrink-0">
          {/* Icon with enhanced gradient */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            <Crown className="w-7 h-7 lg:w-9 lg:h-9 text-white relative z-10" />
          </div>

          {/* Plan Name and Description */}
          <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">
            Desafio Supremo
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-base lg:text-lg font-medium">
            Acerte 10 questões e ganhe desconto
          </CardDescription>

          {/* Pricing */}
          <div className="mt-6 lg:mt-8 mb-2">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                R$ 20
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-lg lg:text-xl font-medium ml-1">
                de desconto
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="lg:px-8 pb-6 lg:pb-8 flex-1 flex flex-col px-[25px]">
          {/* Challenge Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200/50">
              <Target className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <div className="text-sm font-bold text-red-700 dark:text-red-300">10/10</div>
              <div className="text-xs text-red-600 dark:text-red-400">Acertos</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200/50">
              <Zap className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <div className="text-sm font-bold text-red-700 dark:text-red-300">10min</div>
              <div className="text-xs text-red-600 dark:text-red-400">Tempo</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200/50">
              <Star className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <div className="text-sm font-bold text-red-700 dark:text-red-300">{attemptsLeft}</div>
              <div className="text-xs text-red-600 dark:text-red-400">Tentativas</div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 flex-1">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                <Trophy className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm lg:text-base">
                Plano Premium pelo preço do Básico
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                <Sparkles className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm lg:text-base">
                10 questões oficiais do INEP
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                <Gift className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm lg:text-base">
                Economia de R$ 20,00/mês
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                <Zap className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm lg:text-base">
                Apenas 3 tentativas disponíveis
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            {hasWonBefore ? (
              <div className="text-center">
                <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm px-4 py-2">
                  🏆 Desafio Conquistado!
                </Badge>
                <Button
                  onClick={resetAttempts}
                  variant="outline"
                  className="w-full py-3 lg:py-4 text-base lg:text-lg font-bold border-2 border-red-400 text-red-600 hover:bg-red-50"
                >
                  🔄 Resetar Tentativas
                </Button>
              </div>
            ) : canStartChallenge ? (
              <Button
                onClick={handleStartChallenge}
                className="w-full py-3 lg:py-4 text-base lg:text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] rounded-2xl border-0 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4 lg:w-5 lg:h-5" />
                  Aceitar Desafio
                  <Trophy className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </Button>
            ) : (
              <Button
                disabled
                className="w-full py-3 lg:py-4 text-base lg:text-lg font-bold rounded-2xl border-0 bg-gray-400 text-white opacity-75 cursor-not-allowed"
              >
                ❌ Tentativas Esgotadas
              </Button>
            )}
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
