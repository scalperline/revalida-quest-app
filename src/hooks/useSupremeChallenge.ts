
import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { useGamification } from './useGamification';
import { useAudio } from './useAudio';
import { toast } from 'sonner';

interface ChallengeQuestion {
  id: number;
  enunciado: string;
  options: Array<{ id: string; text: string }>;
  correct: string;
  area: string;
  year: number;
}

interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  questions: ChallengeQuestion[];
  hasCompleted: boolean;
  hasWon: boolean;
  timeLeft: number;
  streak: number;
  combo: number;
  coinsEarned: number;
}

const CHALLENGE_DURATION = 600; // 10 minutos em segundos
const WIN_THRESHOLD = 8; // Precisa acertar 8 de 10 questões

export function useSupremeChallenge() {
  const { todasQuestoes } = useQuestions();
  const { addXP, answerQuestion: recordAnswer } = useGamification();
  const { playSound } = useAudio();

  const [challengeState, setChallengeState] = useState<ChallengeState>({
    isActive: false,
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    questions: [],
    hasCompleted: false,
    hasWon: false,
    timeLeft: CHALLENGE_DURATION,
    streak: 0,
    combo: 0,
    coinsEarned: 0
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (challengeState.isActive && challengeState.timeLeft > 0 && !challengeState.hasCompleted) {
      interval = setInterval(() => {
        setChallengeState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          
          // Avisos de tempo
          if (newTimeLeft === 120) {
            toast.warning("⏰ Apenas 2 minutos restantes!", {
              duration: 3000,
              className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
            });
          } else if (newTimeLeft === 60) {
            toast.error("🚨 ÚLTIMO MINUTO! Finalize rapidamente!", {
              duration: 4000,
              className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
            });
          }
          
          if (newTimeLeft <= 0) {
            // Tempo esgotado
            const hasWon = prev.score >= WIN_THRESHOLD;
            toast.error("⏰ Tempo esgotado! Desafio finalizado.");
            
            return {
              ...prev,
              timeLeft: 0,
              isActive: false,
              hasCompleted: true,
              hasWon
            };
          }
          
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [challengeState.isActive, challengeState.timeLeft, challengeState.hasCompleted]);

  const startChallenge = useCallback(() => {
    if (!todasQuestoes || todasQuestoes.length < 10) {
      toast.error("Questões não disponíveis. Tente novamente.");
      return;
    }

    // Selecionar 10 questões aleatórias
    const shuffled = [...todasQuestoes].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10).map(q => ({
      id: q.id,
      enunciado: q.enunciado,
      options: q.options,
      correct: q.correct,
      area: q.area || 'Geral',
      year: q.year
    }));

    setChallengeState({
      isActive: true,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: selectedQuestions,
      hasCompleted: false,
      hasWon: false,
      timeLeft: CHALLENGE_DURATION,
      streak: 0,
      combo: 0,
      coinsEarned: 0
    });

    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(null);

    toast.success("🚀 Desafio Supremo iniciado! Boa sorte!", {
      duration: 2000,
      className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
    });
  }, [todasQuestoes]);

  const answerQuestion = useCallback((optionId: string) => {
    if (showFeedback) return;
    
    playSound('click');
    setSelectedAnswer(optionId);
  }, [showFeedback, playSound]);

  const confirmAnswer = useCallback(() => {
    if (!selectedAnswer || showFeedback) return;

    const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];
    if (!currentQuestion) return;

    const correct = currentQuestion.correct === selectedAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setChallengeState(prev => {
      const newScore = correct ? prev.score + 1 : prev.score;
      const newStreak = correct ? prev.streak + 1 : 0;
      const newCombo = correct ? prev.combo + 1 : 0;
      
      // Sistema de moedas
      let coinsEarned = 0;
      if (correct) {
        coinsEarned = 10;
        if (newCombo >= 3) coinsEarned += 5;
        if (newStreak >= 5) coinsEarned += 10;
      }

      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: selectedAnswer },
        score: newScore,
        streak: newStreak,
        combo: newCombo,
        coinsEarned: prev.coinsEarned + coinsEarned
      };
    });

    // Registrar no sistema de gamificação
    recordAnswer(correct, currentQuestion.area, currentQuestion.id);

    // Áudio feedback
    if (correct) {
      playSound('correct');
      
      if (challengeState.combo >= 3) {
        toast.success(`🔥 COMBO ${challengeState.combo + 1}x! Moedas extras!`, {
          duration: 2000,
          className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
        });
      } else {
        toast.success(`✅ Correto! +10 moedas`, {
          duration: 1500,
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
        });
      }
    } else {
      playSound('incorrect');
      toast.error("❌ Resposta incorreta. Continue tentando!", {
        duration: 2000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    }
  }, [selectedAnswer, showFeedback, challengeState, recordAnswer, playSound]);

  const nextQuestion = useCallback(() => {
    const isLastQuestion = challengeState.currentQuestionIndex >= challengeState.questions.length - 1;
    
    if (isLastQuestion) {
      // Finalizar desafio
      const hasWon = challengeState.score >= WIN_THRESHOLD;
      
      setChallengeState(prev => ({
        ...prev,
        isActive: false,
        hasCompleted: true,
        hasWon
      }));

      if (hasWon) {
        const bonusXP = 1000 + (challengeState.score * 100) + challengeState.coinsEarned;
        addXP(bonusXP);
        
        toast.success("🏆 PARABÉNS! DESAFIO CONQUISTADO! Desconto Premium desbloqueado!", {
          duration: 6000,
          className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
        });
      } else {
        const consolationXP = challengeState.score * 50 + challengeState.coinsEarned;
        addXP(consolationXP);
        
        toast.info(`💪 Quase lá! Você acertou ${challengeState.score}/${challengeState.questions.length}. Tente novamente!`, {
          duration: 4000,
          className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
        });
      }
    } else {
      // Próxima questão
      setChallengeState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }

    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(null);
  }, [challengeState, addXP]);

  const resetChallenge = useCallback(() => {
    setChallengeState({
      isActive: false,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: [],
      hasCompleted: false,
      hasWon: false,
      timeLeft: CHALLENGE_DURATION,
      streak: 0,
      combo: 0,
      coinsEarned: 0
    });
    
    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(null);
  }, []);

  return {
    challengeState,
    selectedAnswer,
    showFeedback,
    isCorrect,
    startChallenge,
    answerQuestion,
    confirmAnswer,
    nextQuestion,
    resetChallenge
  };
}
