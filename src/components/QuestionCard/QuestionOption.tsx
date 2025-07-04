
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Option } from "@/types/question";
import { getOptionColor } from "@/utils/questionHelpers";

interface QuestionOptionProps {
  option: Option;
  isSelected: boolean;
  showAnswer: boolean;
  disabled: boolean;
  correctAnswer: string;
  userAnswer?: string;
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

export function QuestionOption({ 
  option, 
  isSelected, 
  showAnswer, 
  disabled, 
  correctAnswer, 
  userAnswer, 
  selectedOption, 
  onSelect 
}: QuestionOptionProps) {
  const getOptionIcon = (optionId: string) => {
    if (!showAnswer) return null;

    const isCorrect = optionId === correctAnswer;
    const isUserAnswer = optionId === (userAnswer || selectedOption);

    if (isCorrect) {
      return <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-600" />;
    }
    
    if (isUserAnswer && !isCorrect) {
      return <XCircle className="w-4 h-4 xs:w-5 xs:h-5 text-red-600" />;
    }

    return null;
  };

  const isCorrect = showAnswer && option.id === correctAnswer;
  const isUserAnswer = showAnswer && option.id === (userAnswer || selectedOption);

  return (
    <Button
      variant="outline"
      onClick={() => onSelect(option.id)}
      disabled={disabled || showAnswer}
      className={`w-full p-3 xs:p-4 sm:p-6 h-auto text-left justify-start border-2 transition-all duration-300 relative overflow-hidden group ${getOptionColor(
        option.id, 
        showAnswer, 
        selectedOption, 
        userAnswer, 
        correctAnswer
      )} ${
        !disabled && !showAnswer ? "hover:scale-[1.02] cursor-pointer hover:shadow-lg" : "cursor-default"
      } ${
        isCorrect ? "ring-2 ring-emerald-400 ring-offset-2" : ""
      } ${
        isUserAnswer && !isCorrect ? "ring-2 ring-red-400 ring-offset-2" : ""
      }`}
    >
      {/* Subtle animation background */}
      {!showAnswer && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {/* Success glow effect */}
      {isCorrect && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 animate-pulse"></div>
      )}
      
      <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 w-full relative z-10">
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
          <div className={`flex-shrink-0 w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs xs:text-sm sm:text-base transition-all duration-300 ${
            isCorrect 
              ? "bg-emerald-500 text-white shadow-lg" 
              : isUserAnswer && !isCorrect
                ? "bg-red-500 text-white shadow-lg"
                : isSelected
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-blue-500 text-white"
          }`}>
            {option.id}
          </div>
          {getOptionIcon(option.id)}
        </div>
        <div className="flex-1 text-left min-w-0">
          <span className="text-sm xs:text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-200 whitespace-normal break-words block">
            {option.text}
          </span>
        </div>
      </div>
    </Button>
  );
}
