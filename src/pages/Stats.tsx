

import { Navbar } from "@/components/Navbar";
import PerformanceChart from "@/components/PerformanceChart";
import { StatsResetDialog } from "@/components/StatsResetDialog";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { getTotalQuestionsInSystem, getQuestionsCompletionStats } from "@/utils/questionCounter";
import { TrendingUp, Target, Award, Calendar, Trophy, Star, BookOpen, Settings2 } from "lucide-react";

export default function Stats() {
  const { userProgress, getAccuracy, resetStats } = useGamification();
  const { toast } = useToast();
  
  // Estatísticas do sistema
  const systemStats = getQuestionsCompletionStats(userProgress.totalQuestions);
  
  // Filtrar áreas com dados suficientes (mínimo 3 questões)
  const getReliableAreaStats = () => {
    return Object.entries(userProgress.areaStats).filter(([_, stats]) => stats.total >= 3);
  };

  // Convert area stats to chart data - apenas áreas com dados confiáveis
  const getChartData = () => {
    const reliableAreas = getReliableAreaStats();
    
    if (reliableAreas.length === 0) {
      return [];
    }
    
    return reliableAreas.map(([area, stats]) => ({
      nome: area,
      valor: Math.round((stats.correct / stats.total) * 100),
      total: stats.total,
      corretas: stats.correct
    }));
  };

  const chartData = getChartData();
  const hasReliableData = chartData.length > 0;
  const allAreasStats = Object.entries(userProgress.areaStats);
  const hasAnyData = allAreasStats.length > 0;
  
  const getMedicalRank = (level: number) => {
    if (level >= 20) return 'Especialista Sênior';
    if (level >= 15) return 'Especialista';
    if (level >= 10) return 'Residente Sênior';
    if (level >= 5) return 'Residente Júnior';
    return 'Estudante de Medicina';
  };

  const handleReset = () => {
    resetStats();
    toast({
      title: "Estatísticas Reiniciadas",
      description: "Suas estatísticas de desempenho foram resetadas com sucesso.",
    });
  };

  const getAreaReliabilityColor = (total: number) => {
    if (total >= 10) return 'text-green-600 bg-green-50 border-green-200';
    if (total >= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (total >= 3) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getReliabilityLabel = (total: number) => {
    if (total >= 10) return 'Dados Confiáveis';
    if (total >= 5) return 'Dados Moderados';
    if (total >= 3) return 'Dados Básicos';
    return 'Poucos Dados';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Dashboard Acadêmico</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe seu progresso na preparação para o Revalida 📚
            </p>
          </div>

          {/* Controls Section */}
          {hasAnyData && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-blue-100 dark:border-gray-700 shadow-xl mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Controles</h3>
                </div>
                <StatsResetDialog onReset={handleReset} />
              </div>
            </div>
          )}

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
              <div className="space-y-1">
                <p className="text-sm opacity-90">{userProgress.correctAnswers} de {userProgress.totalQuestions} acertos</p>
                <p className="text-xs opacity-75">
                  {userProgress.totalQuestions} de {systemStats.totalInSystem} questões respondidas 
                  ({systemStats.completionPercentage}%)
                </p>
              </div>
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
            
            <PerformanceChart dados={chartData} showDemo={!hasAnyData} />
            
            {hasReliableData && (
              <div className="text-center mt-6">
                <p className="text-muted-foreground">
                  📊 Baseado em áreas com pelo menos 3 questões respondidas
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Mostrando {chartData.length} de {allAreasStats.length} áreas com dados confiáveis
                </p>
              </div>
            )}
            
            {hasAnyData && !hasReliableData && (
              <div className="text-center mt-6">
                <p className="text-muted-foreground">
                  📈 Dados insuficientes para gráfico confiável
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Responda pelo menos 3 questões em cada área para ver estatísticas confiáveis
                </p>
                <p className="text-xs text-muted-foreground">
                  Progresso atual: {allAreasStats.length} área(s) com dados
                </p>
              </div>
            )}
          </div>

          {/* Detailed Performance by Area */}
          {hasAnyData && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-xl mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Target className="w-6 h-6 text-green-600" />
                Análise Detalhada por Especialidade
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allAreasStats.map(([area, stats]) => {
                  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                  const reliabilityColor = getAreaReliabilityColor(stats.total);
                  const reliabilityLabel = getReliabilityLabel(stats.total);
                  
                  return (
                    <div key={area} className={`p-4 rounded-xl border-2 ${reliabilityColor} dark:bg-gray-700 dark:border-gray-600`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{area}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-gray-600">
                          {reliabilityLabel}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{accuracy}%</div>
                      <div className="text-xs opacity-80 mb-2">
                        {stats.correct}/{stats.total} acertos
                      </div>
                      <div className="mt-2 bg-white/50 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-current rounded-full h-2 transition-all"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                      {stats.total < 3 && (
                        <p className="text-xs mt-2 opacity-70">
                          +{3 - stats.total} questões para dados confiáveis
                        </p>
                      )}
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
