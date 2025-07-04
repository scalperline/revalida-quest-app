import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useChallengeTimer } from '@/hooks/useChallengeTimer';
import { useChallengeAudio } from '@/hooks/useChallengeAudio';
import { useVirtualCoins } from '@/hooks/useVirtualCoins';
import { CoinAnimationPill } from './CoinAnimationPill';
import { SupremeChallengeModalHeader } from './supreme-modal/SupremeChallengeModalHeader';
import { SupremeChallengeQuestionCard } from './supreme-modal/SupremeChallengeQuestionCard';
import { SupremeChallengeLoadingState } from './supreme-modal/SupremeChallengeLoadingState';
import { SupremeChallengeModalFooter } from './supreme-modal/SupremeChallengeModalFooter';
import { toast } from 'sonner';

interface SupremeChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVictory: (coins: number, discount: number) => void;
  onChallengeEnd: () => void;
  questions: any[];
}

export function SupremeChallengeModal({ 
  isOpen, 
  onClose, 
  onVictory, 
  onChallengeEnd, 
  questions 
}: SupremeChallengeModalProps) {
  const { playSound } = useChallengeAudio();
  const { coinSystem, calculateCoins, resetSession, getDiscountAmount } = useVirtualCoins();
  
  // Challenge state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Animation state
  const [coinAnimation, setCoinAnimation] = useState<{
    show: boolean;
    coins: number;
    position: { x: number; y: number };
  }>({ show: false, coins: 0, position: { x: 0, y: 0 } });
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const isQuestionsReady = questions.length > 0;

  const { timeLeft, minutes, seconds, start, stop, urgencyLevel, percentage } = useChallengeTimer(600, {
    onTimeWarning: (timeLeft) => {
      if (timeLeft === 300) {
        toast.warning("⏰ 5 minutos restantes!", {
          duration: 3000,
          className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
        });
      } else if (timeLeft === 120) {
        toast.warning("🚨 Apenas 2 minutos!", {
          duration: 4000,
          className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
        });
      } else if (timeLeft === 60) {
        toast.error("🔥 ÚLTIMO MINUTO!", {
          duration: 5000,
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
        });
      }
    },
    onTimeUp: () => {
      toast.error("⏰ Tempo esgotado! Desafio finalizado.");
      handleTimeUp();
    }
  });

  // Hide navbar when challenge is active
  useEffect(() => {
    if (isOpen && isQuestionsReady) {
      // Hide navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'none';
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      console.log('🕐 Timer do desafio iniciado');
      start();
    }

    return () => {
      // Show navbar again when modal closes
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = '';
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
    };
  }, [isOpen, isQuestionsReady, start]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer('');
      setShowFeedback(false);
      setLastAnswerCorrect(null);
      setScore(0);
      setAnswers({});
      setIsCompleted(false);
      setCoinAnimation({ show: false, coins: 0, position: { x: 0, y: 0 } });
      resetSession();
      stop();
    }
  }, [isOpen, resetSession, stop]);

  const handleAnswer = (optionId: string) => {
    if (showFeedback) return;
    playSound('click');
    setSelectedAnswer(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !currentQuestion || showFeedback) return;

    const isCorrect = currentQuestion.correct === selectedAnswer;
    const timeBonus = Math.max(0, timeLeft - 300);
    
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      const coinsEarned = calculateCoins(true, timeBonus);
      
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoinAnimation({
          show: true,
          coins: coinsEarned,
          position: { x: rect.left + rect.width / 2, y: rect.top }
        });
      }

      if (coinSystem.combo >= 10) {
        playSound('combo', 2);
        toast.success(`🔥 COMBO SUPREMO ${coinSystem.combo + 1}x! +${coinsEarned} moedas!`, {
          duration: 3000,
          className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
        });
      } else if (coinSystem.combo >= 5) {
        playSound('combo', 1.5);
        toast.success(`🔥 COMBO ÉPICO ${coinSystem.combo + 1}x! +${coinsEarned} moedas!`, {
          duration: 2500,
          className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
        });
      } else if (coinSystem.combo >= 3) {
        playSound('combo');
        toast.success(`🔥 COMBO ${coinSystem.combo + 1}x! +${coinsEarned} moedas!`, {
          duration: 2000,
          className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
        });
      } else {
        playSound('correct');
        toast.success(`✅ Correto! +${coinsEarned} moedas`, {
          duration: 1500,
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
        });
      }
    } else {
      playSound('incorrect');
      calculateCoins(false);
      toast.error("❌ Resposta incorreta. Continue tentando!", {
        duration: 2000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    }
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;
    
    if (isLastQuestion) {
      // Challenge completed
      const hasWon = score >= 10; // Need perfect score
      setIsCompleted(true);
      stop();
      
      if (hasWon) {
        const discount = getDiscountAmount();
        playSound('victory');
        onVictory(coinSystem.totalCoins, discount);
      } else {
        toast.error(`💪 Quase lá! Você acertou ${score}/${questions.length}. Tente novamente!`, {
          duration: 4000,
          className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
        });
        setTimeout(() => {
          onChallengeEnd();
          onClose();
        }, 2000);
      }
    } else {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setLastAnswerCorrect(null);
    }
  };

  const handleTimeUp = () => {
    setIsCompleted(true);
    stop();
    toast.error(`⏰ Tempo esgotado! Você acertou ${score}/${questions.length}.`);
    setTimeout(() => {
      onChallengeEnd();
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    stop();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-full max-h-full h-screen w-screen overflow-hidden p-0 border-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-indigo-900">
          <DialogTitle className="sr-only">Desafio Supremo</DialogTitle>
          <DialogDescription className="sr-only">Complete o desafio para ganhar desconto premium</DialogDescription>
          
          <div className="flex flex-col h-full relative overflow-hidden">
            {/* Background animado */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>

            <SupremeChallengeModalHeader
              minutes={minutes}
              seconds={seconds}
              urgencyLevel={urgencyLevel}
              percentage={percentage}
              coinSystem={coinSystem}
              score={score}
              onClose={handleClose}
            />

            {/* Conteúdo principal - com scroll */}
            <div className="flex-1 flex flex-col overflow-y-auto relative z-10 px-4 sm:px-6">
              {!isQuestionsReady && <SupremeChallengeLoadingState />}

              {isQuestionsReady && currentQuestion && (
                <div className="py-4">
                  <SupremeChallengeQuestionCard
                    currentQuestion={currentQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                    selectedAnswer={selectedAnswer}
                    showFeedback={showFeedback}
                    onAnswer={handleAnswer}
                  />
                </div>
              )}
            </div>

            <SupremeChallengeModalFooter
              showFeedback={showFeedback}
              selectedAnswer={selectedAnswer}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              isCompleted={isCompleted}
              onConfirmAnswer={handleConfirmAnswer}
              onNextQuestion={handleNextQuestion}
            />
          </div>
        </DialogContent>
      </Dialog>

      <CoinAnimationPill
        coins={coinAnimation.coins}
        combo={coinSystem.combo}
        streak={coinSystem.streak}
        isVisible={coinAnimation.show}
        position={coinAnimation.position}
        onAnimationComplete={() => setCoinAnimation({ show: false, coins: 0, position: { x: 0, y: 0 } })}
      />
    </>
  );
}
