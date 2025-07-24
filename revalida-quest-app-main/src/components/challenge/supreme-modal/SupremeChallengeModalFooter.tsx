
import { Button } from '@/components/ui/button';

interface SupremeChallengeModalFooterProps {
  showFeedback: boolean;
  selectedAnswer: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  isCompleted: boolean;
  onConfirmAnswer: () => void;
  onNextQuestion: () => void;
}

export function SupremeChallengeModalFooter({
  showFeedback,
  selectedAnswer,
  currentQuestionIndex,
  totalQuestions,
  isCompleted,
  onConfirmAnswer,
  onNextQuestion
}: SupremeChallengeModalFooterProps) {
  if (isCompleted) return null;

  return (
    <div className="p-4 sm:p-6 border-t border-blue-400/20 bg-slate-900/40 backdrop-blur-sm relative z-10">
      <div className="flex justify-center">
        {!showFeedback ? (
          <Button
            onClick={onConfirmAnswer}
            disabled={!selectedAnswer}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold rounded-full"
          >
            Confirmar Resposta
          </Button>
        ) : (
          <Button
            onClick={onNextQuestion}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold rounded-full"
          >
            {currentQuestionIndex + 1 >= totalQuestions ? 
              'Finalizar Desafio' : 'Próxima Questão'}
          </Button>
        )}
      </div>
    </div>
  );
}
