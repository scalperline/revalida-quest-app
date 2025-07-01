
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
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {/* Animated Particles */}
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-20 animate-pulse blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full opacity-25 animate-bounce blur-lg"></div>
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-15 animate-ping blur-md"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-bounce delay-1000 blur-sm"></div>
          
          {/* Floating Icons */}
          <Sparkles className="absolute top-8 left-8 w-8 h-8 text-yellow-400 opacity-40 animate-pulse" />
          <Shield className="absolute bottom-12 left-16 w-7 h-7 text-purple-400 opacity-45 animate-pulse delay-700" />
          <Rocket className="absolute bottom-16 right-8 w-8 h-8 text-blue-400 opacity-35 animate-bounce delay-300" />
        </div>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl shadow-2xl">
          {/* Holographic Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 via-purple-500 to-blue-500 p-1">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95"></div>
          </div>
          
          {/* Inner Glow Effect */}
          <div className="absolute inset-2 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-orange-500/10 via-red-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
          
          <CardHeader className="relative z-10 text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                {/* Main Trophy Container */}
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse group-hover:animate-bounce transition-all duration-500">
                  <Trophy className="w-14 h-14 text-white drop-shadow-lg" />
                </div>
                
                {/* Floating Crown */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center animate-bounce delay-500 shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                
                {/* Energy Rings */}
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-orange-400/40 animate-pulse delay-300"></div>
              </div>
            </div>
            
            <CardTitle className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                ⚡ MISSÃO SUPREMA ⚡
              </span>
            </CardTitle>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-4 font-semibold">
              Conquiste o <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">Plano Premium</span> pelo preço do Basic!
            </p>

            {hasWonBefore && (
              <Badge className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white px-6 py-3 text-lg font-bold mb-6 animate-bounce shadow-lg">
                ✨ MISSÃO CONQUISTADA! Desconto Disponível ✨
              </Badge>
            )}
          </CardHeader>

          <CardContent className="relative z-10 text-center px-8">
            {/* Challenge Requirements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* 10 Questions Card */}
              <div className="group relative bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Target className="w-8 h-8 text-blue-400 animate-pulse" />
                    <span className="font-bold text-2xl text-blue-300">10 Questões</span>
                  </div>
                  <p className="text-blue-200 font-medium">Questões oficiais do Revalida</p>
                </div>
              </div>

              {/* 10 Minutes Card */}
              <div className="group relative bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse delay-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Clock className="w-8 h-8 text-green-400 animate-pulse delay-300" />
                    <span className="font-bold text-2xl text-green-300">10 Minutos</span>
                  </div>
                  <p className="text-green-200 font-medium">Tempo cronometrado</p>
                </div>
              </div>

              {/* 100% Accuracy Card */}
              <div className="group relative bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 animate-pulse delay-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Zap className="w-8 h-8 text-purple-400 animate-pulse delay-500" />
                    <span className="font-bold text-2xl text-purple-300">100% Acerto</span>
                  </div>
                  <p className="text-purple-200 font-medium">Perfeição total exigida</p>
                </div>
              </div>
            </div>

            {/* Epic Reward Section */}
            <div className="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm rounded-3xl p-8 mb-8 border-2 border-purple-400/40 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  RECOMPENSA ÉPICA
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                </h3>
                
                <div className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gray-300">Plano Premium por apenas </span>
                  <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text animate-pulse">R$ 29,90</span>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-2xl text-gray-400 line-through">R$ 49,90</span>
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-lg font-bold animate-pulse">
                    Economia de R$ 20,00
                  </Badge>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  🚀 Acesso completo às funcionalidades Premium<br/>
                  🤖 IA avançada personalizada<br/>
                  📊 Análises preditivas exclusivas<br/>
                  🎯 Simulados ilimitados
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col items-center gap-6">
              {canStartChallenge ? (
                <>
                  <Button
                    onClick={handleStartChallenge}
                    className="relative group bg-gradient-to-r from-yellow-500 via-orange-500 via-red-500 to-purple-600 hover:from-yellow-600 hover:via-orange-600 hover:via-red-600 hover:to-purple-700 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 overflow-hidden"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-purple-400/20 animate-pulse"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      🚀 ACEITAR MISSÃO SUPREMA 🚀
                    </div>
                  </Button>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[...Array(attemptsLeft)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse delay-[${i * 200}ms]"></div>
                      ))}
                      {[...Array(3 - attemptsLeft)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      ))}
                    </div>
                    <p className="text-lg text-gray-300">
                      <span className="text-yellow-400 font-bold">{attemptsLeft}</span> tentativas de energia restantes
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center bg-gradient-to-br from-red-900/80 to-red-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-400/30">
                  <p className="text-2xl font-bold text-red-300 mb-2">
                    ⚡ Energia Esgotada ⚡
                  </p>
                  <p className="text-red-200">
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
