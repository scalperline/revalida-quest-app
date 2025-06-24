
import { useState } from 'react';
import { useMissions } from '@/hooks/useMissions';
import { MissionCard } from '@/components/MissionCard';
import { MissionCompletedNotification } from '@/components/MissionCompletedNotification';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, CheckCircle, Flag } from 'lucide-react';
import { Mission } from '@/types/missions';
import { useNavigate } from 'react-router-dom';

export default function Missions() {
  const { missions, getMissionProgress, getAvailableMissions, getCompletedMissions } = useMissions();
  const [completedMission, setCompletedMission] = useState<Mission | null>(null);
  const navigate = useNavigate();

  const availableMissions = getAvailableMissions();
  const completedMissions = getCompletedMissions();
  const totalXP = completedMissions.reduce((sum, mission) => sum + mission.reward.xp, 0);

  const handleStartMission = (mission: Mission) => {
    // Navegar para o simulado com a configuração da missão
    const missionConfig = {
      quantidade: mission.targetQuestions,
      areas: mission.area === 'Mista' ? [] : [mission.area],
      tempoMinutos: mission.timeLimit || 120,
      missionId: mission.id
    };

    // Salvar configuração da missão no localStorage para o simulado usar
    localStorage.setItem('mission-config', JSON.stringify(missionConfig));
    
    // Navegar para o simulado
    navigate('/simulado?mission=' + mission.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              🚩 Quests do Revalida
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Complete quests especializadas, ganhe XP e desbloqueie conquistas!
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Quests Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">{availableMissions.length}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Concluídas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{completedMissions.length}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">XP Total das Quests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-600">{totalXP}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Missions Tabs */}
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="available" className="flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Quests Ativas ({availableMissions.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Concluídas ({completedMissions.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-6">
              {availableMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableMissions.map(mission => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      progress={getMissionProgress(mission.id)}
                      onStartMission={handleStartMission}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Todas as quests concluídas!</h3>
                  <p className="text-muted-foreground">
                    Parabéns! Você completou todas as quests disponíveis.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-6">
              {completedMissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedMissions.map(mission => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      progress={getMissionProgress(mission.id)}
                      onStartMission={handleStartMission}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Nenhuma quest concluída ainda</h3>
                  <p className="text-muted-foreground">
                    Complete sua primeira quest para ver o progresso aqui!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <MissionCompletedNotification
        mission={completedMission}
        onClose={() => setCompletedMission(null)}
      />
    </div>
  );
}
