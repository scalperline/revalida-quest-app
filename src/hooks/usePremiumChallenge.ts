
import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { useGamification } from './useGamification';
import { toast } from 'sonner';
import { type Question } from '@/types/question';

interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  questions: Question[];
  hasCompleted: boolean;
  hasWon: boolean;
  challengeType: 'basic' | 'supreme';
  startTime?: Date;
  endTime?: Date;
}

export function usePremiumChallenge() {
  const { questoesAnoSelecionado } = useQuestions();
  const { addXP, unlockAchievement } = useGamification();
  
  console.log('usePremiumChallenge - questoesAnoSelecionado length:', questoesAnoSelecionado.length);
  
  const [challengeState, setChallengeState] = useState<ChallengeState>({
    isActive: false,
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    questions: [],
    hasCompleted: false,
    hasWon: false,
    challengeType: 'basic'
  });

  // Tentativas separadas para cada tipo de desafio
  const [basicAttemptsUsed, setBasicAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('basic_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const [supremeAttemptsUsed, setSupremeAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('supreme_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  // Configurações dos desafios
  const challenges = {
    basic: {
      maxAttempts: 5,
      questionsCount: 5,
      winThreshold: 4, // 80% de acerto
      timeLimit: 300, // 5 minutos
      xpReward: 150,
      title: 'Desafio Básico',
      description: '5 questões em 5 minutos - 80% de acerto necessário'
    },
    supreme: {
      maxAttempts: 3,
      questionsCount: 10,
      winThreshold: 10, // 100% de acerto
      timeLimit: 600, // 10 minutos
      xpReward: 500,
      title: 'Desafio Supremo',
      description: '10 questões em 10 minutos - 100% de acerto necessário'
    }
  };

  const startChallenge = useCallback((type: 'basic' | 'supreme') => {
    const config = challenges[type];
    const attemptsUsed = type === 'basic' ? basicAttemptsUsed : supremeAttemptsUsed;
    
    if (attemptsUsed >= config.maxAttempts) {
      toast.error(`Você esgotou suas tentativas para o ${config.title}!`);
      return false;
    }

    if (questoesAnoSelecionado.length === 0) {
      toast.error('Nenhuma questão disponível para o desafio!');
      return false;
    }

    // Selecionar questões aleatórias
    const shuffled = [...questoesAnoSelecionado].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, config.questionsCount);

    setChallengeState({
      isActive: true,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: selectedQuestions,
      hasCompleted: false,
      hasWon: false,
      challengeType: type,
      startTime: new Date()
    });

    toast.success(`${config.title} iniciado! Boa sorte! 🚀`);
    return true;
  }, [questoesAnoSelecionado, basicAttemptsUsed, supremeAttemptsUsed]);

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
      const config = challenges[prev.challengeType];

      if (isLastQuestion) {
        const hasWon = newScore >= config.winThreshold;
        const endTime = new Date();
        const timeTaken = prev.startTime ? Math.round((endTime.getTime() - prev.startTime.getTime()) / 1000) : 0;
        
        // Atualizar tentativas
        const newAttemptsUsed = prev.challengeType === 'basic' ? basicAttemptsUsed + 1 : supremeAttemptsUsed + 1;
        
        if (prev.challengeType === 'basic') {
          setBasicAttemptsUsed(newAttemptsUsed);
          localStorage.setItem('basic_challenge_attempts', newAttemptsUsed.toString());
        } else {
          setSupremeAttemptsUsed(newAttemptsUsed);
          localStorage.setItem('supreme_challenge_attempts', newAttemptsUsed.toString());
        }
        
        if (hasWon) {
          // Calcular XP baseado na performance
          let xpEarned = config.xpReward;
          
          // Bônus por velocidade (se completou em menos de 70% do tempo)
          const speedBonus = timeTaken < (config.timeLimit * 0.7) ? Math.round(config.xpReward * 0.2) : 0;
          
          // Bônus por precisão perfeita (apenas para desafio supremo)
          const perfectBonus = prev.challengeType === 'supreme' && newScore === config.questionsCount ? 200 : 0;
          
          xpEarned += speedBonus + perfectBonus;
          
          // Adicionar XP
          addXP(xpEarned);
          
          // Desbloquear conquistas
          if (prev.challengeType === 'basic' && newScore >= config.winThreshold) {
            unlockAchievement('first_challenge_win');
          }
          
          if (prev.challengeType === 'supreme' && newScore === config.questionsCount) {
            unlockAchievement('sniper_gabarito');
            unlockAchievement('supreme_challenger');
          }
          
          // Salvar vitória
          localStorage.setItem(`${prev.challengeType}_challenge_won`, 'true');
          
          toast.success(`🏆 ${config.title} conquistado! +${xpEarned} XP!`, {
            duration: 5000,
            className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
          });
        } else {
          toast.error(`❌ ${config.title} não conquistado. Tente novamente!`, {
            duration: 3000,
            className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
          });
        }

        return {
          ...prev,
          score: newScore,
          isActive: false,
          hasCompleted: true,
          hasWon,
          endTime
        };
      }

      return {
        ...prev,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [basicAttemptsUsed, supremeAttemptsUsed, addXP, unlockAchievement]);

  const resetChallenge = useCallback(() => {
    setChallengeState({
      isActive: false,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: [],
      hasCompleted: false,
      hasWon: false,
      challengeType: 'basic'
    });
  }, []);

  // Funções para verificar disponibilidade dos desafios
  const canStartBasic = basicAttemptsUsed < challenges.basic.maxAttempts;
  const canStartSupreme = supremeAttemptsUsed < challenges.supreme.maxAttempts;
  
  const basicAttemptsLeft = challenges.basic.maxAttempts - basicAttemptsUsed;
  const supremeAttemptsLeft = challenges.supreme.maxAttempts - supremeAttemptsUsed;
  
  const hasWonBasic = localStorage.getItem('basic_challenge_won') === 'true';
  const hasWonSupreme = localStorage.getItem('supreme_challenge_won') === 'true';
  
  console.log('usePremiumChallenge values:', { 
    canStartBasic, 
    canStartSupreme,
    basicAttemptsUsed, 
    supremeAttemptsUsed,
    basicAttemptsLeft,
    supremeAttemptsLeft,
    hasWonBasic,
    hasWonSupreme,
    questionsLength: questoesAnoSelecionado.length 
  });

  // Função para resetar tentativas (só para debug/teste)
  const resetAttempts = useCallback(() => {
    localStorage.removeItem('basic_challenge_attempts');
    localStorage.removeItem('supreme_challenge_attempts');
    localStorage.removeItem('basic_challenge_won');
    localStorage.removeItem('supreme_challenge_won');
    setBasicAttemptsUsed(0);
    setSupremeAttemptsUsed(0);
    toast.success('Tentativas resetadas para debug!');
  }, []);

  return {
    challengeState,
    challenges,
    // Desafio Básico
    canStartBasic,
    basicAttemptsUsed,
    basicAttemptsLeft,
    hasWonBasic,
    // Desafio Supremo
    canStartSupreme,
    supremeAttemptsUsed,
    supremeAttemptsLeft,
    hasWonSupreme,
    // Funções
    startChallenge,
    answerQuestion,
    nextQuestion,
    resetChallenge,
    resetAttempts
  };
}
