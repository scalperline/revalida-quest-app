
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Sparkles, Gift } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

interface SuccessRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
}

export function SuccessRewardModal({ isOpen, onClose, score, total }: SuccessRewardModalProps) {
  const { createCheckoutSession } = useSubscription();
  const [claiming, setClaiming] = useState(false);
  const percentage = Math.round((score / total) * 100);

  const handleClaimReward = async () => {
    try {
      setClaiming(true);
      // Usar um price ID especial para o desconto ou cupom
      const checkoutUrl = await createCheckoutSession('price_revalida_basic_monthly', 'PREMIUM_CHALLENGE_50');
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast.error('Erro ao processar recompensa. Tente novamente.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        {/* Confetti Animation Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-8 right-8 w-3 h-3 bg-orange-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-5 h-5 bg-red-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-bounce delay-500"></div>
          <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-yellow-500 opacity-50 animate-spin" />
          <Star className="absolute top-1/3 right-1/3 w-5 h-5 text-orange-500 opacity-50 animate-pulse" />
        </div>

        <div className="relative z-10 text-center p-8">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              🎉 MISSÃO CONQUISTADA!
            </span>
          </h2>

          <p className="text-xl text-gray-700 mb-6">
            Parabéns! Você completou a Missão Suprema com sucesso!
          </p>

          {/* Score Display */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-yellow-300 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Acertos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
                <div className="text-sm text-gray-600">Precisão</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">{total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>

          {/* Reward Section */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6 border-2 border-purple-300">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-800">Sua Recompensa Épica</h3>
            </div>
            
            <div className="bg-white/90 rounded-xl p-4 mb-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                Plano Premium por apenas
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-gray-400 line-through">R$ 49,90</span>
                <span className="text-4xl font-bold text-green-600">R$ 29,90</span>
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white mt-2">
                Economia de R$ 20,00 por mês!
              </Badge>
            </div>

            <div className="text-sm text-purple-700 space-y-1">
              <p>✨ Acesso completo às funcionalidades Premium</p>
              <p>🚀 IA avançada personalizada</p>
              <p>📊 Análises preditivas exclusivas</p>
              <p>🎯 Simulados ilimitados</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleClaimReward}
              disabled={claiming}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {claiming ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                </div>
              ) : (
                <>
                  🎁 Reivindicar Recompensa
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-gray-300 hover:bg-gray-50"
            >
              Reivindicar Mais Tarde
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            * Oferta válida por tempo limitado. Desconto aplicado automaticamente.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
