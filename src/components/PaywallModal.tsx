
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Zap, ArrowRight, X, Sparkles, Users } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'questions' | 'simulados';
  currentUsage: number;
  limit: number;
}

export function PaywallModal({ isOpen, onClose, feature, currentUsage, limit }: PaywallModalProps) {
  const navigate = useNavigate();
  const { createCheckoutSession } = useSubscription();
  const [loading, setLoading] = useState<string | null>(null);

  const featureText = feature === 'questions' ? 'questões' : 'simulados';
  const period = feature === 'questions' ? 'hoje' : 'este mês';

  const plans = [
    {
      name: 'Basic',
      price: 'R$ 29,90',
      period: '/mês',
      priceId: 'price_revalida_basic_monthly',
      icon: Crown,
      color: 'from-blue-600 to-blue-700',
      features: ['Questões ilimitadas', '5 simulados/mês', 'Análises básicas', 'Suporte email'],
      highlight: feature === 'questions'
    },
    {
      name: 'Premium',
      price: 'R$ 59,90',
      period: '/mês',
      priceId: 'price_revalida_premium_monthly',
      icon: Sparkles,
      color: 'from-purple-600 to-purple-700',
      features: ['Tudo do Basic', 'Simulados ilimitados', 'IA avançada', 'Relatórios PDF'],
      highlight: true,
      popular: true
    },
    {
      name: 'Pro',
      price: 'R$ 99,90',
      period: '/mês',
      priceId: 'price_revalida_pro_monthly',
      icon: Users,
      color: 'from-green-600 to-green-700',
      features: ['Tudo do Premium', 'Dashboard admin', 'API integração', 'Suporte dedicado'],
      highlight: false
    }
  ];

  const handleUpgrade = async (plan: typeof plans[0]) => {
    try {
      setLoading(plan.name);
      const checkoutUrl = await createCheckoutSession(plan.priceId);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      navigate('/pricing');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Limite Atingido! 🚀
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-600">
            Desbloqueie todo o potencial do Revalida Quest
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Você já usou {currentUsage} de {limit} {featureText} {period}
            </h3>
            <p className="text-gray-600">
              Continue sua jornada rumo à aprovação com um de nossos planos!
            </p>
          </div>

          <div className="grid gap-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              
              return (
                <Card 
                  key={plan.name} 
                  className={`relative transition-all duration-300 hover:shadow-lg ${
                    plan.highlight ? 'ring-2 ring-purple-200 shadow-md' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                            <span className="text-sm text-gray-600">{plan.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleUpgrade(plan)}
                        disabled={loading === plan.name}
                        className={`bg-gradient-to-r ${plan.color} hover:shadow-lg text-white px-6`}
                      >
                        {loading === plan.name ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processando...
                          </div>
                        ) : (
                          <>
                            Escolher
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => navigate('/pricing')}
              className="w-full"
            >
              Ver Comparação Completa dos Planos
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Garantia de 7 dias • Cancele quando quiser
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
