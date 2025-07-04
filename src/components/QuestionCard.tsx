import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { type Question, type QuestionCardProps } from '@/types/question';

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

  const getOptionStatus = (optionId: string) => {
    if (!showAnswer) {
      return selectedOption === optionId ? 'selected' : 'default';
    }

    if (optionId === question.correct) {
      return 'correct';
    }

    if (selectedOption === optionId && optionId !== question.correct) {
      return 'incorrect';
    }

    return 'default';
  };

  const getOptionClasses = (status: string) => {
    const baseClasses = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02]";
    
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Questão {question.id}</span>
            </div>
            <div className="flex items-center gap-4">
              {question.area && (
                <Badge className="bg-white/20 text-white border-white/30">
                  {question.area}
                </Badge>
              )}
              {question.year && (
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{question.year}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CardContent className="p-6">
        {/* Question Text */}
        <div className="mb-6">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: question.enunciado }}
            />
          </div>
        </div>

        {/* Question Image if exists */}
        {question.image && (
          <div className="mb-6 text-center">
            <img 
              src={question.image} 
              alt="Imagem da questão" 
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', question.image);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionId = String.fromCharCode(65 + index); // A, B, C, D, E
            const status = getOptionStatus(optionId);
            
            return (
              <Button
                key={optionId}
                onClick={() => handleOptionSelect(optionId)}
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

        {/* Explanation */}
        {showAnswer && question.referencia && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Explicação
            </h4>
            <div 
              className="text-blue-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: question.referencia }}
            />
          </div>
        )}

        {/* Answer feedback for review mode */}
        {showAnswer && (
          <div className={`mt-4 p-4 rounded-lg border-2 ${
            selectedOption === question.correct 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedOption === question.correct ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Resposta Correta!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Resposta Incorreta</span>
                </>
              )}
            </div>
            <p className={selectedOption === question.correct ? 'text-green-700' : 'text-red-700'}>
              A resposta correta é: <strong>({question.correct})</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Export the type for backward compatibility
export type { Question };
