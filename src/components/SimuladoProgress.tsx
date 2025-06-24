
import { CheckCircle, Circle, Clock, Target, Trophy } from "lucide-react";

interface Props {
  currentIndex: number;
  totalQuestions: number;
  timeElapsed: number;
  answeredCount: number;
  config: {
    quantidade: number;
    areas: string[];
    tempoMinutos: number;
  };
}

export function SimuladoProgress({ 
  currentIndex, 
  totalQuestions, 
  timeElapsed, 
  answeredCount,
  config 
}: Props) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const averageTimePerQuestion = timeElapsed / Math.max(1, currentIndex + 1);
  const estimatedTotalTime = averageTimePerQuestion * totalQuestions;
  const estimatedRemainingTime = estimatedTotalTime - timeElapsed;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-gray-700 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Progresso do Simulado
        </h3>
        <div className="text-sm text-muted-foreground">
          {config.areas && config.areas.length > 1 ? 
            `${config.areas.length} áreas` : 
            config.areas && config.areas[0] ? config.areas[0] : 'Mista'
          }
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Questões</span>
          <span className="font-medium">{currentIndex + 1} de {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
            style={{ width: `${progress}%` }}
          >
            {progress > 15 && (
              <div className="text-white text-xs font-bold">
                {Math.round(progress)}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-blue-600 dark:text-blue-400">Respondidas</span>
          </div>
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
            {answeredCount}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400">Tempo médio</span>
          </div>
          <div className="text-lg font-bold text-green-700 dark:text-green-300">
            {Math.round(averageTimePerQuestion)}s
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-purple-600 dark:text-purple-400">XP estimado</span>
          </div>
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            +{Math.floor(config.quantidade * 2.5)}
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs text-orange-600 dark:text-orange-400">Restante est.</span>
          </div>
          <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
            {Math.round(estimatedRemainingTime / 60)}min
          </div>
        </div>
      </div>

      {/* Areas Summary */}
      {config.areas && config.areas.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-muted-foreground mb-2">Áreas selecionadas:</div>
          <div className="flex flex-wrap gap-2">
            {config.areas.map((area) => (
              <span 
                key={area}
                className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md text-xs border border-indigo-200 dark:border-indigo-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
