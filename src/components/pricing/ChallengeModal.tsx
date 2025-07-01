
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Zap, Trophy, X, Shield } from 'lucide-react';
import { usePremiumChallenge } from '@/hooks/usePremiumChallenge';
import { useTimer } from '@/hooks/useTimer';
import { QuestionCard } from '@/components/QuestionCard';
import { SuccessRewardModal } from './SuccessRewardModal';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeModal({ isOpen, onClose }: ChallengeModalProps) {
  const { challengeState, answerQuestion, nextQuestion } = usePremiumChallenge();
  const { timeLeft, minutes, seconds, isRunning, isFinished, start, stop } = useTimer(600);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];
  const progress = ((challengeState.currentQuestionIndex + 1) / challengeState.questions.length) * 100;

  useEffect(() => {
    if (isOpen && challengeState.isActive && !isRunning) {
      start();
    }
  }, [isOpen, challengeState.isActive, isRunning, start]);

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
      answerQuestion(currentQuestion.id, selectedAnswer);
      nextQuestion();
      setSelectedAnswer('');
    }
  };

  const handleClose = () => {
    stop();
    onClose();
  };

  if (!challengeState.isActive || !currentQuestion) {
    return null;
  }

  const isTimeRunningOut = timeLeft < 120; // Last 2 minutes

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl h-[95vh] overflow-hidden p-0 border-0">
          <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500/10 rounded-full animate-bounce blur-lg"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full animate-ping blur-md"></div>
              <Shield className="absolute bottom-20 left-20 w-8 h-8 text-blue-400/20 animate-bounce delay-300" />
            </div>

            {/* Epic Header */}
            <DialogHeader className="relative z-10 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-red-600/90 backdrop-blur-xl text-white p-8 border-b-4 border-yellow-400/50">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-3xl md:text-4xl font-bold flex items-center gap-4">
                  <div className="relative">
                    <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
                    <div className="absolute inset-0 animate-ping">
                      <Trophy className="w-12 h-12 text-yellow-400/50" />
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    MISSÃO SUPREMA ATIVA
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
                <div className="flex items-center gap-8">
                  {/* Enhanced Timer */}
                  <div className="flex items-center gap-3">
                    <div className={`relative ${isTimeRunningOut ? 'animate-pulse' : ''}`}>
                      <Clock className={`w-8 h-8 ${isTimeRunningOut ? 'text-red-400' : 'text-blue-400'}`} />
                      {isTimeRunningOut && (
                        <div className="absolute inset-0 animate-ping">
                          <Clock className="w-8 h-8 text-red-400/50" />
                        </div>
                      )}
                    </div>
                    <span className={`text-2xl font-mono font-bold ${isTimeRunningOut ? 'text-red-300 animate-pulse' : 'text-blue-300'}`}>
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Question Counter */}
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-green-400" />
                    <span className="text-2xl font-bold text-green-300">
                      {challengeState.currentQuestionIndex + 1} / {challengeState.questions.length}
                    </span>
                  </div>
                  
                  {/* Perfect Score Tracker */}
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                    <span className="text-2xl font-bold text-yellow-300">
                      {challengeState.score} / {challengeState.questions.length} perfeito
                    </span>
                  </div>
                </div>
                
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg font-bold">
                  Questão {challengeState.currentQuestionIndex + 1}
                </Badge>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-200">
                  <span>Progresso da Missão</span>
                  <span>{Math.round(progress)}% completo</span>
                </div>
                <Progress value={progress} className="h-4 bg-gray-700/50 border border-yellow-400/30" />
                <div className="flex justify-center gap-2 mt-3">
                  {challengeState.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        index < challengeState.currentQuestionIndex
                          ? 'bg-green-400 border-green-400 animate-pulse'
                          : index === challengeState.currentQuestionIndex
                          ? 'bg-yellow-400 border-yellow-400 animate-bounce'
                          : 'bg-gray-600 border-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </DialogHeader>

            {/* Question Content Area */}
            <div className="flex-1 p-8 overflow-y-auto relative z-10">
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
            <div className="relative z-10 bg-gradient-to-r from-slate-800/95 to-gray-800/95 backdrop-blur-xl border-t-4 border-purple-400/50 p-8">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex items-center gap-6">
                  <div className="text-lg text-gray-300">
                    ⏰ Tempo: <span className={`font-mono font-bold ${isTimeRunningOut ? 'text-red-400' : 'text-blue-400'}`}>
                      {minutes}m {seconds}s
                    </span>
                  </div>
                  <div className="text-lg text-gray-300">
                    🎯 Perfeição necessária: <span className="text-yellow-400 font-bold">100%</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-10 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
                >
                  {challengeState.currentQuestionIndex === challengeState.questions.length - 1
                    ? '🏆 FINALIZAR MISSÃO'
                    : '⚡ PRÓXIMA QUESTÃO'
                  }
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
      />
    </>
  );
}
