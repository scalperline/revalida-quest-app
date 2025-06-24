
import { Mission, MissionProgress } from '@/types/missions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MissionCardProps {
  mission: Mission;
  progress?: MissionProgress;
  onStartMission: (mission: Mission) => void;
}

export function MissionCard({ mission, progress, onStartMission }: MissionCardProps) {
  const navigate = useNavigate();
  
  const progressPercentage = (mission.progress / mission.targetQuestions) * 100;
  const accuracy = progress && progress.questionsAnswered > 0 
    ? (progress.correctAnswers / progress.questionsAnswered) * 100 
    : 0;

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

  return (
    <Card className={`transition-all duration-300 hover:scale-105 ${
      mission.completed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'hover:shadow-lg'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getDifficultyColor(mission.difficulty)} text-white`}>
              <Target className="w-4 h-4" />
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
            <Badge variant={mission.difficulty === 'easy' ? 'default' : mission.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {getDifficultyText(mission.difficulty)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="font-medium text-blue-800 dark:text-blue-200">🎯 Objetivo:</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">{mission.objective}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              Meta de acertos: {mission.targetAccuracy}%
              {mission.timeLimit && ` • Tempo limite: ${mission.timeLimit} min`}
            </p>
          </div>

          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span className={mission.completed ? 'text-green-600 font-bold' : ''}>
                {mission.progress}/{mission.targetQuestions} questões
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={`h-2 ${mission.completed ? 'bg-green-100' : ''}`}
            />
            {progress && progress.questionsAnswered > 0 && (
              <div className="text-xs text-muted-foreground">
                Aproveitamento atual: {accuracy.toFixed(1)}%
              </div>
            )}
          </div>

          {/* Recompensas */}
          <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <Zap className="w-4 h-4" />
              <span className="font-medium">+{mission.reward.xp} XP</span>
            </div>
            {mission.reward.badge && (
              <div className="flex items-center gap-1 text-yellow-700 dark:text-yellow-300">
                <Trophy className="w-4 h-4" />
                <span className="text-sm">{mission.reward.badge}</span>
              </div>
            )}
          </div>

          {/* Botão de ação */}
          {!mission.completed ? (
            <Button
              onClick={() => onStartMission(mission)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              {mission.progress > 0 ? 'Continuar Missão' : 'Iniciar Missão'}
            </Button>
          ) : (
            <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">Missão Concluída!</span>
              </div>
              {progress?.completedAt && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Finalizada em {new Date(progress.completedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
