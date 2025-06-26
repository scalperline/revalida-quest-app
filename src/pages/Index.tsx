
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { QuickChallenge } from "@/components/QuickChallenge";
import { QuestsPanel } from "@/components/QuestsPanel";
import { MedicalCardsPanel } from "@/components/MedicalCardsPanel";
import { AdaptiveSuggestions } from "@/components/AdaptiveSuggestions";
import { PerformanceChart } from "@/components/PerformanceChart";
import { StreakDisplay } from "@/components/StreakDisplay";
import { BadgesGrid } from "@/components/BadgesGrid";
import { UsageLimitsCard } from "@/components/UsageLimitsCard";
import { Stethoscope, BookOpen, Target, TrendingUp } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 medical-gradient rounded-2xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
              Bem-vindo ao <span className="gradient-text">Revalida Quest</span>, {user?.user_metadata?.display_name || 'Doutor'}! 👋
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
              Sua jornada de preparação para o Revalida começa aqui. 
              Pratique com questões oficiais, complete missões gamificadas e 
              acompanhe seu progresso em tempo real.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">1.500+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Questões Oficiais</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Missões Ativas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">15</p>
                  <p className="text-xs sm:text-sm text-gray-600">Anos de Provas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">12k+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Médicos Ativos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <QuickChallenge />
              <AdaptiveSuggestions />
              <PerformanceChart />
            </div>

            {/* Right Column */}
            <div className="space-y-6 sm:space-y-8">
              <UsageLimitsCard />
              <StreakDisplay />
              <QuestsPanel />
              <BadgesGrid />
            </div>
          </div>

          {/* Medical Cards Panel */}
          <div className="mt-8 sm:mt-12">
            <MedicalCardsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
