import { useState } from 'react';
import { useRanking } from '@/hooks/useRanking';
import { Navbar } from '@/components/Navbar';
import { RankingPageHeader } from '@/components/RankingPageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Crown, Star, Medal, Target, Calendar } from 'lucide-react';

export default function Ranking() {
  const {
    allTimeRanking,
    weeklyRanking,
    currentUserPosition,
    loading
  } = useRanking();

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

  const RankingList = ({
    data,
    type
  }: {
    data: any[];
    type: 'allTime' | 'weekly';
  }) => {
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
              className={`transition-all duration-200 hover:shadow-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50 ${
                isCurrentUser
                  ? 'ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
                  : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Position */}
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(
                      user.position
                    )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {user.position <= 3 ? getRankIcon(user.position) : user.position}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12 border-2 border-blue-200 dark:border-blue-700">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
                      {user.display_name
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {user.display_name}
                      </h3>
                      {isCurrentUser && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                        >
                          Você
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {getLevelTitle(user.level)} • Nível {user.level}
                    </p>
                  </div>

                  {/* XP Display */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {type === 'allTime' ? user.total_xp : user.weekly_xp}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
              <p className="text-lg text-gray-700 dark:text-gray-300">Carregando ranking...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          
          <RankingPageHeader />

          {/* Header */}
          
          
            
              
              
            
            
              
            
          

          {/* Ranking Tabs */}
          <Tabs defaultValue="allTime" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50 dark:bg-gray-700">
              <TabsTrigger value="allTime" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-normal text-lg">
                <Trophy className="w-4 h-4" />
                Ranking Geral
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-normal text-lg">
                <Calendar className="w-4 h-4" />
                Ranking Semanal
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="allTime" className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Top Estudantes - XP Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {allTimeRanking.length > 0 ? (
                    <RankingList data={allTimeRanking} type="allTime" />
                  ) : (
                    <div className="text-center py-12">
                      <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                        Nenhum estudante no ranking ainda
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Seja o primeiro a aparecer no ranking!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
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
                        Nenhum estudante no ranking semanal ainda
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
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
