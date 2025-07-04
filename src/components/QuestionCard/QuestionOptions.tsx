import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Target } from 'lucide-react';
import { type Option } from '@/types/question';

interface QuestionOptionsProps {
  options: Option[];
  selectedOption: string;
  correctAnswer: string;
  showAnswer: boolean;
  disabled: boolean;
  isReviewMode: boolean;
  onOptionSelect: (optionId: string) => void;
}

export function QuestionOptions({
  options,
  selectedOption,
  correctAnswer,
  showAnswer,
  disabled,
  isReviewMode,
  onOptionSelect
}: QuestionOptionsProps) {
  const getOptionStatus = (optionId: string) => {
    if (!showAnswer) {
      return selectedOption === optionId ? 'selected' : 'default';
    }

    if (optionId === correctAnswer) {
      return 'correct';
    }

    if (selectedOption === optionId && optionId !== correctAnswer) {
      return 'incorrect';
    }

    return 'default';
  };

  const getOptionClasses = (status: string) => {
    const baseClasses = "w-full text-left p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 whitespace-normal break-words overflow-hidden h-auto";
    
    switch (status) {
      case 'selected':
        return `${baseClasses} border-blue-500 bg-blue-50 text-blue-900 shadow-md`;
      case 'correct':
        return `${baseClasses} border-green-500 bg-green-50 text-green-900 shadow-md`;
      case 'incorrect':
        return `${baseClasses} border-red-500 bg-red-50 text-red-900 shadow-md`;
      default:
        return `${baseClasses} border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50`;
    }
  };

  const getOptionIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'incorrect':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'selected':
        return <Target className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const optionId = String.fromCharCode(65 + index); // A, B, C, D, E
        const status = getOptionStatus(optionId);
        
        return (
          <Button
            key={optionId}
            onClick={() => onOptionSelect(optionId)}
            className={`${getOptionClasses(status)} min-h-[60px] sm:min-h-[70px]`}
            variant="ghost"
            disabled={disabled || (showAnswer && !isReviewMode)}
          >
            <div className="flex items-start gap-4 w-full">
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-bold text-lg">({optionId})</span>
                {getOptionIcon(status)}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div 
                  className="break-words whitespace-normal leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: option.text }}
                />
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}