
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Zap, Trophy, X, Shield, CheckCircle, XCircle, Flame, Star, Brain, Heart } from 'lucide-react';
import { usePremiumChallenge } from '@/hooks/usePremiumChallenge';
import { useTimer } from '@/hooks/useTimer';
import { QuestionCard } from '@/components/QuestionCard';
import { SuccessRewardModal } from './SuccessRewardModal';
import { toast } from 'sonner';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeType: 'basic' | 'supreme';
}

export function ChallengeModal({ isOpen, onClose, challengeType }: ChallengeModalProps) {
  const { challengeState, answerQuestion, nextQuestion, challenges } = usePremiumChallenge();
  const config = challenges[challengeType];
  const { timeLeft, minutes, seconds, isRunning, isFinished, start, stop } = useTimer(config.timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);

  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];
  const progress = ((challengeState.currentQuestionIndex + 1) / challengeState.questions.length) * 100;

  useEffect(() => {
    if (isOpen && challengeState.isActive && challengeState.challengeType === challengeType && !isRunning) {
      start();
    }
  }, [isOpen, challengeState.isActive, challengeState.challengeType, challengeType, isRunning, start]);

  useEffect(() => {
    if (isFinished || challengeState.hasCompleted) {
      stop();
      if (challengeState.hasWon) {
        setShowSuccessModal(true);
      }
    }
  }, [isFinished, challengeState.hasCompleted, challengeState.hasWon, stop]);

  const handleAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer && currentQuestion) {
      const isCorrect = currentQuestion.correct === selectedAnswer;
      
      // Show immediate feedback
      setLastAnswerCorrect(isCorrect);
      setShowFeedback(true);
      
      if (isCorrect) {
        setStreak(prev => prev + 1);
        setCombo(prev => prev + 1);
        
        // Toast feedback for correct answers
        if (combo >= 3) {
          toast.success(`🔥 COMBO ${combo + 1}x! Você está em chamas!`, {
            duration: 2000,
            className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
          });
        } else {
          toast.success("✅ Resposta correta! Continue assim!", {
            duration: 1500,
            className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
          });
        }
      } else {
        setCombo(0);
        toast.error("❌ Resposta incorreta. Foque na próxima!", {
          duration: 2000,
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
        });
      }
      
      // Delay before moving to next question for feedback
      setTimeout(() => {
        answerQuestion(currentQuestion.id, selectedAnswer);
        nextQuestion();
        setSelectedAnswer('');
        setShowFeedback(false);
        setLastAnswerCorrect(null);
      }, 1500);
    }
  };

  const handleClose = () => {
    stop();
    setStreak(0);
    setCombo(0);
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    onClose();
  };

  if (!challengeState.isActive || !currentQuestion || challengeState.challengeType !== challengeType) {
    return null;
  }

  const isTimeRunningOut = timeLeft < 60; // Last minute
  const perfectProgress = challengeState.score === challengeState.currentQuestionIndex && challengeState.currentQuestionIndex > 0;
  const isBasicChallenge = challengeType === 'basic';

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl h-[95vh] overflow-hidden p-0 border-0">
          <div className={`flex flex-col h-full ${isBasicChallenge 
            ? 'bg-gradient-to-br from-slate-900 via-blue-900/90 to-indigo-900' 
            : 'bg-gradient-to-br from-slate-900 via-purple-900/90 to-pink-900'
          } relative overflow-hidden`}>
            
            {/* Epic Header */}
            <DialogHeader className={`relative z-10 ${isBasicChallenge
              ? 'bg-gradient-to-r from-blue-600/90 via-cyan-600/90 to-blue-600/90'
              : 'bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-red-600/90'
            } backdrop-blur-xl text-white p-8 border-b-4 border-yellow-400/50`}>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-3xl md:text-4xl font-bold flex items-center gap-4">
                  <div className="relative">
                    {isBasicChallenge ? (
                      <Target className="w-12 h-12 text-cyan-400 animate-pulse" />
                    ) : (
                      <Brain className="w-12 h-12 text-purple-400 animate-pulse" />
                    )}
                  </div>
                  <span className={`bg-gradient-to-r ${isBasicChallenge 
                    ? 'from-cyan-400 to-blue-400' 
                    : 'from-purple-400 to-pink-400'
                  } bg-clip-text text-transparent`}>
                    {config.title.toUpperCase()} ATIVO
                  </span>
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 hover:text-yellow-400 transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4 md:gap-8 flex-wrap">
                  {/* Enhanced Timer */}
                  <div className="flex items-center gap-3">
                    <div className={`relative ${isTimeRunningOut ? 'animate-pulse' : ''}`}>
                      <Clock className={`w-6 h-6 md:w-8 md:h-8 ${isTimeRunningOut ? 'text-red-400' : isBasicChallenge ? 'text-cyan-400' : 'text-purple-400'}`} />
                    </div>
                    <span className={`text-lg md:text-2xl font-mono font-bold ${isTimeRunningOut ? 'text-red-300 animate-pulse' : isBasicChallenge ? 'text-cyan-300' : 'text-purple-300'}`}>
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Question Counter */}
                  <div className="flex items-center gap-3">
                    <Target className={`w-6 h-6 md:w-8 md:h-8 ${isBasicChallenge ? 'text-blue-400' : 'text-pink-400'}`} />
                    <span className={`text-lg md:text-2xl font-bold ${isBasicChallenge ? 'text-blue-300' : 'text-pink-300'}`}>
                      {challengeState.currentQuestionIndex + 1} / {challengeState.questions.length}
                    </span>
                  </div>
                  
                  {/* Score Tracker */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {perfectProgress ? (
                        <Brain className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
                      ) : (
                        <Zap className="w-6 h-6 md:w-8 md:h-8 text-green-400 animate-pulse" />
                      )}
                    </div>
                    <span className={`text-lg md:text-2xl font-bold ${perfectProgress ? 'text-yellow-300' : 'text-green-300'}`}>
                      {challengeState.score} / {challengeState.questions.length}
                    </span>
                  </div>

                  {/* Streak & Combo Counter */}
                  {streak > 0 && (
                    <div className="flex items-center gap-3">
                      <Flame className={`w-6 h-6 md:w-8 md:h-8 ${combo >= 3 ? 'text-orange-400 animate-bounce' : 'text-red-400'}`} />
                      <span className={`text-lg md:text-2xl font-bold ${combo >= 3 ? 'text-orange-300' : 'text-red-300'}`}>
                        {streak} sequência
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={`${isBasicChallenge 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  } text-white px-3 py-2 md:px-4 md:py-2 text-sm md:text-lg font-bold`}>
                    Questão {challengeState.currentQuestionIndex + 1}
                  </Badge>
                  {combo >= 3 && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 text-sm font-bold animate-pulse">
                      🔥 COMBO {combo}x!
                    </Badge>
                  )}
                  {perfectProgress && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 text-sm font-bold animate-pulse">
                      🧠 PERFEITO!
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-200">
                  <span>Progresso do {config.title}</span>
                  <span>{Math.round(progress)}% completo</span>
                </div>
                <Progress value={progress} className="h-4 bg-gray-700/50 border border-yellow-400/30" />
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
                  {challengeState.questions.map((_, index) => {
                    const questionAnswered = index < challengeState.currentQuestionIndex;
                    const isCorrect = questionAnswered ? challengeState.score > index : false;
                    
                    return (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                          questionAnswered
                            ? isCorrect
                              ? 'bg-green-400 border-green-400 shadow-lg shadow-green-400/50'
                              : 'bg-red-400 border-red-400 shadow-lg shadow-red-400/50'
                            : index === challengeState.currentQuestionIndex
                            ? showFeedback
                              ? lastAnswerCorrect
                                ? 'bg-green-400 border-green-400 animate-pulse'
                                : 'bg-red-400 border-red-400 animate-pulse'
                              : 'bg-yellow-400 border-yellow-400 animate-bounce'
                            : 'bg-gray-600 border-gray-500'
                        }`}
                      >
                        {questionAnswered && (
                          <div className="text-white text-xs">
                            {isCorrect ? '✓' : '✗'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </DialogHeader>

            {/* Question Content Area */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
              {/* Feedback Overlay */}
              {showFeedback && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className={`text-center p-8 rounded-3xl shadow-2xl ${
                    lastAnswerCorrect 
                      ? 'bg-gradient-to-br from-green-500/90 to-emerald-600/90' 
                      : 'bg-gradient-to-br from-red-500/90 to-red-600/90'
                  }`}>
                    <div className="mb-4">
                      {lastAnswerCorrect ? (
                        <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-white mx-auto animate-bounce" />
                      ) : (
                        <XCircle className="w-16 h-16 md:w-20 md:h-20 text-white mx-auto animate-shake" />
                      )}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                      {lastAnswerCorrect ? 'CORRETO!' : 'INCORRETO!'}
                    </h3>
                    <p className="text-lg md:text-xl text-white/90">
                      {lastAnswerCorrect ? 
                        combo >= 3 ? `🔥 COMBO ${combo + 1}x! Você está dominando!` : 'Excelente! Continue assim!' 
                        : 'Não desista! Foque na próxima questão!'
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="max-w-4xl mx-auto">
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  userAnswer={selectedAnswer}
                  hideHeader={true}
                />
              </div>
            </div>

            {/* Epic Footer */}
            <div className={`relative z-10 ${isBasicChallenge
              ? 'bg-gradient-to-r from-slate-800/95 to-blue-800/95'
              : 'bg-gradient-to-r from-slate-800/95 to-purple-800/95'
            } backdrop-blur-xl border-t-4 border-yellow-400/50 p-4 md:p-8`}>
              <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-4">
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center md:text-left">
                  <div className="text-sm md:text-lg text-gray-300">
                    ⏰ <span className={`font-mono font-bold ${isTimeRunningOut ? 'text-red-400' : isBasicChallenge ? 'text-cyan-400' : 'text-purple-400'}`}>
                      {minutes}m {seconds}s
                    </span>
                  </div>
                  <div className="text-sm md:text-lg text-gray-300">
                    🎯 <span className="text-yellow-400 font-bold">{isBasicChallenge ? '80%' : '100%'} necessário</span>
                  </div>
                  <div className="text-sm md:text-lg text-gray-300">
                    ⚡ <span className={`font-bold ${isBasicChallenge ? 'text-cyan-400' : 'text-purple-400'}`}>+{config.xpReward} XP</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer || showFeedback}
                  className={`${
                    showFeedback 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : isBasicChallenge
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700'
                  } text-white px-6 md:px-10 py-3 md:py-4 text-lg md:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100`}
                >
                  {showFeedback ? (
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 animate-pulse" />
                      Processando...
                    </div>
                  ) : challengeState.currentQuestionIndex === challengeState.questions.length - 1 ? (
                    `🏆 FINALIZAR ${config.title.toUpperCase()}`
                  ) : (
                    `⚡ PRÓXIMA ${combo >= 3 ? '🔥' : ''}`
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessRewardModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        score={challengeState.score}
        total={challengeState.questions.length}
        challengeType={challengeType}
      />
    </>
  );
}
