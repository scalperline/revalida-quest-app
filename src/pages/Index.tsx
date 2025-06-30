
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { QuickChallenge } from "@/components/QuickChallenge";
import { QuestsPanel } from "@/components/QuestsPanel";
import { AdaptiveSuggestions } from "@/components/AdaptiveSuggestions";
import { StreakDisplay } from "@/components/StreakDisplay";
import { BadgesGrid } from "@/components/BadgesGrid";
import { UsageLimitsCard } from "@/components/UsageLimitsCard";
import { useGamification } from "@/hooks/useGamification";
import { BookOpen, Target, TrendingUp, Stethoscope, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { userProgress } = useGamification();

  const handleQuickChallengeStart = () => {
    console.log("Quick challenge started");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <Sparkles className="absolute top-20 left-20 w-4 h-4 sm:w-6 sm:h-6 text-blue-300 opacity-30 animate-pulse delay-500" />
        <Zap className="absolute bottom-20 right-20 w-3 h-3 sm:w-5 sm:h-5 text-purple-400 opacity-30 animate-bounce delay-700" />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 lg:pb-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          {/* Enhanced Hero Section - Mobile Otimizado */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent rounded-2xl sm:rounded-3xl blur-3xl"></div>
            <div className="relative z-10 p-2 sm:p-4 lg:p-6">
              <h1 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight px-1 sm:px-2">
                Bem-vindo ao{" "}
                <span className="gradient-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-pulse font-bold">
                  RevalidaQuest
                </span>
                , {user?.user_metadata?.display_name || 'Doutor'}! 
                <span className="inline-block animate-bounce ml-1">👋</span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-1 sm:px-2 lg:px-4">
                Sua jornada de preparação para o Revalida começa aqui. 
                Pratique com questões oficiais, complete missões gamificadas e 
                acompanhe seu progresso em tempo real.
              </p>

              {/* Motivational Badge - Mobile Otimizado */}
              <div className="mt-3 sm:mt-4 lg:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg animate-fade-in">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm lg:text-base font-semibold text-green-800">
                  Nível {userProgress.level} • {userProgress.xp} XP
                </span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 animate-pulse flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Enhanced Quick Stats - Mobile Grid Otimizado */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-xl border-2 border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight">1.500+</p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">Questões</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-xl border-2 border-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight">10+</p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">Missões</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-xl border-2 border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight">15</p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">Anos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-xl border-2 border-orange-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight">11.2k+</p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">Médicos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content Grid - Mobile Layout Otimizado */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="animate-fade-in">
                <QuickChallenge onStart={handleQuickChallengeStart} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <AdaptiveSuggestions />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <UsageLimitsCard />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <StreakDisplay />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <QuestsPanel />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <BadgesGrid achievements={userProgress.achievements} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
