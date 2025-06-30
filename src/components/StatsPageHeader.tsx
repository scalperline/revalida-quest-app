import { BarChart3, TrendingUp, Target } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
export function StatsPageHeader() {
  const {
    userProgress
  } = useGamification();
  return <div className="text-center mb-12">
      {/* Ícone Principal */}
      <div className="flex justify-center mb-6">
        
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
      

      {/* Mensagem Motivacional */}
      
    </div>;
}