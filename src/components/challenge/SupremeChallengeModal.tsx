
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePremiumChallenge } from '@/hooks/usePremiumChallenge';
import { useChallengeTimer } from '@/hooks/useChallengeTimer';
import { useChallengeAudio } from '@/hooks/useChallengeAudio';
import { useVirtualCoins } from '@/hooks/useVirtualCoins';
import { PremiumQuestionCard } from '@/components/premium/PremiumQuestionCard';
import { CoinAnimationPill } from './CoinAnimationPill';
import { X, Clock, Coins, Flame, Zap, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface SupremeChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVictory: (coins: number, discount: number) => void;
}

export function SupremeChallengeModal({ isOpen, onClose, onVictory }: SupremeChallengeModalProps) {
  const { 
    challengeState, 
    answerCurrentQuestion, 
    nextQuestion, 
    isStarting, 
    startError, 
    retryStart 
  } = usePremiumChallenge();
  
  const { playSound } = useChallengeAudio();
  const { coinSystem, calculateCoins, resetSession, getDiscountAmount } = useVirtualCoins();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [coinAnimation, setCoinAnimation] = useState<{
    show: boolean;
    coins: number;
    position: { x: number; y: number };
  }>({ show: false, coins: 0, position: { x: 0, y: 0 } });
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];
  const isQuestionsReady = challengeState.isActive && challengeState.questions.length > 0;

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

  // Iniciar timer quando questões estão prontas
  useEffect(() => {
    if (isOpen && isQuestionsReady && !isStarting) {
      start();
    }
  }, [isOpen, isQuestionsReady, isStarting, start]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedAnswer('');
      setShowFeedback(false);
      setLastAnswerCorrect(null);
      setCoinAnimation({ show: false, coins: 0, position: { x: 0, y: 0 } });
      resetSession();
      stop();
    }
  }, [isOpen, resetSession, stop]);

  // Parar timer quando completar
  useEffect(() => {
    if (challengeState.hasCompleted) {
      stop();
      if (challengeState.hasWon) {
        const discount = getDiscountAmount();
        playSound('victory');
        onVictory(coinSystem.totalCoins, discount);
      }
    }
  }, [challengeState.hasCompleted, challengeState.hasWon, stop, onVictory, coinSystem.totalCoins, getDiscountAmount, playSound]);

  const handleAnswer = (optionId: string) => {
    if (showFeedback) return;
    playSound('click');
    setSelectedAnswer(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !currentQuestion || showFeedback) return;

    const isCorrect = currentQuestion.correct === selectedAnswer;
    const timeBonus = Math.max(0, timeLeft - 300); // Bônus por responder rápido
    
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    answerCurrentQuestion(selectedAnswer);
    
    if (isCorrect) {
      const coinsEarned = calculateCoins(true, timeBonus);
      
      // Mostrar animação de moedas
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoinAnimation({
          show: true,
          coins: coinsEarned,
          position: { x: rect.left + rect.width / 2, y: rect.top }
        });
      }

      // Sons baseados no combo
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
    nextQuestion();
    setSelectedAnswer('');
    setShowFeedback(false);
    setLastAnswerCorrect(null);
  };

  const handleTimeUp = () => {
    nextQuestion();
  };

  const handleClose = () => {
    stop();
    onClose();
  };

  const handleRetry = async () => {
    const success = await retryStart();
    if (success) {
      resetSession();
    }
  };

  const getTimerColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-orange-500';
      case 'caution': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Ocultar navbar quando modal está aberto */}
      <style>{`
        .navbar-hidden { display: none !important; }
        body { overflow: hidden; }
      `}</style>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-7xl h-screen overflow-hidden p-0 border-0">
          <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 relative overflow-hidden">
            {/* Background animado */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
            </div>

            {/* Header com timer e stats */}
            <div className="flex items-center justify-between p-6 border-b border-purple-400/20 bg-black/20 backdrop-blur-sm relative z-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className={`w-6 h-6 ${getTimerColor()}`} />
                  <span className={`text-2xl font-bold ${getTimerColor()}`}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Progress bar do tempo */}
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      urgencyLevel === 'critical' ? 'bg-red-500' :
                      urgencyLevel === 'warning' ? 'bg-orange-500' :
                      urgencyLevel === 'caution' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Coins display */}
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm rounded-full px-4 py-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{coinSystem.sessionCoins}</span>
                </div>

                {/* Combo display */}
                {coinSystem.combo >= 3 && (
                  <Badge 
                    className={`${
                      coinSystem.combo >= 10 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      coinSystem.combo >= 5 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      'bg-gradient-to-r from-yellow-500 to-orange-500'
                    } text-white animate-pulse`}
                  >
                    {coinSystem.combo >= 10 ? <Zap className="w-4 h-4 mr-1" /> :
                     coinSystem.combo >= 5 ? <Flame className="w-4 h-4 mr-1" /> :
                     <Trophy className="w-4 h-4 mr-1" />}
                    {coinSystem.combo}x COMBO
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 p-6 overflow-y-auto relative z-10">
              {/* Loading state */}
              {isStarting && !startError && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Preparando Desafio Supremo</h3>
                  <p className="text-gray-300">Carregando questões épicas...</p>
                </div>
              )}

              {/* Error state */}
              {startError && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Erro no Desafio</h3>
                  <p className="text-gray-300 mb-6 text-center max-w-md">{startError}</p>
                  <div className="flex gap-4">
                    <Button onClick={handleRetry} className="bg-blue-600 hover:bg-blue-700">
                      🔄 Tentar Novamente
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
                      Fechar
                    </Button>
                  </div>
                </div>
              )}

              {/* Question card */}
              {isQuestionsReady && currentQuestion && !startError && (
                <PremiumQuestionCard
                  question={currentQuestion}
                  questionNumber={challengeState.currentQuestionIndex + 1}
                  totalQuestions={challengeState.questions.length}
                  onAnswer={handleAnswer}
                  userAnswer={selectedAnswer}
                  showAnswer={showFeedback}
                  streak={coinSystem.streak}
                  combo={coinSystem.combo}
                />
              )}
            </div>

            {/* Footer de ação */}
            {isQuestionsReady && !startError && (
              <div className="p-6 border-t border-purple-400/20 bg-black/20 backdrop-blur-sm relative z-10">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Questão {challengeState.currentQuestionIndex + 1} de {challengeState.questions.length}
                  </div>
                  
                  <div className="flex gap-4">
                    {!showFeedback ? (
                      <Button
                        ref={buttonRef}
                        onClick={handleConfirmAnswer}
                        disabled={!selectedAnswer}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-bold"
                      >
                        Confirmar Resposta
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-bold"
                      >
                        {challengeState.currentQuestionIndex + 1 >= challengeState.questions.length ? 
                          'Finalizar Desafio' : 'Próxima Questão'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Coin animation */}
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
