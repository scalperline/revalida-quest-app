
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";

interface SimuladoResultsProps {
  simulado: any;
  timeElapsed: number;
  onVoltarConfiguracao: () => void;
}

export function SimuladoResults({ simulado, timeElapsed, onVoltarConfiguracao }: SimuladoResultsProps) {
  const acertos = simulado.questoesSelecionadas.filter(
    (q: any) => simulado.respostas[q.id] === q.correct
  ).length;

  return (
    <div className="pt-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Quest Concluída! 🎊
          </h2>
          
          <div className="text-3xl font-bold text-green-600 mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700 shadow-sm">
            🎯 Você conquistou {acertos} de {simulado.total} questões!
          </div>
          
          {/* Resumo da Performance */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                +{Math.floor((acertos / simulado.total) * (simulado.config.quantidade * 2.5))} XP
              </div>
              <div className="text-blue-600 dark:text-blue-500">Experiência Ganha</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700 shadow-sm">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {simulado.config.areas.length}
              </div>
              <div className="text-purple-600 dark:text-purple-500">Áreas Estudadas</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700 shadow-sm">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                {Math.floor(timeElapsed / 60)}min
              </div>
              <div className="text-green-600 dark:text-green-500">Tempo Utilizado</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700 shadow-sm">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                {Math.round(timeElapsed / simulado.total)}s
              </div>
              <div className="text-orange-600 dark:text-orange-500">Média por Questão</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 mb-8">
          {simulado.questoesSelecionadas.map((q: any) => (
            <QuestionCard key={q.id} question={q} showAnswer />
          ))}
        </div>
        
        <div className="text-center space-y-4">
          <Button
            onClick={onVoltarConfiguracao}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🔄 Nova Quest Personalizada
          </Button>
        </div>
      </div>
    </div>
  );
}
