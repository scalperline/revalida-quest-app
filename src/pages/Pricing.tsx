
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, Sparkles, Stethoscope } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { UpgradeRewardModal } from '@/components/pricing/UpgradeRewardModal';
import { MedicalJourneyMap } from '@/components/pricing/MedicalJourneyMap';
import { LimitedOfferCountdown } from '@/components/pricing/LimitedOfferCountdown';
import { UpgradeQuestCard } from '@/components/pricing/UpgradeQuestCard';
import { XPSimulator } from '@/components/pricing/XPSimulator';
import { ExclusiveBadges } from '@/components/pricing/ExclusiveBadges';

const plans = [{
  name: 'Gratuito',
  description: 'Para conhecer a plataforma',
  price: 'R$ 0',
  period: '/mês',
  priceId: null,
  features: ['10 questões por dia', '1 simulado por mês', 'Ranking básico', 'Estatísticas básicas'],
  limitations: ['Funcionalidades limitadas', 'Sem análises avançadas', 'Sem suporte prioritário'],
  icon: Zap,
  color: 'from-gray-400 to-gray-500',
  popular: false,
  rewards: {
    xp: 100,
    badges: ['Iniciante'],
    exclusiveAccess: ['Acesso básico ao ranking', 'Estatísticas simples']
  }
}, {
  name: 'Basic',
  description: 'Para estudantes dedicados',
  price: 'R$ 29',
  period: ',90/mês',
  priceId: 'price_revalida_basic_monthly',
  features: ['Questões ilimitadas', '5 simulados por mês', 'Análises básicas de desempenho', 'Ranking premium', 'Estatísticas detalhadas', 'Suporte por email'],
  icon: Crown,
  color: 'from-blue-500 to-blue-600',
  popular: false,
  rewards: {
    xp: 500,
    badges: ['Dedicado', 'Estudante Premium'],
    exclusiveAccess: ['Análises detalhadas', 'Suporte prioritário', 'Relatórios mensais']
  }
}, {
  name: 'Premium',
  description: 'Para máximo desempenho',
  price: 'R$ 49',
  period: ',90/mês',
  priceId: 'price_revalida_premium_monthly',
  features: ['Tudo do plano Basic', 'Simulados ilimitados', 'IA avançada personalizada', 'Análises preditivas com IA', 'Sugestões inteligentes de estudo', 'Exportação de relatórios PDF', 'Suporte prioritário', 'Acesso antecipado a funcionalidades'],
  icon: Sparkles,
  color: 'from-purple-500 to-purple-600',
  popular: true,
  rewards: {
    xp: 1000,
    badges: ['Elite', 'Mestre Premium', 'VIP'],
    exclusiveAccess: ['IA personalizada', 'Análises preditivas', 'Acesso antecipado', 'Conteúdo exclusivo']
  }
}];

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCheckoutSession, subscribed, subscription_tier, loading } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!plan.priceId) return; // Free plan

    // Show reward modal first
    setSelectedPlan(plan);
    setShowRewardModal(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan?.priceId) return;
    
    try {
      setLoadingPlan(selectedPlan.name);
      setShowRewardModal(false);
      const checkoutUrl = await createCheckoutSession(selectedPlan.priceId);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const isCurrentPlan = (planName: string) => {
    if (planName === 'Gratuito' && !subscribed) return true;
    if (planName === 'Basic' && subscribed && subscription_tier === 'Basic') return true;
    if (planName === 'Premium' && subscribed && subscription_tier === 'Premium') return true;
    return false;
  };

  const getCurrentPlan = () => {
    if (subscribed && subscription_tier) return subscription_tier;
    return 'Gratuito';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-indigo-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <Sparkles className="absolute top-20 left-20 w-6 h-6 text-purple-400 opacity-30 animate-pulse delay-500" />
        <Star className="absolute bottom-20 right-20 w-5 h-5 text-blue-400 opacity-30 animate-bounce delay-700" />
      </div>

      <Navbar />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-4xl">
                🚀 Planos RevalidaQuest
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Acelere sua preparação para o Revalida com nossos planos especializados e gamificados! 🎯
            </p>
          </div>

          {/* Medical Journey Map */}
          <MedicalJourneyMap currentPlan={getCurrentPlan()} />

          {/* Limited Offer Countdown */}
          <LimitedOfferCountdown />

          {/* Upgrade Quest Card */}
          <UpgradeQuestCard onStartQuest={() => {
            const premiumPlan = plans.find(p => p.name === 'Premium');
            if (premiumPlan) handleSelectPlan(premiumPlan);
          }} />

          {/* XP Simulator */}
          <XPSimulator />

          {/* Exclusive Badges */}
          <ExclusiveBadges userPlan={getCurrentPlan()} />

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isCurrent = isCurrentPlan(plan.name);
              return (
                <Card key={plan.name} className={`relative transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/80 backdrop-blur-sm border-2 ${
                  plan.popular ? 'ring-4 ring-purple-200 shadow-2xl scale-105 border-purple-300' : 'border-blue-200 shadow-lg'
                } ${isCurrent ? 'ring-4 ring-green-200 border-green-300' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 text-sm font-semibold shadow-lg animate-pulse">
                        <Star className="w-4 h-4 mr-1" />
                        🔥 Mais Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-4 right-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                        ✅ Plano Atual
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center shadow-lg ${plan.popular ? 'animate-pulse' : ''}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-base">{plan.description}</CardDescription>
                    <div className="mt-6">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{plan.price}</span>
                      <span className="text-gray-600 text-lg">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-base">
                          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="w-3 h-3 text-white font-bold" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      disabled={loading || loadingPlan === plan.name || isCurrent}
                      className={`w-full py-3 text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' 
                          : plan.name === 'Premium' 
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' 
                            : plan.name === 'Basic' 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                              : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                      } text-white rounded-full`}
                    >
                      {loadingPlan === plan.name ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processando...
                        </div>
                      ) : isCurrent ? (
                        '✅ Plano Atual'
                      ) : plan.priceId ? (
                        <>🚀 Assinar Agora & Ganhar Recompensas</>
                      ) : (
                        '🆓 Começar Grátis'
                      )}
                    </Button>

                    {isCurrent && (
                      <p className="text-center text-sm text-green-600 mt-3 font-medium">
                        ✓ Plano ativo e funcionando perfeitamente! 🎉
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Perguntas Frequentes</h2>
            <div className="grid gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-lg text-gray-900">Posso cancelar a qualquer momento?</h3>
                  <p className="text-gray-600">
                    Sim, você pode cancelar sua assinatura a qualquer momento através do portal do cliente. Não há taxas de cancelamento.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-lg text-gray-900">Como funciona a garantia?</h3>
                  <p className="text-gray-600">
                    Oferecemos garantia de 7 dias. Se não ficar satisfeito, reembolsamos 100% do valor pago.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-lg text-gray-900">Preciso de cartão de crédito para o plano gratuito?</h3>
                  <p className="text-gray-600">
                    Não, o plano gratuito não requer cartão de crédito. Apenas crie sua conta e comece a usar imediatamente.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-lg text-gray-900">Posso fazer upgrade ou downgrade do meu plano?</h3>
                  <p className="text-gray-600">
                    Sim, você pode alterar seu plano a qualquer momento. As alterações são processadas imediatamente e o valor é ajustado proporcionalmente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Tem dúvidas? Entre em contato conosco e nossa equipe te ajudará a escolher o melhor plano!
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Reward Modal */}
      {selectedPlan && (
        <UpgradeRewardModal
          isOpen={showRewardModal}
          onClose={() => setShowRewardModal(false)}
          planName={selectedPlan.name}
          rewards={selectedPlan.rewards}
          onConfirm={handleConfirmUpgrade}
        />
      )}
    </div>
  );
}
