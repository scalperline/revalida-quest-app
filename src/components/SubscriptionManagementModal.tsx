import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useSubscriptionCancellation } from '@/hooks/useSubscriptionCancellation';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  Pause, 
  XCircle,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';

interface SubscriptionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionManagementModal({ isOpen, onClose }: SubscriptionManagementModalProps) {
  const { subscribed, subscription_tier, subscription_end, openCustomerPortal } = useSubscription();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { 
    initiateCancellation, 
    confirmCancellation, 
    cancelCancellation,
    cancellationInfo,
    cancellationReasons,
    isProcessing: cancellationProcessing 
  } = useSubscriptionCancellation();

  const handleOpenPortal = async () => {
    try {
      setLoading(true);
      await openCustomerPortal();
      toast({
        title: "Portal aberto! 🔗",
        description: "Gerencie sua assinatura na nova aba que foi aberta.",
      });
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Erro ao abrir portal",
        description: "Não foi possível abrir o portal do cliente. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = () => {
    initiateCancellation();
    setShowCancelConfirm(true);
  };

  const confirmCancel = async () => {
    await confirmCancellation();
    setShowCancelConfirm(false);
    onClose();
  };

  const getTierInfo = () => {
    switch (subscription_tier) {
      case 'Basic':
        return {
          name: 'Basic',
          price: 'R$ 29,90',
          icon: Crown,
          color: 'from-blue-500 to-blue-600',
          features: ['Questões ilimitadas', '5 simulados/mês', 'Análises básicas']
        };
      case 'Premium':
        return {
          name: 'Premium',
          price: 'R$ 79,90',
          icon: Crown,
          color: 'from-purple-500 to-purple-600',
          features: ['Tudo do Basic', 'Simulados ilimitados', 'IA avançada', 'Relatórios PDF']
        };
      case 'Pro':
        return {
          name: 'Pro',
          price: 'R$ 99,90',
          icon: Crown,
          color: 'from-green-500 to-green-600',
          features: ['Tudo do Premium', 'Dashboard admin', 'API integração', 'Suporte dedicado']
        };
      default:
        return {
          name: 'Premium',
          price: 'R$ 79,90',
          icon: Crown,
          color: 'from-purple-500 to-purple-600',
          features: ['Acesso completo', 'Recursos avançados']
        };
    }
  };

  const tierInfo = getTierInfo();
  const IconComponent = tierInfo.icon;

  if (!subscribed) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-6 h-6 text-yellow-500" />
            Gerenciar Assinatura
          </DialogTitle>
          <DialogDescription>
            Gerencie sua assinatura, pagamentos e configurações de cobrança
          </DialogDescription>
        </DialogHeader>

        {!showCancelConfirm ? (
          <div className="space-y-6">
            {/* Current Plan Info */}
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tierInfo.color} text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Plano Atual</span>
                    <Badge className="ml-2 bg-gradient-to-r from-green-500 to-green-600 text-white">
                      Ativo
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Plano:</span>
                      <span className="font-semibold">{tierInfo.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Valor:</span>
                      <span className="font-semibold text-lg">{tierInfo.price}/mês</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Próxima cobrança:</span>
                      <span className="font-semibold">
                        {subscription_end ? new Date(subscription_end).toLocaleDateString('pt-BR') : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-600">Benefícios incluídos:</h4>
                    <ul className="space-y-1">
                      {tierInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Management Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-blue-200 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Gerenciar Pagamentos
                  </CardTitle>
                  <CardDescription>
                    Atualizar método de pagamento, ver histórico de faturas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleOpenPortal} 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Abrir Portal
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-orange-200 hover:border-orange-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Pause className="w-5 h-5 text-orange-600" />
                    Pausar Assinatura
                  </CardTitle>
                  <CardDescription>
                    Pausar temporariamente sem perder benefícios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleOpenPortal} 
                    disabled={loading}
                    variant="outline"
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Cancel Option */}
            <Card className="border border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-700">
                  <XCircle className="w-5 h-5" />
                  Cancelar Assinatura
                </CardTitle>
                <CardDescription className="text-red-600">
                  Cancelar permanentemente sua assinatura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-200 bg-red-100">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    <strong>Atenção:</strong> Após o cancelamento, você perderá acesso aos recursos premium no final do período pago.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-2">O que acontece ao cancelar:</h4>
                  <ul className="space-y-1 text-sm text-red-600">
                    <li>• Seu acesso premium continuará até {subscription_end ? new Date(subscription_end).toLocaleDateString('pt-BR') : 'o final do período pago'}</li>
                    <li>• Não haverá mais cobranças automáticas</li>
                    <li>• Você voltará ao plano gratuito automaticamente</li>
                    <li>• Pode reativar a qualquer momento</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleCancelSubscription}
                  variant="destructive"
                  className="w-full"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar Assinatura
                </Button>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Precisa de ajuda?</strong> Entre em contato conosco em{' '}
                <a href="mailto:suporte@revalidaquest.com" className="underline font-medium">
                  suporte@revalidaquest.com
                </a>
                {' '}ou use o chat em tempo real.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          /* Confirmation Dialog */
          <div className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-700">
                <strong>Confirmação de Cancelamento</strong>
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-4">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tem certeza que deseja cancelar?
                </h3>
                <p className="text-gray-600 mb-4">
                  Você está prestes a cancelar sua assinatura {tierInfo.name} ({tierInfo.price}/mês).
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Lembre-se:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Seu acesso continuará até {subscription_end ? new Date(subscription_end).toLocaleDateString('pt-BR') : 'o final do período pago'}</li>
                    <li>✓ Não haverá cobranças adicionais</li>
                    <li>✓ Você pode reativar a qualquer momento</li>
                    <li>⚠️ Perderá acesso aos recursos premium após o período pago</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowCancelConfirm(false)} 
                  variant="outline" 
                  className="flex-1"
                >
                  Manter Assinatura
                </Button>
                <Button 
                  onClick={confirmCancel}
                  disabled={loading}
                  variant="destructive"
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Confirmar Cancelamento
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 