
import { Trophy, Target, Zap, Flame, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ChallengeProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  combo: number;
  streak: number;
  coinsEarned: number;
}

export function ChallengeProgress({
  currentQuestion,
  totalQuestions,
  score,
  combo,
  streak,
  coinsEarned
}: ChallengeProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  const accuracy = currentQuestion > 0 ? (score / currentQuestion) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-slate-800/95 to-gray-800/95 backdrop-blur-xl border-b-4 border-purple-400/50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-lg font-bold text-green-300">
                {currentQuestion} / {totalQuestions}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-300">
                {score} corretas
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-blue-300">
                {coinsEarned} moedas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {combo >= 5 && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 animate-pulse">
                <Flame className="w-4 h-4 mr-1" />
                COMBO ÉPICO {combo}x!
              </Badge>
            )}
            {combo >= 3 && combo < 5 && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 animate-pulse">
                <Star className="w-4 h-4 mr-1" />
                COMBO {combo}x!
              </Badge>
            )}
            {streak >= 5 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 animate-pulse">
                <Zap className="w-4 h-4 mr-1" />
                STREAK {streak}!
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Progresso do Desafio</span>
              <span>{Math.round(progress)}% completo</span>
            </div>
            <Progress 
              value={progress} 
              className="h-3 bg-gray-700/50 border border-purple-400/30" 
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Precisão</span>
              <span>{Math.round(accuracy)}% de acertos</span>
            </div>
            <Progress 
              value={accuracy} 
              className="h-2 bg-gray-700/50 border border-green-400/30" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
