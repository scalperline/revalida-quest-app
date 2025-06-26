
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
import { Mission } from '@/types/missions';
import { SimuladoConfig } from '@/hooks/useSimulado';

export default function Missions() {
  const { getAvailableQuestionsCount } = useMissions();
  const [completedMission, setCompletedMission] = useState<Mission | null>(null);
  const [executingMission, setExecutingMission] = useState<Mission | null>(null);
  const [showPersonalizedSimulado, setShowPersonalizedSimulado] = useState(false);

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

  // Se estiver executando uma quest pronta
  if (executingMission) {
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
          <div className="max-w-6xl mx-auto">
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
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          
          <MissionsHeader />

          {showPersonalizedSimulado ? (
            <PersonalizedSimuladoSection onBackToTabs={handleBackToTabs} />
          ) : (
            <MissionsTabsSection 
              onStartMission={handleStartMission}
              onStartPersonalizedSimulado={handleStartPersonalizedSimulado}
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
