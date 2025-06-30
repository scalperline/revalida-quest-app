
import { useGamification } from '@/hooks/useGamification';
import { useRanking } from '@/hooks/useRanking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, TrendingUp, TrendingDown, Flame, Target, Star, Zap } from 'lucide-react';
import { MedicalAvatar } from './MedicalAvatar';
import { XPProgressBar } from './XPProgressBar';
import { RankingIndicator } from './RankingIndicator';

export function GameBalance() {
  const { userProgress } = useGamification();
  const { currentUserPosition, loading: rankingLoading } = useRanking();

  const getMedicalTitle = (level: number): string => {
    if (level >= 25) return "Mestre Médico";
    if (level >= 20) return "Especialista";
    if (level >= 15) return "Residente Sênior";
    if (level >= 10) return "Residente Júnior";
    if (level >= 5) return "Interno";
    return "Estudante de Medicina";
  };

  const getLevelTier = (level: number): 'bronze' | 'silver' | 'gold' | 'diamond' => {
    if (level >= 20) return 'diamond';
    if (level >= 15) return 'gold';
    if (level >= 10) return 'silver';
    return 'bronze';
  };

  const accuracy = userProgress.totalQuestions > 0 
    ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100)
    : 0;

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-2 border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
      <CardContent className="p-4 sm:p-6">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4">
          {/* Avatar + Level + Title */}
          <div className="flex items-center gap-3">
            <MedicalAvatar 
              level={userProgress.level} 
              tier={getLevelTier(userProgress.level)}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs font-bold">
                  Nível {userProgress.level}
                </Badge>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <p className="text-sm font-medium text-gray-700 truncate">
                {getMedicalTitle(userProgress.level)}
              </p>
            </div>
          </div>

          {/* XP Progress */}
          <XPProgressBar 
            currentXP={userProgress.xp}
            nextLevelXP={userProgress.xpToNextLevel}
            level={userProgress.level}
            compact
          />

          {/* Ranking + Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <RankingIndicator 
              position={currentUserPosition.allTime}
              loading={rankingLoading}
              compact
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">{userProgress.streakDias} dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{accuracy}% acerto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Avatar + Level Info */}
          <div className="flex items-center gap-4">
            <MedicalAvatar 
              level={userProgress.level} 
              tier={getLevelTier(userProgress.level)}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="font-bold">
                  Nível {userProgress.level}
                </Badge>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {getMedicalTitle(userProgress.level)}
              </p>
            </div>
          </div>

          {/* XP Progress - Takes remaining space */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <XPProgressBar 
              currentXP={userProgress.xp}
              nextLevelXP={userProgress.xpToNextLevel}
              level={userProgress.level}
            />
          </div>

          {/* Ranking */}
          <RankingIndicator 
            position={currentUserPosition.allTime}
            loading={rankingLoading}
          />

          {/* Quick Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Sequência</p>
                <p className="font-bold">{userProgress.streakDias} dias</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Precisão</p>
                <p className="font-bold">{accuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
