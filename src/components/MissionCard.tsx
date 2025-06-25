
import { Mission, MissionProgress } from '@/types/missions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

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

  const getDifficultyBorderColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'border-green-200 hover:border-green-300';
      case 'medium': return 'border-yellow-200 hover:border-yellow-300';
      case 'hard': return 'border-red-200 hover:border-red-300';
      default: return 'border-gray-200 hover:border-gray-300';
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

  return (
    <Card className={`transition-all duration-300 hover:scale-[1.02] border-2 ${
      mission.completed 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg shadow-green-100' 
        : `hover:shadow-xl ${getDifficultyBorderColor(mission.difficulty)} shadow-lg`
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${getDifficultyColor(mission.difficulty)} text-white shadow-lg ring-2 ring-white`}>
              <Target className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {mission.title}
                {mission.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{mission.description}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              variant={mission.difficulty === 'easy' ? 'default' : mission.difficulty === 'medium' ? 'secondary' : 'destructive'}
              className="font-semibold"
            >
              {getDifficultyText(mission.difficulty)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <p className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <Target className="w-4 h-4" />
              🎯 Objetivo:
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{mission.objective}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Meta de acertos: {mission.targetAccuracy}%
              {mission.timeLimit && (
                <>
                  <Clock className="w-4 h-4 ml-2" />
                  Tempo limite: {mission.timeLimit} min
                </>
              )}
            </p>
          </div>

          {/* Questões disponíveis */}
          <div className={`p-4 rounded-xl border-2 ${hasEnoughQuestions 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700' 
            : 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-300 dark:border-orange-700'
          }`}>
            <div className="flex items-center gap-2">
              {hasEnoughQuestions ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              )}
              <span className={`text-sm font-semibold ${hasEnoughQuestions 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-orange-800 dark:text-orange-200'
              }`}>
                📚 Questões oficiais: {availableQuestions}/{mission.targetQuestions} disponíveis
              </span>
            </div>
            {!hasEnoughQuestions && (
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
                ⚠️ Questões insuficientes na área {mission.area}. Selecione outro ano.
              </p>
            )}
          </div>

          {/* Progresso */}
          <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm font-medium">
              <span>📊 Progresso</span>
              <span className={mission.completed ? 'text-green-600 font-bold' : 'text-blue-600'}>
                {mission.progress}/{mission.targetQuestions} questões
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={`h-3 ${mission.completed ? 'bg-green-100' : 'bg-blue-100'}`}
            />
            {progress && progress.questionsAnswered > 0 && (
              <div className="text-xs text-muted-foreground font-medium">
                ✨ Aproveitamento atual: {accuracy.toFixed(1)}%
              </div>
            )}
          </div>

          {/* Recompensas */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border-2 border-yellow-300 dark:border-yellow-700 shadow-sm">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-lg">+{mission.reward.xp} XP</span>
            </div>
            {mission.reward.badge && (
              <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                <Trophy className="w-5 h-5" />
                <span className="text-sm font-semibold">{mission.reward.badge}</span>
              </div>
            )}
          </div>

          {/* Botão de ação */}
          {!mission.completed ? (
            <Button
              onClick={() => onStartMission(mission)}
              disabled={!hasEnoughQuestions}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-white/20"
            >
              <Target className="w-5 h-5 mr-2" />
              {mission.progress > 0 ? '🚀 Continuar Quest' : '⚡ Iniciar Quest'}
            </Button>
          ) : (
            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                <Trophy className="w-6 h-6" />
                <span className="font-bold text-lg">🏆 Quest Concluída!</span>
              </div>
              {progress?.completedAt && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                  ✅ Finalizada em {new Date(progress.completedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
