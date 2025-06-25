
import { 
  CheckCircle,
  Trophy,
  Users,
  Target,
  Stethoscope
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

      {/* Cards de Features */}
      <div className="space-y-6">
        {/* Card 1: Questões Oficiais */}
        <div className="feature-card stagger-animation-delay-1">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800 text-lg">Questões Oficiais do Revalida</h3>
                <span className="badge-verified">
                  <CheckCircle className="w-3 h-3" />
                  Verificado
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Banco completo com mais de 1.500 questões oficiais e organizadas por ano
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Sistema de XP */}
        <div className="feature-card stagger-animation-delay-2">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800 text-lg">Sistema de Níveis e XP</h3>
                <span className="badge-gamified">
                  <Trophy className="w-3 h-3" />
                  Gamificado
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ganhe experiência a cada questão respondida e evolua com feedback imediato
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Ranking Nacional */}
        <div className="feature-card stagger-animation-delay-3">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800 text-lg">Ranking Nacional</h3>
                <span className="badge-competitive">
                  <Target className="w-3 h-3" />
                  Competitivo
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Compare seu desempenho com outros médicos em uma competição saudável
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
