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
  return <>
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
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                ⚡ MISSÃO SUPREMA ⚡
              </span>
            </CardTitle>
            
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Conquiste o <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">Plano Premium</span> pelo preço do Basic!
            </p>

            {hasWonBefore && <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 font-bold mb-4 animate-pulse">
                ✨ MISSÃO CONQUISTADA! Desconto Disponível ✨
              </Badge>}
          </CardHeader>

          <CardContent className="relative z-10 text-center px-6">
            {/* Streamlined Challenge Requirements */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-sm rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  <span className="font-bold text-lg text-blue-300">10 Questões</span>
                </div>
                <p className="text-blue-200 text-sm">Questões oficiais</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-xl p-4 border border-green-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-6 h-6 text-green-400" />
                  <span className="font-bold text-lg text-green-300">10 Minutos</span>
                </div>
                <p className="text-green-200 text-sm">Tempo limite</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <span className="font-bold text-lg text-purple-300">100% Acerto</span>
                </div>
                <p className="text-purple-200 text-sm">Perfeição total</p>
              </div>
            </div>

            {/* Streamlined Reward Section */}
            <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-purple-400/30">
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                RECOMPENSA ÉPICA
              </h3>
              
              <div className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-gray-300">Premium por </span>
                <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">R$ 29,90</span>
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-xl text-gray-400 line-through">R$ 49,90</span>
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 font-bold">
                  40% OFF
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-blue-400" />
                  <span>Acesso Premium completo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>IA avançada personalizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>Análises preditivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Simulados ilimitados</span>
                </div>
              </div>
            </div>

            {/* Streamlined Action Section */}
            <div className="flex flex-col items-center gap-4">
              {canStartChallenge ? <>
                  <Button onClick={handleStartChallenge} className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 py-0 px-[7px]">🚀 Aceitar Desafio 🚀</Button>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(attemptsLeft)].map((_, i) => <div key={i} className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>)}
                      {[...Array(3 - attemptsLeft)].map((_, i) => <div key={i} className="w-3 h-3 bg-gray-600 rounded-full"></div>)}
                    </div>
                    <p className="text-sm text-gray-300">
                      <span className="text-yellow-400 font-bold">{attemptsLeft}</span> tentativas restantes
                    </p>
                  </div>
                </> : <div className="text-center bg-gradient-to-br from-red-900/60 to-red-800/60 backdrop-blur-sm rounded-xl p-6 border border-red-400/30">
                  <p className="text-xl font-bold text-red-300 mb-1">
                    ⚡ Energia Esgotada ⚡
                  </p>
                  <p className="text-red-200 text-sm">
                    Você utilizou todas as 3 tentativas disponíveis
                  </p>
                </div>}
            </div>
          </CardContent>
        </Card>
      </div>

      <ChallengeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>;
}