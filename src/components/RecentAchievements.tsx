
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target } from 'lucide-react';

export function RecentAchievements() {
  const { userProgress } = useGamification();

  const recentAchievements = userProgress.achievements
    ?.filter(a => a.unlocked)
    ?.sort((a, b) => {
      if (!a.unlockedAt || !b.unlockedAt) return 0;
      return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
    })
    ?.slice(0, 3) || [];

  const upcomingAchievements = userProgress.achievements
    ?.filter(a => !a.unlocked)
    ?.slice(0, 2) || [];

  if (recentAchievements.length === 0 && upcomingAchievements.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Conquistas & Progresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600" />
                Conquistas Recentes
              </h4>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 shadow-sm">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 border-green-300 text-green-700">
                      <Trophy className="w-3 h-3 mr-1" />
                      Desbloqueada
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Achievements */}
          {upcomingAchievements.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Próximas Metas
              </h4>
              <div className="space-y-3">
                {upcomingAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200 shadow-sm opacity-75">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 border-blue-300 text-blue-600">
                      <Star className="w-3 h-3 mr-1" />
                      Bloqueada
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
