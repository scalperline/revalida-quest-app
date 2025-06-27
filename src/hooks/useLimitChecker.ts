
import { useSubscription } from './useSubscription';
import { useToast } from './use-toast';
import { useState } from 'react';

export function useLimitChecker() {
  const { canUseFeature, updateUsage, getFeatureLimit } = useSubscription();
  const { toast } = useToast();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState<'questions' | 'simulados'>('questions');

  const checkQuestionLimit = async (): Promise<boolean> => {
    console.log('=== VERIFICANDO LIMITE DE QUESTÕES ===');
    
    const canUse = canUseFeature('questions');
    console.log('Pode usar questions:', canUse);
    
    if (!canUse) {
      const limit = getFeatureLimit('questions');
      console.log('Limite atingido:', limit);
      
      toast({
        title: "Limite diário atingido",
        description: `Você já respondeu ${limit.used}/${limit.limit} questões hoje. Faça upgrade para acesso ilimitado!`,
        variant: "destructive",
      });
      setLimitType('questions');
      setShowLimitModal(true);
      return false;
    }
    
    console.log('✅ Pode responder mais questões');
    return true;
  };

  const checkSimuladoLimit = async (): Promise<boolean> => {
    console.log('=== VERIFICANDO LIMITE DE SIMULADOS ===');
    
    const canUse = canUseFeature('simulados');
    console.log('Pode usar simulados:', canUse);
    
    if (!canUse) {
      const limit = getFeatureLimit('simulados');
      console.log('Limite atingido:', limit);
      
      toast({
        title: "Limite mensal atingido",
        description: `Você já fez ${limit.used}/${limit.limit} simulados este mês. Faça upgrade para acesso ilimitado!`,
        variant: "destructive",
      });
      setLimitType('simulados');
      setShowLimitModal(true);
      return false;
    }
    
    console.log('✅ Pode fazer mais simulados');
    return true;
  };

  const incrementQuestionUsage = async () => {
    console.log('=== INCREMENTANDO CONTADOR DE QUESTÕES ===');
    try {
      await updateUsage('questions', 1);
      console.log('✅ Contador de questões incrementado');
    } catch (error) {
      console.error('❌ Erro ao incrementar contador de questões:', error);
    }
  };

  const incrementSimuladoUsage = async () => {
    console.log('=== INCREMENTANDO CONTADOR DE SIMULADOS ===');
    try {
      await updateUsage('simulados', 1);
      console.log('✅ Contador de simulados incrementado');
    } catch (error) {
      console.error('❌ Erro ao incrementar contador de simulados:', error);
    }
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
