import { useState, useCallback } from 'react';
import { useSubscription } from './useSubscription';
import { useToast } from './use-toast';

interface CancellationState {
  isProcessing: boolean;
  showConfirmation: boolean;
  cancellationReason?: string;
  feedback?: string;
}

export function useSubscriptionCancellation() {
  const { subscribed, subscription_tier, subscription_end, openCustomerPortal } = useSubscription();
  const { toast } = useToast();
  const [state, setState] = useState<CancellationState>({
    isProcessing: false,
    showConfirmation: false,
  });

  const initiateCancellation = useCallback(() => {
    if (!subscribed) {
      toast({
        title: "Sem assinatura ativa",
        description: "Você não possui uma assinatura ativa para cancelar.",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ ...prev, showConfirmation: true }));
  }, [subscribed, toast]);

  const confirmCancellation = useCallback(async (reason?: string, feedback?: string) => {
    if (!subscribed) return;

    try {
      setState(prev => ({ 
        ...prev, 
        isProcessing: true, 
        cancellationReason: reason,
        feedback: feedback 
      }));

      // Abrir portal do cliente para cancelamento
      await openCustomerPortal();

      // Mostrar feedback ao usuário
      toast({
        title: "Portal de cancelamento aberto! ⚠️",
        description: "Complete o cancelamento no portal do Stripe. Seu acesso continuará até o final do período pago.",
        duration: 8000,
      });

      // Resetar estado
      setState({
        isProcessing: false,
        showConfirmation: false,
      });

      // Opcional: Enviar feedback para analytics/suporte
      if (reason || feedback) {
        console.log('Cancellation feedback:', { reason, feedback, tier: subscription_tier });
        // Aqui você pode enviar para um serviço de analytics ou suporte
      }

    } catch (error) {
      console.error('Error during cancellation:', error);
      toast({
        title: "Erro ao abrir portal",
        description: "Não foi possível abrir o portal de cancelamento. Tente novamente ou entre em contato com o suporte.",
        variant: "destructive",
      });
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [subscribed, subscription_tier, openCustomerPortal, toast]);

  const cancelCancellation = useCallback(() => {
    setState({
      isProcessing: false,
      showConfirmation: false,
    });
  }, []);

  const getCancellationInfo = useCallback(() => {
    if (!subscribed || !subscription_end) {
      return {
        canCancel: false,
        daysUntilRenewal: 0,
        renewalDate: null,
        tier: subscription_tier,
      };
    }

    const renewalDate = new Date(subscription_end);
    const daysUntilRenewal = Math.ceil((renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return {
      canCancel: true,
      daysUntilRenewal: Math.max(0, daysUntilRenewal),
      renewalDate,
      tier: subscription_tier,
    };
  }, [subscribed, subscription_end, subscription_tier]);

  const getCancellationReasons = useCallback(() => [
    { value: 'too_expensive', label: 'Muito caro' },
    { value: 'not_using', label: 'Não estou usando' },
    { value: 'switching', label: 'Mudando para outro serviço' },
    { value: 'temporary', label: 'Pausa temporária' },
    { value: 'technical_issues', label: 'Problemas técnicos' },
    { value: 'other', label: 'Outro motivo' },
  ], []);

  return {
    // State
    isProcessing: state.isProcessing,
    showConfirmation: state.showConfirmation,
    cancellationReason: state.cancellationReason,
    feedback: state.feedback,

    // Actions
    initiateCancellation,
    confirmCancellation,
    cancelCancellation,

    // Info
    cancellationInfo: getCancellationInfo(),
    cancellationReasons: getCancellationReasons(),

    // Utilities
    subscribed,
    subscription_tier,
  };
} 