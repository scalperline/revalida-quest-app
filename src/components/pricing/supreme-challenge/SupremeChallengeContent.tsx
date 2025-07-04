
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy, Sparkles, Zap, Crown, Gift, Copy, Check } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useState } from 'react';
import { toast } from 'sonner';

interface SupremeChallengeContentProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  hasWonBefore: boolean;
  challengeReady: boolean;
  onStartChallenge: () => void;
  onResetAttempts: () => void;
}

export function SupremeChallengeContent({
  canStartChallenge,
  attemptsLeft,
  hasWonBefore,
  challengeReady,
  onStartChallenge,
  onResetAttempts
}: SupremeChallengeContentProps) {
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
      const checkoutUrl = await createCheckoutSession('price_revalida_basic_monthly');
      window.open(checkoutUrl, '_blank');
      
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
    <CardContent className="relative z-10 text-center p-6 sm:p-8 backdrop-blur-sm px-[24px] bg-slate-900">
      {/* Epic Reward */}
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-300/10 animate-pulse bg-slate-900"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-3 text-gray-50">
            RECOMPENSA SUPREMA
          </h3>
          <div className="text-center mb-6">
            <div className="text-3xl sm:text-5xl font-bold mb-2">
              <span className="line-through text-xl sm:text-2xl text-zinc-400">R$ 49,90</span>
              <span className="ml-4 text-lime-400 text-2xl">
                R$ 29,90
              </span>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-zinc-50">
              💰 Desconto de R$ 20,00/mês no Plano Premium!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-white text-sm sm:text-base">Acesso Premium completo</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <span className="text-white text-sm sm:text-base">IA personalizada avançada</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Target className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-white text-sm sm:text-base">Simulados ilimitados</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Crown className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-white text-sm sm:text-base">Suporte prioritário</span>
            </div>
          </div>
          
          {/* Dica sobre questões fixas */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl border border-purple-500/30 animate-pulse">
            <p className="text-sm text-purple-200 flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              <span>Desafio Por Tempo Limitado</span>
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Action */}
      <div className="flex flex-col items-center gap-6">
        {hasWonBefore ? (
          <div className="text-center w-full">
            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 mb-6">
              🏆 DESAFIO CONQUISTADO! Você é um MESTRE!
            </Badge>
            
            {/* Seção do Prêmio Conquistado */}
            <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-6 border-4 border-purple-400/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
                  <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    SEU PRÊMIO ESTÁ PRONTO!
                  </h3>
                  <Gift className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
                
                <p className="text-lg text-gray-200 mb-6">
                  Use o cupom abaixo no checkout Premium:
                </p>

                {/* Cupom */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-white/20">
                  <p className="text-sm text-gray-300 mb-2">SEU CUPOM DE DESCONTO:</p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
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

                {/* Botão de Checkout */}
                <Button
                  onClick={handleClaimPrize}
                  disabled={claiming}
                  className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden mb-4"
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

                <p className="text-xs text-gray-400 bg-gray-800/30 backdrop-blur-sm rounded-lg p-3">
                  ⭐ Use o cupom #supreme no checkout para garantir seu desconto especial<br/>
                  🏆 Parabéns pela conquista épica do Desafio Supremo!
                </p>
              </div>
            </div>
            
            <Button 
              onClick={onResetAttempts} 
              variant="outline" 
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              🔄 Resetar para Tentar Novamente
            </Button>
          </div>
        ) : canStartChallenge ? (
          <div className="text-center">
            <Button 
              onClick={onStartChallenge} 
              disabled={!challengeReady} 
              className="relative group bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-500 text-black text-lg sm:text-2xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 animate-pulse"></div>
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                {challengeReady ? 'ACEITAR DESAFIO' : '⏳ Carregando questões...'}
                <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </Button>
            
            <p className="mt-4 text-sm sm:text-base text-white">
              💡 Tentativas restantes: <span className="text-yellow-400 font-bold">{attemptsLeft}</span>
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <Button 
                onClick={onResetAttempts} 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-yellow-500 text-xs"
              >
                🔧 Dev: Resetar tentativas
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Badge variant="destructive" className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 mb-4 bg-red-800/80 text-yellow-300">
              ❌ Tentativas Esgotadas
            </Badge>
            <p className="text-yellow-300 mb-4 text-sm sm:text-base">Você utilizou todas as 3 tentativas disponíveis.</p>
            <Button 
              onClick={onResetAttempts} 
              variant="outline" 
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              🔄 Resetar Tentativas (Debug)
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  );
}
