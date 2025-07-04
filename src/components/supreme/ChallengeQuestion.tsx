
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface ChallengeQuestionProps {
  question: {
    id: number;
    enunciado: string;
    options: Array<{ id: string; text: string }>;
    correct: string;
  };
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string;
  showFeedback: boolean;
  isCorrect: boolean | null;
  onAnswerSelect: (optionId: string) => void;
  onConfirmAnswer: () => void;
  onNextQuestion: () => void;
}

export function ChallengeQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onAnswerSelect,
  onConfirmAnswer,
  onNextQuestion
}: ChallengeQuestionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-gray-600/30 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="text-sm text-gray-400 mb-2">
            Questão {questionNumber} de {totalQuestions}
          </div>
          <h2 className="text-xl font-bold text-white leading-relaxed">
            {question.enunciado}
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Opções */}
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrectOption = showFeedback && option.id === question.correct;
              const isWrongSelected = showFeedback && isSelected && !isCorrectOption;
              
              return (
                <button
                  key={option.id}
                  onClick={() => onAnswerSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                    showFeedback
                      ? isCorrectOption
                        ? 'bg-gradient-to-r from-green-900/80 to-green-800/80 border-green-400/50 text-green-200'
                        : isWrongSelected
                        ? 'bg-gradient-to-r from-red-900/80 to-red-800/80 border-red-400/50 text-red-200'
                        : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
                      : isSelected
                      ? 'bg-gradient-to-r from-blue-900/80 to-blue-800/80 border-blue-400/50 text-blue-200 transform scale-105'
                      : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showFeedback
                          ? isCorrectOption
                            ? 'border-green-400 bg-green-400'
                            : isWrongSelected
                            ? 'border-red-400 bg-red-400'
                            : 'border-gray-500'
                          : isSelected
                          ? 'border-blue-400 bg-blue-400'
                          : 'border-gray-500'
                      }`}>
                        <span className="text-xs font-bold text-white">
                          {option.id.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-base">{option.text}</span>
                    </div>
                    
                    {showFeedback && (
                      <div>
                        {isCorrectOption && <CheckCircle className="w-6 h-6 text-green-400" />}
                        {isWrongSelected && <XCircle className="w-6 h-6 text-red-400" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-center pt-6">
            {!showFeedback ? (
              <Button
                onClick={onConfirmAnswer}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Resposta
              </Button>
            ) : (
              <Button
                onClick={onNextQuestion}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center gap-2"
              >
                {questionNumber === totalQuestions ? 'Finalizar Desafio' : 'Próxima Questão'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
