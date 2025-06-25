
import { 
  Stethoscope, 
  Trophy, 
  Star, 
  Zap, 
  Users,
  CheckCircle,
  Crown,
  Target,
  BadgeCheck,
  Award,
  TrendingUp
} from 'lucide-react';
import { OfficialBadgeCard } from './OfficialBadgeCard';

export function AuthHeroSection() {
  return (
    <div className="hidden lg:block space-y-8">
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-yellow-800" />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Revalida Quest
            </h1>
          </div>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          Prepare-se para o <span className="font-semibold text-blue-700">Revalida</span> com questões oficiais e uma experiência gamificada única! 
          Sua jornada médica começa aqui.
        </p>
      </div>

      {/* Modern Cards with Gamification Elements */}
      <div className="grid gap-6 mb-8">
        <OfficialBadgeCard
          icon={<BadgeCheck className="w-7 h-7 text-white" />}
          title="Questões Oficiais do Revalida"
          description="Banco completo com mais de 1.500 questões oficiais e organizadas por ano"
          badge={{ 
            icon: <><CheckCircle className="w-4 h-4 text-green-500 fill-current" /><Award className="w-4 h-4 text-blue-500" /></>, 
            text: "Verificado", 
            color: "text-green-600" 
          }}
          gradient="from-blue-600 to-blue-700"
        />

        <OfficialBadgeCard
          icon={<Trophy className="w-7 h-7 text-white" />}
          title="Sistema de Níveis e XP"
          description="Ganhe experiência a cada questão respondida e evolua com feedback imediato"
          badge={{ 
            icon: <><Star className="w-4 h-4 text-yellow-500 fill-current" /><Zap className="w-4 h-4 text-blue-500" /></>, 
            text: "Gamificado", 
            color: "text-yellow-600" 
          }}
          gradient="from-yellow-500 to-orange-500"
        />

        <OfficialBadgeCard
          icon={<Users className="w-7 h-7 text-white" />}
          title="Ranking Nacional"
          description="Compare seu desempenho com outros médicos em uma competição saudável"
          badge={{ 
            icon: <><Target className="w-4 h-4 text-blue-600" /><TrendingUp className="w-4 h-4 text-green-500" /></>, 
            text: "Competitivo", 
            color: "text-blue-600" 
          }}
          gradient="from-blue-600 to-cyan-500"
        />
      </div>

      {/* Enhanced Stats Preview - Centered and Modern */}
      <div className="relative mx-auto max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-900/95 rounded-3xl p-8 border-2 border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-full mb-4">
              <Crown className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Comunidade Elite</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Junte-se aos Melhores!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Milhares de médicos já confiam em nossa plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl"></div>
              <div className="relative p-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  12k+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Médicos Ativos
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl"></div>
              <div className="relative p-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">
                  500k+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Questões Resolvidas
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl"></div>
              <div className="relative p-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-1">
                  95%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Taxa de Aprovação
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                Resultados Comprovados
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
