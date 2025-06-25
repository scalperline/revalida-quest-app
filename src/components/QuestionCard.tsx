
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export type Option = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
};

export type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  image?: string | null;
  options: Option[];
  correct: string;
  referencia?: string;
};

interface QuestionCardProps {
  question: Question;
  showAnswer?: boolean;
  onAnswer?: (optionId: string) => void;
  disabled?: boolean;
  userAnswer?: string;
}

export function QuestionCard({ 
  question, 
  showAnswer = false, 
  onAnswer,
  disabled = false,
  userAnswer
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);

  const handleOptionSelect = (optionId: string) => {
    if (disabled || showAnswer) return;
    
    setSelectedOption(optionId);
    onAnswer?.(optionId);
  };

  const getOptionColor = (optionId: string) => {
    if (!showAnswer) {
      return selectedOption === optionId 
        ? "bg-blue-100 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400" 
        : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700";
    }

    const isCorrect = optionId === question.correct;
    const isUserAnswer = optionId === (userAnswer || selectedOption);

    if (isCorrect) {
      return "bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-400";
    }
    
    if (isUserAnswer && !isCorrect) {
      return "bg-red-100 border-red-500 dark:bg-red-900/20 dark:border-red-400";
    }

    return "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600";
  };

  const getOptionIcon = (optionId: string) => {
    if (!showAnswer) return null;

    const isCorrect = optionId === question.correct;
    const isUserAnswer = optionId === (userAnswer || selectedOption);

    if (isCorrect) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (isUserAnswer && !isCorrect) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  const isQuestionAnswered = showAnswer || (userAnswer || selectedOption);
  const isCorrectAnswer = isQuestionAnswered && (userAnswer || selectedOption) === question.correct;

  return (
    <Card className="w-full border-2 border-blue-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 mobile-card">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-b border-blue-200 dark:border-gray-600 mobile-padding">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-700 text-sm sm:text-base px-3 py-1.5">
              Questão {question.id}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-200 dark:border-purple-700 text-sm sm:text-base px-3 py-1.5">
              {question.year}
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-200 dark:border-green-700 text-sm sm:text-base px-3 py-1.5 text-center">
              {question.area}
            </Badge>
          </div>
          
          {isQuestionAnswered && (
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {isCorrectAnswer ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Correto!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-full text-sm sm:text-base">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Incorreto</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="mobile-padding">
        {/* Enunciado */}
        <div className="mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
            {question.enunciado}
          </p>
        </div>

        {/* Imagem se existir */}
        {question.image && (
          <div className="mb-6 sm:mb-8">
            <img 
              src={question.image} 
              alt="Imagem da questão" 
              className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
            />
          </div>
        )}

        {/* Opções */}
        <div className="space-y-3 sm:space-y-4">
          {question.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleOptionSelect(option.id)}
              disabled={disabled || showAnswer}
              className={`w-full p-4 sm:p-6 h-auto text-left justify-start border-2 transition-all duration-200 ${getOptionColor(option.id)} ${
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
                  <span className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
                    {option.text}
                  </span>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Feedback quando mostrar resposta */}
        {showAnswer && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-lg sm:text-xl">
                  Resposta correta: {question.correct}
                </p>
                <p className="text-base sm:text-lg text-blue-700 dark:text-blue-300 leading-relaxed">
                  {question.options.find(opt => opt.id === question.correct)?.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Referência se existir */}
        {question.referencia && showAnswer && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>Referência:</strong> {question.referencia}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
