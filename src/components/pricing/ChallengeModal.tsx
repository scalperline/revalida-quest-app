
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Zap, Trophy, X } from 'lucide-react';
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header */}
            <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <Trophy className="w-8 h-8" />
                  Missão Suprema em Andamento
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className={`text-lg font-mono ${timeLeft < 120 ? 'text-red-200 animate-pulse' : ''}`}>
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span className="text-lg">
                      {challengeState.currentQuestionIndex + 1} / {challengeState.questions.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-lg font-bold">
                      {challengeState.score} acertos
                    </span>
                  </div>
                </div>
                
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Questão {challengeState.currentQuestionIndex + 1}
                </Badge>
              </div>
              
              <Progress value={progress} className="mt-3 h-3 bg-white/20" />
            </DialogHeader>

            {/* Question Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                userAnswer={selectedAnswer}
                hideHeader={true}
              />
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Tempo restante: {minutes}m {seconds}s
                </div>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  {challengeState.currentQuestionIndex === challengeState.questions.length - 1
                    ? 'Finalizar Missão'
                    : 'Próxima Questão'
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
