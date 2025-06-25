import { Navbar } from "@/components/Navbar";
import { useRanking } from "@/hooks/useRanking";
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from "lucide-react";

export default function Ranking() {
  const { ranking, loading, error } = useRanking();

  if (loading) {
    return <div>Carregando ranking...</div>;
  }

  if (error) {
    return <div>Erro ao carregar o ranking: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Ranking Nacional</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Compare seu desempenho com outros estudantes do Revalida 🏆
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranking &&
              ranking.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-gray-700 shadow-xl transition-transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                      {index === 1 && <Medal className="w-6 h-6 text-gray-500" />}
                      {index === 2 && <Award className="w-6 h-6 text-orange-500" />}
                      {index > 2 && <Star className="w-6 h-6 text-blue-500" />}
                      <span className="text-xl font-semibold">{index + 1}º</span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-muted-foreground">
                    Nível: {user.level} | XP: {user.xp}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
