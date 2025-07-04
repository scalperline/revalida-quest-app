
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

  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const questionsCount = 10;
  const winThreshold = 10; // 100% de acerto

  // Filtrar questões oficiais do Revalida 2022-2025
  const getOfficialQuestions = useCallback(() => {
    const officialQuestions = todasQuestoes.filter(q => 
      q.year && q.year >= 2022 && q.year <= 2025 && 
      q.area && q.enunciado && q.options && q.correct &&
      q.options.length >= 4 // Garantir que tem pelo menos 4 alternativas
    );

    // Diversificar por área para ter um desafio equilibrado
    const areaGroups: Record<string, Question[]> = {};
    officialQuestions.forEach(q => {
      if (!areaGroups[q.area]) areaGroups[q.area] = [];
      areaGroups[q.area].push(q);
    });

    const selectedQuestions: Question[] = [];
    const areas = Object.keys(areaGroups);
    
    // Selecionar questões de forma equilibrada entre áreas
    for (let i = 0; i < questionsCount; i++) {
      const area = areas[i % areas.length];
      const areaQuestions = areaGroups[area];
      
      if (areaQuestions && areaQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * areaQuestions.length);
        const selectedQuestion = areaQuestions.splice(randomIndex, 1)[0];
        selectedQuestions.push(selectedQuestion);
      }
    }

    // Se não conseguiu 10 questões equilibradas, completar aleatoriamente
    while (selectedQuestions.length < questionsCount && officialQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * officialQuestions.length);
      const question = officialQuestions.splice(randomIndex, 1)[0];
      if (!selectedQuestions.find(q => q.id === question.id)) {
        selectedQuestions.push(question);
      }
    }

    return selectedQuestions.slice(0, questionsCount);
  }, [todasQuestoes, questionsCount]);

  const startChallenge = useCallback(() => {
    console.log('=== INICIANDO DESAFIO SUPREMO ===');
    
    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      return false;
    }

    const selectedQuestions = getOfficialQuestions();
    
    if (selectedQuestions.length < questionsCount) {
      console.log('❌ Questões insuficientes disponíveis');
      toast.error("Questões insuficientes para o desafio. Tente novamente mais tarde.");
      return false;
    }

    console.log('✅ Questões selecionadas:', selectedQuestions.length);
    console.log('📋 Áreas das questões:', [...new Set(selectedQuestions.map(q => q.area))]);

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
      timeBonus: 0,
      coinsEarned: 0,
      perfectAnswers: 0
    };

    setChallengeState(newState);
    return true;
  }, [getOfficialQuestions, attemptsUsed, maxAttempts, questionsCount]);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    console.log('=== RESPONDENDO QUESTÃO ===');
    
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) return prev;

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;
      const newPerfectAnswers = isCorrect ? prev.perfectAnswers + 1 : prev.perfectAnswers;

      // Sistema de moedas baseado na performance
      let coinsEarned = 0;
      if (isCorrect) {
        coinsEarned = 10; // Base
        if (newCombo >= 3) coinsEarned += 5; // Combo bonus
        if (newStreak >= 5) coinsEarned += 10; // Streak bonus
        if (prev.currentQuestionIndex < 5) coinsEarned += 5; // Speed bonus
      }

      recordAnswer(isCorrect, currentQuestion.area, currentQuestion.id);

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
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          // Bonus XP massivo para vitória perfeita
          const bonusXP = 1000 + (prev.perfectAnswers * 100) + prev.coinsEarned;
          addXP(bonusXP);
          
          toast.success("🏆 DESAFIO CONQUISTADO! Desconto Premium desbloqueado!", {
            duration: 5000,
            className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
          });
        } else {
          const consolationXP = prev.score * 50 + prev.coinsEarned;
          addXP(consolationXP);
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
      timeBonus: 0,
      coinsEarned: 0,
      perfectAnswers: 0
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
