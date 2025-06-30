
import { BookOpen, Brain, Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function QuestionsPageHeader() {
  const { userProgress } = useGamification();

  return (
    <div className="text-center mb-12">
      {/* Ícone Principal */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-indigo-500/25 transition-shadow duration-300">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 to-blue-800 bg-clip-text text-transparent">
          Banco de Questões
        </span>
      </h1>

      {/* Subtítulo */}
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Pratique com questões reais do Revalida e aprimore seus conhecimentos
      </p>

      {/* Badge de Status */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-full px-6 py-2 border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
              Nível {userProgress.level} - {userProgress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-2xl p-4 border border-indigo-200/50 dark:border-indigo-700/50 max-w-lg mx-auto">
        <p className="text-indigo-800 dark:text-indigo-200 font-medium flex items-center gap-2 justify-center">
          <Zap className="w-4 h-4" />
          Cada questão respondida é um passo mais próximo da sua aprovação!
        </p>
      </div>
    </div>
  );
}
