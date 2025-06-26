import { Book, Timer, BarChartBig, Star, Brain, Crown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { WhyItem } from "@/components/WhyItem";
import { UsageLimitsCard } from "@/components/UsageLimitsCard";
import { useGamificationSync } from '@/hooks/useGamificationSync';

export default function Index() {
  // Add gamification sync
  useGamificationSync();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-foreground transition-colors relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      <main className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-16 w-full">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-center leading-tight tracking-tight px-2">
            O banco completo de questões oficiais do <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Revalida INEP</span>
          </h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed px-2">
            Acesse todas as provas oficiais, gabaritos, estatísticas, quests personalizadas e gráficos de desempenho — tudo o que você precisa para acelerar sua aprovação.
          </p>
        </div>

        {/* Usage Limits Card */}
        <div className="w-full max-w-md mx-auto mb-12">
          <UsageLimitsCard />
        </div>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          <FeatureCard
            title="Banco de Questões"
            description="Questões oficiais, filtros avançados e referências de todas as edições."
            icon={<Book size={32} className="text-blue-500 sm:w-10 sm:h-10" />}
            to="/questoes"
          />
          <FeatureCard
            title="Quests Personalizadas"
            description="Crie Quests Personalizadas, simule provas reais com questões cronometradas, por área e dificuldades específicas."
            icon={<Timer size={32} className="text-blue-600 sm:w-10 sm:h-10" />}
            to="/missions"
          />
          <FeatureCard
            title="Ranking de Estudantes"
            description="Compare seu desempenho com outros estudantes e acompanhe sua posição no ranking nacional."
            icon={<Crown size={32} className="text-blue-700 sm:w-10 sm:h-10" />}
            to="/ranking"
          />
          <FeatureCard
            title="Desempenho & Gráficos"
            description="Analise seu progresso por área e identifique pontos para melhorar."
            icon={<BarChartBig size={32} className="text-blue-800 sm:w-10 sm:h-10" />}
            to="/estatisticas"
          />
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          <WhyItem
            icon={<Star size={24} className="text-blue-500 sm:w-8 sm:h-8" />}
            title="Dados 100% Oficiais"
            desc="Todas as questões, gabaritos e referências do INEP desde a 1ª edição."
          />
          <WhyItem
            icon={<Brain size={24} className="text-blue-600 sm:w-8 sm:h-8" />}
            title="Estudo Inteligente"
            desc="Estatísticas detalhadas e quests personalizadas para reforço dos pontos fracos."
          />
        </section>
        
        <footer className="mt-16 sm:mt-20 text-xs sm:text-sm text-gray-600 dark:text-gray-400 w-full text-center border-t border-blue-200/30 dark:border-blue-700/30 pt-6 sm:pt-8 px-2">
          &copy; {new Date().getFullYear()} RevalidaQuest. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}
