
import { useState } from 'react';
import { useRanking } from '@/hooks/useRanking';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Crown, Star, Medal, Target, Calendar } from 'lucide-react';

export default function Ranking() {
  const { allTimeRanking, weeklyRanking, currentUserPosition, loading } = useRanking();

  const getRankIcon = (position: number) => {
    if (position === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (position === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (position === 3) return <Star className="w-6 h-6 text-amber-600" />;
    return <Target className="w-5 h-5 text-blue-500" />;
  };

  const getRankColor = (position: number) => {
    if (position === 1) return 'from-yellow-400 to-yellow-600';
    if (position === 2) return 'from-gray-300 to-gray-500';
    if (position === 3) return 'from-amber-400 to-amber-600';
    return 'from-blue-400 to-blue-600';
  };

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Mestre Cirurgião';
    if (level >= 15) return 'Especialista';
    if (level >= 10) return 'Residente Sênior';
    if (level >= 5) return 'Interno Avançado';
    return 'Estudante';
  };

  const RankingList = ({ data, type }: { data: any[], type: 'allTime' | 'weekly' }) => {
    const currentUser = data.find(user => {
      // This would need to be matched with actual user ID
      return false; // Simplified for now
    });

    return (
      <div className="space-y-3">
        {data.map((user, index) => {
          const isCurrentUser = false; // Simplified for now
          
          return (
            <Card 
              key={user.id} 
              className={`transition-all duration-200 hover:shadow-md ${
                isCurrentUser 
                  ? 'ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                  : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Position */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(user.position)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {user.position <= 3 ? getRankIcon(user.position) : user.position}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12 border-2 border-gray-200">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                      {user.display_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {user.display_name}
                      </h3>
                      {isCurrentUser && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Você
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getLevelTitle(user.level)} • Nível {user.level}
                    </p>
                  </div>

                  {/* XP Display */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {type === 'allTime' ? user.total_xp : user.weekly_xp}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      XP {type === 'allTime' ? 'Total' : 'Semanal'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
              <p className="text-lg text-muted-foreground">Carregando ranking...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              🏆 Ranking Revalida Quest
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Veja como você está se saindo em comparação com outros aventureiros!
            </p>
            
            {/* Current User Position Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Sua Posição Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {currentUserPosition.allTime || 'N/A'}º
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Posição Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {currentUserPosition.weekly || 'N/A'}º
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Ranking Tabs */}
          <Tabs defaultValue="allTime" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="allTime" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Ranking Geral
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Ranking Semanal
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="allTime" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Top Aventureiros - XP Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {allTimeRanking.length > 0 ? (
                    <RankingList data={allTimeRanking} type="allTime" />
                  ) : (
                    <div className="text-center py-12">
                      <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                        Nenhum aventureiro no ranking ainda
                      </h3>
                      <p className="text-muted-foreground">
                        Seja o primeiro a aparecer no ranking!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-green-500" />
                    Top da Semana - XP Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weeklyRanking.length > 0 ? (
                    <RankingList data={weeklyRanking} type="weekly" />
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                        Nenhum aventureiro no ranking semanal ainda
                      </h3>
                      <p className="text-muted-foreground">
                        Comece a estudar para aparecer no ranking desta semana!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
