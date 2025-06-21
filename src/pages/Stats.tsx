
import { Navbar } from "@/components/Navbar";
import PerformanceChart from "@/components/PerformanceChart";
import { useGamification } from "@/hooks/useGamification";
import { TrendingUp, Target, Award, Calendar, Trophy, Star } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10 text-yellow-500" />
              Painel do Aventureiro
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe sua jornada épica rumo à aprovação no Revalida! 🚀
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">Nível {userProgress.level}</span>
              </div>
              <h3 className="font-semibold mb-1">Rank Atual</h3>
              <p className="text-sm opacity-90">{userProgress.xp} XP / {userProgress.xpToNextLevel} XP</p>
              <div className="mt-2 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all"
                  style={{ width: `${(userProgress.xp / userProgress.xpToNextLevel) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{getAccuracy()}%</span>
              </div>
              <h3 className="font-semibold mb-1">Taxa de Sucesso</h3>
              <p className="text-sm opacity-90">{userProgress.correctAnswers} de {userProgress.totalQuestions} quests</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{userProgress.achievements.filter(a => a.unlocked).length}</span>
              </div>
              <h3 className="font-semibold mb-1">Troféus Coletados</h3>
              <p className="text-sm opacity-90">de {userProgress.achievements.length} disponíveis</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{userProgress.simuladosCompletos}</span>
              </div>
              <h3 className="font-semibold mb-1">Missões Épicas</h3>
              <p className="text-sm opacity-90">simulados concluídos</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center flex items-center justify-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              Mapa de Domínio por Área
            </h2>
            <PerformanceChart dados={DATA_DEMO} />
            <p className="text-center text-muted-foreground mt-6">
              *Dados de demonstração - Continue explorando para desbloquear dados reais! 🗺️
            </p>
          </div>

          {/* Enhanced Achievements Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Galeria de Conquistas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProgress.achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-yellow-300 shadow-lg' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60 grayscale'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce' : ''}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${
                        achievement.unlocked 
                          ? 'text-yellow-800 dark:text-yellow-200' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked 
                          ? 'text-yellow-600 dark:text-yellow-300' 
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full inline-block">
                      Desbloqueado em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                    </div>
                  )}
                  
                  {!achievement.unlocked && (
                    <div className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full inline-block">
                      🔒 Bloqueado - Continue sua jornada!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
