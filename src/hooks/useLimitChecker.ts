
import { useSubscription } from './useSubscription';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';

export function useLimitChecker() {
  const { canUseFeature, updateUsage, subscribed } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkAndUseFeature = async (feature: 'questions' | 'simulados'): Promise<boolean> => {
    const canUse = canUseFeature(feature);
    
    if (!canUse) {
      toast({
        title: "Limite atingido",
        description: subscribed 
          ? "Ocorreu um erro ao verificar seus limites. Tente novamente."
          : `Você atingiu o limite ${feature === 'questions' ? 'diário de questões' : 'mensal de simulados'}. Faça upgrade para continuar!`,
        variant: "destructive",
        action: !subscribed ? {
          altText: "Fazer upgrade",
          onClick: () => navigate('/pricing')
        } : undefined
      });
      return false;
    }

    // Increment usage
    await updateUsage(feature);
    return true;
  };

  return {
    checkAndUseFeature,
    canUseFeature
  };
}
