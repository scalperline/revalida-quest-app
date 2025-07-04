
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChallengeTimer } from '@/hooks/useChallengeTimer';
import { useChallengeAudio } from '@/hooks/useChallengeAudio';
import { useVirtualCoins } from '@/hooks/useVirtualCoins';
import { CoinAnimationPill } from './CoinAnimationPill';
import { X, Clock, Coins, Flame, Zap, Trophy, CheckCircle, XCircle } from 'lucide-react';
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

  // Start timer when modal opens
  useEffect(() => {
    if (isOpen && isQuestionsReady) {
      console.log('🕐 Timer do desafio iniciado');
      start();
    }
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

  const getTimerColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'caution': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getOptionIcon = (optionId: string) => {
    if (!showFeedback) return null;

    const isCorrect = optionId === currentQuestion.correct;
    const isSelected = optionId === selectedAnswer;

    if (isCorrect) {
      return <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
    }
    
    if (isSelected && !isCorrect) {
      return <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
    }

    return null;
  };

  const getOptionStyles = (optionId: string) => {
    if (!showFeedback) {
      return selectedAnswer === optionId 
        ? "bg-blue-500/20 border-blue-400 text-blue-100" 
        : "bg-gray-800/40 border-gray-600 text-gray-200 hover:bg-gray-700/50";
    }

    const isCorrect = optionId === currentQuestion.correct;
    const isSelected = optionId === selectedAnswer;

    if (isCorrect) {
      return "bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20";
    }
    
    if (isSelected && !isCorrect) {
      return "bg-red-500/20 border-red-400 text-red-100 shadow-lg shadow-red-500/20";
    }

    return "bg-gray-800/30 border-gray-600 text-gray-300";
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl h-screen overflow-hidden p-0 border-0 bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900">
          <DialogTitle className="sr-only">Desafio Supremo</DialogTitle>
          <DialogDescription className="sr-only">Complete o desafio para ganhar desconto premium</DialogDescription>
          
          <div className="flex flex-col h-full relative overflow-hidden">
            {/* Background animado */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>

            {/* Header compacto */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-purple-400/20 bg-black/20 backdrop-blur-sm relative z-10">
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${getTimerColor()}`} />
                  <span className={`text-xl sm:text-2xl font-bold ${getTimerColor()}`}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="w-20 sm:w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
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

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-sm sm:text-base">{coinSystem.sessionCoins}</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-green-400 font-bold text-sm sm:text-base">{score}/10</span>
                </div>

                {coinSystem.combo >= 3 && (
                  <Badge 
                    className={`text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                      coinSystem.combo >= 10 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      coinSystem.combo >= 5 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      'bg-gradient-to-r from-yellow-500 to-orange-500'
                    } text-white animate-pulse`}
                  >
                    {coinSystem.combo >= 10 ? <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> :
                     coinSystem.combo >= 5 ? <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> :
                     <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                    {coinSystem.combo}x
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white p-1 sm:p-2"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden relative z-10">
              {/* Loading state */}
              {!isQuestionsReady && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Preparando Desafio Supremo</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Carregando questões épicas...</p>
                </div>
              )}

              {/* Question card */}
              {isQuestionsReady && currentQuestion && (
                <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
                  {/* Question header */}
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs sm:text-sm">
                        Questão {currentQuestionIndex + 1} de {questions.length}
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs sm:text-sm">
                        {currentQuestion.area}
                      </Badge>
                      <Badge variant="outline" className="border-green-400 text-green-300 text-xs sm:text-sm">
                        {currentQuestion.year}
                      </Badge>
                    </div>
                  </div>

                  {/* Question content */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 border border-gray-600/50 flex-shrink-0">
                    <div 
                      className="text-gray-100 text-base sm:text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: currentQuestion.enunciado }}
                    />
                  </div>

                  {/* Options */}
                  <div className="flex-1 flex flex-col">
                    <div className="grid gap-3 sm:gap-4 flex-1">
                      {currentQuestion.options.map((option: any) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(option.id)}
                          disabled={showFeedback}
                          className={`
                            flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 
                            text-left min-h-[60px] sm:min-h-[70px] group relative overflow-hidden
                            ${getOptionStyles(option.id)}
                            ${!showFeedback ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-default'}
                          `}
                        >
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <div className={`
                              w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base
                              ${showFeedback && option.id === currentQuestion.correct
                                ? "bg-emerald-500 text-white" 
                                : showFeedback && option.id === selectedAnswer && option.id !== currentQuestion.correct
                                  ? "bg-red-500 text-white"
                                  : selectedAnswer === option.id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                              }
                            `}>
                              {option.id}
                            </div>
                            {getOptionIcon(option.id)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div 
                              className="text-sm sm:text-base leading-relaxed break-words"
                              dangerouslySetInnerHTML={{ __html: option.text }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer de ação */}
            {isQuestionsReady && !isCompleted && (
              <div className="p-4 sm:p-6 border-t border-purple-400/20 bg-black/20 backdrop-blur-sm relative z-10">
                <div className="flex justify-center">
                  {!showFeedback ? (
                    <Button
                      ref={buttonRef}
                      onClick={handleConfirmAnswer}
                      disabled={!selectedAnswer}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold rounded-full"
                    >
                      Confirmar Resposta
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold rounded-full"
                    >
                      {currentQuestionIndex + 1 >= questions.length ? 
                        'Finalizar Desafio' : 'Próxima Questão'}
                    </Button>
                  )}
                </div>
              </div>
            )}
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
