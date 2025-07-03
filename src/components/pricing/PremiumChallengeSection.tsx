
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, Zap, Crown, Sparkles, Shield, Rocket, Star, Brain } from 'lucide-react';
import { ChallengeModal } from './ChallengeModal';

interface PremiumChallengeSectionProps {
  canStartBasic: boolean;
  canStartSupreme: boolean;
  basicAttemptsLeft: number;
  supremeAttemptsLeft: number;
  hasWonBasic: boolean;
  hasWonSupreme: boolean;
  onStartChallenge: (type: 'basic' | 'supreme') => void;
  onResetAttempts?: () => void;
}

export function PremiumChallengeSection({
  canStartBasic,
  canStartSupreme,
  basicAttemptsLeft,
  supremeAttemptsLeft,
  hasWonBasic,
  hasWonSupreme,
  onStartChallenge,
  onResetAttempts
}: PremiumChallengeSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [challengeType, setChallengeType] = useState<'basic' | 'supreme'>('basic');
  
  console.log('PremiumChallengeSection props:', { 
    canStartBasic,
    canStartSupreme,
    basicAttemptsLeft,
    supremeAttemptsLeft,
    hasWonBasic,
    hasWonSupreme
  });

  const handleStartChallenge = (type: 'basic' | 'supreme') => {
    setChallengeType(type);
    onStartChallenge(type);
    setShowModal(true);
  };

  return (
    <>
      <div className="relative mb-8 md:mb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-15 animate-pulse blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-bounce blur-lg"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4 md:mb-8">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse relative">
              <Trophy className="w-8 h-8 md:w-12 md:h-12 text-white" />
              <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-7 h-7 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-3 h-3 md:w-5 md:h-5 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
              ⚡ DESAFIOS REVALIDA ⚡
            </span>
          </h2>
          
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-6">
            Prove seu conhecimento e ganhe <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">XP massivo</span> para o ranking nacional!
          </p>
        </div>

        {/* Desafios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Desafio Básico */}
          <Card className="relative overflow-hidden border-2 border-blue-400/30 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95 backdrop-blur-xl shadow-2xl">
            <CardHeader className="relative z-10 text-center pb-4 md:pb-6 pt-4 md:pt-6 px-4 md:px-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-xl md:text-2xl font-bold mb-3">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  🎯 DESAFIO BÁSICO
                </span>
              </CardTitle>
              
              {hasWonBasic && (
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 font-bold text-sm animate-pulse shadow-lg mb-3">
                  ✅ CONQUISTADO! +150 XP Ganhos
                </Badge>
              )}
            </CardHeader>

            <CardContent className="relative z-10 px-4 md:px-6 pb-6">
              {/* Requisitos do Desafio Básico */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-sm rounded-lg p-3 border border-blue-400/20 text-center">
                  <Target className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="font-bold text-sm text-blue-200">5 Questões</div>
                </div>
                <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-lg p-3 border border-green-400/20 text-center">
                  <Clock className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <div className="font-bold text-sm text-green-200">5 Minutos</div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-lg p-3 border border-purple-400/20 text-center">
                  <Star className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <div className="font-bold text-sm text-purple-200">80% Acerto</div>
                </div>
              </div>

              {/* Recompensa */}
              <div className="bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-md rounded-xl p-4 mb-6 border border-blue-400/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300 mb-1">+150 XP</div>
                  <div className="text-sm text-blue-200">Recompensa Base</div>
                  <div className="text-xs text-blue-300 mt-1">+ Bônus por velocidade</div>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="text-center">
                {canStartBasic ? (
                  <>
                    <Button 
                      onClick={() => handleStartChallenge('basic')} 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 py-3 px-6 w-full mb-3"
                    >
                      🎯 Iniciar Desafio Básico
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
                      <div className="flex gap-1">
                        {[...Array(basicAttemptsLeft)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        ))}
                        {[...Array(5 - basicAttemptsLeft)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        ))}
                      </div>
                      <span>{basicAttemptsLeft}/5 tentativas</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
                    <p className="text-lg font-bold text-gray-300 mb-2">Tentativas Esgotadas</p>
                    <p className="text-gray-400 text-sm">Você usou todas as 5 tentativas</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Desafio Supremo */}
          <Card className="relative overflow-hidden border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-pink-900/95 backdrop-blur-xl shadow-2xl">
            <CardHeader className="relative z-10 text-center pb-4 md:pb-6 pt-4 md:pt-6 px-4 md:px-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg relative">
                  <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-xl md:text-2xl font-bold mb-3">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  👑 DESAFIO SUPREMO
                </span>
              </CardTitle>
              
              {hasWonSupreme && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 font-bold text-sm animate-pulse shadow-lg mb-3">
                  👑 LENDA! +500+ XP Ganhos
                </Badge>
              )}
            </CardHeader>

            <CardContent className="relative z-10 px-4 md:px-6 pb-6">
              {/* Requisitos do Desafio Supremo */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-lg p-3 border border-purple-400/20 text-center">
                  <Target className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <div className="font-bold text-sm text-purple-200">10 Questões</div>
                </div>
                <div className="bg-gradient-to-br from-red-900/60 to-orange-900/60 backdrop-blur-sm rounded-lg p-3 border border-red-400/20 text-center">
                  <Clock className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <div className="font-bold text-sm text-red-200">10 Minutos</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/60 to-orange-900/60 backdrop-blur-sm rounded-lg p-3 border border-yellow-400/20 text-center">
                  <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <div className="font-bold text-sm text-yellow-200">100% Acerto</div>
                </div>
              </div>

              {/* Recompensa */}
              <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-md rounded-xl p-4 mb-6 border border-purple-400/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-1">+500 XP</div>
                  <div className="text-sm text-purple-200">Recompensa Base</div>
                  <div className="text-xs text-purple-300 mt-1">+ Bônus velocidade + Bônus perfeição</div>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="text-center">
                {canStartSupreme ? (
                  <>
                    <Button 
                      onClick={() => handleStartChallenge('supreme')} 
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 py-3 px-6 w-full mb-3"
                    >
                      👑 Aceitar Desafio Supremo
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-purple-300">
                      <div className="flex gap-1">
                        {[...Array(supremeAttemptsLeft)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        ))}
                        {[...Array(3 - supremeAttemptsLeft)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        ))}
                      </div>
                      <span>{supremeAttemptsLeft}/3 tentativas</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center bg-gradient-to-br from-red-900/60 to-red-800/60 backdrop-blur-sm rounded-xl p-4 border border-red-400/30">
                    <p className="text-lg font-bold text-red-300 mb-2">Energia Esgotada</p>
                    <p className="text-red-200 text-sm">Você usou todas as 3 tentativas</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debug Reset Button */}
        {onResetAttempts && (
          <div className="text-center mt-6">
            <Button 
              onClick={onResetAttempts}
              variant="outline"
              className="border-2 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10 text-sm px-4 py-2"
            >
              🔄 Resetar Tentativas (Debug)
            </Button>
          </div>
        )}
      </div>

      <ChallengeModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        challengeType={challengeType}
      />
    </>
  );
}
