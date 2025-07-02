
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, Zap, Crown, Sparkles, Shield, Rocket } from 'lucide-react';
import { ChallengeModal } from './ChallengeModal';

interface PremiumChallengeSectionProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  hasWonBefore: boolean;
  onStartChallenge: () => void;
}

export function PremiumChallengeSection({
  canStartChallenge,
  attemptsLeft,
  hasWonBefore,
  onStartChallenge
}: PremiumChallengeSectionProps) {
  const [showModal, setShowModal] = useState(false);

  const handleStartChallenge = () => {
    if (canStartChallenge) {
      onStartChallenge();
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="relative mb-16">
        {/* Simplified Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-15 animate-pulse blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-bounce blur-lg"></div>
        </div>

        <Card className="relative overflow-hidden border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl shadow-2xl">
          <CardHeader className="relative z-10 text-center pb-6">
            {/* Simplified Trophy Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Trophy className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent text-xl">
                ⚡ MISSÃO SUPREMA ⚡
              </span>
            </CardTitle>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Conquiste o <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">Plano Premium</span> pelo preço do Básico!
            </p>

            {hasWonBefore && (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 font-bold mb-4 animate-pulse">
                ✨ MISSÃO CONQUISTADA! Desconto Disponível ✨
              </Badge>
            )}
          </CardHeader>

          <CardContent className="relative z-10 text-center px-6">
            {/* Streamlined Challenge Requirements */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-sm rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  <span className="font-bold text-base text-gray-300">10 Questões</span>
                </div>
                <p className="text-blue-200 text-sm">Questões oficiais</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-xl p-4 border border-green-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-6 h-6 text-green-400" />
                  <span className="font-bold text-base text-green-200">10 Minutos</span>
                </div>
                <p className="text-green-200 text-sm">Tempo limite</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <span className="font-bold text-base text-fuchsia-200">100% Acerto</span>
                </div>
                <p className="text-purple-200 text-sm">Perfeição total</p>
              </div>
            </div>

            {/* Harmonized Reward Section */}
            <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-md rounded-2xl p-8 mb-8 border border-purple-400/40 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
                <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                  RECOMPENSA ÉPICA
                </h3>
                <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
              </div>
              
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bold mb-3">
                  <span className="text-gray-300">Premium por </span>
                  <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">R$ 29,90/mês</span>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-2xl text-gray-400 line-through">R$ 49,90</span>
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 font-bold text-lg">
                    40% OFF
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-xl border border-blue-400/20">
                  <Rocket className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-blue-200">Acesso Premium completo</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-400/20">
                  <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-purple-200">IA avançada personalizada</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl border border-green-400/20">
                  <Target className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-green-200">Análises preditivas</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl border border-yellow-400/20">
                  <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-yellow-200">Simulados ilimitados</span>
                </div>
              </div>
            </div>

            {/* Streamlined Action Section */}
            <div className="flex flex-col items-center gap-6">
              {canStartChallenge ? (
                <>
                  <Button 
                    onClick={handleStartChallenge} 
                    className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 py-4 px-8"
                  >
                    🚀 Aceitar Desafio 🚀
                  </Button>
                  
                  <div className="flex items-center gap-4 bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
                    <div className="flex gap-2">
                      {[...Array(attemptsLeft)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"></div>
                      ))}
                      {[...Array(3 - attemptsLeft)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      ))}
                    </div>
                    <p className="text-base text-gray-300">
                      <span className="text-yellow-400 font-bold">{attemptsLeft}</span> tentativas restantes
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center bg-gradient-to-br from-red-900/60 to-red-800/60 backdrop-blur-sm rounded-xl p-8 border border-red-400/30">
                  <p className="text-2xl font-bold text-red-300 mb-2">
                    ⚡ Energia Esgotada ⚡
                  </p>
                  <p className="text-red-200 text-base">
                    Você utilizou todas as 3 tentativas disponíveis
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ChallengeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
