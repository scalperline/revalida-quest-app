
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Crown, Star, Sparkles, Gift, Zap, Target, Shield } from 'lucide-react';

interface ChallengeRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  coinsEarned: number;
  onClaimReward: () => void;
}

export function ChallengeRewardModal({
  isOpen,
  onClose,
  score,
  totalQuestions,
  coinsEarned,
  onClaimReward
}: ChallengeRewardModalProps) {
  const [claiming, setClaiming] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);

  const handleClaimReward = async () => {
    setClaiming(true);
    try {
      await onClaimReward();
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
        {/* Background animado */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center p-12">
          {/* Troféu épico */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <Trophy className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400/40 animate-ping"></div>
              <div className="absolute -inset-2 rounded-full border-2 border-orange-400/30 animate-ping delay-500"></div>
            </div>
          </div>

          {/* Mensagem de vitória */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              🎉 DESAFIO CONQUISTADO! 🎉
            </span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-semibold">
            Parabéns! Você conquistou o <span className="text-yellow-400 font-bold animate-pulse">DESCONTO SUPREMO!</span>
          </p>

          {/* Estatísticas */}
          <div className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border-4 border-green-400/40 shadow-2xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-green-400 animate-pulse">{score}</div>
                <div className="text-lg text-green-200">Acertos</div>
                <Target className="w-8 h-8 text-green-400 mx-auto animate-bounce" />
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-yellow-400 animate-pulse">{percentage}%</div>
                <div className="text-lg text-yellow-200">Precisão</div>
                <Zap className="w-8 h-8 text-yellow-400 mx-auto animate-bounce delay-300" />
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-purple-400 animate-pulse">{coinsEarned}</div>
                <div className="text-lg text-purple-200">Moedas</div>
                <Shield className="w-8 h-8 text-purple-400 mx-auto animate-bounce delay-500" />
              </div>
            </div>
          </div>

          {/* Recompensa */}
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm rounded-3xl p-10 mb-8 border-4 border-purple-400/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Gift className="w-12 h-12 text-purple-400 animate-bounce" />
                <h3 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  RECOMPENSA ÉPICA DESBLOQUEADA
                </h3>
                <Gift className="w-12 h-12 text-purple-400 animate-bounce delay-300" />
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 border-2 border-white/20">
                <div className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gray-200">Plano Premium por apenas</span>
                </div>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <span className="text-3xl text-gray-400 line-through">R$ 49,90</span>
                  <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text animate-pulse">
                    R$ 29,90
                  </span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl px-6 py-3 font-bold animate-bounce rounded-full inline-block">
                  💰 Economia de R$ 20,00 por mês!
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col gap-6">
            <Button
              onClick={handleClaimReward}
              disabled={claiming}
              className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-red-400/20 animate-pulse"></div>
              <div className="relative z-10 flex items-center gap-4">
                {claiming ? (
                  <>
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando Recompensa...
                  </>
                ) : (
                  <>
                    <Gift className="w-8 h-8" />
                    🎁 REIVINDICAR DESCONTO SUPREMO
                    <Crown className="w-8 h-8" />
                  </>
                )}
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
              className="border-4 border-gray-400/50 hover:bg-gray-800/50 text-gray-300 hover:text-white text-lg py-4 px-8 rounded-full backdrop-blur-sm"
            >
              🕒 Reivindicar Mais Tarde
            </Button>
          </div>

          <p className="text-sm text-gray-400 mt-6 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
            ⭐ Oferta exclusiva válida por tempo limitado<br/>
            🔒 Desconto aplicado automaticamente no checkout<br/>
            🏆 Parabéns pela conquista épica!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
