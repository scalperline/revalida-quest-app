
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
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (isUserAnswer && !isCorrect) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  return (
    <Button
      variant="outline"
      onClick={() => onSelect(option.id)}
      disabled={disabled || showAnswer}
      className={`w-full p-4 sm:p-6 h-auto text-left justify-start border-2 transition-all duration-200 ${getOptionColor(
        option.id, 
        showAnswer, 
        selectedOption, 
        userAnswer, 
        correctAnswer
      )} ${
        !disabled && !showAnswer ? "hover:scale-[1.01] cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4 w-full">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm sm:text-base">
            {option.id}
          </div>
          {getOptionIcon(option.id)}
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 whitespace-normal break-words">
            {option.text}
          </span>
        </div>
      </div>
    </Button>
  );
}
