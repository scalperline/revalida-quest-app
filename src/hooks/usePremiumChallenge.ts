
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
    console.log('🔍 Filtrando questões oficiais do Revalida 2022-2025...');
    console.log('Total de questões disponíveis:', todasQuestoes.length);
    
    const officialQuestions = todasQuestoes.filter(q => {
      const hasRequiredFields = q.year && q.area && q.enunciado && q.options && q.correct;
      const isInYearRange = q.year >= 2022 && q.year <= 2025;
      const hasEnoughOptions = q.options && q.options.length >= 4;
      
      return hasRequiredFields && isInYearRange && hasEnoughOptions;
    });

    console.log('Questões oficiais encontradas:', officialQuestions.length);
    console.log('Anos disponíveis:', [...new Set(officialQuestions.map(q => q.year))]);
    console.log('Áreas disponíveis:', [...new Set(officialQuestions.map(q => q.area))]);

    if (officialQuestions.length < questionsCount) {
      console.warn('⚠️ Questões insuficientes encontradas:', officialQuestions.length);
      return [];
    }

    // Diversificar por área para ter um desafio equilibrado
    const areaGroups: Record<string, Question[]> = {};
    officialQuestions.forEach(q => {
      if (!areaGroups[q.area]) areaGroups[q.area] = [];
      areaGroups[q.area].push(q);
    });

    const selectedQuestions: Question[] = [];
    const areas = Object.keys(areaGroups);
    
    console.log('🎯 Selecionando questões por área:', areas);
    
    // Selecionar questões de forma equilibrada entre áreas
    for (let i = 0; i < questionsCount && areas.length > 0; i++) {
      const areaIndex = i % areas.length;
      const area = areas[areaIndex];
      const areaQuestions = areaGroups[area];
      
      if (areaQuestions && areaQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * areaQuestions.length);
        const selectedQuestion = areaQuestions.splice(randomIndex, 1)[0];
        selectedQuestions.push(selectedQuestion);
        console.log(`✅ Questão ${i + 1} selecionada - Área: ${area}, Ano: ${selectedQuestion.year}`);
        
        // Remove área se não tem mais questões
        if (areaQuestions.length === 0) {
          delete areaGroups[area];
          areas.splice(areaIndex, 1);
        }
      }
    }

    // Se ainda precisamos de mais questões, pegar aleatoriamente
    const remainingQuestions = Object.values(areaGroups).flat();
    while (selectedQuestions.length < questionsCount && remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const question = remainingQuestions.splice(randomIndex, 1)[0];
      if (!selectedQuestions.find(q => q.id === question.id)) {
        selectedQuestions.push(question);
        console.log(`➕ Questão extra ${selectedQuestions.length} - Área: ${question.area}, Ano: ${question.year}`);
      }
    }

    console.log('🎉 Seleção final:', selectedQuestions.length, 'questões');
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
      console.log('❌ Questões insuficientes disponíveis:', selectedQuestions.length);
      toast.error("Questões insuficientes para o desafio. Tente novamente mais tarde.");
      return false;
    }

    console.log('✅ Questões selecionadas:', selectedQuestions.length);
    console.log('📋 Áreas das questões:', [...new Set(selectedQuestions.map(q => q.area))]);
    console.log('📅 Anos das questões:', [...new Set(selectedQuestions.map(q => q.year))]);

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
      if (!currentQuestion) {
        console.error('❌ Questão atual não encontrada');
        return prev;
      }

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;
      const newPerfectAnswers = isCorrect ? prev.perfectAnswers + 1 : prev.perfectAnswers;

      console.log('📊 Resposta:', { isCorrect, newScore, newStreak, newCombo });

      // Sistema de moedas baseado na performance
      let coinsEarned = 0;
      if (isCorrect) {
        coinsEarned = 10; // Base
        if (newCombo >= 3) coinsEarned += 5; // Combo bonus
        if (newStreak >= 5) coinsEarned += 10; // Streak bonus
        if (prev.currentQuestionIndex < 5) coinsEarned += 5; // Speed bonus
        console.log('💰 Moedas ganhas:', coinsEarned);
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
        
        console.log('🏁 Desafio finalizado!', { score: prev.score, hasWon });
        
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

      console.log('➡️ Próxima questão:', prev.currentQuestionIndex + 1);
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
