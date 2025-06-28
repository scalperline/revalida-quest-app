
import { Mission, MissionProgress } from '@/types/missions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, CheckCircle, AlertTriangle, Calendar, Star, Flame, Sparkles } from 'lucide-react';

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
  const isHighXP = mission.reward.xp >= 300;
  const isTrending = Math.random() > 0.7; // Simulated trending logic

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'hard': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
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

  const getDifficultyStars = (difficulty: Mission['difficulty']) => {
    const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: 3 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getCardBorderClass = () => {
    if (mission.completed) {
      return 'border-2 border-green-300 shadow-lg shadow-green-100 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden';
    }
    if (!hasEnoughQuestions) {
      return 'border-2 border-orange-300 shadow-lg shadow-orange-100';
    }
    return 'border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden';
  };

  return (
    <Card className={getCardBorderClass()}>
      {/* Special Effects Background */}
      {!mission.completed && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
        </div>
      )}

      {/* Trending Badge */}
      {isTrending && !mission.completed && (
        <div className="absolute top-2 left-2 z-20">
          <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 shadow-md animate-pulse">
            <Flame className="w-3 h-3 mr-1" />
            Em Alta
          </Badge>
        </div>
      )}

      {/* High XP Badge */}
      {isHighXP && !mission.completed && (
        <div className="absolute top-2 right-2 z-20">
          <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-white border-0 shadow-md">
            <Sparkles className="w-3 h-3 mr-1" />
            Alto XP
          </Badge>
        </div>
      )}

      {/* Completion Indicator */}
      {mission.completed && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-3 shadow-lg border-4 border-white animate-pulse">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-3 rounded-full bg-gradient-to-r ${getDifficultyColor(mission.difficulty)} text-white shadow-lg border-2 border-white flex-shrink-0`}>
              <Target className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg flex items-center gap-2 mb-2">
                <span className="truncate">{mission.title}</span>
                {mission.completed && (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
              
              {/* Difficulty Stars */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-600">Dificuldade:</span>
                <div className="flex items-center gap-1">
                  {getDifficultyStars(mission.difficulty)}
                </div>
                <span className="text-xs text-gray-500">({getDifficultyText(mission.difficulty)})</span>
              </div>
            </div>
          </div>
          
          {/* XP Reward - Prominent Display */}
          <div className="flex flex-col items-end flex-shrink-0">
            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
              <Zap className="w-4 h-4" />
              <span className="font-bold text-sm">+{mission.reward.xp}</span>
            </div>
            {mission.timeLimit && (
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{mission.timeLimit} min</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Mission Objective */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">Objetivo:</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">{mission.objective}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Meta de acertos: {mission.targetAccuracy}%
                  {mission.timeLimit && ` • Tempo limite: ${mission.timeLimit} min`}
                </p>
              </div>
            </div>
          </div>

          {/* Available Questions Status */}
          <div className={`p-4 rounded-xl border-l-4 shadow-sm transition-all duration-200 ${hasEnoughQuestions 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500 border border-green-200 dark:border-green-800' 
            : 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-500 border border-orange-200 dark:border-orange-800'
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

          {/* Progress Section */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">Progresso da Missão</span>
              <span className={`text-sm font-semibold ${mission.completed ? 'text-green-600' : 'text-gray-700'}`}>
                {mission.progress}/{mission.targetQuestions} questões
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className={`h-3 ${mission.completed ? 'bg-green-100' : ''}`}
            />
            {progress && progress.questionsAnswered > 0 && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Aproveitamento atual: {accuracy.toFixed(1)}%</span>
                <span>Meta: {mission.targetAccuracy}%</span>
              </div>
            )}
          </div>

          {/* Rewards Section */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border-l-4 border-yellow-500 border border-yellow-200 dark:border-yellow-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <Zap className="w-5 h-5" />
                <span className="font-bold">+{mission.reward.xp} XP</span>
              </div>
              {mission.reward.badge && (
                <div className="flex items-center gap-1 text-yellow-700 dark:text-yellow-300">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">{mission.reward.badge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          {!mission.completed ? (
            <Button
              onClick={() => onStartMission(mission)}
              disabled={!hasEnoughQuestions}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-3"
            >
              <Target className="w-5 h-5 mr-2" />
              {mission.progress > 0 ? 'Continuar Missão' : 'Iniciar Missão'}
            </Button>
          ) : (
            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 shadow-md">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300 mb-2">
                <Trophy className="w-6 h-6" />
                <span className="font-bold text-lg">Missão Concluída!</span>
              </div>
              {progress?.completedAt && (
                <div className="flex items-center justify-center gap-1 text-xs text-green-600 dark:text-green-400">
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
