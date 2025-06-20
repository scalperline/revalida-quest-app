import { Navbar } from "@/components/Navbar";
import { NavigationButtons } from "@/components/NavigationButtons";
import PerformanceChart from "@/components/PerformanceChart";
import { useGamification } from "@/hooks/useGamification";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";

const DATA_DEMO = [
  { nome: "Clínica", valor: 6 },
  { nome: "Pediatria", valor: 4 },
  { nome: "Cirurgia", valor: 2 },
  { nome: "Preventiva", valor: 3 },
  { nome: "GO", valor: 5 },
];

export default function Stats() {
  const { userProgress, getAccuracy } = useGamification();
  const total = DATA_DEMO.reduce((acc, curr) => acc + curr.valor, 0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <div className="mb-8">
            <NavigationButtons />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">Nível {userProgress.level}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Nível Atual</h3>
              <p className="text-sm text-muted-foreground">{userProgress.xp} XP / {userProgress.xpToNextLevel} XP</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{getAccuracy()}%</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Precisão</h3>
              <p className="text-sm text-muted-foreground">{userProgress.correctAnswers} de {userProgress.totalQuestions} questões</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-purple-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">{userProgress.achievements.filter(a => a.unlocked).length}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Conquistas</h3>
              <p className="text-sm text-muted-foreground">de {userProgress.achievements.length} disponíveis</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-orange-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">{userProgress.simuladosCompletos}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Simulados</h3>
              <p className="text-sm text-muted-foreground">concluídos</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              Desempenho por Área do Conhecimento
            </h2>
            <PerformanceChart dados={DATA_DEMO} />
            <p className="text-center text-muted-foreground mt-6">
              *Dados fictícios para demonstração
            </p>
          </div>

          {/* Achievements Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Suas Conquistas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProgress.achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all ${
                    achievement.unlocked 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <h3 className={`font-semibold ${achievement.unlocked ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                  </div>
                  <p className={`text-sm ${achievement.unlocked ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-500'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
