
import { Navbar } from "@/components/Navbar";
import PerformanceChart from "@/components/PerformanceChart";
import { useGamification } from "@/hooks/useGamification";
import { TrendingUp, Target, Award, Calendar, Trophy, Star, BookOpen, GraduationCap } from "lucide-react";

export default function Stats() {
  const { userProgress, getAccuracy } = useGamification();
  
  // Convert area stats to chart data
  const getChartData = () => {
    const areas = Object.entries(userProgress.areaStats);
    
    if (areas.length === 0) {
      return [
        { nome: "Clínica Médica", valor: 0 },
        { nome: "Pediatria", valor: 0 },  
        { nome: "Cirurgia", valor: 0 },
        { nome: "Preventiva", valor: 0 },
        { nome: "Ginecologia", valor: 0 },
      ];
    }
    
    return areas.map(([area, stats]) => ({
      nome: area,
      valor: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    }));
  };

  const chartData = getChartData();
  const hasRealData = Object.keys(userProgress.areaStats).length > 0;
  
  const getMedicalRank = (level: number) => {
    if (level >= 20) return 'Especialista Sênior';
    if (level >= 15) return 'Especialista';
    if (level >= 10) return 'Residente Sênior';
    if (level >= 5) return 'Residente Júnior';
    return 'Estudante de Medicina';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <GraduationCap className="w-10 h-10 text-blue-600" />
              Dashboard Acadêmico
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe seu progresso na preparação para o Revalida 📚
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
              <h3 className="font-semibold mb-1">{getMedicalRank(userProgress.level)}</h3>
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
              <h3 className="font-semibold mb-1">Taxa de Acertos</h3>
              <p className="text-sm opacity-90">{userProgress.correctAnswers} de {userProgress.totalQuestions} questões</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{userProgress.achievements.filter(a => a.unlocked).length}</span>
              </div>
              <h3 className="font-semibold mb-1">Conquistas Médicas</h3>
              <p className="text-sm opacity-90">de {userProgress.achievements.length} disponíveis</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{userProgress.simuladosCompletos}</span>
              </div>
              <h3 className="font-semibold mb-1">Simulados Concluídos</h3>
              <p className="text-sm opacity-90">preparação intensiva</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center flex items-center justify-center gap-3">
              <Star className="w-6 h-6 text-blue-600" />
              Desempenho por Área Médica
            </h2>
            <PerformanceChart dados={chartData} />
            <div className="text-center mt-6">
              {hasRealData ? (
                <p className="text-muted-foreground">
                  📊 Baseado em {userProgress.totalQuestions} questões respondidas
                </p>
              ) : (
                <div className="text-muted-foreground space-y-2">
                  <p className="font-medium text-orange-600 dark:text-orange-400">
                    📈 Gráfico será atualizado conforme você responde questões
                  </p>
                  <p className="text-sm">
                    Responda pelo menos 5 questões em cada área para ver seu desempenho real
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Performance by Area */}
          {hasRealData && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Target className="w-6 h-6 text-green-600" />
                Análise Detalhada por Especialidade
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(userProgress.areaStats).map(([area, stats]) => {
                  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                  const getStatusColor = (acc: number) => {
                    if (acc >= 80) return 'text-green-600 bg-green-50 border-green-200';
                    if (acc >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
                    return 'text-red-600 bg-red-50 border-red-200';
                  };
                  
                  return (
                    <div key={area} className={`p-4 rounded-xl border-2 ${getStatusColor(accuracy)} dark:bg-gray-700 dark:border-gray-600`}>
                      <h3 className="font-semibold text-sm mb-2">{area}</h3>
                      <div className="text-2xl font-bold mb-1">{accuracy}%</div>
                      <div className="text-xs opacity-80">
                        {stats.correct}/{stats.total} acertos
                      </div>
                      <div className="mt-2 bg-white/50 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-current rounded-full h-2 transition-all"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced Achievements Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Conquistas Acadêmicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProgress.achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-300 shadow-lg' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60 grayscale'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
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
                          ? 'text-blue-800 dark:text-blue-200' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked 
                          ? 'text-blue-600 dark:text-blue-300' 
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full inline-block">
                      Conquistado em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                    </div>
                  )}
                  
                  {!achievement.unlocked && (
                    <div className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full inline-block">
                      🔒 Continue estudando para desbloquear
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
