
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Target, Sparkles } from 'lucide-react';
import { useChallengeAudio } from '@/hooks/useChallengeAudio';
import { ChallengeQuestion } from '@/types/premiumChallenge';

interface ChallengeQuestionCardProps {
  question: ChallengeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string, sourceElement?: HTMLElement) => void;
  userAnswer?: string;
  showAnswer?: boolean;
  streak?: number;
  combo?: number;
}

export function ChallengeQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  userAnswer,
  showAnswer = false,
  streak = 0,
  combo = 0
}: ChallengeQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const { playSound } = useChallengeAudio();

  const handleOptionClick = (optionId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (showAnswer) return;
    
    playSound('click');
    setSelectedAnswer(optionId);
    onAnswer(optionId, event.currentTarget);
  };

  const getOptionStyle = (optionId: string) => {
    const baseStyle = "w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] transform font-medium text-lg";
    
    if (showAnswer) {
      if (optionId === question.correct) {
        return `${baseStyle} bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400 text-green-100 shadow-xl`;
      }
      if (optionId === userAnswer && optionId !== question.correct) {
        return `${baseStyle} bg-gradient-to-r from-red-500/30 to-red-600/30 border-red-400 text-red-100 shadow-xl`;
      }
      return `${baseStyle} bg-gray-800/50 border-gray-600 text-gray-300`;
    }

    if (selectedAnswer === optionId) {
      return `${baseStyle} bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-purple-400 text-purple-100 shadow-2xl scale-[1.02]`;
    }

    return `${baseStyle} bg-gray-800/70 border-gray-600 text-gray-200 hover:bg-gray-700/70 hover:border-gray-500 hover:shadow-xl`;
  };

  const getOptionIcon = (optionId: string) => {
    if (!showAnswer) return null;
    
    if (optionId === question.correct) {
      return <CheckCircle className="w-6 h-6 text-green-400" />;
    }
    if (optionId === userAnswer && optionId !== question.correct) {
      return <XCircle className="w-6 h-6 text-red-400" />;
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800/98 via-gray-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl border-2 border-purple-400/40 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/95 via-pink-600/95 to-red-600/95 backdrop-blur-xl p-6 rounded-t-3xl border-b-4 border-yellow-400/60">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 text-xl font-bold shadow-lg">
              Questão {questionNumber}/{totalQuestions}
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-lg">
              {question.area} • {question.year}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            {combo >= 5 && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 animate-pulse shadow-lg">
                🔥 COMBO ÉPICO {combo}x
              </Badge>
            )}
            {combo >= 3 && combo < 5 && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 animate-pulse shadow-lg">
                ⚡ COMBO {combo}x
              </Badge>
            )}
            {streak >= 5 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 animate-pulse shadow-lg">
                🎯 STREAK {streak}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-yellow-400" />
          <span className="text-yellow-300 font-bold text-lg">Desafio Supremo • Questão Oficial Revalida</span>
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
            {question.enunciado}
          </h3>
          
          {question.image && (
            <div className="mb-8 flex justify-center">
              <img 
                src={question.image} 
                alt="Imagem da questão" 
                className="max-w-full h-auto rounded-2xl border-2 border-gray-600 shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-5">
          {question.options.map((option, index) => {
            const optionId = String.fromCharCode(65 + index); // A, B, C, D
            
            return (
              <Button
                key={optionId}
                onClick={(e) => handleOptionClick(optionId, e)}
                className={getOptionStyle(optionId)}
                disabled={showAnswer}
                variant="ghost"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {optionId}
                    </div>
                    <span className="text-left flex-1">{option.text}</span>
                  </div>
                  {getOptionIcon(optionId)}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
