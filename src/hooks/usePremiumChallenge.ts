
import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { type Question } from '@/types/question';

interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  questions: Question[];
  hasCompleted: boolean;
  hasWon: boolean;
}

export function usePremiumChallenge() {
  const { questoesAnoSelecionado } = useQuestions();
  const [challengeState, setChallengeState] = useState<ChallengeState>({
    isActive: false,
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    questions: [],
    hasCompleted: false,
    hasWon: false
  });

  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const questionsCount = 10;
  const winThreshold = 8; // 80% de 10 questões

  const startChallenge = useCallback(() => {
    if (attemptsUsed >= maxAttempts) return false;

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
      hasWon: false
    });

    return true;
  }, [questoesAnoSelecionado, attemptsUsed, maxAttempts]);

  const answerQuestion = useCallback((questionId: number, optionId: string) => {
    setChallengeState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: optionId
      }
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const isCorrect = currentQuestion?.correct === prev.answers[currentQuestion.id];
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;

      if (isLastQuestion) {
        const hasWon = newScore >= winThreshold;
        const newAttemptsUsed = attemptsUsed + 1;
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
        }

        return {
          ...prev,
          score: newScore,
          isActive: false,
          hasCompleted: true,
          hasWon
        };
      }

      return {
        ...prev,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [attemptsUsed, winThreshold]);

  const resetChallenge = useCallback(() => {
    setChallengeState({
      isActive: false,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: [],
      hasCompleted: false,
      hasWon: false
    });
  }, []);

  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('premium_challenge_won') === 'true';

  return {
    challengeState,
    canStartChallenge,
    attemptsUsed,
    attemptsLeft,
    maxAttempts,
    hasWonBefore,
    startChallenge,
    answerQuestion,
    nextQuestion,
    resetChallenge
  };
}
