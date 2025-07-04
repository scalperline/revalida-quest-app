
import { Target, Clock, Trophy } from 'lucide-react';

interface SimuladoHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeElapsed?: number;
  showTimer?: boolean;
}

export function SimuladoHeader({ 
  currentQuestion, 
  totalQuestions, 
  timeElapsed = 0, 
  showTimer = false 
}: SimuladoHeaderProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-blue-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            <Target className="w-4 h-4" />
            <span>Questão {currentQuestion} de {totalQuestions}</span>
          </div>
        </div>
        
        {showTimer && (
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full">
            <Clock className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="font-mono text-sm text-gray-700 dark:text-gray-200">
              {formatTime(timeElapsed)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
