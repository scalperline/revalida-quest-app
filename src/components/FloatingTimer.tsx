
import { useEffect, useState } from "react";
import { Clock, Flag, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  running: boolean;
  onFinish: () => void;
  initialMinutes?: number;
  currentQuestion: number;
  totalQuestions: number;
  onForceFinish: () => void;
}

export function FloatingTimer({ 
  running, 
  onFinish, 
  initialMinutes = 300, 
  currentQuestion, 
  totalQuestions,
  onForceFinish 
}: Props) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      onFinish();
      return;
    }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onFinish]);

  const hours = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    const percentage = seconds / (initialMinutes * 60);
    if (percentage > 0.5) return "text-green-600";
    if (percentage > 0.25) return "text-yellow-600";
    return "text-red-600";
  };

  const progress = ((totalQuestions - currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
    }`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-200 dark:border-gray-600 min-w-[200px]">
        {/* Header with minimize button */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
            <div className={`text-lg font-mono font-bold ${getTimeColor()}`}>
              {formatTime()}
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            {isMinimized ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Expandable content */}
        {!isMinimized && (
          <div className="p-3">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">{currentQuestion}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${100 - progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                <div className="font-bold text-blue-600 dark:text-blue-400">
                  {Math.round((initialMinutes * 60 - seconds) / 60)}min
                </div>
                <div className="text-blue-500 dark:text-blue-400 text-xs">Usado</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-center">
                <div className="font-bold text-purple-600 dark:text-purple-400">
                  {currentQuestion > totalQuestions ? 0 : Math.round(seconds / (totalQuestions - currentQuestion + 1))}min
                </div>
                <div className="text-purple-500 dark:text-purple-400 text-xs">Por questão</div>
              </div>
            </div>

            {/* Force Finish Button */}
            <button
              onClick={onForceFinish}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-all duration-200"
            >
              <Flag className="w-3 h-3" />
              Finalizar Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
