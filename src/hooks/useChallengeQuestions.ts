
import { useCallback } from 'react';
import { useQuestions } from './useQuestions';
import { type Question } from '@/types/question';

export function useChallengeQuestions() {
  const { todasQuestoes } = useQuestions();

  const selectTenQuestions = useCallback((): Question[] => {
    console.log('🎯 SELEÇÃO BULLETPROOF DE QUESTÕES');
    console.log('📊 Total questões disponíveis:', todasQuestoes?.length || 0);
    
    if (!todasQuestoes || todasQuestoes.length === 0) {
      console.error('❌ ERRO CRÍTICO: Nenhuma questão disponível');
      throw new Error('Nenhuma questão disponível para o desafio');
    }

    // VALIDAR E FILTRAR QUESTÕES VÁLIDAS
    const questoesValidas = todasQuestoes.filter(q => {
      return q && 
             q.id && 
             q.enunciado && 
             q.options && 
             Array.isArray(q.options) && 
             q.options.length >= 2 && 
             q.correct &&
             q.year &&
             q.area;
    });

    console.log('✅ Questões válidas encontradas:', questoesValidas.length);

    if (questoesValidas.length < 10) {
      console.error('❌ ERRO: Não há questões válidas suficientes');
      throw new Error(`Apenas ${questoesValidas.length} questões válidas encontradas. Necessário 10.`);
    }

    // SELEÇÃO INTELIGENTE: DIVERSIFICAR POR ANO E ÁREA
    const questoesSelecionadas: Question[] = [];
    const questoesDisponiveis = [...questoesValidas];
    
    // Embaralhar questões para randomização
    for (let i = questoesDisponiveis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questoesDisponiveis[i], questoesDisponiveis[j]] = [questoesDisponiveis[j], questoesDisponiveis[i]];
    }

    // Selecionar as primeiras 10 questões embaralhadas
    questoesSelecionadas.push(...questoesDisponiveis.slice(0, 10));

    console.log('🎉 SELEÇÃO CONCLUÍDA:', questoesSelecionadas.length, 'questões');
    console.log('📋 IDs selecionados:', questoesSelecionadas.map(q => q.id));
    console.log('🏷️ Anos:', [...new Set(questoesSelecionadas.map(q => q.year))]);
    console.log('📚 Áreas:', [...new Set(questoesSelecionadas.map(q => q.area))]);
    
    return questoesSelecionadas;
  }, [todasQuestoes]);

  return {
    selectTenQuestions,
    questionsReady: Boolean(todasQuestoes && todasQuestoes.length > 0)
  };
}
