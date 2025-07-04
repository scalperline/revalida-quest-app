
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
  isLoading: boolean;
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
    perfectAnswers: 0,
    isLoading: false
  });

  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const questionsCount = 10;
  const winThreshold = 10;

  // FUNÇÃO SIMPLIFICADA QUE SEMPRE FUNCIONA
  const selectTenQuestions = useCallback(() => {
    console.log('🎯 SELECIONANDO 10 QUESTÕES - MODO SIMPLES');
    console.log('📊 Total questões disponíveis:', todasQuestoes?.length || 0);
    
    if (!todasQuestoes || todasQuestoes.length === 0) {
      console.error('❌ ERRO: Nenhuma questão disponível');
      return [];
    }

    // PEGAR AS PRIMEIRAS 10 QUESTÕES VÁLIDAS (SIMPLES E EFICAZ)
    const validQuestions = todasQuestoes
      .filter(q => q && q.id && q.enunciado && q.options && q.correct)
      .slice(0, questionsCount);

    console.log('✅ Questões selecionadas:', validQuestions.length);
    console.log('📋 IDs:', validQuestions.map(q => q.id));
    
    return validQuestions;
  }, [todasQuestoes, questionsCount]);

  const startChallenge = useCallback(() => {
    console.log('=== 🚀 INICIANDO DESAFIO SUPREMO ===');
    
    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      toast.error("Você já utilizou todas as 3 tentativas disponíveis!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return false;
    }

    // IMEDIATAMENTE MARCAR COMO ATIVO E LOADING
    setChallengeState(prev => ({
      ...prev,
      isLoading: true,
      isActive: true
    }));

    // SELECIONAR QUESTÕES DE FORMA SÍNCRONA
    const selectedQuestions = selectTenQuestions();
    
    if (selectedQuestions.length === 0) {
      console.error('❌ FALHA: Nenhuma questão selecionada');
      toast.error("Erro ao carregar questões. Tente novamente!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      
      setChallengeState(prev => ({
        ...prev,
        isLoading: false,
        isActive: false
      }));
      return false;
    }

    console.log('✅ DESAFIO CONFIGURADO COM SUCESSO!', selectedQuestions.length, 'questões');

    // APLICAR ESTADO FINAL APÓS BREVE DELAY
    setTimeout(() => {
      setChallengeState(prev => ({
        ...prev,
        isLoading: false,
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
      }));
    }, 500); // Reduzido para 0.5 segundos

    return true;
  }, [selectTenQuestions, attemptsUsed, maxAttempts]);

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
      perfectAnswers: 0,
      isLoading: false
    });
  }, []);

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
    startChallenge,
    answerCurrentQuestion,
    nextQuestion,
    resetChallenge,
    resetAttempts
  };
}
