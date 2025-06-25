
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Zap, ArrowRight, X } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);

  const featureText = feature === 'questions' ? 'questões' : 'simulados';
  const period = feature === 'questions' ? 'hoje' : 'este mês';

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const checkoutUrl = await createCheckoutSession('price_1234567890'); // ID do plano Premium
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      navigate('/pricing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Limite Atingido
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-600">
            Você atingiu o limite do plano gratuito
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Você já usou {currentUsage} de {limit} {featureText} {period}
            </h3>
            <p className="text-gray-600">
              Para continuar estudando sem limites, faça upgrade para o plano Premium!
            </p>
          </div>

          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Crown className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Plano Premium</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">R$ 29/mês</div>
                
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>✓ Questões ilimitadas</li>
                  <li>✓ Simulados ilimitados</li>
                  <li>✓ Análises avançadas</li>
                  <li>✓ Relatórios PDF</li>
                </ul>

                <Button 
                  onClick={handleUpgrade}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processando...
                    </div>
                  ) : (
                    <>
                      Fazer Upgrade Agora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/pricing')}
              className="w-full"
            >
              Ver Todos os Planos
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
