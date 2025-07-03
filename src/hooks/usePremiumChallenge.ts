
import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { useGamification } from './useGamification';
import { type Question } from '@/types/question';

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
}

export function usePremiumChallenge() {
  const { questoesAnoSelecionado } = useQuestions();
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
    timeBonus: 0
  });

  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const questionsCount = 10;
  const winThreshold = 10; // 100% de acerto

  const startChallenge = useCallback(() => {
    console.log('=== INICIANDO DESAFIO SUPREMO ===');
    console.log('Tentativas usadas:', attemptsUsed);
    console.log('Máximo de tentativas:', maxAttempts);
    console.log('Questões disponíveis:', questoesAnoSelecionado.length);

    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      return false;
    }

    if (questoesAnoSelecionado.length === 0) {
      console.log('❌ Nenhuma questão disponível');
      return false;
    }

    // Selecionar 10 questões aleatórias
    const shuffled = [...questoesAnoSelecionado].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, questionsCount);

    console.log('✅ Questões selecionadas:', selectedQuestions.length);

    const newState = {
      isActive: true,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: selectedQuestions,
      hasCompleted: false,
      hasWon: false,
      streak: 0,
      combo: 0,
      timeBonus: 0
    };

    console.log('✅ Novo estado do desafio:', newState);
    setChallengeState(newState);

    return true;
  }, [questoesAnoSelecionado, attemptsUsed, maxAttempts]);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    console.log('=== RESPONDENDO QUESTÃO ===');
    console.log('Resposta selecionada:', optionId);

    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) {
        console.log('❌ Questão atual não encontrada');
        return prev;
      }

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;

      console.log('Resposta correta?', isCorrect);
      console.log('Nova pontuação:', newScore);
      console.log('Nova sequência:', newStreak);

      // Record the answer in gamification system
      recordAnswer(isCorrect, currentQuestion.area, currentQuestion.id);

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: optionId
        },
        score: newScore,
        streak: newStreak,
        combo: newCombo
      };
    });
  }, [recordAnswer]);

  const nextQuestion = useCallback(() => {
    console.log('=== PRÓXIMA QUESTÃO ===');
    
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      console.log('É a última questão?', isLastQuestion);
      console.log('Índice atual:', prev.currentQuestionIndex);
      console.log('Total de questões:', prev.questions.length);

      if (isLastQuestion) {
        const hasWon = prev.score >= winThreshold;
        const newAttemptsUsed = attemptsUsed + 1;
        
        console.log('Desafio finalizado!');
        console.log('Ganhou?', hasWon);
        console.log('Pontuação final:', prev.score);
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          // Bonus XP for completing the supreme challenge
          addXP(500 + prev.timeBonus);
          console.log('✅ XP adicionado:', 500 + prev.timeBonus);
        } else {
          // Consolation XP
          addXP(prev.score * 25);
          console.log('XP de consolação:', prev.score * 25);
        }

        return {
          ...prev,
          isActive: false,
          hasCompleted: true,
          hasWon
        };
      }

      console.log('Avançando para a próxima questão:', prev.currentQuestionIndex + 1);
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [attemptsUsed, winThreshold, addXP]);

  const resetChallenge = useCallback(() => {
    console.log('=== RESETANDO DESAFIO ===');
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
      timeBonus: 0
    });
  }, []);

  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('premium_challenge_won') === 'true';

  const resetAttempts = useCallback(() => {
    localStorage.removeItem('premium_challenge_attempts');
    localStorage.removeItem('premium_challenge_won');
    setAttemptsUsed(0);
  }, []);

  // Debug logs
  useEffect(() => {
    console.log('=== ESTADO DO DESAFIO ATUALIZADO ===');
    console.log('isActive:', challengeState.isActive);
    console.log('questões carregadas:', challengeState.questions.length);
    console.log('índice atual:', challengeState.currentQuestionIndex);
  }, [challengeState.isActive, challengeState.questions.length, challengeState.currentQuestionIndex]);

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
