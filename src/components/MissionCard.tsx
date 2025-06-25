
import { Mission, MissionProgress } from '@/types/missions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  progress?: MissionProgress;
  onStartMission: (mission: Mission) => void;
  availableQuestions?: number;
}

export function MissionCard({ mission, progress, onStartMission, availableQuestions = 0 }: MissionCardProps) {
  const progressPercentage = (mission.progress / mission.targetQuestions) * 100;
  const accuracy = progress && progress.questionsAnswered > 0 
    ? (progress.correctAnswers / progress.questionsAnswered) * 100 
    : 0;

  const hasEnoughQuestions = availableQuestions >= mission.targetQuestions;

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const getCardBorderClass = () => {
    if (mission.completed) {
      return 'border-2 border-green-300 shadow-lg shadow-green-100 bg-gradient-to-br from-green-50 to-emerald-50';
    }
    if (!hasEnoughQuestions) {
      return 'border-2 border-orange-300 shadow-lg shadow-orange-100';
    }
    return 'border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300';
  };

  return (
    <Card className={`transition-all duration-300 hover:scale-[1.02] ${getCardBorderClass()} relative`}>
      {/* Completion Indicator - Small badge in top right corner */}
      {mission.completed && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-2 shadow-lg border-2 border-white">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${getDifficultyColor(mission.difficulty)} text-white shadow-md border-2 border-white`}>
              <Target className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {mission.title}
                {mission.completed && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-normal">
                    Concluída ✓
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{mission.description}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              variant={mission.difficulty === 'easy' ? 'default' : mission.difficulty === 'medium' ? 'secondary' : 'destructive'}
              className="border border-current shadow-sm"
            >
              {getDifficultyText(mission.difficulty)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
            <p className="font-medium text-blue-800 dark:text-blue-200">🎯 Objetivo:</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">{mission.objective}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              Meta de acertos: {mission.targetAccuracy}%
              {mission.timeLimit && ` • Tempo limite: ${mission.timeLimit} min`}
            </p>
          </div>

          {/* Questões disponíveis */}
          <div className={`p-4 rounded-xl border-l-4 shadow-sm ${hasEnoughQuestions 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 border border-green-200 dark:border-green-800' 
            : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 border border-orange-200 dark:border-orange-800'
          }`}>
            <div className="flex items-center gap-2">
              {hasEnoughQuestions ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              )}
              <span className={`text-sm font-medium ${hasEnoughQuestions 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-orange-800 dark:text-orange-200'
              }`}>
                Questões oficiais: {availableQuestions}/{mission.targetQuestions} disponíveis
              </span>
            </div>
            {!hasEnoughQuestions && (
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                Questões insuficientes na área {mission.area}. Selecione outro ano.
              </p>
            )}
          </div>

          {/* Progresso */}
          <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progresso</span>
              <span className={mission.completed ? 'text-green-600 font-bold' : 'font-medium'}>
                {mission.progress}/{mission.targetQuestions} questões
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={`h-3 ${mission.completed ? 'bg-green-100' : ''}`}
            />
            {progress && progress.questionsAnswered > 0 && (
              <div className="text-xs text-muted-foreground">
                Aproveitamento atual: {accuracy.toFixed(1)}%
              </div>
            )}
          </div>

          {/* Recompensas */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border-l-4 border-yellow-500 border border-yellow-200 dark:border-yellow-800 shadow-sm">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <Zap className="w-5 h-5" />
              <span className="font-medium">+{mission.reward.xp} XP</span>
            </div>
            {mission.reward.badge && (
              <div className="flex items-center gap-1 text-yellow-700 dark:text-yellow-300">
                <Trophy className="w-5 h-5" />
                <span className="text-sm font-medium">{mission.reward.badge}</span>
              </div>
            )}
          </div>

          {/* Botão de ação */}
          {!mission.completed ? (
            <Button
              onClick={() => onStartMission(mission)}
              disabled={!hasEnoughQuestions}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Target className="w-4 h-4 mr-2" />
              {mission.progress > 0 ? 'Continuar Quest' : 'Iniciar Quest'}
            </Button>
          ) : (
            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 shadow-md">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                <Trophy className="w-6 h-6" />
                <span className="font-bold text-lg">Quest Concluída!</span>
              </div>
              {progress?.completedAt && (
                <div className="flex items-center justify-center gap-1 text-xs text-green-600 dark:text-green-400 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Finalizada em {new Date(progress.completedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
