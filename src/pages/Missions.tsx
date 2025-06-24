
import { useState } from 'react';
import { useMissions } from '@/hooks/useMissions';
import { useOnboarding } from '@/hooks/useOnboarding';
import { MissionCard } from '@/components/MissionCard';
import { MissionCompletedNotification } from '@/components/MissionCompletedNotification';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trophy, Target, CheckCircle, Flag, Star } from 'lucide-react';
import { Mission } from '@/types/missions';
import { useNavigate } from 'react-router-dom';

export default function Missions() {
  const { missions, getMissionProgress, getAvailableMissions, getCompletedMissions } = useMissions();
  const { onboardingQuest, completeOnboardingQuest } = useOnboarding();
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

  const handleStartOnboardingQuest = () => {
    if (!onboardingQuest) return;
    
    // Navegar para o simulado com a configuração da quest de onboarding
    const params = new URLSearchParams({
      areas: onboardingQuest.areas.join(','),
      quantidade: onboardingQuest.target.toString(),
      mission: 'onboarding-quest'
    });
    
    navigate(`/simulado?${params.toString()}`);
  };

  const handleCompleteOnboardingQuest = () => {
    completeOnboardingQuest();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
                    <span className="text-2xl font-bold text-blue-600">
                      {availableMissions.length + (onboardingQuest ? 1 : 0)}
                    </span>
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

          {/* Onboarding Quest (se existir) */}
          {onboardingQuest && (
            <div className="mb-8">
              <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-600" />
                    <CardTitle className="text-xl text-yellow-800 dark:text-yellow-200">
                      Quest Especial de Boas-vindas
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-yellow-900 dark:text-yellow-100 mb-2">
                      {onboardingQuest.title}
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                      {onboardingQuest.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {onboardingQuest.areas.map(area => (
                      <span key={area} className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-yellow-700 dark:text-yellow-300">
                        Recompensa: +{onboardingQuest.reward.xp} XP
                      </span>
                      {onboardingQuest.reward.badge && (
                        <span className="text-sm text-yellow-700 dark:text-yellow-300">
                          Emblema: {onboardingQuest.reward.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleCompleteOnboardingQuest}
                        variant="outline"
                        size="sm"
                        className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
                      >
                        Pular
                      </Button>
                      <Button 
                        onClick={handleStartOnboardingQuest}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                      >
                        Começar Quest 🚀
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
