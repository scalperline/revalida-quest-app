
import { useState, useEffect } from 'react';
import { Question } from '@/types/question';
import { QuestionHeader } from './QuestionHeader';
import { QuestionContent } from './QuestionContent';
import { QuestionOption } from './QuestionOption';
import { QuestionFeedback } from './QuestionFeedback';
import { useGamification } from '@/hooks/useGamification';
import { useLimitChecker } from '@/hooks/useLimitChecker';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  showAnswer?: boolean;
  onAnswer?: (optionId: string) => void;
  onAnswerWithEffects?: (optionId: string, correct: boolean) => void;
  disabled?: boolean;
  userAnswer?: string;
  hideHeader?: boolean;
}

export function QuestionCard({ 
  question, 
  showAnswer = false,
  onAnswer,
  onAnswerWithEffects, 
  disabled = false,
  userAnswer,
  hideHeader = false
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);
  const [showFeedback, setShowFeedback] = useState(showAnswer);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(!!userAnswer || showAnswer);
  
  const { answerQuestion } = useGamification();
  const { checkAndUseFeature, canUseFeature } = useLimitChecker();

  const canAnswer = canUseFeature('questions');

  useEffect(() => {
    if (userAnswer) {
      setSelectedOption(userAnswer);
      setShowFeedback(true);
      setHasAnswered(true);
      setIsCorrect(userAnswer === question.correct);
    }
  }, [userAnswer, question.correct]);

  const handleOptionSelect = async (optionId: string) => {
    if (hasAnswered || disabled || showAnswer || !canAnswer) return;
    
    // Check limits before allowing answer
    const canProceed = await checkAndUseFeature('questions');
    if (!canProceed) return;

    setSelectedOption(optionId);
    
    const correct = optionId === question.correct;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
    
    // Update gamification
    answerQuestion(correct, question.area, question.id);
    
    // Call external handlers if provided
    onAnswer?.(optionId);
    onAnswerWithEffects?.(optionId, correct);
  };

  if (!canAnswer && !showAnswer) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="text-center py-8">
          <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Limite de questões atingido
          </h3>
          <p className="text-gray-600 mb-4">
            Você atingiu o limite diário de questões. Faça upgrade para continuar estudando!
          </p>
          <Button onClick={() => window.location.href = '/pricing'}>
            Ver Planos Premium
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      {!hideHeader && <QuestionHeader question={question} />}
      
      <QuestionContent question={question} />
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <QuestionOption
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            showAnswer={showFeedback}
            disabled={hasAnswered || disabled || showAnswer}
            correctAnswer={question.correct}
            userAnswer={userAnswer}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>
      
      {showFeedback && (
        <QuestionFeedback 
          question={question}
          isCorrect={isCorrect}
          selectedOption={selectedOption}
        />
      )}
    </div>
  );
}
