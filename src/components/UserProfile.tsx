
import { useState } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Trophy, Target, Calendar, Star, Crown, Zap } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

export function UserProfile() {
  const { userProgress, getAccuracy, getProgressPercentage } = useGamification();
  const [userData, setUserData] = useState<UserData>({
    name: 'Aventureiro',
    email: 'aventureiro@revalida.com',
    joinDate: '2024-01-15'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const getRankTitle = (level: number) => {
    if (level >= 20) return 'Mestre Cirurgião';
    if (level >= 15) return 'Especialista';
    if (level >= 10) return 'Residente Sênior';
    if (level >= 5) return 'Interno Avançado';
    return 'Estudante';
  };

  const getRankIcon = (level: number) => {
    if (level >= 20) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (level >= 15) return <Star className="w-5 h-5 text-purple-500" />;
    if (level >= 10) return <Trophy className="w-5 h-5 text-blue-500" />;
    if (level >= 5) return <Target className="w-5 h-5 text-green-500" />;
    return <User className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Avatar and Basic Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-blue-500 to-purple-600">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 border-2 border-white shadow-lg">
            <span className="text-white font-bold text-sm">{userProgress.level}</span>
          </div>
        </div>
        
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            {getRankIcon(userProgress.level)}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {userData.name}
            </h1>
          </div>
          <Badge variant="secondary" className="mb-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
            {getRankTitle(userProgress.level)}
          </Badge>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Jornada iniciada em {new Date(userData.joinDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">{userProgress.level}</div>
            <div className="text-sm opacity-90">Nível Atual</div>
            <Progress value={getProgressPercentage()} className="mt-2 bg-white/20" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">{getAccuracy()}%</div>
            <div className="text-sm opacity-90">Taxa de Sucesso</div>
            <div className="text-xs mt-1 opacity-80">
              {userProgress.correctAnswers}/{userProgress.totalQuestions}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">
              {userProgress.achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-sm opacity-90">Conquistas</div>
            <div className="text-xs mt-1 opacity-80">
              de {userProgress.achievements.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">{userProgress.xp}</div>
            <div className="text-sm opacity-90">XP Total</div>
            <div className="text-xs mt-1 opacity-80">
              +{userProgress.xpToNextLevel - userProgress.xp} para próximo nível
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Nome</Label>
                  <p className="font-medium">{userData.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Editar Perfil
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Conquistas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {userProgress.achievements
                .filter(a => a.unlocked)
                .sort((a, b) => {
                  const dateA = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
                  const dateB = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
                  return dateB - dateA;
                })
                .slice(0, 5)
                .map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">
                        {achievement.unlockedAt && new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              
              {userProgress.achievements.filter(a => a.unlocked).length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma conquista ainda.</p>
                  <p className="text-sm">Continue respondendo questões!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Progresso Detalhado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Experiência para Próximo Nível</span>
                <span className="text-sm text-muted-foreground">
                  {userProgress.xp} / {userProgress.xpToNextLevel} XP
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userProgress.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questões Respondidas</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userProgress.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userProgress.simuladosCompletos}</div>
                <div className="text-sm text-muted-foreground">Simulados</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
