
import { Book, Timer, BarChartBig, Star, Brain, Flag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { WhyItem } from "@/components/WhyItem";
import { Onboarding } from "@/components/Onboarding";
import { useGamificationSync } from '@/hooks/useGamificationSync';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function Index() {
  // Add gamification sync
  useGamificationSync();
  
  // Add onboarding logic
  const { hasCompletedOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-foreground transition-colors">
      <Navbar />
      <main className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-16 w-full">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-center leading-tight tracking-tight px-2">
            O banco completo de questões oficiais do <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Revalida INEP</span>
          </h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed px-2">
            Acesse todas as provas oficiais, gabaritos, estatísticas, simulados cronometrados e gráficos de desempenho — tudo o que você precisa para acelerar sua aprovação.
          </p>
          
          {/* Emojis de gamificação */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-xl sm:text-2xl">
            🎯 🏆 ⚡ 🎮 🔥 💎 🚀 ⭐
          </div>
        </div>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          <FeatureCard
            title="Banco de Provas"
            description="Filtros avançados, feedback e referências de todas as edições."
            icon={<Book size={32} className="text-blue-500 sm:w-10 sm:h-10" />}
            to="/questoes"
          />
          <FeatureCard
            title="Simulados Oficiais"
            description="Simulados cronometrados, baseado em provas reais do Revalida."
            icon={<Timer size={32} className="text-green-500 sm:w-10 sm:h-10" />}
            to="/simulado"
          />
          <FeatureCard
            title="Quests RPG"
            description="Complete quests especializadas, ganhe XP e desbloqueie conquistas."
            icon={<Flag size={32} className="text-purple-500 sm:w-10 sm:h-10" />}
            to="/missions"
          />
          <FeatureCard
            title="Desempenho & Gráficos"
            description="Analise seu progresso por área e identifique pontos de melhoria."
            icon={<BarChartBig size={32} className="text-orange-500 sm:w-10 sm:h-10" />}
            to="/estatisticas"
          />
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          <WhyItem
            icon={<Star size={24} className="text-yellow-500 sm:w-8 sm:h-8" />}
            title="Dados 100% Oficiais"
            desc="Todas as questões, gabaritos e referências do INEP desde a 1ª edição."
          />
          <WhyItem
            icon={<Brain size={24} className="text-purple-500 sm:w-8 sm:h-8" />}
            title="Estudo Inteligente"
            desc="Estatísticas detalhadas e simulados para reforço dos pontos fracos."
          />
        </section>
        
        <footer className="mt-16 sm:mt-20 text-xs sm:text-sm text-muted-foreground w-full text-center border-t border-border/30 pt-6 sm:pt-8 px-2">
          &copy; {new Date().getFullYear()} RevalidaQuest. Todos os direitos reservados.
        </footer>
      </main>

      {/* Show onboarding for new users */}
      {!hasCompletedOnboarding && (
        <Onboarding 
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
      )}
    </div>
  );
}
