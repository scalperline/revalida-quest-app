
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { useQuestions } from '@/hooks/useQuestions';
import { Sparkles, Trophy, Crown, Zap, Target, Star } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansGrid } from '@/components/pricing/PricingPlansGrid';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingFooter } from '@/components/pricing/PricingFooter';
import { SupremeChallengeModal } from '@/components/challenge/SupremeChallengeModal';
import { SupremeVictoryModal } from '@/components/challenge/SupremeVictoryModal';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, subscription_tier, loading } = useSubscription();
  const { todasQuestoes } = useQuestions();

  // Challenge states
  const [showSupremeModal, setShowSupremeModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [challengeReady, setChallengeReady] = useState(false);
  const [victoryData, setVictoryData] = useState({ coins: 0, discount: 20 });

  // Attempts system
  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('supreme_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });
  const maxAttempts = 3;
  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('supreme_challenge_won') === 'true';

  // Prepare challenge questions
  useEffect(() => {
    if (todasQuestoes && todasQuestoes.length > 0) {
      console.log('📚 Preparando questões do desafio...', todasQuestoes.length);
      
      // Filter valid questions
      const validQuestions = todasQuestoes.filter(q => 
        q && q.id && q.enunciado && q.options && Array.isArray(q.options) && 
        q.options.length >= 2 && q.correct && q.year && q.area
      );
      
      if (validQuestions.length >= 10) {
        // Shuffle and select 10 questions
        const shuffled = [...validQuestions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 10);
        setChallengeQuestions(selected);
        setChallengeReady(true);
        console.log('✅ Desafio preparado com', selected.length, 'questões');
      } else {
        console.error('❌ Questões insuficientes:', validQuestions.length);
      }
    }
  }, [todasQuestoes]);

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

    if (!challengeReady || challengeQuestions.length === 0) {
      toast.error("Questões ainda carregando. Aguarde um momento!", {
        duration: 3000,
        className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
      });
      return;
    }

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
    setVictoryData({ coins, discount });
    setShowSupremeModal(false);
    setShowVictoryModal(true);
    
    // Mark as won and increment attempts
    localStorage.setItem('supreme_challenge_won', 'true');
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);
    localStorage.setItem('supreme_challenge_attempts', newAttempts.toString());
  };

  const handleChallengeEnd = () => {
    // Increment attempts on challenge end (win or lose)
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);
    localStorage.setItem('supreme_challenge_attempts', newAttempts.toString());
  };

  const handleCloseVictoryModal = () => {
    setShowVictoryModal(false);
    
    // Show navbar again
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('navbar-hidden');
    }
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
    <div className="min-h-screen stellar-gradient relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-pink-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <Sparkles className="absolute top-20 left-20 w-8 h-8 text-blue-300 opacity-30 animate-pulse delay-500" />
      </div>

      <div className="navbar">
        <Navbar />
      </div>
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          <PricingHeader />

          {/* Supreme Challenge Section */}
          <div className="relative mb-16">
            {/* Epic Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-bounce"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>
            
            <Card className="relative overflow-hidden border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl shadow-2xl">
              {/* Epic Header */}
              <CardHeader className="relative bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-red-600/90 backdrop-blur-xl p-8 border-b-4 border-yellow-400/50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-red-400/20 animate-pulse"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                    <div>
                      <h2 className="text-4xl md:text-6xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                          DESAFIO SUPREMO
                        </span>
                      </h2>
                      <p className="text-xl text-yellow-200 font-semibold animate-pulse">
                        {hasWonBefore ? '🏆 CONQUISTADO! Você é um MESTRE!' : '⚡ Prove sua maestria e ganhe desconto ÉPICO!'}
                      </p>
                    </div>
                    <Crown className="w-16 h-16 text-yellow-400 animate-bounce delay-300" />
                  </div>

                  <div className="flex items-center justify-center gap-8 text-center">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border-2 border-yellow-400/50">
                      <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-400">10/10</div>
                      <div className="text-sm text-green-200">Acertos Necessários</div>
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border-2 border-blue-400/50">
                      <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-400">10 min</div>
                      <div className="text-sm text-blue-200">Tempo Limite</div>
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-400/50">
                      <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-400">{attemptsLeft}</div>
                      <div className="text-sm text-purple-200">Tentativas Restantes</div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 text-center p-8">
                {/* Challenge Requirements */}
                <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border-2 border-gray-600/50">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                    <Target className="w-8 h-8 text-orange-400" />
                    DESAFIO EXTREMO
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">✓</span>
                      </div>
                      <span>10 questões oficiais do Revalida</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">⚡</span>
                      </div>
                      <span>Cronômetro regressivo de 10 minutos</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">🎯</span>
                      </div>
                      <span>100% de aproveitamento obrigatório</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">🔥</span>
                      </div>
                      <span>Sistema de combos e streaks</span>
                    </div>
                  </div>
                </div>

                {/* Epic Reward */}
                <div className="bg-gradient-to-br from-yellow-900/80 to-orange-900/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border-4 border-yellow-400/50 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                      <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
                      RECOMPENSA SUPREMA
                    </h3>
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold mb-2">
                        <span className="text-gray-400 line-through text-2xl">R$ 49,90</span>
                        <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text ml-4">
                          R$ 29,90
                        </span>
                      </div>
                      <p className="text-yellow-200 text-xl font-semibold">
                        💰 Desconto de R$ 20,00/mês no Plano Premium!
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-gray-200">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span>Acesso Premium completo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <span>IA personalizada avançada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-400" />
                        <span>Simulados ilimitados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span>Suporte prioritário</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge Action */}
                <div className="flex flex-col items-center gap-6">
                  {hasWonBefore ? (
                    <div className="text-center">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg px-6 py-3 mb-4">
                        🏆 DESAFIO CONQUISTADO! Você é um MESTRE!
                      </Badge>
                      <p className="text-gray-300 mb-4">Parabéns! Você já conquistou este desafio épico.</p>
                      <Button
                        onClick={resetAttempts}
                        variant="outline"
                        className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                      >
                        🔄 Resetar para Tentar Novamente
                      </Button>
                    </div>
                  ) : canStartChallenge ? (
                    <div className="text-center">
                      <Button
                        onClick={handleStartChallenge}
                        disabled={!challengeReady}
                        className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-red-400/20 animate-pulse"></div>
                        <div className="relative z-10 flex items-center gap-4">
                          <Trophy className="w-8 h-8" />
                          {challengeReady ? '🚀 INICIAR DESAFIO SUPREMO' : '⏳ Carregando questões...'}
                          <Crown className="w-8 h-8" />
                        </div>
                      </Button>
                      
                      <p className="text-gray-400 mt-4">
                        💡 Tentativas restantes: <span className="text-yellow-400 font-bold">{attemptsLeft}</span>
                      </p>
                      
                      {process.env.NODE_ENV === 'development' && (
                        <Button
                          onClick={resetAttempts}
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
                      <Badge variant="destructive" className="text-lg px-6 py-3 mb-4">
                        ❌ Tentativas Esgotadas
                      </Badge>
                      <p className="text-gray-300 mb-4">Você utilizou todas as 3 tentativas disponíveis.</p>
                      <Button
                        onClick={resetAttempts}
                        variant="outline"
                        className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                      >
                        🔄 Resetar Tentativas (Debug)
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <PricingPlansGrid subscribed={subscribed} subscription_tier={subscription_tier} loading={loading} />
          <PricingFAQ />
          <PricingFooter />
        </div>
      </div>

      {/* Supreme Challenge Modal */}
      <SupremeChallengeModal
        isOpen={showSupremeModal}
        onClose={handleCloseSupremeModal}
        onVictory={handleVictory}
        onChallengeEnd={handleChallengeEnd}
        questions={challengeQuestions}
      />

      {/* Supreme Victory Modal */}
      <SupremeVictoryModal
        isOpen={showVictoryModal}
        onClose={handleCloseVictoryModal}
        coins={victoryData.coins}
        discount={victoryData.discount}
        score={10}
        total={10}
      />

      {/* CSS para ocultar navbar */}
      <style>{`
        .navbar-hidden { 
          display: none !important; 
        }
      `}</style>
    </div>
  );
}
