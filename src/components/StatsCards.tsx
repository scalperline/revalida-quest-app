
import { TrendingUp, Target, Award, Calendar, Trophy, Star, BookOpen } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";
import { getTotalQuestionsInSystem, getQuestionsCompletionStats } from "@/utils/questionCounter";

export function StatsCards() {
  const { userProgress, getAccuracy } = useGamification();
  
  // Estatísticas do sistema
  const systemStats = getQuestionsCompletionStats(userProgress.totalQuestions);
  
  const getMedicalRank = (level: number) => {
    if (level >= 20) return 'Especialista Sênior';
    if (level >= 15) return 'Especialista';
    if (level >= 10) return 'Residente Sênior';
    if (level >= 5) return 'Residente Júnior';
    return 'Estudante de Medicina';
  };

  return (
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
  );
}
