
import { useCallback } from 'react';
import { useQuestions } from './useQuestions';
import { getFixedSupremeChallengeQuestions } from '@/utils/fixedSupremeChallengeQuestions';
import { type Question } from '@/types/question';

export function useChallengeQuestions() {
  const { todasQuestoes } = useQuestions();

  const selectTenQuestions = useCallback((): Question[] => {
    console.log('🎯 SELEÇÃO DE QUESTÕES PARA DESAFIO SUPREMO');
    
    // Para o Desafio Supremo, sempre usamos as questões fixas
    const questoesFixas = getFixedSupremeChallengeQuestions();
    
    if (questoesFixas.length !== 10) {
      console.error('❌ ERRO: Questões fixas devem ser exatamente 10');
      throw new Error('Questões fixas do Desafio Supremo devem ser exatamente 10');
    }

    console.log('✅ QUESTÕES FIXAS SELECIONADAS COM SUCESSO!');
    console.log('📋 IDs das questões fixas:', questoesFixas.map(q => q.id));
    console.log('🏷️ Áreas cobertas:', [...new Set(questoesFixas.map(q => q.area))]);
    
    return questoesFixas;
  }, []);

  return {
    selectTenQuestions,
    questionsReady: true // Sempre true para questões fixas
  };
}
