
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { QuickChallenge } from "@/components/QuickChallenge";
import { QuestsPanel } from "@/components/QuestsPanel";
import { MedicalCardsPanel } from "@/components/MedicalCardsPanel";
import { AdaptiveSuggestions } from "@/components/AdaptiveSuggestions";
import PerformanceChart from "@/components/PerformanceChart";
import { StreakDisplay } from "@/components/StreakDisplay";
import { BadgesGrid } from "@/components/BadgesGrid";
import { UsageLimitsCard } from "@/components/UsageLimitsCard";
import { useGamification } from "@/hooks/useGamification";
import { BookOpen, Target, TrendingUp, Stethoscope } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { userProgress } = useGamification();

  const handleQuickChallengeStart = () => {
    console.log("Quick challenge started");
    // Aqui você pode adicionar a lógica para iniciar o desafio
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Logo removida */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight px-2 sm:px-4">
              Bem-vindo ao <span className="gradient-text">Revalida Quest</span>, {user?.user_metadata?.display_name || 'Doutor'}! 👋
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-6">
              Sua jornada de preparação para o Revalida começa aqui. 
              Pratique com questões oficiais, complete missões gamificadas e 
              acompanhe seu progresso em tempo real.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <BookOpen className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 leading-tight">1.500+</p>
                  <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Questões Oficiais</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Target className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 leading-tight">50+</p>
                  <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Missões Ativas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <TrendingUp className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 leading-tight">15</p>
                  <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Anos de Provas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Stethoscope className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-orange-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 leading-tight">12k+</p>
                  <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Médicos Ativos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              <QuickChallenge onStart={handleQuickChallengeStart} />
              <AdaptiveSuggestions />
              <PerformanceChart dados={[]} showDemo={true} />
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <UsageLimitsCard />
              <StreakDisplay />
              <QuestsPanel />
              <BadgesGrid achievements={userProgress.achievements} />
            </div>
          </div>

          {/* Medical Cards Panel */}
          <div className="mt-6 sm:mt-8 lg:mt-12">
            <MedicalCardsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
