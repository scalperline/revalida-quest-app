
import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { useGamification } from './useGamification';
import { type Question } from '@/types/question';
import { toast } from 'sonner';

interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  questions: Question[];
  hasCompleted: boolean;
  hasWon: boolean;
  streak: number;
  combo: number;
  timeBonus: number;
  coinsEarned: number;
  perfectAnswers: number;
}

export function usePremiumChallenge() {
  const { todasQuestoes } = useQuestions();
  const { addXP, answerQuestion: recordAnswer } = useGamification();
  
  const [challengeState, setChallengeState] = useState<ChallengeState>({
    isActive: false,
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    questions: [],
    hasCompleted: false,
    hasWon: false,
    streak: 0,
    combo: 0,
    timeBonus: 0,
    coinsEarned: 0,
    perfectAnswers: 0
  });

  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const questionsCount = 10;
  const winThreshold = 10;

  // FUNÇÃO BULLETPROOF DE SELEÇÃO DE QUESTÕES
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

    if (questoesValidas.length < questionsCount) {
      console.error('❌ ERRO: Não há questões válidas suficientes');
      throw new Error(`Apenas ${questoesValidas.length} questões válidas encontradas. Necessário ${questionsCount}.`);
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
    questoesSelecionadas.push(...questoesDisponiveis.slice(0, questionsCount));

    console.log('🎉 SELEÇÃO CONCLUÍDA:', questoesSelecionadas.length, 'questões');
    console.log('📋 IDs selecionados:', questoesSelecionadas.map(q => q.id));
    console.log('🏷️ Anos:', [...new Set(questoesSelecionadas.map(q => q.year))]);
    console.log('📚 Áreas:', [...new Set(questoesSelecionadas.map(q => q.area))]);
    
    return questoesSelecionadas;
  }, [todasQuestoes, questionsCount]);

  // FUNÇÃO BULLETPROOF DE INÍCIO DO DESAFIO
  const startChallenge = useCallback(async (): Promise<boolean> => {
    console.log('=== 🚀 INICIANDO DESAFIO SUPREMO (BULLETPROOF) ===');
    
    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      toast.error("Você já utilizou todas as 3 tentativas disponíveis!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return false;
    }

    setIsStarting(true);
    setStartError(null);

    try {
      console.log('⏳ Aguardando questões...');
      
      // AGUARDAR QUESTÕES ESTAREM DISPONÍVEIS (com timeout)
      let attempts = 0;
      const maxAttempts = 10;
      
      while ((!todasQuestoes || todasQuestoes.length === 0) && attempts < maxAttempts) {
        console.log(`⏱️ Tentativa ${attempts + 1}/${maxAttempts} - aguardando questões...`);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!todasQuestoes || todasQuestoes.length === 0) {
        throw new Error('Timeout: Questões não carregaram a tempo');
      }

      // SELECIONAR QUESTÕES
      const selectedQuestions = selectTenQuestions();
      
      console.log('✅ DESAFIO CONFIGURADO COM SUCESSO!');

      // CONFIGURAR ESTADO DO DESAFIO
      setChallengeState({
        isActive: true,
        currentQuestionIndex: 0,
        score: 0,
        answers: {},
        questions: selectedQuestions,
        hasCompleted: false,
        hasWon: false,
        streak: 0,
        combo: 0,
        timeBonus: 0,
        coinsEarned: 0,
        perfectAnswers: 0
      });

      return true;

    } catch (error) {
      console.error('❌ ERRO AO INICIAR DESAFIO:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      setStartError(errorMessage);
      
      toast.error(`Erro ao iniciar desafio: ${errorMessage}`, {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      
      return false;
      
    } finally {
      setIsStarting(false);
    }
  }, [selectTenQuestions, attemptsUsed, maxAttempts, todasQuestoes]);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    console.log('=== 📝 RESPONDENDO QUESTÃO ===');
    
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) {
        console.error('❌ Questão atual não encontrada');
        return prev;
      }

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;
      const newPerfectAnswers = isCorrect ? prev.perfectAnswers + 1 : prev.perfectAnswers;

      console.log('📊 Resposta:', { 
        questao: currentQuestion.id,
        resposta: optionId,
        correta: currentQuestion.correct,
        isCorrect, 
        newScore 
      });

      // Sistema de moedas
      let coinsEarned = 0;
      if (isCorrect) {
        coinsEarned = 10;
        if (newCombo >= 3) coinsEarned += 5;
        if (newStreak >= 5) coinsEarned += 10;
      }

      // Registrar no sistema de gamificação
      recordAnswer(isCorrect, currentQuestion.area || 'Geral', currentQuestion.id);

      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: optionId },
        score: newScore,
        streak: newStreak,
        combo: newCombo,
        perfectAnswers: newPerfectAnswers,
        coinsEarned: prev.coinsEarned + coinsEarned
      };
    });
  }, [recordAnswer]);

  const nextQuestion = useCallback(() => {
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      
      if (isLastQuestion) {
        const hasWon = prev.score >= winThreshold;
        const newAttemptsUsed = attemptsUsed + 1;
        
        console.log('🏁 DESAFIO FINALIZADO!', { 
          score: prev.score, 
          total: prev.questions.length,
          hasWon 
        });
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          const bonusXP = 1000 + (prev.perfectAnswers * 100) + prev.coinsEarned;
          addXP(bonusXP);
          
          toast.success("🏆 PARABÉNS! DESAFIO CONQUISTADO! Desconto Premium desbloqueado!", {
            duration: 6000,
            className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
          });
        } else {
          const consolationXP = prev.score * 50 + prev.coinsEarned;
          addXP(consolationXP);
          
          toast.info(`💪 Quase lá! Você acertou ${prev.score}/${prev.questions.length}. Tente novamente!`, {
            duration: 4000,
            className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
          });
        }

        return {
          ...prev,
          isActive: false,
          hasCompleted: true,
          hasWon
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [attemptsUsed, winThreshold, addXP]);

  const resetChallenge = useCallback(() => {
    console.log('🔄 Resetando desafio...');
    setChallengeState({
      isActive: false,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: [],
      hasCompleted: false,
      hasWon: false,
      streak: 0,
      combo: 0,
      timeBonus: 0,
      coinsEarned: 0,
      perfectAnswers: 0
    });
    setIsStarting(false);
    setStartError(null);
  }, []);

  const retryStart = useCallback(() => {
    console.log('🔄 Tentando novamente...');
    setStartError(null);
    return startChallenge();
  }, [startChallenge]);

  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('premium_challenge_won') === 'true';

  const resetAttempts = useCallback(() => {
    console.log('🔄 RESETANDO tentativas (modo debug)');
    localStorage.removeItem('premium_challenge_attempts');
    localStorage.removeItem('premium_challenge_won');
    setAttemptsUsed(0);
  }, []);

  return {
    challengeState,
    canStartChallenge,
    attemptsUsed,
    attemptsLeft,
    maxAttempts,
    hasWonBefore,
    winThreshold,
    isStarting,
    startError,
    startChallenge,
    answerCurrentQuestion,
    nextQuestion,
    resetChallenge,
    resetAttempts,
    retryStart
  };
}
