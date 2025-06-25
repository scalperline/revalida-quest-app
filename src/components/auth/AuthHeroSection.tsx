
import { 
  CheckCircle,
  Trophy,
  Users,
  Target,
  Stethoscope,
  Star,
  Award,
  Shield,
  TrendingUp,
  Zap
} from 'lucide-react';

export function AuthHeroSection() {
  return (
    <div className="hidden lg:block space-y-8 pr-8">
      {/* Logo e Cabeçalho */}
      <div className="text-left stagger-animation">
        <div className="flex items-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 medical-gradient rounded-2xl flex items-center justify-center shadow-2xl">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-4xl font-bold text-white">
              Revalida Quest
            </h1>
          </div>
        </div>
        
        <p className="text-xl text-blue-50 leading-relaxed mb-8">
          Prepare-se para o <span className="font-semibold text-white">Revalida INEP</span> com questões e gabaritos oficiais em uma experiência única. 
          Sua jornada médica começa aqui.
        </p>
      </div>

      {/* Cards de Features Gamificados */}
      <div className="space-y-6">
        {/* Card 1: Questões Oficiais - Enhanced */}
        <div className="gamified-feature-card stagger-animation-delay-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative flex items-start gap-5 p-6 bg-white/95 dark:bg-gray-800/95 rounded-3xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] border-2 border-green-200/50 dark:border-green-800/50 shadow-xl group-hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl">Questões Oficiais do Revalida</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-700 dark:text-green-300">Verificado</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                Banco completo com mais de 1.500 questões oficiais e organizadas por ano
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Conteúdo Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Sistema de XP - Enhanced */}
        <div className="gamified-feature-card stagger-animation-delay-2 group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative flex items-start gap-5 p-6 bg-white/95 dark:bg-gray-800/95 rounded-3xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] border-2 border-yellow-200/50 dark:border-yellow-800/50 shadow-xl group-hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl">Sistema de Níveis e XP</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">Gamificado</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                Ganhe experiência a cada questão respondida e evolua com feedback imediato
              </p>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-500 fill-current" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Sistema Avançado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Ranking Nacional - Enhanced */}
        <div className="gamified-feature-card stagger-animation-delay-3 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative flex items-start gap-5 p-6 bg-white/95 dark:bg-gray-800/95 rounded-3xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl group-hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl">Ranking Nacional</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full">
                  <Target className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700 dark:text-cyan-300">Competitivo</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                Compare seu desempenho com outros médicos em uma competição saudável
              </p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500 fill-current" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Rankings em Tempo Real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
