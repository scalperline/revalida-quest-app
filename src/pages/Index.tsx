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
  const {
    user
  } = useAuth();
  const {
    userProgress
  } = useGamification();
  const handleQuickChallengeStart = () => {
    console.log("Quick challenge started");
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Enhanced Animated Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-2 sm:-left-4 w-6 h-6 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <Sparkles className="absolute top-10 left-10 sm:top-20 sm:left-20 w-4 h-4 sm:w-6 sm:h-6 text-blue-300 opacity-30 animate-pulse delay-500" />
        <Zap className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-3 h-3 sm:w-5 sm:h-5 text-purple-400 opacity-30 animate-bounce delay-700" />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Enhanced Hero Section - Fully Responsive */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative z-10 p-3 sm:p-4 lg:p-6 xl:p-8">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight px-2 sm:px-4">
                Bem-vindo ao{" "}
                <span className="gradient-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-pulse font-bold text-4xl">
                  RevalidaQuest
                </span>
                , {user?.user_metadata?.display_name || 'Doutor'}! 
                <span className="inline-block animate-bounce ml-1 sm:ml-2 text-lg">👋</span>
              </h1>
              
              <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-sm xs:max-w-md sm:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-6">
                Sua jornada de preparação para o Revalida começa aqui. 
                Pratique com questões oficiais, complete missões gamificadas e 
                acompanhe seu progresso em tempo real.
              </p>

              {/* Motivational Badge - Responsive */}
              <div className="mt-3 sm:mt-4 lg:mt-6 inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg animate-fade-in">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm lg:text-base font-semibold text-green-800 whitespace-nowrap">
                  Você está no nível {userProgress.level} com {userProgress.xp} XP!
                </span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 animate-pulse flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Enhanced Quick Stats - Mobile First Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 xs:p-3 sm:p-4 lg:p-6 shadow-lg sm:shadow-xl border-2 border-blue-100 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="p-1.5 xs:p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <BookOpen className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1 text-center xs:text-left">
                  <p className="text-sm xs:text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">1.500+</p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Questões Oficiais</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 xs:p-3 sm:p-4 lg:p-6 shadow-lg sm:shadow-xl border-2 border-green-100 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="p-1.5 xs:p-2 sm:p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <Target className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1 text-center xs:text-left">
                  <p className="text-sm xs:text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">10+</p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Missões Ativas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 xs:p-3 sm:p-4 lg:p-6 shadow-lg sm:shadow-xl border-2 border-purple-100 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="p-1.5 xs:p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <TrendingUp className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1 text-center xs:text-left">
                  <p className="text-sm xs:text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">15</p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Anos de Provas</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 xs:p-3 sm:p-4 lg:p-6 shadow-lg sm:shadow-xl border-2 border-orange-100 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="p-1.5 xs:p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg group-hover:animate-pulse flex-shrink-0">
                  <Stethoscope className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1 text-center xs:text-left">
                  <p className="text-sm xs:text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">11.2k+</p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Médicos Ativos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="animate-fade-in">
                <QuickChallenge onStart={handleQuickChallengeStart} />
              </div>
              <div className="animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                <AdaptiveSuggestions />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
                <UsageLimitsCard />
              </div>
              <div className="animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                <StreakDisplay />
              </div>
              <div className="animate-fade-in" style={{
              animationDelay: '0.4s'
            }}>
                <QuestsPanel />
              </div>
              <div className="animate-fade-in" style={{
              animationDelay: '0.5s'
            }}>
                <BadgesGrid achievements={userProgress.achievements} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default Index;