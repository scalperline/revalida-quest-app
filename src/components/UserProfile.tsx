
import { useGamification } from '@/hooks/useGamification';
import { ProgressBar } from './ProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame, BookOpen, Award } from 'lucide-react';

export function UserProfile() {
  const { userProgress, getAccuracy } = useGamification();
  const accuracy = getAccuracy();
  const unlockedAchievements = userProgress.achievements.filter(a => a.unlocked);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Seu Progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            level={userProgress.level}
            xp={userProgress.xp}
            xpToNextLevel={userProgress.xpToNextLevel}
            className="mb-6"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{userProgress.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Questões</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Precisão</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{userProgress.simuladosCompletos}</div>
              <div className="text-sm text-muted-foreground">Simulados</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{userProgress.streakDias}</div>
              <div className="text-sm text-muted-foreground">Sequência</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Conquistas ({unlockedAchievements.length}/{userProgress.achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProgress.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                    : 'bg-muted border-muted opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Desbloqueada
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {achievement.unlockedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
