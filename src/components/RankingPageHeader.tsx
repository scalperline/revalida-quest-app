
import { Trophy, Crown, Medal } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function RankingPageHeader() {
  const { userProgress } = useGamification();

  return (
    <div className="text-center mb-12">
      {/* Ícone Principal */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-500/25 transition-shadow duration-300">
          <Trophy className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-yellow-600 to-orange-800 bg-clip-text text-transparent">
          Ranking Revalida Quest
        </span>
      </h1>

      {/* Subtítulo */}
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Veja como você está se saindo em comparação com outros futuros médicos!
      </p>

      {/* Badge de Status */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full px-6 py-2 border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              Nível {userProgress.level} - {userProgress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-2xl p-4 border border-yellow-200/50 dark:border-yellow-700/50 max-w-lg mx-auto">
        <p className="text-yellow-800 dark:text-yellow-200 font-medium flex items-center gap-2 justify-center">
          <Medal className="w-4 h-4" />
          Compita com outros estudantes e alcance o topo!
        </p>
      </div>
    </div>
  );
}
