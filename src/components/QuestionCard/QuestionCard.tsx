
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionContent } from "./QuestionContent";
import { QuestionOption } from "./QuestionOption";
import { QuestionFeedback } from "./QuestionFeedback";
import { QuestionCardProps } from "@/types/question";

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

  const isQuestionAnswered = showAnswer || (userAnswer || selectedOption);
  const isCorrectAnswer = isQuestionAnswered && (userAnswer || selectedOption) === question.correct;

  return (
    <Card className="w-full border-2 border-blue-200 dark:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-500 mobile-card relative overflow-hidden group">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Success celebration effect */}
      {isQuestionAnswered && isCorrectAnswer && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 animate-pulse"></div>
      )}
      
      <div className="relative z-10">
        <QuestionHeader 
          question={question}
          isQuestionAnswered={!!isQuestionAnswered}
          isCorrectAnswer={!!isCorrectAnswer}
        />
        
        <CardContent className="mobile-padding">
          <QuestionContent question={question} />

          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option) => (
              <QuestionOption
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                showAnswer={showAnswer}
                disabled={disabled}
                correctAnswer={question.correct}
                userAnswer={userAnswer}
                selectedOption={selectedOption}
                onSelect={handleOptionSelect}
              />
            ))}
          </div>

          <QuestionFeedback question={question} showAnswer={showAnswer} />
        </CardContent>
      </div>
    </Card>
  );
}
