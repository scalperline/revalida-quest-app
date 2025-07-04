
import { CheckCircle, Circle, Trophy } from 'lucide-react';

interface SimuladoProgressProps {
  currentIndex: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
}

export function SimuladoProgress({ 
  currentIndex, 
  totalQuestions, 
  answeredQuestions, 
  correctAnswers 
}: SimuladoProgressProps) {
  const progressPercentage = (currentIndex / totalQuestions) * 100;
  const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-blue-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Progresso</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Trophy className="w-4 h-4" />
          <span>{Math.round(accuracy)}% de acertos</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{currentIndex}</div>
            <div className="text-xs text-gray-500">Respondidas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">{correctAnswers}</div>
            <div className="text-xs text-gray-500">Corretas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">{totalQuestions - currentIndex}</div>
            <div className="text-xs text-gray-500">Restantes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
