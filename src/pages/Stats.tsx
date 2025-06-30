
import { Navbar } from "@/components/Navbar";
import { StatsPageHeader } from "@/components/StatsPageHeader";
import { StatsCards } from "@/components/StatsCards";
import { StatsChart } from "@/components/StatsChart";
import { StatsControls } from "@/components/StatsControls";
import { DetailedAreaStats } from "@/components/DetailedAreaStats";
import { AchievementsSection } from "@/components/AchievementsSection";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";

export default function Stats() {
  const { userProgress, resetStats } = useGamification();
  const { toast } = useToast();
  
  const allAreasStats = Object.entries(userProgress.areaStats);
  const hasAnyData = allAreasStats.length > 0;

  const handleReset = () => {
    resetStats();
    toast({
      title: "Estatísticas Reiniciadas",
      description: "Suas estatísticas de desempenho foram resetadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <StatsPageHeader />
          
          <StatsControls onReset={handleReset} hasAnyData={hasAnyData} />
          
          <StatsCards />
          
          <StatsChart />
          
          <DetailedAreaStats />
          
          <AchievementsSection />
        </div>
      </div>
    </div>
  );
}
