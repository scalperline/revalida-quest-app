
import { BarChart3, TrendingUp, Target } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function StatsPageHeader() {
  const { userProgress } = useGamification();

  return (
    <div className="text-center mb-12">
      {/* Ícone Principal */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/25 transition-shadow duration-300">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent">
          Dashboard Acadêmico
        </span>
      </h1>

      {/* Subtítulo */}
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Análise detalhada do seu desempenho na preparação para o Revalida
      </p>

      {/* Badge de Status */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-6 py-2 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              Nível {userProgress.level} - {userProgress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-700/50 max-w-lg mx-auto">
        <p className="text-blue-800 dark:text-blue-200 font-medium flex items-center gap-2 justify-center">
          <TrendingUp className="w-4 h-4" />
          Acompanhe sua evolução e identifique áreas de melhoria
        </p>
      </div>
    </div>
  );
}
