
import React, { useState } from 'react';
import { QuestionCardProps } from '@/types/question';
import { QuestionHeader } from './QuestionHeader';
import { QuestionContent } from './QuestionContent';
import { QuestionOption } from './QuestionOption';
import { QuestionFeedback } from './QuestionFeedback';
import { useGamification } from '@/hooks/useGamification';

export function QuestionCard({ 
  question, 
  showAnswer = false, 
  onAnswer, 
  disabled = false,
  userAnswer,
  hideHeader = false 
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);
  const [hasAnswered, setHasAnswered] = useState(showAnswer || !!userAnswer);
  const { answerQuestion } = useGamification();

  const handleOptionSelect = (optionId: string) => {
    if (disabled || hasAnswered) return;
    
    console.log('Selecionando opção:', optionId, 'para questão:', question.id);
    
    setSelectedOption(optionId);
    setHasAnswered(true);
    
    const correct = optionId === question.correct;
    console.log('Resposta correta?', correct);
    
    // Register the answer in gamification system with question ID
    answerQuestion(correct, question.area, question.id);
    
    // Call external handler if provided
    if (onAnswer) {
      onAnswer(optionId);
    }
  };

  const isCorrect = selectedOption === question.correct;
  const showFeedback = hasAnswered || showAnswer;

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-blue-200/50 dark:border-blue-700/50 transition-all duration-300 hover:shadow-3xl">
      {!hideHeader && (
        <QuestionHeader 
          question={question} 
          isCorrect={showFeedback ? isCorrect : undefined}
        />
      )}
      
      <QuestionContent question={question} />
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <QuestionOption
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            showAnswer={showFeedback}
            onSelect={() => handleOptionSelect(option.id)}
            disabled={disabled || hasAnswered}
            correctAnswer={question.correct}
            userAnswer={userAnswer}
            selectedOption={selectedOption}
          />
        ))}
      </div>
      
      {showFeedback && (
        <QuestionFeedback 
          question={question}
          selectedOption={selectedOption}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}
