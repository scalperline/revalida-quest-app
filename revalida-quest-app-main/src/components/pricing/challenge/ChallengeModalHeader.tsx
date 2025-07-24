
import { Trophy, X, Target, Zap, Sparkles, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { PremiumTimer } from '@/components/premium/PremiumTimer';
import { type ChallengeState } from '@/types/premiumChallenge';

interface ChallengeModalHeaderProps {
  challengeState: ChallengeState;
  isQuestionsReady: boolean;
  isRunning: boolean;
  showFeedback: boolean;
  onClose: () => void;
  onTimeUp: () => void;
  onTimeWarning: (timeLeft: number) => void;
}

export function ChallengeModalHeader({ 
  challengeState, 
  isQuestionsReady, 
  isRunning, 
  showFeedback, 
  onClose, 
  onTimeUp, 
  onTimeWarning 
}: ChallengeModalHeaderProps) {
  const progress = challengeState.questions.length > 0 ? ((challengeState.currentQuestionIndex + 1) / challengeState.questions.length) * 100 : 0;

  return (
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
          onClick={onClose}
          className="text-white hover:bg-white/20 hover:text-yellow-400 transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      {isQuestionsReady && (
        <>
          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              <PremiumTimer 
                initialMinutes={10}
                isRunning={isRunning && !showFeedback}
                onTimeUp={onTimeUp}
                onTimeWarning={onTimeWarning}
              />
              
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
  );
}
