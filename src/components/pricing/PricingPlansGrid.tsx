
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface PricingPlansGridProps {
  subscribed: boolean;
  subscription_tier: string | null;
  loading: boolean;
}

export function PricingPlansGrid({ subscribed, subscription_tier, loading }: PricingPlansGridProps) {
  const { createCheckoutSession } = useSubscription();

  const handleSubscribe = async (priceId: string) => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const plans = [
    {
      name: 'Básico',
      price: 'Grátis',
      description: 'Ideal para começar sua jornada',
      features: [
        '20 questões por dia',
        '2 simulados por mês',
        'Estatísticas básicas',
        'Ranking público'
      ],
      buttonText: 'Plano Atual',
      buttonVariant: 'outline' as const,
      popular: false,
      priceId: null
    },
    {
      name: 'Premium',
      price: 'R$ 79,90',
      period: '/mês',
      description: 'Para quem quer se destacar na Revalida',
      features: [
        'Questões ilimitadas',
        'Simulados ilimitados',
        'Estatísticas avançadas',
        'Análise de desempenho',
        'Suporte prioritário',
        'Sem anúncios'
      ],
      buttonText: subscribed ? 'Plano Atual' : 'Assinar Premium',
      buttonVariant: subscribed ? 'outline' as const : 'default' as const,
      popular: true,
      priceId: 'price_premium_monthly'
    },
    {
      name: 'Premium Anual',
      price: 'R$ 799,90',
      period: '/ano',
      originalPrice: 'R$ 958,80',
      description: 'Economia de 2 meses no plano anual',
      features: [
        'Questões ilimitadas',
        'Simulados ilimitados',
        'Estatísticas avançadas',
        'Análise de desempenho',
        'Suporte prioritário',
        'Sem anúncios',
        '2 meses grátis'
      ],
      buttonText: subscribed && subscription_tier === 'yearly' ? 'Plano Atual' : 'Assinar Anual',
      buttonVariant: subscribed && subscription_tier === 'yearly' ? 'outline' as const : 'default' as const,
      popular: false,
      priceId: 'price_premium_yearly'
    }
  ];

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="relative animate-pulse">
            <CardHeader className="text-center pb-8">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
      {plans.map((plan, index) => (
        <Card 
          key={plan.name}
          className={`relative transform transition-all duration-300 hover:scale-105 ${
            plan.popular 
              ? 'border-2 border-blue-500 shadow-2xl ring-4 ring-blue-100' 
              : 'border border-gray-200 shadow-lg hover:shadow-xl'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                <Star className="w-4 h-4 mr-1" />
                MAIS POPULAR
              </Badge>
            </div>
          )}

          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              {plan.name === 'Premium' && <Crown className="w-6 h-6 text-yellow-500" />}
              {plan.name === 'Premium Anual' && <Zap className="w-6 h-6 text-purple-500" />}
              {plan.name}
            </CardTitle>
            
            <div className="mt-4">
              {plan.originalPrice && (
                <div className="text-lg text-gray-500 line-through">
                  {plan.originalPrice}
                </div>
              )}
              <div className="text-4xl font-bold text-gray-900">
                {plan.price}
                {plan.period && <span className="text-lg text-gray-600">{plan.period}</span>}
              </div>
              {plan.name === 'Premium Anual' && (
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                  Economize R$ 158,90
                </Badge>
              )}
            </div>
            
            <CardDescription className="text-base mt-4">
              {plan.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
              variant={plan.buttonVariant}
              size="lg"
              className={`w-full h-12 text-base font-semibold transition-all duration-200 ${
                plan.popular && !subscribed
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                  : ''
              }`}
              disabled={loading || (subscribed && plan.name !== 'Básico') || !plan.priceId}
            >
              {plan.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
