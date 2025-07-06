
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkSubscription, subscribed, subscription_tier } = useSubscription();
  const [isVerifying, setIsVerifying] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsVerifying(false);
        return;
      }

      try {
        // Wait a bit for Stripe to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check subscription status
        await checkSubscription();
        
        toast.success('🎉 Pagamento realizado com sucesso! Bem-vindo ao plano premium!', {
          duration: 5000,
        });
      } catch (error) {
        console.error('Error verifying payment:', error);
        toast.error('Erro ao verificar pagamento. Verificando novamente...');
        
        // Retry after 3 seconds
        setTimeout(() => {
          checkSubscription();
        }, 3000);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, checkSubscription]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          {isVerifying ? (
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          )}
          
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isVerifying ? 'Processando Pagamento...' : 'Pagamento Realizado!'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {isVerifying ? (
            <p className="text-gray-600">
              Aguarde enquanto confirmamos sua assinatura...
            </p>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-green-600">
                  🎉 Bem-vindo ao plano {subscription_tier || 'Premium'}!
                </p>
                <p className="text-gray-600">
                  Sua assinatura foi ativada com sucesso. Agora você tem acesso a todos os recursos premium!
                </p>
              </div>

              {subscribed && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-gray-900">Recursos Desbloqueados:</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Questões ilimitadas</li>
                    <li>✅ Simulados {subscription_tier === 'Premium' ? 'ilimitados' : 'avançados'}</li>
                    <li>✅ Análises detalhadas de desempenho</li>
                    <li>✅ Suporte prioritário</li>
                    {subscription_tier === 'Premium' && (
                      <>
                        <li>✅ IA personalizada avançada</li>
                        <li>✅ Relatórios em PDF</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Começar a Estudar
                </Button>
              </div>

              <p className="text-xs text-gray-500">
                Você receberá um email de confirmação em breve com os detalhes da sua assinatura.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
