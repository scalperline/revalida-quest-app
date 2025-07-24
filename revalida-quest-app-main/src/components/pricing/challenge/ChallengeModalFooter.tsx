
import { Trophy, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type ChallengeState } from '@/types/premiumChallenge';

interface ChallengeModalFooterProps {
  challengeState: ChallengeState;
  selectedAnswer: string;
  showFeedback: boolean;
  onConfirmAnswer: () => void;
  onNextQuestion: () => void;
}

export function ChallengeModalFooter({ 
  challengeState, 
  selectedAnswer, 
  showFeedback, 
  onConfirmAnswer, 
  onNextQuestion 
}: ChallengeModalFooterProps) {
  const perfectProgress = challengeState.score === challengeState.currentQuestionIndex + (showFeedback ? 1 : 0);

  return (
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
            onClick={onNextQuestion}
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
            onClick={onConfirmAnswer}
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
  );
}
