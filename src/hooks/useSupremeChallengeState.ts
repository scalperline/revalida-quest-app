
import { useState, useCallback, useRef } from 'react';
import { ChallengeState, ChallengeQuestion } from '@/types/premiumChallenge';
import { useChallengeAudio } from './useChallengeAudio';
import { toast } from 'sonner';

const initialState: ChallengeState = {
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
  timeLeft: 600 // 10 minutos
};

export function useSupremeChallengeState() {
  const [challengeState, setChallengeState] = useState<ChallengeState>(initialState);
  const { playSound } = useChallengeAudio();
  const coinAnimationQueue = useRef<Array<{ coins: number; combo: number; streak: number; position: { x: number; y: number } }>>([]);

  const startChallenge = useCallback((questions: ChallengeQuestion[]) => {
    console.log('🚀 Iniciando Desafio Supremo!');
    setChallengeState({
      ...initialState,
      isActive: true,
      questions: questions,
      timeLeft: 600
    });
    playSound('complete');
  }, [playSound]);

  const answerQuestion = useCallback((optionId: string, sourceElement?: HTMLElement) => {
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) return prev;

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;
      const newPerfectAnswers = isCorrect ? prev.perfectAnswers + 1 : prev.perfectAnswers;

      // Sistema de moedas com bônus
      let coinsEarned = 0;
      if (isCorrect) {
        coinsEarned = 10; // Base
        if (newCombo >= 5) coinsEarned += 15; // Combo épico
        else if (newCombo >= 3) coinsEarned += 10; // Combo normal
        if (newStreak >= 5) coinsEarned += 20; // Streak bonus
        if (prev.timeLeft > 540) coinsEarned += 5; // Bonus tempo (respondeu rápido)
      }

      // Tocar som
      playSound(isCorrect ? 'correct' : 'incorrect');
      
      // Adicionar animação de moeda se correto
      if (isCorrect && sourceElement) {
        const rect = sourceElement.getBoundingClientRect();
        coinAnimationQueue.current.push({
          coins: coinsEarned,
          combo: newCombo,
          streak: newStreak,
          position: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          }
        });
        playSound('coin');
      }

      // Mensagens de feedback
      if (isCorrect) {
        if (newCombo >= 5) {
          toast.success(`🔥 COMBO ÉPICO ${newCombo}x! +${coinsEarned} moedas!`, {
            duration: 2000,
            className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
          });
        } else if (newCombo >= 3) {
          toast.success(`⚡ COMBO ${newCombo}x! +${coinsEarned} moedas!`, {
            duration: 1500,
            className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
          });
        } else {
          toast.success(`✅ Correto! +${coinsEarned} moedas`, {
            duration: 1000,
            className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
          });
        }
      } else {
        toast.error("❌ Resposta incorreta. Continue!", {
          duration: 1500,
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
        });
      }

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
  }, [playSound]);

  const nextQuestion = useCallback(() => {
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      
      if (isLastQuestion) {
        const hasWon = prev.score >= 10; // Precisa de 10/10
        const finalBonus = hasWon ? 500 + (prev.perfectAnswers * 100) : prev.score * 50;
        
        // Salvar vitória
        if (hasWon) {
          localStorage.setItem('supreme_challenge_won', 'true');
          localStorage.setItem('supreme_challenge_discount', JSON.stringify({
            won: true,
            date: new Date().toISOString(),
            score: prev.score,
            coins: prev.coinsEarned + finalBonus
          }));
        }

        playSound('complete');
        
        return {
          ...prev,
          isActive: false,
          hasCompleted: true,
          hasWon,
          coinsEarned: prev.coinsEarned + finalBonus
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [playSound]);

  const updateTimeLeft = useCallback((timeLeft: number) => {
    setChallengeState(prev => ({ ...prev, timeLeft }));
  }, []);

  const resetChallenge = useCallback(() => {
    setChallengeState(initialState);
    coinAnimationQueue.current = [];
  }, []);

  const getCoinAnimation = useCallback(() => {
    return coinAnimationQueue.current.shift();
  }, []);

  return {
    challengeState,
    startChallenge,
    answerQuestion,
    nextQuestion,
    updateTimeLeft,
    resetChallenge,
    getCoinAnimation
  };
}
