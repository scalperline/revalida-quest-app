
import { Book, Timer, BarChartBig, Star, Brain, Sword } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { WhyItem } from "@/components/WhyItem";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-foreground transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
            O banco completo de questões oficiais do <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Revalida INEP</span>
          </h1>
          <p className="mb-8 text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            Acesse todas as provas oficiais, gabaritos, estatísticas, simulados cronometrados e gráficos de desempenho — tudo o que você precisa para acelerar sua aprovação.
          </p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          <FeatureCard
            title="Banco de Questões"
            description="Filtros avançados, feedback e referências de todas as edições."
            icon={<Book size={40} className="text-blue-500" />}
            to="/questoes"
          />
          <FeatureCard
            title="Simulados Oficiais"
            description="Simulados cronometrados, baseado em provas reais do Revalida."
            icon={<Timer size={40} className="text-green-500" />}
            to="/simulado"
          />
          <FeatureCard
            title="Missões RPG"
            description="Complete missões especializadas, ganhe XP e desbloqueie conquistas."
            icon={<Sword size={40} className="text-purple-500" />}
            to="/missions"
          />
          <FeatureCard
            title="Desempenho & Gráficos"
            description="Analise seu progresso por área e identifique pontos de melhoria."
            icon={<BarChartBig size={40} className="text-orange-500" />}
            to="/estatisticas"
          />
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <WhyItem
            icon={<Star size={32} className="text-yellow-500" />}
            title="Dados 100% Oficiais"
            desc="Todas as questões, gabaritos e referências do INEP desde a 1ª edição."
          />
          <WhyItem
            icon={<Brain size={32} className="text-purple-500" />}
            title="Estudo Inteligente"
            desc="Estatísticas detalhadas e simulados para reforço dos pontos fracos."
          />
        </section>
        
        <footer className="mt-20 text-sm text-muted-foreground w-full text-center border-t border-border/30 pt-8">
          &copy; {new Date().getFullYear()} RevalidaQuest. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}
