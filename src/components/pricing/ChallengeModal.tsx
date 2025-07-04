import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Zap, Trophy, X, Shield, CheckCircle, XCircle, Flame, Sparkles, Loader2 } from 'lucide-react';
import { usePremiumChallenge } from '@/hooks/usePremiumChallenge';
import { useTimer } from '@/hooks/useTimer';
import { PremiumQuestionCard } from '@/components/premium/PremiumQuestionCard';
import { PremiumTimer } from '@/components/premium/PremiumTimer';
import { RewardPill } from '@/components/premium/RewardPill';
import { SuccessRewardModal } from './SuccessRewardModal';
import { toast } from 'sonner';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeModal({ isOpen, onClose }: ChallengeModalProps) {
  const { challengeState, answerCurrentQuestion, nextQuestion } = usePremiumChallenge();
  const { timeLeft, minutes, seconds, isRunning, isFinished, start, stop } = useTimer(600);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showRewardPill, setShowRewardPill] = useState(false);
  const [lastCoinsEarned, setLastCoinsEarned] = useState(0);

  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];
  const progress = challengeState.questions.length > 0 ? ((challengeState.currentQuestionIndex + 1) / challengeState.questions.length) * 100 : 0;
  const isLoadingQuestions = challengeState.isActive && (!challengeState.questions || challengeState.questions.length === 0);

  // Iniciar timer quando modal abre e questões estão carregadas
  useEffect(() => {
    if (isOpen && challengeState.isActive && challengeState.questions.length > 0 && !isRunning && !isFinished) {
      console.log('🕐 Iniciando timer do desafio...');
      start();
    }
  }, [isOpen, challengeState.isActive, challengeState.questions.length, isRunning, isFinished, start]);

  // Parar timer e mostrar modal de sucesso quando completar
  useEffect(() => {
    if (isFinished || challengeState.hasCompleted) {
      console.log('⏹️ Parando timer - desafio finalizado');
      stop();
      if (challengeState.hasWon) {
        console.log('🏆 Usuário ganhou! Mostrando modal de sucesso');
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
    console.log('✋ Resposta selecionada:', optionId);
    setSelectedAnswer(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !currentQuestion || showFeedback) return;

    const isCorrect = currentQuestion.correct === selectedAnswer;
    const prevCoins = challengeState.coinsEarned;
    
    console.log('✅ Confirmando resposta:', { selectedAnswer, isCorrect, prevCoins });
    
    // Show immediate feedback
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    // Record the answer
    answerCurrentQuestion(selectedAnswer);
    
    if (isCorrect) {
      // Mostrar pill de recompensa após um delay
      setTimeout(() => {
        const coinsEarned = 10 + (challengeState.combo >= 3 ? 5 : 0) + (challengeState.streak >= 5 ? 10 : 0);
        setLastCoinsEarned(coinsEarned);
        setShowRewardPill(true);
      }, 800);

      // Epic feedback for combos
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
    console.log('➡️ Avançando para próxima questão...');
    nextQuestion();
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    setShowRewardPill(false);
  };

  const handleClose = () => {
    console.log('❌ Fechando modal do desafio...');
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

  if (!isOpen) {
    return null;
  }

  const isTimeRunningOut = timeLeft < 120;
  const perfectProgress = challengeState.score === challengeState.currentQuestionIndex + (showFeedback && lastAnswerCorrect ? 1 : 0);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-7xl h-[95vh] overflow-hidden p-0 border-0">
          <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
            </div>

            {/* Epic Header */}
            <DialogHeader className="relative z-10 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-red-600/90 backdrop-blur-xl text-white p-6 border-b-4 border-yellow-400/50">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <div className="relative">
                    <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" />
                    <div className="absolute inset-0 animate-ping">
                      <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400/50" />
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    DESAFIO SUPREMO
                  </span>
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 hover:text-yellow-400 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {challengeState.questions.length > 0 && (
                <>
                  <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                    <div className="flex items-center gap-6 flex-wrap">
                      {/* Timer Premium */}
                      <PremiumTimer 
                        initialMinutes={10}
                        isRunning={isRunning && !showFeedback}
                        onTimeUp={() => {
                          toast.error("⏰ Tempo esgotado! Desafio finalizado.");
                          nextQuestion();
                        }}
                        onTimeWarning={handleTimeWarning}
                      />
                      
                      {/* Stats */}
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-lg font-bold text-green-300">
                          {challengeState.currentQuestionIndex + 1} / {challengeState.questions.length}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-lg font-bold text-yellow-300">
                          {challengeState.score} corretas
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="text-lg font-bold text-purple-300">
                          {challengeState.coinsEarned} moedas
                        </span>
                      </div>

                      {challengeState.combo >= 3 && (
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
                          <span className="text-lg font-bold text-orange-300">
                            COMBO {challengeState.combo}x!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-200">
                      <span>Progresso do Desafio</span>
                      <span>{Math.round(progress)}% completo</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-gray-700/50 border border-yellow-400/30" />
                  </div>
                </>
              )}
            </DialogHeader>

            {/* Question Content */}
            <div className="flex-1 p-6 overflow-y-auto relative z-10">
              {isLoadingQuestions && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="mb-6">
                    <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Preparando Desafio Supremo...</h3>
                    <p className="text-gray-300 text-lg">Selecionando questões oficiais do Revalida</p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="text-sm">Questões dos anos 2022-2025</span>
                  </div>
                </div>
              )}

              {/* Feedback Overlay */}
              {showFeedback && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className={`text-center p-8 rounded-3xl shadow-2xl max-w-md mx-4 ${
                    lastAnswerCorrect 
                      ? 'bg-gradient-to-br from-green-500/90 to-emerald-600/90' 
                      : 'bg-gradient-to-br from-red-500/90 to-red-600/90'
                  }`}>
                    <div className="mb-4">
                      {lastAnswerCorrect ? (
                        <CheckCircle className="w-16 h-16 text-white mx-auto animate-bounce" />
                      ) : (
                        <XCircle className="w-16 h-16 text-white mx-auto animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {lastAnswerCorrect ? 'CORRETO!' : 'INCORRETO!'}
                    </h3>
                    {lastAnswerCorrect && (
                      <p className="text-lg text-white/90 mb-3">
                        {challengeState.combo >= 3 ? `🔥 COMBO ${challengeState.combo}x!` : 'Excelente!'}
                      </p>
                    )}
                    {!lastAnswerCorrect && (
                      <p className="text-lg text-white/90">
                        Continue tentando! Você consegue!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Question Card */}
              {!isLoadingQuestions && currentQuestion && (
                <PremiumQuestionCard
                  question={currentQuestion}
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

            {/* Action Footer */}
            {!isLoadingQuestions && (
              <div className="relative z-10 bg-gradient-to-r from-slate-800/95 to-gray-800/95 backdrop-blur-xl border-t-4 border-purple-400/50 p-6">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-4">
                  <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="text-sm text-gray-300">
                      💰 <span className="font-bold text-yellow-400">{challengeState.coinsEarned} moedas</span>
                    </div>
                    {perfectProgress && (
                      <div className="text-sm text-purple-300 animate-pulse">
                        🎯 <span className="font-bold">PERFEIÇÃO!</span>
                      </div>
                    )}
                    {challengeState.combo >= 3 && (
                      <div className="text-sm text-orange-300 animate-pulse">
                        🔥 <span className="font-bold">EM CHAMAS!</span>
                      </div>
                    )}
                  </div>
                  
                  {showFeedback ? (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-8 py-3 text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      {challengeState.currentQuestionIndex === challengeState.questions.length - 1 ? (
                        <><Trophy className="w-5 h-5 mr-2" /> FINALIZAR DESAFIO</>
                      ) : (
                        <><Zap className="w-5 h-5 mr-2" /> PRÓXIMA QUESTÃO</>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConfirmAnswer}
                      disabled={!selectedAnswer}
                      className={`${
                        !selectedAnswer 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : challengeState.combo >= 3
                          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 animate-pulse'
                          : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700'
                      } text-white px-8 py-3 text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100`}
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      CONFIRMAR RESPOSTA
                    </Button>
                  )}
                </div>
              </div>
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
