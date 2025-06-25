
import { Book, Timer, BarChartBig, Star, Brain, Crown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Typography } from "@/components/ui/typography";
import { ResponsiveCard, ResponsiveCardContent, ResponsiveCardDescription, ResponsiveCardHeader, ResponsiveCardTitle } from "@/components/ui/responsive-card";
import { Button } from "@/components/ui/button";
import { useGamificationSync } from '@/hooks/useGamificationSync';
import { Link } from "react-router-dom";

export default function Index() {
  // Add gamification sync
  useGamificationSync();

  const features = [
    {
      title: "Banco de Questões",
      description: "Questões oficiais, filtros avançados e referências de todas as edições.",
      icon: <Book className="w-8 h-8 text-blue-500" />,
      to: "/questoes"
    },
    {
      title: "Quests Personalizadas",
      description: "Crie Quests Personalizadas, simule provas reais com questões cronometradas, por área e dificuldades específicas.",
      icon: <Timer className="w-8 h-8 text-green-500" />,
      to: "/missoes"
    },
    {
      title: "Ranking de Estudantes",
      description: "Compare seu desempenho com outros estudantes e acompanhe sua posição no ranking nacional.",
      icon: <Crown className="w-8 h-8 text-purple-500" />,
      to: "/ranking"
    },
    {
      title: "Desempenho & Gráficos",
      description: "Analise seu progresso por área e identifique pontos para melhorar.",
      icon: <BarChartBig className="w-8 h-8 text-orange-500" />,
      to: "/estatisticas"
    }
  ];

  const whyItems = [
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Dados 100% Oficiais",
      description: "Todas as questões, gabaritos e referências do INEP desde a 1ª edição."
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "Estudo Inteligente",
      description: "Estatísticas detalhadas e quests personalizadas para reforço dos pontos fracos."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-foreground transition-colors no-scroll-x">
      <Navbar />
      <main className="container mx-auto section-padding">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <Typography variant="h1" align="center" className="mb-6">
            O banco completo de questões oficiais do{" "}
            <Typography as="span" variant="h1" color="gradient">
              Revalida INEP
            </Typography>
          </Typography>
          
          <Typography variant="subtitle" align="center" className="mb-6 max-w-4xl mx-auto">
            Acesse todas as provas oficiais, gabaritos, estatísticas, quests personalizadas e gráficos de desempenho — tudo o que você precisa para acelerar sua aprovação.
          </Typography>
          
          <div className="flex justify-center items-center gap-3 text-4xl mb-8">
            🎯 🏆 🚩
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="responsive-grid mb-16">
          {features.map((feature, index) => (
            <Link key={index} to={feature.to} className="block">
              <ResponsiveCard variant="feature" clickable className="h-full">
                <ResponsiveCardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                      {feature.icon}
                    </div>
                  </div>
                  <ResponsiveCardTitle className="text-center">
                    {feature.title}
                  </ResponsiveCardTitle>
                </ResponsiveCardHeader>
                <ResponsiveCardContent>
                  <ResponsiveCardDescription className="text-center">
                    {feature.description}
                  </ResponsiveCardDescription>
                </ResponsiveCardContent>
              </ResponsiveCard>
            </Link>
          ))}
        </div>

        {/* Why Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {whyItems.map((item, index) => (
            <ResponsiveCard key={index} variant="gradient">
              <ResponsiveCardContent className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <Typography variant="h4" className="mb-2">
                    {item.title}
                  </Typography>
                  <Typography variant="p" color="muted">
                    {item.description}
                  </Typography>
                </div>
              </ResponsiveCardContent>
            </ResponsiveCard>
          ))}
        </section>
        
        {/* Footer */}
        <footer className="text-center border-t border-border/30 pt-8">
          <Typography variant="caption" color="muted">
            &copy; {new Date().getFullYear()} RevalidaQuest. Todos os direitos reservados.
          </Typography>
        </footer>
      </main>
    </div>
  );
}
