
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ResponsiveCard } from "@/components/ResponsiveCard";
import { StreakDisplay } from "@/components/StreakDisplay";
import { useGamification } from "@/hooks/useGamification";
import { 
  FileText, 
  Trophy, 
  Target, 
  BarChart3, 
  User, 
  Stethoscope,
  BookOpen,
  Flag,
  Crown
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const { userProgress } = useGamification();

  const features = [
    {
      title: "Banco de Questões",
      description: "Acesse milhares de questões oficiais do INEP organizadas por ano e área médica",
      icon: <BookOpen className="w-8 h-8" />,
      path: "/questions",
      variant: "primary" as const
    },
    {
      title: "Quests Gamificadas",
      description: "Complete missões especializadas e ganhe XP, badges e conquistas épicas",
      icon: <Flag className="w-8 h-8" />,
      path: "/missions",
      variant: "secondary" as const
    },
    {
      title: "Ranking Nacional",
      description: "Compare seu desempenho com outros estudantes em tempo real",
      icon: <Crown className="w-8 h-8" />,
      path: "/ranking",
      variant: "default" as const
    },
    {
      title: "Estatísticas Detalhadas",
      description: "Analise seu progresso com gráficos e métricas personalizadas",
      icon: <BarChart3 className="w-8 h-8" />,
      path: "/stats",
      variant: "default" as const
    },
    {
      title: "Meu Perfil",
      description: "Gerencie suas conquistas, badges e configurações pessoais",
      icon: <User className="w-8 h-8" />,
      path: "/profile",
      variant: "default" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 no-scroll-x">
      <Navbar />
      
      <div className="container mx-auto mobile-padding">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="mb-6 gradient-text">
              Bem-vindo ao Revalida Quest! 🚀
            </h1>
            
            <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Transforme sua preparação para o Revalida em uma jornada épica! 
              Complete quests, ganhe XP, desbloqueie conquistas e domine as questões oficiais do INEP.
            </p>

            {/* User Progress Display */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
              <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-blue-200 dark:border-gray-700">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="font-bold text-lg">Nível {userProgress.level}</span>
              </div>
              
              <StreakDisplay />
              
              <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-blue-200 dark:border-gray-700">
                <Target className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-lg">{userProgress.totalXP} XP</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mobile-grid max-w-6xl mx-auto">
            {features.map((feature) => (
              <ResponsiveCard
                key={feature.path}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                variant={feature.variant}
                onClick={() => navigate(feature.path)}
                className="mx-auto"
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-gray-700 p-6 sm:p-8 max-w-2xl mx-auto">
              <h2 className="mb-4 gradient-text">
                Pronto para começar sua jornada? ⚡
              </h2>
              
              <p className="text-responsive-base text-muted-foreground mb-6">
                Escolha como quer estudar hoje: resolva questões específicas por área 
                ou embarque em uma quest completa com recompensas épicas!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/questions")}
                  className="btn-primary"
                >
                  <BookOpen className="w-5 h-5" />
                  Explorar Questões
                </button>
                
                <button
                  onClick={() => navigate("/missions")}
                  className="btn-secondary"
                >
                  <Flag className="w-5 h-5" />
                  Iniciar Quest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
