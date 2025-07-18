
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Sparkles, Gift, Zap, Coins, Timer } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

interface SupremeVictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  discount: number;
  score: number;
  total: number;
}

export function SupremeVictoryModal({ 
  isOpen, 
  onClose, 
  coins, 
  discount, 
  score, 
  total 
}: SupremeVictoryModalProps) {
  const { createCheckoutSession } = useSubscription();
  const [claiming, setClaiming] = useState(false);
  const percentage = Math.round((score / total) * 100);
  const finalPrice = 49.90 - discount;

  const handleClaimReward = async () => {
    try {
      setClaiming(true);
      const checkoutUrl = await createCheckoutSession('price_revalida_basic_monthly');
      // Open in new tab to maintain the victory modal experience
      window.open(checkoutUrl, '_blank');
      
      toast.success('🎉 Checkout aberto em nova aba! Complete sua compra para garantir o desconto.', {
        duration: 5000,
        className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
      });
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast.error('Erro ao processar recompensa. Tente novamente.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
        {/* Epic Confetti Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce blur-sm"></div>
          <div className="absolute top-12 right-12 w-12 h-12 bg-orange-400/25 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-12 left-12 w-20 h-20 bg-red-400/15 rounded-full animate-ping blur-md"></div>
          <div className="absolute bottom-8 right-8 w-14 h-14 bg-purple-400/20 rounded-full animate-bounce delay-500 blur-sm"></div>
          
          {/* Animated Icons */}
          <Sparkles className="absolute top-1/4 left-1/4 w-10 h-10 text-yellow-400/40 animate-spin" />
          <Star className="absolute top-1/3 right-1/3 w-8 h-8 text-orange-400/50 animate-pulse delay-300" />
          <Zap className="absolute bottom-1/3 left-1/3 w-12 h-12 text-purple-400/30 animate-bounce delay-700" />
          
          {/* Floating Particles */}
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
          {/* Epic Trophy Section */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <Trophy className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              
              {/* Energy Rings */}
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400/40 animate-ping"></div>
              <div className="absolute -inset-2 rounded-full border-2 border-orange-400/30 animate-pulse delay-500"></div>
              <div className="absolute -inset-4 rounded-full border border-red-400/20 animate-ping delay-1000"></div>
            </div>
          </div>

          {/* Victory Message */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              🎉 DESAFIO SUPREMO CONQUISTADO! 🎉
            </span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-semibold">
            Você alcançou a <span className="text-yellow-400 font-bold animate-pulse">MAESTRIA ABSOLUTA!</span>
          </p>

          {/* Perfect Score Display */}
          <div className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border-4 border-green-400/40 shadow-2xl">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-green-400 animate-pulse">{score}</div>
                <div className="text-sm text-green-200">Acertos</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-yellow-400 animate-pulse">{percentage}%</div>
                <div className="text-sm text-yellow-200">Precisão</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-400 animate-pulse">{coins}</div>
                <div className="text-sm text-purple-200">Moedas</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-400 animate-pulse">R$ {discount}</div>
                <div className="text-sm text-blue-200">Desconto</div>
              </div>
            </div>
          </div>

          {/* Reward Section */}
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm rounded-3xl p-10 mb-8 border-4 border-purple-400/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Gift className="w-12 h-12 text-purple-400 animate-bounce" />
                <h3 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  RECOMPENSA SUPREMA DESBLOQUEADA
                </h3>
                <Gift className="w-12 h-12 text-purple-400 animate-bounce delay-300" />
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 border-2 border-white/20">
                <div className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gray-200">Plano Premium por apenas</span>
                </div>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <span className="text-2xl text-gray-400 line-through">R$ 79,90</span>
                  <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text animate-pulse">
                    R$ {finalPrice.toFixed(2)}
                  </span>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg px-6 py-3 font-bold animate-bounce">
                  💰 Sua conquista vale R$ {discount.toFixed(2)} de desconto!
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-200">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <span>Acesso Premium completo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <span>IA personalizada avançada</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coins className="w-6 h-6 text-yellow-400" />
                  <span>Sistema de moedas permanente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
                    Processando...
                  </>
                ) : (
                  <>
                    <Gift className="w-8 h-8" />
                    🏆 REIVINDICAR RECOMPENSA SUPREMA
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
            ⭐ Oferta exclusiva para vencedores do Desafio Supremo<br/>
            🔒 Desconto aplicado automaticamente no checkout<br/>
            🏆 Parabéns pela conquista épica!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
