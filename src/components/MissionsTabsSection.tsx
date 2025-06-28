import { Mission } from '@/types/missions';
import { useMissions } from '@/hooks/useMissions';
import { SimuladoFilters } from '@/components/SimuladoFilters';
import { MissionCard } from '@/components/MissionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flag, Settings, Trophy, Sparkles } from 'lucide-react';
import { SimuladoConfig } from '@/hooks/useSimulado';
interface MissionsTabsSectionProps {
  onStartMission: (mission: Mission) => void;
  onStartPersonalizedSimulado: (config: SimuladoConfig) => void;
  filters?: any;
}
export function MissionsTabsSection({
  onStartMission,
  onStartPersonalizedSimulado,
  filters = {}
}: MissionsTabsSectionProps) {
  const {
    getMissionProgress,
    getAvailableMissions,
    getCompletedMissions,
    getAvailableQuestionsCount
  } = useMissions();
  const availableMissions = getAvailableMissions();
  const completedMissions = getCompletedMissions();

  // Apply filters to missions
  const filterMissions = (missions: Mission[]) => {
    let filtered = [...missions];
    if (filters.searchTerm) {
      filtered = filtered.filter(mission => mission.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) || mission.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) || mission.area.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    }
    if (filters.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter(mission => mission.difficulty === filters.difficulty);
    }
    if (filters.area && filters.area !== 'all') {
      filtered = filtered.filter(mission => mission.area === filters.area);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'xp':
          filtered.sort((a, b) => b.reward.xp - a.reward.xp);
          break;
        case 'difficulty':
          const difficultyOrder = {
            easy: 1,
            medium: 2,
            hard: 3
          };
          filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
          break;
        case 'progress':
          filtered.sort((a, b) => b.progress - a.progress);
          break;
        case 'trending':
          // For now, just randomize for "trending" effect
          filtered.sort(() => Math.random() - 0.5);
          break;
      }
    }
    return filtered;
  };
  const filteredAvailableMissions = filterMissions(availableMissions);
  const filteredCompletedMissions = filterMissions(completedMissions);
  return <div className="border-2 border-blue-200 rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-6 backdrop-blur-sm">
      <Tabs defaultValue="prontas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-blue-900/20 border-2 border-blue-200 p-1 rounded-xl shadow-inner">
          <TabsTrigger value="prontas" className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base font-medium py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 group">
            <Flag className="w-4 h-4 sm:w-5 sm:h-5 group-data-[state=active]:animate-pulse" />
            <span className="text-xs sm:text-base font-semibold">Missões Especializadas</span>
            <span className="text-xs opacity-75 bg-blue-100 group-data-[state=active]:bg-white/20 text-blue-800 group-data-[state=active]:text-white px-2 py-0.5 rounded-full">
              {filteredAvailableMissions.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="personalizada" className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base font-medium py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 group">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 group-data-[state=active]:animate-spin" />
            <span className="text-xs sm:text-base font-semibold">Simulado Personalizado</span>
            <Sparkles className="w-3 h-3 text-purple-500 group-data-[state=active]:text-white" />
          </TabsTrigger>
          <TabsTrigger value="concluidas" className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base font-medium py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 group">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 group-data-[state=active]:animate-bounce" />
            <span className="text-xs sm:text-base font-semibold">Concluídas</span>
            <span className="text-xs opacity-75 bg-green-100 group-data-[state=active]:bg-white/20 text-green-800 group-data-[state=active]:text-white px-2 py-0.5 rounded-full">
              {filteredCompletedMissions.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prontas" className="space-y-6">
          {filteredAvailableMissions.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAvailableMissions.map((mission, index) => <div key={mission.id} className="animate-fade-in hover-scale" style={{
            animationDelay: `${index * 100}ms`
          }}>
                  <MissionCard mission={mission} progress={getMissionProgress(mission.id)} onStartMission={onStartMission} availableQuestions={getAvailableQuestionsCount(mission)} />
                </div>)}
            </div> : <div className="text-center py-12">
              <div className="p-6 rounded-full bg-yellow-100 w-24 h-24 mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Trophy className="w-12 h-12 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {filters.searchTerm || filters.difficulty !== 'all' || filters.area !== 'all' ? 'Nenhuma quest encontrada!' : 'Todas as quests concluídas!'}
              </h3>
              <p className="text-muted-foreground">
                {filters.searchTerm || filters.difficulty !== 'all' || filters.area !== 'all' ? 'Tente ajustar os filtros para encontrar quests disponíveis.' : 'Parabéns! Você completou todas as quests disponíveis.'}
              </p>
            </div>}
        </TabsContent>
        
        <TabsContent value="personalizada" className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
            <SimuladoFilters onStart={onStartPersonalizedSimulado} />
          </div>
        </TabsContent>
        
        <TabsContent value="concluidas" className="space-y-6">
          {filteredCompletedMissions.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompletedMissions.map((mission, index) => <div key={mission.id} className="animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                  <MissionCard mission={mission} progress={getMissionProgress(mission.id)} onStartMission={onStartMission} availableQuestions={getAvailableQuestionsCount(mission)} />
                </div>)}
            </div> : <div className="text-center py-12">
              <div className="p-6 rounded-full bg-blue-100 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Flag className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nenhuma quest concluída ainda</h3>
              <p className="text-muted-foreground">
                Complete sua primeira quest para ver o progresso aqui!
              </p>
            </div>}
        </TabsContent>
      </Tabs>
    </div>;
}