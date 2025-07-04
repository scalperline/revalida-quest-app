
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePremiumChallenge } from '@/hooks/usePremiumChallenge';
import { useTimer } from '@/hooks/useTimer';
import { PremiumQuestionCard } from '@/components/premium/PremiumQuestionCard';
import { RewardPill } from '@/components/premium/RewardPill';
import { SuccessRewardModal } from './SuccessRewardModal';
import { ChallengeLoadingState } from './challenge/ChallengeLoadingState';
import { ChallengeErrorState } from './challenge/ChallengeErrorState';
import { ChallengeFeedbackOverlay } from './challenge/ChallengeFeedbackOverlay';
import { ChallengeModalHeader } from './challenge/ChallengeModalHeader';
import { ChallengeModalFooter } from './challenge/ChallengeModalFooter';
import { toast } from 'sonner';
import { type Question } from '@/types/question';

// Convert ChallengeQuestion to Question for PremiumQuestionCard
const convertToQuestion = (challengeQuestion: any): Question => ({
  id: challengeQuestion.id,
  enunciado: challengeQuestion.enunciado,
  options: challengeQuestion.options,
  correct: challengeQuestion.correct,
  area: challengeQuestion.area,
  year: challengeQuestion.year,
  image: challengeQuestion.image
});

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeModal({ isOpen, onClose }: ChallengeModalProps) {
  const { 
    challengeState, 
    answerCurrentQuestion, 
    nextQuestion, 
    isStarting, 
    startError, 
    retryStart 
  } = usePremiumChallenge();
  
  const { isRunning, isFinished, start, stop } = useTimer(600);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showRewardPill, setShowRewardPill] = useState(false);
  const [lastCoinsEarned, setLastCoinsEarned] = useState(0);

  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];
  const isQuestionsReady = challengeState.isActive && challengeState.questions.length > 0;
  const hasError = startError !== null;

  // Iniciar timer quando questões estão prontas
  useEffect(() => {
    if (isOpen && isQuestionsReady && !isRunning && !isFinished) {
      console.log('🕐 Iniciando timer do desafio...');
      start();
    }
  }, [isOpen, isQuestionsReady, isRunning, isFinished, start]);

  // Parar timer quando completar
  useEffect(() => {
    if (isFinished || challengeState.hasCompleted) {
      console.log('⏹️ Parando timer - desafio finalizado');
      stop();
      if (challengeState.hasWon) {
        setShowSuccessModal(true);
      }
    }
  }, [isFinished, challengeState.hasCompleted, challengeState.hasWon, stop]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedAnswer('');
      setShowFeedback(false);
      setLastAnswerCorrect(null);
      setShowRewardPill(false);
      setLastCoinsEarned(0);
    }
  }, [isOpen]);

  const handleAnswer = (optionId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !currentQuestion || showFeedback) return;

    const isCorrect = currentQuestion.correct === selectedAnswer;
    
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    answerCurrentQuestion(selectedAnswer);
    
    if (isCorrect) {
      setTimeout(() => {
        const coinsEarned = 10 + (challengeState.combo >= 3 ? 5 : 0) + (challengeState.streak >= 5 ? 10 : 0);
        setLastCoinsEarned(coinsEarned);
        setShowRewardPill(true);
      }, 800);

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
      toast.error("❌ Resposta incorreta. Continue tentando!", {
        duration: 2000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    }
  };

  const handleNextQuestion = () => {
    nextQuestion();
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    setShowRewardPill(false);
  };

  const handleClose = () => {
    stop();
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    onClose();
  };

  const handleTimeWarning = (timeLeft: number) => {
    if (timeLeft === 120) {
      toast.warning("⏰ Apenas 2 minutos restantes!", {
        duration: 3000,
        className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
      });
    } else if (timeLeft === 60) {
      toast.error("🚨 ÚLTIMO MINUTO! Finalize rapidamente!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    }
  };

  const handleRetry = async () => {
    const success = await retryStart();
    if (!success) {
      console.log('❌ Falha ao tentar novamente');
    }
  };

  const handleTimeUp = () => {
    toast.error("⏰ Tempo esgotado! Desafio finalizado.");
    nextQuestion();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-7xl h-[95vh] overflow-hidden p-0 border-0">
          <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 relative overflow-hidden">
            {/* Background animado */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
            </div>

            <ChallengeModalHeader
              challengeState={challengeState}
              isQuestionsReady={isQuestionsReady}
              isRunning={isRunning}
              showFeedback={showFeedback}
              onClose={handleClose}
              onTimeUp={handleTimeUp}
              onTimeWarning={handleTimeWarning}
            />

            {/* Conteúdo das questões */}
            <div className="flex-1 p-6 overflow-y-auto relative z-10">
              {/* TELA DE LOADING */}
              {isStarting && !hasError && <ChallengeLoadingState />}

              {/* TELA DE ERRO */}
              {hasError && (
                <ChallengeErrorState
                  error={startError}
                  onRetry={handleRetry}
                  onClose={handleClose}
                  isRetrying={isStarting}
                />
              )}

              {/* Feedback overlay */}
              <ChallengeFeedbackOverlay
                isVisible={showFeedback}
                isCorrect={lastAnswerCorrect}
                combo={challengeState.combo}
              />

              {/* Card da questão */}
              {isQuestionsReady && currentQuestion && !hasError && (
                <PremiumQuestionCard
                  question={convertToQuestion(currentQuestion)}
                  questionNumber={challengeState.currentQuestionIndex + 1}
                  totalQuestions={challengeState.questions.length}
                  onAnswer={handleAnswer}
                  userAnswer={selectedAnswer}
                  showAnswer={showFeedback}
                  streak={challengeState.streak}
                  combo={challengeState.combo}
                />
              )}
            </div>

            {/* Footer de ação */}
            {isQuestionsReady && !hasError && (
              <ChallengeModalFooter
                challengeState={challengeState}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
                onConfirmAnswer={handleConfirmAnswer}
                onNextQuestion={handleNextQuestion}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reward Pill */}
      <RewardPill
        coins={lastCoinsEarned}
        combo={challengeState.combo}
        streak={challengeState.streak}
        isVisible={showRewardPill}
        onAnimationComplete={() => setShowRewardPill(false)}
      />

      <SuccessRewardModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        score={challengeState.score}
        total={challengeState.questions.length}
      />
    </>
  );
}
