
import { useSubscription } from './useSubscription';
import { useToast } from './use-toast';
import { useState } from 'react';

export function useLimitChecker() {
  const { canUseFeature, updateUsage, getFeatureLimit } = useSubscription();
  const { toast } = useToast();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState<'questions' | 'simulados'>('questions');

  const checkQuestionLimit = async (): Promise<boolean> => {
    const canUse = canUseFeature('questions');
    
    if (!canUse) {
      const limit = getFeatureLimit('questions');
      toast({
        title: "Limite diário atingido",
        description: `Você já respondeu ${limit.used}/${limit.limit} questões hoje. Faça upgrade para acesso ilimitado!`,
        variant: "destructive",
      });
      setLimitType('questions');
      setShowLimitModal(true);
      return false;
    }
    
    return true;
  };

  const checkSimuladoLimit = async (): Promise<boolean> => {
    const canUse = canUseFeature('simulados');
    
    if (!canUse) {
      const limit = getFeatureLimit('simulados');
      toast({
        title: "Limite mensal atingido",
        description: `Você já fez ${limit.used}/${limit.limit} simulados este mês. Faça upgrade para acesso ilimitado!`,
        variant: "destructive",
      });
      setLimitType('simulados');
      setShowLimitModal(true);
      return false;
    }
    
    return true;
  };

  const incrementQuestionUsage = async () => {
    await updateUsage('questions', 1);
  };

  const incrementSimuladoUsage = async () => {
    await updateUsage('simulados', 1);
  };

  const closeLimitModal = () => {
    setShowLimitModal(false);
  };

  return {
    checkQuestionLimit,
    checkSimuladoLimit,
    incrementQuestionUsage,
    incrementSimuladoUsage,
    showLimitModal,
    limitType,
    closeLimitModal
  };
}
