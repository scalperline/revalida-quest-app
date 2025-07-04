
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
    console.log('Total de questões disponíveis:', todasQuestoes.length);

    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      return false;
    }

    if (!todasQuestoes || todasQuestoes.length === 0) {
      console.log('❌ Nenhuma questão disponível');
      return false;
    }

    // Selecionar 10 questões aleatórias com diversidade de áreas
    const shuffled = [...todasQuestoes]
      .filter(q => q.area && q.enunciado && q.options && q.correct) // Garantir que as questões estão completas
      .sort(() => 0.5 - Math.random());
    
    const selectedQuestions = shuffled.slice(0, Math.min(questionsCount, shuffled.length));

    console.log('✅ Questões selecionadas:', selectedQuestions.length);
    console.log('Questões válidas:', selectedQuestions.map(q => ({ id: q.id, area: q.area, enunciado: q.enunciado?.substring(0, 50) + '...' })));

    if (selectedQuestions.length < questionsCount) {
      console.log('⚠️ Menos questões disponíveis que o necessário');
    }

    const newState: ChallengeState = {
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
  }, [todasQuestoes, attemptsUsed, maxAttempts, questionsCount]);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    console.log('=== RESPONDENDO QUESTÃO ===');
    console.log('Resposta selecionada:', optionId);
    console.log('Estado atual:', challengeState);

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

      console.log('Questão atual:', currentQuestion.id);
      console.log('Resposta correta:', currentQuestion.correct);
      console.log('Resposta dada:', optionId);
      console.log('É correto?', isCorrect);
      console.log('Nova pontuação:', newScore);

      // Record the answer in gamification system
      recordAnswer(isCorrect, currentQuestion.area, currentQuestion.id);

      const updatedState = {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: optionId
        },
        score: newScore,
        streak: newStreak,
        combo: newCombo
      };

      console.log('Estado atualizado após resposta:', updatedState);
      return updatedState;
    });
  }, [recordAnswer]);

  const nextQuestion = useCallback(() => {
    console.log('=== PRÓXIMA QUESTÃO ===');
    
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      console.log('É a última questão?', isLastQuestion);
      console.log('Índice atual:', prev.currentQuestionIndex);
      console.log('Total de questões:', prev.questions.length);
      console.log('Pontuação atual:', prev.score);

      if (isLastQuestion) {
        const hasWon = prev.score >= winThreshold;
        const newAttemptsUsed = attemptsUsed + 1;
        
        console.log('🏁 Desafio finalizado!');
        console.log('Ganhou?', hasWon);
        console.log('Pontuação final:', prev.score);
        console.log('Limiar para ganhar:', winThreshold);
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          // Bonus XP for completing the supreme challenge
          const bonusXP = 500 + prev.timeBonus;
          addXP(bonusXP);
          console.log('✅ XP de vitória adicionado:', bonusXP);
        } else {
          // Consolation XP
          const consolationXP = prev.score * 25;
          addXP(consolationXP);
          console.log('XP de consolação:', consolationXP);
        }

        return {
          ...prev,
          isActive: false,
          hasCompleted: true,
          hasWon
        };
      }

      console.log('➡️ Avançando para a próxima questão:', prev.currentQuestionIndex + 1);
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
    console.log('=== RESETANDO TENTATIVAS (DEBUG) ===');
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
    console.log('pontuação:', challengeState.score);
    console.log('completado:', challengeState.hasCompleted);
    console.log('ganhou:', challengeState.hasWon);
  }, [challengeState]);

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
