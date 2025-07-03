
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

const plans = [{
  name: 'Gratuito',
  description: 'Para conhecer a plataforma',
  price: 'R$ 0',
  period: '/mês',
  priceId: null,
  features: ['5 questões por dia', '1 simulado por mês', 'Ranking básico', 'Estatísticas básicas'],
  limitations: ['Funcionalidades limitadas', 'Sem análises avançadas', 'Sem suporte prioritário'],
  icon: Zap,
  color: 'from-slate-600 to-slate-700',
  borderGradient: 'from-slate-200 via-slate-300 to-slate-200',
  popular: false,
  tier: 'starter'
}, {
  name: 'Básico',
  description: 'Para estudantes dedicados',
  price: 'R$ 39',
  period: ',90/mês',
  priceId: 'price_revalida_basic_monthly',
  features: ['20 questões por dia', '5 simulados por mês', 'Análises básicas de desempenho', 'Ranking premium', 'Estatísticas detalhadas', 'Suporte por email'],
  icon: Crown,
  color: 'from-blue-600 to-blue-700',
  borderGradient: 'from-blue-300 via-blue-400 to-blue-300',
  popular: false,
  tier: 'professional'
}, {
  name: 'Premium',
  description: 'Para máximo desempenho',
  price: 'R$ 79',
  period: ',90/mês',
  priceId: 'price_revalida_premium_monthly',
  features: ['Questões ilimitadas', 'Simulados ilimitados', 'IA avançada personalizada', 'Análises preditivas com IA', 'Sugestões inteligentes de estudo', 'Exportação de relatórios PDF', 'Suporte prioritário', 'Acesso antecipado a funcionalidades'],
  icon: Sparkles,
  color: 'from-purple-600 to-indigo-600',
  borderGradient: 'from-purple-300 via-pink-300 to-purple-300',
  popular: true,
  tier: 'enterprise'
}, {
  name: 'Intensivo',
  description: 'Mentoria personalizada',
  price: 'R$ 149',
  period: ',90/mês',
  priceId: 'price_revalida_intensivo_monthly',
  features: ['Tudo do Premium', 'Mentoria semanal 1:1', 'Plano de estudos personalizado', 'Grupo VIP WhatsApp', 'Simulados com feedback detalhado', 'Aulas ao vivo semanais', 'Garantia de aprovação*', 'Suporte 24/7'],
  icon: Star,
  color: 'from-yellow-500 to-orange-600',
  borderGradient: 'from-yellow-300 via-orange-300 to-yellow-300',
  popular: false,
  tier: 'vip'
}];

interface PricingPlansGridProps {
  subscribed: boolean;
  subscription_tier: string | null;
  loading: boolean;
}

export function PricingPlansGrid({
  subscribed,
  subscription_tier,
  loading
}: PricingPlansGridProps) {
  const { createCheckoutSession } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (!plan.priceId) return; // Free plan

    try {
      setLoadingPlan(plan.name);
      const checkoutUrl = await createCheckoutSession(plan.priceId);
      window.open(checkoutUrl, '_blank'); // Abrir em nova aba
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const isCurrentPlan = (planName: string) => {
    if (planName === 'Gratuito' && !subscribed) return true;
    if (planName === 'Básico' && subscribed && subscription_tier === 'Basic') return true;
    if (planName === 'Premium' && subscribed && subscription_tier === 'Premium') return true;
    if (planName === 'Intensivo' && subscribed && subscription_tier === 'Intensivo') return true;
    return false;
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16 px-4">
      {plans.map((plan, index) => {
        const Icon = plan.icon;
        const isCurrent = isCurrentPlan(plan.name);
        
        return (
          <div key={plan.name} className={`relative group transition-all duration-500 hover:scale-[1.02] ${plan.popular ? 'xl:-mt-4' : ''}`}>
            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${plan.borderGradient} rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Badge Container */}
            <div className="absolute -top-3 left-0 right-0 z-20 flex justify-center gap-2">
              {plan.popular && (
                <Badge className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-4 py-2 text-sm font-bold shadow-xl border-0 rounded-full">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Mais Popular
                </Badge>
              )}
              {isCurrent && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-2 text-sm font-bold shadow-xl border-0 rounded-full">
                  <Check className="w-3 h-3 mr-1 fill-current" />
                  Atual
                </Badge>
              )}
            </div>
            
            <Card className={`relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col ${plan.popular ? 'shadow-purple-500/20 ring-2 ring-purple-200/50' : 'shadow-slate-500/10'} ${isCurrent ? 'ring-2 ring-emerald-200/50 shadow-emerald-500/20' : ''}`}>
              <CardHeader className="text-center pb-4 pt-8 px-6 flex-shrink-0">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                  <Icon className="w-8 h-8 text-white relative z-10" />
                </div>

                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base font-medium">
                  {plan.description}
                </CardDescription>

                {/* Pricing */}
                <div className="mt-6 mb-2">
                  <div className="flex items-baseline justify-center">
                    <span className={`text-3xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-lg font-medium ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                {/* Features List */}
                <div className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg`}>
                        <Check className="w-3 h-3 text-white font-bold" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Button 
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loading || loadingPlan === plan.name || isCurrent}
                    className={`w-full py-3 text-base font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] rounded-2xl border-0 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white' 
                        : `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                    } ${isCurrent ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {loadingPlan === plan.name ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processando...
                      </div>
                    ) : isCurrent ? (
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        Plano Atual
                      </div>
                    ) : plan.priceId ? (
                      <div className="flex items-center justify-center gap-2">
                        Assinar Agora
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Começar Grátis
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  {/* Current Plan Status */}
                  {isCurrent && (
                    <div className="text-center mt-3">
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Plano ativo e funcionando
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
