
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
  onAnswerWithEffects?: (optionId: string, correct: boolean) => void;
}

export function QuestionCard({ question, onAnswerWithEffects }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const { answerQuestion } = useGamification();
  const { checkAndUseFeature, canUseFeature } = useLimitChecker();

  const canAnswer = canUseFeature('questions');

  const handleOptionSelect = async (optionId: string) => {
    if (hasAnswered || !canAnswer) return;
    
    // Check limits before allowing answer
    const canProceed = await checkAndUseFeature('questions');
    if (!canProceed) return;

    setSelectedOption(optionId);
    
    const correctOption = question.opcoes.find(opt => opt.correta);
    const correct = optionId === correctOption?.id;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
    
    // Update gamification
    answerQuestion(correct, question.area, question.id);
    
    // Call external handler if provided
    onAnswerWithEffects?.(optionId, correct);
  };

  if (!canAnswer) {
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
      <QuestionHeader question={question} />
      
      <QuestionContent question={question} />
      
      <div className="space-y-3">
        {question.opcoes.map((opcao) => (
          <QuestionOption
            key={opcao.id}
            option={opcao}
            isSelected={selectedOption === opcao.id}
            isCorrect={showFeedback && opcao.correta}
            isWrong={showFeedback && selectedOption === opcao.id && !opcao.correta}
            disabled={hasAnswered}
            onClick={() => handleOptionSelect(opcao.id)}
          />
        ))}
      </div>
      
      {showFeedback && (
        <QuestionFeedback 
          question={question}
          isCorrect={isCorrect}
          selectedOptionId={selectedOption}
        />
      )}
    </div>
  );
}
