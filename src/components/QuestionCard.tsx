import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { type Question, type QuestionCardProps } from '@/types/question';
import { QuestionHeader } from './QuestionCard/QuestionHeader';
import { QuestionContent } from './QuestionCard/QuestionContent';
import { QuestionOptions } from './QuestionCard/QuestionOptions';
import { QuestionFeedback } from './QuestionCard/QuestionFeedback';

export function QuestionCard({
  question,
  onAnswer,
  onAnswerWithEffects,
  userAnswer,
  showAnswer = false,
  hideHeader = false,
  isReviewMode = false,
  disabled = false
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Reset selected option when question changes
  useEffect(() => {
    if (userAnswer) {
      setSelectedOption(userAnswer);
    } else {
      setSelectedOption('');
    }
  }, [question.id, userAnswer]);

  const handleOptionSelect = (optionId: string) => {
    if (showAnswer && !isReviewMode) return; // Don't allow selection when showing answer
    if (disabled) return; // Don't allow selection when disabled
    
    setSelectedOption(optionId);
    
    const correct = optionId === question.correct;
    
    if (onAnswer) {
      onAnswer(optionId);
    }
    
    if (onAnswerWithEffects) {
      onAnswerWithEffects(optionId, correct);
    }
  };


  console.log('=== QUESTION CARD RENDER ===');
  console.log('Question ID:', question.id);
  console.log('Question Area:', question.area);
  console.log('Question Text:', question.enunciado?.substring(0, 50) + '...');
  console.log('Options count:', question.options?.length);
  console.log('Correct answer:', question.correct);
  console.log('Selected option:', selectedOption);
  console.log('Show answer:', showAnswer);

  if (!question || !question.enunciado || !question.options) {
    console.error('❌ Questão inválida:', question);
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Questão não disponível</h3>
          <p className="text-red-600">Esta questão não pôde ser carregada corretamente.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-0 overflow-hidden">
      {!hideHeader && (
        <QuestionHeader 
          questionId={question.id}
          area={question.area}
          year={question.year}
        />
      )}

      <CardContent className="p-6">
        <QuestionContent 
          enunciado={question.enunciado}
          image={question.image}
        />

        <QuestionOptions
          options={question.options}
          selectedOption={selectedOption}
          correctAnswer={question.correct}
          showAnswer={showAnswer}
          disabled={disabled}
          isReviewMode={isReviewMode}
          onOptionSelect={handleOptionSelect}
        />

        <QuestionFeedback
          showAnswer={showAnswer}
          selectedOption={selectedOption}
          correctAnswer={question.correct}
          referencia={question.referencia}
        />
      </CardContent>
    </Card>
  );
}

// Export the type for backward compatibility
export type { Question };
