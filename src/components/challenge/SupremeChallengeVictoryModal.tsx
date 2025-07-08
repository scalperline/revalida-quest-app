
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Copy, Crown, Trophy, Sparkles, Check } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

interface SupremeChallengeVictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupremeChallengeVictoryModal({ isOpen, onClose }: SupremeChallengeVictoryModalProps) {
  const { createCheckoutSession } = useSubscription();
  const [copied, setCopied] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText('#supreme');
      setCopied(true);
      toast.success('Cupom copiado! Cole no checkout para aplicar o desconto.', {
        duration: 3000,
        className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
      });
      
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error('Erro ao copiar cupom. Copie manualmente: #supreme');
    }
  };

  const handleClaimPrize = async () => {
    try {
      setClaiming(true);
      // Use direct Stripe checkout URL for Premium plan
      window.open('https://buy.stripe.com/bJeaEX08TeQE38v8xi7ss02', '_blank');
      
      toast.success('🎉 Checkout aberto! Use o cupom #supreme para seu desconto especial.', {
        duration: 5000,
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Erro ao processar checkout. Tente novamente.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce blur-sm"></div>
          <div className="absolute top-12 right-12 w-12 h-12 bg-orange-400/25 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-12 left-12 w-20 h-20 bg-red-400/15 rounded-full animate-ping blur-md"></div>
          <div className="absolute bottom-8 right-8 w-14 h-14 bg-purple-400/20 rounded-full animate-bounce delay-500 blur-sm"></div>
          
          {/* Partículas flutuantes */}
          {[...Array(15)].map((_, i) => (
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

        <div className="relative z-10 text-center p-10">
          {/* Ícone principal */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <Gift className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              
              {/* Anéis de energia */}
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400/40 animate-ping"></div>
              <div className="absolute -inset-2 rounded-full border-2 border-orange-400/30 animate-pulse delay-500"></div>
            </div>
          </div>

          {/* Mensagem de parabéns */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              🎉 PARABÉNS! 🎉
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-semibold">
            Você ganhou o <span className="text-yellow-400 font-bold">Desafio Supremo!</span>  
          </p>

          {/* Seção do prêmio */}
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm rounded-3xl p-8 mb-8 border-4 border-purple-400/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  RESGATE SEU PRÊMIO
                </h3>
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
              
              <p className="text-lg text-gray-200 mb-6">
                Copie e cole o cupom abaixo no checkout do Plano Premium:
              </p>

              {/* Cupom */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-white/20">
                <p className="text-sm text-gray-300 mb-2">SEU CUPOM DE DESCONTO:</p>
                <div className="flex items-center justify-center gap-4">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black text-2xl font-bold px-6 py-3">
                    #supreme
                  </Badge>
                  <Button
                    onClick={handleCopyCoupon}
                    variant="outline"
                    size="sm"
                    className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleClaimPrize}
              disabled={claiming}
              className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-red-400/20 animate-pulse"></div>
              <div className="relative z-10 flex items-center gap-3">
                {claiming ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Gift className="w-6 h-6" />
                    🏆 IR PARA CHECKOUT PREMIUM
                    <Crown className="w-6 h-6" />
                  </>
                )}
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-gray-400/50 hover:bg-gray-800/50 text-gray-300 hover:text-white py-3 px-6 rounded-full backdrop-blur-sm"
            >
              🕒 Resgatar Mais Tarde
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-6 bg-gray-800/30 backdrop-blur-sm rounded-lg p-3">
            ⭐ Use o cupom #supreme no checkout para garantir seu desconto especial<br/>
            🏆 Parabéns pela conquista épica do Desafio Supremo!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
