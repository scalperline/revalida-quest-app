import { Brain, Target, BarChart3, Users, Sparkles, Shield } from "lucide-react";
export function FeaturesSection() {
  const features = [{
    icon: Brain,
    title: "IA Personalizada",
    description: "Análises inteligentes do seu desempenho com sugestões personalizadas de estudo baseadas em suas dificuldades.",
    color: "from-purple-500 to-indigo-600"
  }, {
    icon: Target,
    title: "Missões Gamificadas",
    description: "Complete desafios diários, conquiste badges e suba de nível enquanto estuda de forma mais engajada.",
    color: "from-blue-500 to-cyan-600"
  }, {
    icon: BarChart3,
    title: "Analytics Avançado",
    description: "Acompanhe seu progresso com gráficos detalhados por área médica e performance ao longo do tempo.",
    color: "from-green-500 to-emerald-600"
  }, {
    icon: Users,
    title: "Ranking Nacional",
    description: "Compare seu desempenho com outros médicos e participe de competições mensais exclusivas.",
    color: "from-orange-500 to-red-500"
  }, {
    icon: Sparkles,
    title: "Simulados Ilimitados",
    description: "Acesso a simulados personalizados por área médica, ano de prova e nível de dificuldade.",
    color: "from-pink-500 to-rose-600"
  }, {
    icon: Shield,
    title: "Questões Oficiais",
    description: "Banco completo com todas as questões oficiais do Revalida de 2011 a 2025, sempre atualizado.",
    color: "from-teal-500 to-cyan-600"
  }];
  return <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Recursos que fazem a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl">
              diferença
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta combinada com gamificação para acelerar sua preparação
            e tornar o estudo mais eficiente e divertido.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100 group">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
}