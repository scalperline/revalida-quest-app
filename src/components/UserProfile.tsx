
import { useState } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { ResponsiveCard, ResponsiveCardContent, ResponsiveCardHeader, ResponsiveCardTitle } from '@/components/ui/responsive-card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BadgesGrid } from '@/components/BadgesGrid';
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

  const statsCards = [
    {
      value: userProgress.level,
      label: "Nível Atual",
      color: "from-blue-500 to-blue-600",
      progress: getProgressPercentage()
    },
    {
      value: `${getAccuracy()}%`,
      label: "Taxa de Sucesso",
      color: "from-green-500 to-green-600",
      subtitle: `${userProgress.correctAnswers}/${userProgress.totalQuestions}`
    },
    {
      value: userProgress.achievements.filter(a => a.unlocked).length,
      label: "Conquistas",
      color: "from-purple-500 to-purple-600",
      subtitle: `de ${userProgress.achievements.length}`
    },
    {
      value: userProgress.xp,
      label: "XP Total",
      color: "from-orange-500 to-orange-600",
      subtitle: `+${userProgress.xpToNextLevel - userProgress.xp} para próximo nível`
    }
  ];

  return (
    <div className="content-padding space-y-8">
      {/* Header with Avatar and Basic Info */}
      <ResponsiveCard variant="gradient" size="lg">
        <ResponsiveCardContent className="mobile-stack items-center text-center md:text-left">
          <div className="relative flex-shrink-0">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 border-4 border-white shadow-lg">
              <Typography variant="button" className="text-white font-bold">
                {userProgress.level}
              </Typography>
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              {getRankIcon(userProgress.level)}
              <Typography variant="h2" className="text-gray-900 dark:text-white">
                {userData.name}
              </Typography>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-200">
              {getRankTitle(userProgress.level)}
            </Badge>
            <Typography variant="p" color="muted" className="flex items-center gap-2 justify-center md:justify-start">
              <Calendar className="w-4 h-4" />
              Jornada iniciada em {new Date(userData.joinDate).toLocaleDateString('pt-BR')}
            </Typography>
          </div>
        </ResponsiveCardContent>
      </ResponsiveCard>

      {/* Stats Cards */}
      <div className="responsive-grid">
        {statsCards.map((stat, index) => (
          <ResponsiveCard key={index} variant="highlight" className={`bg-gradient-to-br ${stat.color} text-white border-0 shadow-2xl`}>
            <ResponsiveCardContent className="text-center">
              <Typography variant="h2" className="text-white mb-2">
                {stat.value}
              </Typography>
              <Typography variant="caption" className="text-white/90">
                {stat.label}
              </Typography>
              {stat.progress && (
                <Progress value={stat.progress} className="mt-3 bg-white/20" />
              )}
              {stat.subtitle && (
                <Typography variant="caption" className="text-white/70 mt-2 block">
                  {stat.subtitle}
                </Typography>
              )}
            </ResponsiveCardContent>
          </ResponsiveCard>
        ))}
      </div>

      <div className="space-y-8">
        {/* Badges Section */}
        <BadgesGrid achievements={userProgress.achievements} />

        {/* Profile Information and Progress Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <ResponsiveCard variant="feature">
            <ResponsiveCardHeader>
              <ResponsiveCardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="w-5 h-5 text-blue-600" />
                Informações do Perfil
              </ResponsiveCardTitle>
            </ResponsiveCardHeader>
            <ResponsiveCardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="border-blue-200 dark:border-gray-600 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="border-blue-200 dark:border-gray-600 focus:border-blue-500"
                    />
                  </div>
                  <div className="mobile-stack">
                    <Button onClick={handleSave} className="btn-primary flex-1">
                      Salvar
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="btn-secondary flex-1">
                      Cancelar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Nome</Label>
                    <Typography variant="p" className="font-medium text-gray-900 dark:text-white">
                      {userData.name}
                    </Typography>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Typography variant="p" className="font-medium text-gray-900 dark:text-white">
                      {userData.email}
                    </Typography>
                  </div>
                  <Button onClick={() => setIsEditing(true)} className="btn-primary w-full">
                    Editar Perfil
                  </Button>
                </>
              )}
            </ResponsiveCardContent>
          </ResponsiveCard>

          {/* Progress Details */}
          <ResponsiveCard variant="feature">
            <ResponsiveCardHeader>
              <ResponsiveCardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Zap className="w-5 h-5 text-blue-500" />
                Progresso Detalhado
              </ResponsiveCardTitle>
            </ResponsiveCardHeader>
            <ResponsiveCardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Typography variant="p" className="font-medium text-gray-900 dark:text-white">
                      Experiência para Próximo Nível
                    </Typography>
                    <Typography variant="caption" color="muted">
                      {userProgress.xp} / {userProgress.xpToNextLevel} XP
                    </Typography>
                  </div>
                  <Progress value={getProgressPercentage()} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { value: userProgress.totalQuestions, label: "Questões Respondidas", color: "blue" },
                    { value: userProgress.correctAnswers, label: "Acertos", color: "green" },
                    { value: userProgress.simuladosCompletos, label: "Simulados", color: "purple" }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 dark:from-${item.color}-900/20 dark:to-${item.color}-800/20 rounded-lg border border-${item.color}-200 dark:border-${item.color}-700`}>
                      <Typography variant="h3" className={`text-${item.color}-600 dark:text-${item.color}-400 mb-1`}>
                        {item.value}
                      </Typography>
                      <Typography variant="caption" color="muted">
                        {item.label}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </ResponsiveCardContent>
          </ResponsiveCard>
        </div>
      </div>
    </div>
  );
}
