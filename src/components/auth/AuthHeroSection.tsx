
import { 
  Stethoscope, 
  Trophy, 
  Star, 
  Zap, 
  Shield, 
  Target,
  Award,
  Crown,
  Users,
  CheckCircle,
  FileText,
  GraduationCap,
  BadgeCheck
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

      {/* Official Authority Cards */}
      <div className="grid gap-4 mb-8">
        <OfficialBadgeCard
          icon={<BadgeCheck className="w-6 h-6 text-white" />}
          title="Questões Oficiais do Revalida"
          description="Banco completo com todas as provas aplicadas pelo INEP"
          badge={{ icon: <CheckCircle className="w-4 h-4 text-green-500 fill-current" />, text: "Verificado", color: "text-green-600" }}
          gradient="from-blue-600 to-blue-700"
        />

        <OfficialBadgeCard
          icon={<FileText className="w-6 h-6 text-white" />}
          title="Provas de 2011 a 2025"
          description="Mais de 1.500 questões oficiais organizadas por ano"
          badge={{ icon: <Trophy className="w-4 h-4 text-blue-600" />, text: "Completo", color: "text-blue-600" }}
          gradient="from-blue-700 to-blue-800"
        />

        <OfficialBadgeCard
          icon={<GraduationCap className="w-6 h-6 text-white" />}
          title="Aprovado pelo MEC"
          description="Conteúdo alinhado com as diretrizes oficiais do exame"
          badge={{ icon: <><Shield className="w-4 h-4 text-blue-600" /><Award className="w-4 h-4 text-green-500" /></>, text: "", color: "" }}
          gradient="from-blue-800 to-blue-900"
        />
      </div>

      {/* Gamification Features */}
      <div className="grid gap-4">
        <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-2xl backdrop-blur-sm hover:from-blue-600/20 hover:to-blue-800/20 transition-all duration-300 hover:scale-102 border border-blue-300 dark:border-blue-700">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Sistema de Níveis e XP</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ganhe experiência a cada questão respondida</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>

        <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-2xl backdrop-blur-sm hover:from-blue-600/20 hover:to-blue-800/20 transition-all duration-300 hover:scale-102 border border-blue-300 dark:border-blue-700">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Ranking Nacional</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Compare seu desempenho com outros médicos</p>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-blue-500" />
            <Target className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="bg-gradient-to-r from-blue-600/15 to-blue-800/15 rounded-2xl p-6 border border-blue-300 dark:border-blue-700">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Junte-se a milhares de médicos!</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-700">12k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-800">500k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Questões Respondidas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Aprovação</div>
          </div>
        </div>
      </div>
    </div>
  );
}
