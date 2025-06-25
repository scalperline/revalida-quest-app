
import { BadgeCheck, Trophy, Users, Star, CheckCircle, Award, Target, TrendingUp, Crown } from 'lucide-react';

export function MobileOfficialCards() {
  return (
    <div className="lg:hidden mt-6 sm:mt-8 space-y-4 sm:space-y-6 px-2">
      {/* Official Questions Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-700/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border-2 border-blue-200/30 shadow-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <BadgeCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-blue-100 font-space-grotesk">Questões Oficiais</h3>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 fill-current" />
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-green-300">Verificado</span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-blue-100/90 mb-4 font-space-grotesk leading-relaxed">
            Banco completo com mais de 1.500 questões oficiais e organizadas por ano
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="bg-blue-50/20 rounded-xl p-2 sm:p-3">
              <div className="text-base sm:text-lg font-bold text-blue-200">1.500+</div>
              <div className="text-xs sm:text-sm text-blue-200/80">Questões</div>
            </div>
            <div className="bg-blue-50/20 rounded-xl p-2 sm:p-3">
              <div className="text-base sm:text-lg font-bold text-blue-200">15</div>
              <div className="text-xs sm:text-sm text-blue-200/80">Anos</div>
            </div>
            <div className="bg-green-50/20 rounded-xl p-2 sm:p-3">
              <div className="text-base sm:text-lg font-bold text-green-300">100%</div>
              <div className="text-xs sm:text-sm text-blue-200/80">Oficial</div>
            </div>
          </div>
        </div>
      </div>

      {/* XP System Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border-2 border-yellow-200/30 shadow-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-blue-100 font-space-grotesk">Sistema de XP</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm font-semibold text-yellow-300">Gamificado</span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-blue-100/90 font-space-grotesk leading-relaxed">
            Ganhe experiência a cada questão respondida e evolua com feedback imediato
          </p>
        </div>
      </div>

      {/* Ranking Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border-2 border-cyan-200/30 shadow-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-blue-100 font-space-grotesk">Ranking Nacional</h3>
              <div className="flex items-center gap-2 mt-1">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span className="text-xs sm:text-sm font-semibold text-blue-300">Competitivo</span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-blue-100/90 font-space-grotesk leading-relaxed">
            Compare seu desempenho com outros médicos em uma competição saudável
          </p>
        </div>
      </div>

      {/* Enhanced Mobile Stats */}
      <div className="relative mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-800/30 rounded-3xl blur-xl"></div>
        <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border-2 border-blue-200/30 shadow-2xl">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full mb-3">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
              <span className="text-xs sm:text-sm font-semibold text-blue-200">Comunidade Elite</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent font-space-grotesk">
              Junte-se aos Melhores!
            </h3>
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl"></div>
              <div className="relative p-2 sm:p-3">
                <div className="text-lg sm:text-xl font-bold text-blue-200">12k+</div>
                <div className="text-xs sm:text-sm text-blue-200/80">Médicos</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-xl"></div>
              <div className="relative p-2 sm:p-3">
                <div className="text-lg sm:text-xl font-bold text-green-300">500k+</div>
                <div className="text-xs sm:text-sm text-blue-200/80">Questões</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-xl"></div>
              <div className="relative p-2 sm:p-3">
                <div className="text-lg sm:text-xl font-bold text-yellow-300">95%</div>
                <div className="text-xs sm:text-sm text-blue-200/80">Aprovação</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-green-200">
                Resultados Comprovados
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
