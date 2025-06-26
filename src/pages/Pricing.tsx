
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, Users, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Gratuito',
    description: 'Para conhecer a plataforma',
    price: 'R$ 0',
    period: '/mês',
    priceId: null,
    features: [
      '10 questões por dia',
      '1 simulado por mês',
      'Ranking básico',
      'Estatísticas básicas',
    ],
    limitations: [
      'Funcionalidades limitadas',
      'Sem análises avançadas',
      'Sem suporte prioritário',
    ],
    icon: Zap,
    color: 'text-gray-600',
    popular: false,
  },
  {
    name: 'Basic',
    description: 'Para estudantes dedicados',
    price: 'R$ 29',
    period: ',90/mês',
    priceId: 'price_revalida_basic_monthly', // Substitua pelo ID real do Stripe
    features: [
      'Questões ilimitadas',
      '5 simulados por mês',
      'Análises básicas de desempenho',
      'Ranking premium',
      'Estatísticas detalhadas',
      'Suporte por email',
    ],
    icon: Crown,
    color: 'text-blue-600',
    popular: false,
  },
  {
    name: 'Premium',
    description: 'Para máximo desempenho',
    price: 'R$ 59',
    period: ',90/mês',
    priceId: 'price_revalida_premium_monthly', // Substitua pelo ID real do Stripe
    features: [
      'Tudo do plano Basic',
      'Simulados ilimitados',
      'Análises avançadas com IA',
      'Exportação de relatórios PDF',
      'Mentoria personalizada',
      'Suporte prioritário',
      'Acesso antecipado a funcionalidades',
    ],
    icon: Sparkles,
    color: 'text-purple-600',
    popular: true,
  },
  {
    name: 'Pro',
    description: 'Para instituições de ensino',
    price: 'R$ 99',
    period: ',90/mês',
    priceId: 'price_revalida_pro_monthly', // Substitua pelo ID real do Stripe
    features: [
      'Tudo do plano Premium',
      'Dashboard administrativo',
      'Relatórios institucionais',
      'Gestão de múltiplos usuários',
      'API de integração',
      'Suporte dedicado',
      'Treinamentos personalizados',
    ],
    icon: Users,
    color: 'text-green-600',
    popular: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCheckoutSession, subscribed, subscription_tier, loading } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!plan.priceId) return; // Free plan

    try {
      setLoadingPlan(plan.name);
      const checkoutUrl = await createCheckoutSession(plan.priceId);
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
    if (planName === 'Pro' && subscribed && subscription_tier === 'Pro') return true;
    return false;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha o Plano Ideal para Você
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Acelere sua preparação para o Revalida com nossos planos especializados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrent = isCurrentPlan(plan.name);
              
              return (
                <Card 
                  key={plan.name} 
                  className={`relative ${
                    plan.popular 
                      ? 'ring-2 ring-purple-500 shadow-xl scale-105' 
                      : 'shadow-lg'
                  } transition-all duration-300 hover:shadow-xl ${
                    isCurrent ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-500 text-white px-6 py-1 text-sm font-semibold">
                        <Star className="w-4 h-4 mr-1" />
                        Mais Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-4 right-4">
                      <Badge className="bg-green-500 text-white px-4 py-1 text-sm font-semibold">
                        Atual
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 mx-auto mb-4 ${plan.color} bg-gray-100 rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      disabled={loading || loadingPlan === plan.name || isCurrent}
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : plan.name === 'Pro'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {loadingPlan === plan.name ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processando...
                        </div>
                      ) : isCurrent ? (
                        'Plano Atual'
                      ) : plan.priceId ? (
                        'Assinar Agora'
                      ) : (
                        'Gratuito'
                      )}
                    </Button>

                    {isCurrent && (
                      <p className="text-center text-sm text-green-600 mt-2 font-medium">
                        ✓ Plano ativo
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h3>
                  <p className="text-gray-600">
                    Sim, você pode cancelar sua assinatura a qualquer momento através do portal do cliente. Não há taxas de cancelamento.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Como funciona a garantia?</h3>
                  <p className="text-gray-600">
                    Oferecemos garantia de 7 dias. Se não ficar satisfeito, reembolsamos 100% do valor pago.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Preciso de cartão de crédito para o plano gratuito?</h3>
                  <p className="text-gray-600">
                    Não, o plano gratuito não requer cartão de crédito. Apenas crie sua conta e comece a usar imediatamente.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Posso fazer upgrade ou downgrade do meu plano?</h3>
                  <p className="text-gray-600">
                    Sim, você pode alterar seu plano a qualquer momento. As alterações são processadas imediatamente e o valor é ajustado proporcionalmente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
