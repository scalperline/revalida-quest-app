
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface SupremeChallengeQuestionCardProps {
  currentQuestion: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string;
  showFeedback: boolean;
  onAnswer: (optionId: string) => void;
}

export function SupremeChallengeQuestionCard({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  onAnswer
}: SupremeChallengeQuestionCardProps) {
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

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Question header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs sm:text-sm">
            Questão {currentQuestionIndex + 1} de {totalQuestions}
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
              onClick={() => onAnswer(option.id)}
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
  );
}
