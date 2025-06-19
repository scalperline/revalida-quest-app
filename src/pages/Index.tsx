
import { Book, Timer, BarChartBig, Star, Brain } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { WhyItem } from "@/components/WhyItem";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-14 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center leading-tight tracking-tighter">
          O banco completo de questões oficiais do <span className="text-blue-500">Revalida INEP</span>
        </h1>
        <p className="mb-7 text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
          Todas as provas, questões, gabaritos, estatísticas, simulados cronometrados e gráficos para impulsionar seu preparo rumo à aprovação.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-5 md:gap-7 mb-12">
          {/* Card - Banco de Questões */}
          <FeatureCard
            title="Banco de Questões"
            description="Filtros avançados, feedback e referências de todas as edições."
            icon={<Book size={36} className="text-blue-400" />}
            to="/questoes"
          />
          {/* Card - Simulados */}
          <FeatureCard
            title="Simulados Oficiais"
            description="Simulados cronometrados, baseado em provas reais do Revalida."
            icon={<Timer size={36} className="text-green-400" />}
            to="/simulado"
          />
          {/* Card - Desempenho */}
          <FeatureCard
            title="Desempenho & Gráficos"
            description="Analise seu progresso por área e identifique pontos de melhoria."
            icon={<BarChartBig size={36} className="text-orange-400" />}
            to="/estatisticas"
          />
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
          <WhyItem
            icon={<Star size={30} className="text-yellow-400" />}
            title="Dados 100% Oficiais"
            desc="Todas as questões, gabaritos e referências do INEP desde a 1ª edição."
          />
          <WhyItem
            icon={<Brain size={30} className="text-purple-400" />}
            title="Estudo Inteligente"
            desc="Estatísticas detalhadas e simulados para reforço dos pontos fracos."
          />
        </section>
        <footer className="mt-16 text-xs text-muted-foreground w-full text-right">
          &copy; {new Date().getFullYear()} RevalidaQuest. Projeto acadêmico sem fins lucrativos.
        </footer>
      </main>
    </div>
  );
}
