
import { Book, Timer, BarChartBig, Star, Brain, ArrowRight, Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mb-6">
              <Star size={40} className="text-blue-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Excelência em
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              Preparação Médica
            </span>
          </h1>
          <div className="text-xl md:text-2xl text-blue-100 mb-4">
            <span className="font-semibold">REVALIDA INEP</span>
          </div>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Acesse todas as questões oficiais, simulados cronometrados e análise detalhada de desempenho. 
            Sua jornada rumo à aprovação no Revalida começa aqui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/questoes">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-blue-900 font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Começar Agora
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/simulado">
              <Button variant="outline" size="lg" className="border-2 border-blue-300 text-blue-100 hover:bg-blue-700 hover:border-blue-200 px-8 py-4 text-lg rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                <Play size={20} className="mr-2" />
                Fazer Simulado
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link to="/questoes" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                <Book size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Banco de Questões</h3>
              <p className="text-blue-100 leading-relaxed">
                Filtros avançados, feedback detalhado e referências de todas as edições oficiais do Revalida.
              </p>
            </div>
          </Link>

          <Link to="/simulado" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                <Timer size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Simulados Oficiais</h3>
              <p className="text-blue-100 leading-relaxed">
                Simulados cronometrados baseados em provas reais com ambiente de teste autêntico.
              </p>
            </div>
          </Link>

          <Link to="/estatisticas" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                <BarChartBig size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Análise de Desempenho</h3>
              <p className="text-blue-100 leading-relaxed">
                Gráficos detalhados por área médica para identificar pontos de melhoria.
              </p>
            </div>
          </Link>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex-shrink-0">
                <Star size={24} className="text-blue-900" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-yellow-400">Dados 100% Oficiais</h4>
                <p className="text-blue-100 leading-relaxed">
                  Todas as questões, gabaritos e referências do INEP desde a 1ª edição, garantindo autenticidade total.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex-shrink-0">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-purple-400">Estudo Inteligente</h4>
                <p className="text-blue-100 leading-relaxed">
                  Estatísticas avançadas e simulados direcionados para fortalecer seus pontos fracos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-blue-200 text-sm">
            &copy; {new Date().getFullYear()} RevalidaQuest. Projeto acadêmico sem fins lucrativos.
          </p>
        </div>
      </main>
    </div>
  );
}
