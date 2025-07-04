
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
      className={`w-full p-4 sm:p-6 min-h-[60px] sm:min-h-[70px] h-auto text-left justify-start border-2 transition-all duration-300 relative group rounded-xl whitespace-normal break-words overflow-hidden ${getOptionColor(
        option.id, 
        showAnswer, 
        selectedOption, 
        userAnswer, 
        correctAnswer
      )} ${
        !disabled && !showAnswer ? "cursor-pointer hover:shadow-md" : "cursor-default"
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
      
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full relative z-10">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
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
          <span className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed block break-words whitespace-normal overflow-hidden">
            {option.text}
          </span>
        </div>
      </div>
    </Button>
  );
}
