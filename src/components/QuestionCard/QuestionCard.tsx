
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionContent } from "./QuestionContent";
import { QuestionOption } from "./QuestionOption";
import { QuestionFeedback } from "./QuestionFeedback";
import { QuestionCardProps } from "@/types/question";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { useAudio } from "@/hooks/useAudio";

export function QuestionCard({ 
  question, 
  showAnswer = false, 
  onAnswer,
  disabled = false,
  userAnswer
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answered, setAnswered] = useState(showAnswer || !!userAnswer);
  const { playSound } = useAudio();

  const handleOptionSelect = (optionId: string) => {
    if (disabled || answered) return;
    
    setSelectedOption(optionId);
    setAnswered(true);
    
    const isCorrect = optionId === question.correct;
    
    if (isCorrect) {
      playSound('correct');
      setShowConfetti(true);
    } else {
      playSound('incorrect');
    }
    
    onAnswer?.(optionId);
  };

  const isQuestionAnswered = answered || showAnswer;
  const isCorrectAnswer = isQuestionAnswered && (userAnswer || selectedOption) === question.correct;

  return (
    <>
      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
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
                  showAnswer={isQuestionAnswered}
                  disabled={disabled}
                  correctAnswer={question.correct}
                  userAnswer={userAnswer}
                  selectedOption={selectedOption}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>

            <QuestionFeedback 
              question={question} 
              showAnswer={isQuestionAnswered}
              selectedOption={selectedOption}
              userAnswer={userAnswer}
            />
          </CardContent>
        </div>
      </Card>
    </>
  );
}
