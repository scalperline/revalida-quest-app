import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, Zap, Star, Crown } from 'lucide-react';
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
      <div className="relative mb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-10 animate-ping"></div>
        </div>

        <Card className="relative overflow-hidden border-4 border-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10"></div>
          
          <CardHeader className="relative z-10 text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Missão Suprema</span>
            </CardTitle>
            
            <p className="text-lg text-gray-700 mb-4">
              Conquiste o <span className="font-bold text-purple-600">Plano Premium</span> pelo preço do Basic!
            </p>

            {hasWonBefore && <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm font-semibold mb-4">
                ✨ Missão Conquistada! Desconto Disponível
              </Badge>}
          </CardHeader>

          <CardContent className="relative z-10 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-blue-600">10 Questões</span>
                </div>
                <p className="text-sm text-gray-600">Questões oficiais do Revalida</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  <span className="font-bold text-green-600">10 Minutos</span>
                </div>
                <p className="text-sm text-gray-600">Tempo cronometrado</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-purple-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                  <span className="font-bold text-purple-600">80% Acerto</span>
                </div>
                <p className="text-sm text-gray-600">Para conquistar o prêmio</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
                <Star className="w-6 h-6" />
                Recompensa Épica
              </h3>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                Plano Premium por apenas <span className="text-green-600">R$ 29,90</span>
              </div>
              <p className="text-sm text-purple-700">
                Economia de R$ 20,00 • Valor original: R$ 49,90
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              {canStartChallenge ? <>
                  <Button onClick={handleStartChallenge} className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                    🚀 Aceitar Missão Suprema
                  </Button>
                  
                  <p className="text-sm text-gray-600">
                    Tentativas restantes: <span className="font-bold text-orange-600">{attemptsLeft}</span>
                  </p>
                </> : <div className="text-center">
                  <p className="text-lg font-semibold text-red-600 mb-2">
                    Limite de tentativas atingido
                  </p>
                  <p className="text-sm text-gray-600">
                    Você já utilizou todas as 3 tentativas disponíveis
                  </p>
                </div>}
            </div>
          </CardContent>
        </Card>
      </div>

      <ChallengeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>;
}