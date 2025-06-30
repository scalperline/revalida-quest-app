
import { useState } from 'react';
import { useMissions } from '@/hooks/useMissions';
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { MissionExecution } from '@/components/MissionExecution';
import { MissionCompletedNotification } from '@/components/MissionCompletedNotification';
import { AchievementNotification } from "@/components/AchievementNotification";
import { Navbar } from '@/components/Navbar';
import { PersonalizedSimuladoSection } from '@/components/PersonalizedSimuladoSection';
import { MissionsTabsSection } from '@/components/MissionsTabsSection';
import { MissionsHeader } from '@/components/MissionsHeader';
import { GamifiedMissionsDashboard } from '@/components/GamifiedMissionsDashboard';
import { RecentAchievements } from '@/components/RecentAchievements';
import { MissionFilters } from '@/components/MissionFilters';
import { Mission } from '@/types/missions';
import { SimuladoConfig } from '@/hooks/useSimulado';

export default function Missions() {
  const { getAvailableQuestionsCount } = useMissions();
  const [completedMission, setCompletedMission] = useState<Mission | null>(null);
  const [executingMission, setExecutingMission] = useState<Mission | null>(null);
  const [showPersonalizedSimulado, setShowPersonalizedSimulado] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const { 
    getNewlyUnlockedAchievement, 
    clearNewlyUnlockedAchievement 
  } = useGamification();
  const { playSound } = useAudio();

  // Check for newly unlocked achievements
  const newlyUnlockedAchievement = getNewlyUnlockedAchievement();

  const handleStartMission = (mission: Mission) => {
    // Verificar se há questões suficientes da área específica
    const questoesDisponiveis = getAvailableQuestionsCount(mission);

    if (questoesDisponiveis < mission.targetQuestions) {
      alert(`Esta quest requer ${mission.targetQuestions} questões de ${mission.area}, mas só há ${questoesDisponiveis} questões disponíveis no banco completo do Revalida.`);
      return;
    }

    setExecutingMission(mission);
  };

  const handleMissionComplete = (mission: Mission) => {
    setCompletedMission(mission);
    setExecutingMission(null);
  };

  const handleBackFromMission = () => {
    setExecutingMission(null);
  };

  const handleStartPersonalizedSimulado = (config: SimuladoConfig) => {
    setShowPersonalizedSimulado(true);
  };

  const handleBackToTabs = () => {
    setShowPersonalizedSimulado(false);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Se estiver executando uma quest pronta
  if (executingMission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        <Navbar />
        
        <div className="relative z-10 container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
          <div className="max-w-4xl sm:max-w-6xl mx-auto">
            <MissionExecution
              mission={executingMission}
              onBack={handleBackFromMission}
              onComplete={handleMissionComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="max-w-4xl sm:max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          <MissionsHeader />

          {/* Gamified Dashboard */}
          <div className="px-2 sm:px-0">
            <GamifiedMissionsDashboard />
          </div>

          {/* Recent Achievements */}
          <div className="px-2 sm:px-0">
            <RecentAchievements />
          </div>

          {/* Mission Filters */}
          <div className="px-2 sm:px-0">
            <MissionFilters onFilterChange={handleFilterChange} />
          </div>

          {showPersonalizedSimulado ? (
            <div className="px-2 sm:px-0">
              <PersonalizedSimuladoSection onBackToTabs={handleBackToTabs} />
            </div>
          ) : (
            <MissionsTabsSection 
              onStartMission={handleStartMission}
              onStartPersonalizedSimulado={handleStartPersonalizedSimulado}
              filters={filters}
            />
          )}
        </div>
      </div>
      
      <MissionCompletedNotification
        mission={completedMission}
        onClose={() => setCompletedMission(null)}
      />
      
      <AchievementNotification
        achievement={newlyUnlockedAchievement}
        onClose={clearNewlyUnlockedAchievement}
      />
    </div>
  );
}
