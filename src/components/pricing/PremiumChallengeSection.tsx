
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, Zap, Crown, Sparkles, Shield, Rocket, AlertCircle } from 'lucide-react';
import { ChallengeModal } from './ChallengeModal';
import { toast } from 'sonner';

interface PremiumChallengeSectionProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  hasWonBefore: boolean;
  onStartChallenge: () => boolean;
  onResetAttempts?: () => void;
}

export function PremiumChallengeSection({
  canStartChallenge,
  attemptsLeft,
  hasWonBefore,
  onStartChallenge,
  onResetAttempts
}: PremiumChallengeSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartChallenge = async () => {
    console.log('=== BOTÃO DESAFIO CLICADO ===');
    console.log('Pode iniciar desafio?', canStartChallenge);
    console.log('Tentativas restantes:', attemptsLeft);
    
    if (!canStartChallenge) {
      console.log('❌ Não pode iniciar desafio - tentativas esgotadas');
      toast.error("Você já utilizou todas as tentativas disponíveis!", {
        duration: 3000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return;
    }

    setIsStarting(true);
    
    try {
      console.log('🚀 Iniciando desafio...');
      toast.loading("Preparando o Desafio Supremo...", {
        duration: 2000,
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
      });
      
      // Pequeno delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const started = onStartChallenge();
      console.log('Desafio iniciado?', started);
      
      if (started) {
        console.log('✅ Abrindo modal...');
        toast.success("Desafio Supremo iniciado! Boa sorte! 🚀", {
          duration: 2000,
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
        });
        setShowModal(true);
      } else {
        console.log('❌ Falha ao iniciar desafio');
        toast.error("Erro ao iniciar o desafio. Tente novamente!", {
          duration: 3000,
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
        });
      }
    } catch (error) {
      console.error('❌ Erro ao iniciar desafio:', error);
      toast.error("Erro inesperado. Tente novamente!", {
        duration: 3000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    } finally {
      setIsStarting(false);
    }
  };

  const handleCloseModal = () => {
    console.log('🚪 Fechando modal...');
    setShowModal(false);
  };

  console.log('=== RENDER PREMIUM CHALLENGE SECTION ===');
  console.log('showModal:', showModal);
  console.log('canStartChallenge:', canStartChallenge);
  console.log('attemptsLeft:', attemptsLeft);
  console.log('isStarting:', isStarting);

  return (
    <>
      <div className="relative mb-8 md:mb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-15 animate-pulse blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-bounce blur-lg"></div>
        </div>

        <Card className="relative overflow-hidden border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl shadow-2xl">
          <CardHeader className="relative z-10 text-center pb-4 md:pb-8 pt-4 md:pt-8 px-4 md:px-6">
            {/* Trophy Icon */}
            <div className="flex justify-center mb-4 md:mb-8">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse relative">
                <Trophy className="w-8 h-8 md:w-12 md:h-12 text-white" />
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-7 h-7 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-3 h-3 md:w-5 md:h-5 text-white" />
                </div>
              </div>
            </div>
            
            <CardTitle className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                ⚡ DESAFIO SUPREMO ⚡
              </span>
            </CardTitle>
            
            <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed px-2">
              Conquiste o <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">Plano Premium</span> pelo preço do Básico!
            </p>

            {hasWonBefore && (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 md:px-6 md:py-3 font-bold text-sm md:text-lg animate-pulse shadow-lg">
                ✨ DESAFIO CONQUISTADO! Desconto Disponível ✨
              </Badge>
            )}
          </CardHeader>

          <CardContent className="relative z-10 text-center px-3 md:px-6">
            {/* Challenge Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-10">
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-400/20">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Target className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
                  <span className="font-bold text-base md:text-lg text-gray-300">10 Questões</span>
                </div>
                <p className="text-blue-200 text-xs md:text-sm">Uma por vez, com feedback imediato</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-green-400/20">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Clock className="w-5 h-5 md:w-7 md:h-7 text-green-400" />
                  <span className="font-bold text-base md:text-lg text-green-200">10 Minutos</span>
                </div>
                <p className="text-green-200 text-xs md:text-sm">Sistema de combo e recompensas</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-400/20">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Zap className="w-5 h-5 md:w-7 md:h-7 text-purple-400" />
                  <span className="font-bold text-base md:text-lg text-fuchsia-200">100% Acerto</span>
                </div>
                <p className="text-purple-200 text-xs md:text-sm">Perfeição total + bônus XP</p>
              </div>
            </div>

            {/* Reward Section */}
            <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-md rounded-2xl p-6 md:p-10 mb-6 md:mb-10 border border-purple-400/40 shadow-xl">
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-8">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                <h3 className="text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                  RECOMPENSA ÉPICA
                </h3>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
              </div>
              
              <div className="mb-6 md:mb-8">
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
                  <span className="text-gray-300 block sm:inline">Premium por </span>
                  <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">R$ 29,90/mês</span>
                </div>
                
                <div className="flex items-center justify-center gap-3 md:gap-6 mb-4 md:mb-8">
                  <span className="text-xl md:text-3xl text-gray-400 line-through">R$ 49,90</span>
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 md:px-6 md:py-3 font-bold text-sm md:text-xl shadow-lg">
                    40% OFF
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-sm md:text-lg">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-xl border border-blue-400/20">
                  <Rocket className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0" />
                  <span className="text-blue-200">Acesso Premium completo</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-400/20">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-400 flex-shrink-0" />
                  <span className="text-purple-200">IA avançada personalizada</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl border border-green-400/20">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                  <span className="text-green-200">Análises preditivas</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl border border-yellow-400/20">
                  <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-yellow-200">Simulados ilimitados</span>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col items-center gap-4 md:gap-8">
              {canStartChallenge ? (
                <>
                  <Button 
                    onClick={handleStartChallenge}
                    disabled={isStarting}
                    className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-lg md:text-2xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 py-4 px-8 md:py-6 md:px-12 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isStarting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        PREPARANDO DESAFIO...
                      </div>
                    ) : (
                      <>🚀 ACEITAR DESAFIO SUPREMO 🚀</>
                    )}
                  </Button>
                  
                  <div className="flex items-center gap-3 md:gap-6 bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-600/30">
                    <div className="flex gap-2 md:gap-3">
                      {[...Array(attemptsLeft)].map((_, i) => (
                        <div key={i} className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse"></div>
                      ))}
                      {[...Array(3 - attemptsLeft)].map((_, i) => (
                        <div key={i} className="w-4 h-4 md:w-5 md:h-5 bg-gray-600 rounded-full"></div>
                      ))}
                    </div>
                    <p className="text-sm md:text-lg text-gray-300">
                      <span className="text-yellow-400 font-bold">{attemptsLeft}</span> tentativas restantes
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center bg-gradient-to-br from-red-900/60 to-red-800/60 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-red-400/30">
                  <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-xl md:text-3xl font-bold text-red-300 mb-2 md:mb-3">
                    ⚡ Energia Esgotada ⚡
                  </p>
                  <p className="text-red-200 text-sm md:text-lg mb-4">
                    Você utilizou todas as 3 tentativas disponíveis
                  </p>
                  {onResetAttempts && (
                    <Button 
                      onClick={onResetAttempts}
                      variant="outline"
                      className="border-2 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10 text-sm px-4 py-2"
                    >
                      🔄 Resetar Tentativas (Debug)
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ChallengeModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
