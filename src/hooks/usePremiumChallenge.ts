
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
    if (attemptsUsed >= maxAttempts) return false;

    if (questoesAnoSelecionado.length === 0) {
      return false;
    }

    // Selecionar 10 questões aleatórias
    const shuffled = [...questoesAnoSelecionado].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, questionsCount);

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
      timeBonus: 0
    });

    return true;
  }, [questoesAnoSelecionado, attemptsUsed, maxAttempts]);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) return prev;

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;

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
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;

      if (isLastQuestion) {
        const hasWon = prev.score >= winThreshold;
        const newAttemptsUsed = attemptsUsed + 1;
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          // Bonus XP for completing the supreme challenge
          addXP(500 + prev.timeBonus);
        } else {
          // Consolation XP
          addXP(prev.score * 25);
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
