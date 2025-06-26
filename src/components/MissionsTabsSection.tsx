
import { Mission } from '@/types/missions';
import { useMissions } from '@/hooks/useMissions';
import { SimuladoFilters } from '@/components/SimuladoFilters';
import { MissionCard } from '@/components/MissionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flag, Settings, Trophy } from 'lucide-react';
import { SimuladoConfig } from '@/hooks/useSimulado';

interface MissionsTabsSectionProps {
  onStartMission: (mission: Mission) => void;
  onStartPersonalizedSimulado: (config: SimuladoConfig) => void;
}

export function MissionsTabsSection({ onStartMission, onStartPersonalizedSimulado }: MissionsTabsSectionProps) {
  const { getMissionProgress, getAvailableMissions, getCompletedMissions, getAvailableQuestionsCount } = useMissions();

  const availableMissions = getAvailableMissions();
  const completedMissions = getCompletedMissions();

  return (
    <div className="border-2 border-blue-200 rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-6">
      <Tabs defaultValue="prontas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-auto bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 p-1 rounded-xl">
          <TabsTrigger 
            value="prontas" 
            className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base font-medium py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-base">Quests Prontas</span>
            <span className="text-xs opacity-75">({availableMissions.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="personalizada" 
            className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base font-medium py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-base">Simulado Personalizado</span>
          </TabsTrigger>
          <TabsTrigger 
            value="concluidas" 
            className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base font-medium py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-base">Concluídas</span>
            <span className="text-xs opacity-75">({completedMissions.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prontas" className="space-y-6">
          {availableMissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableMissions.map(mission => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  progress={getMissionProgress(mission.id)}
                  onStartMission={onStartMission}
                  availableQuestions={getAvailableQuestionsCount(mission)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-6 rounded-full bg-yellow-100 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Todas as quests concluídas!</h3>
              <p className="text-muted-foreground">
                Parabéns! Você completou todas as quests disponíveis.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="personalizada" className="space-y-6">
          <SimuladoFilters onStart={onStartPersonalizedSimulado} />
        </TabsContent>
        
        <TabsContent value="concluidas" className="space-y-6">
          {completedMissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedMissions.map(mission => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  progress={getMissionProgress(mission.id)}
                  onStartMission={onStartMission}
                  availableQuestions={getAvailableQuestionsCount(mission)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-6 rounded-full bg-blue-100 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Flag className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nenhuma quest concluída ainda</h3>
              <p className="text-muted-foreground">
                Complete sua primeira quest para ver o progresso aqui!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
