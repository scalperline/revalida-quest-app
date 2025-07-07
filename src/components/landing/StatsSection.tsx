
import { BookOpen, Users, Trophy, Zap } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: BookOpen,
      value: "1.500+",
      label: "Questões Oficiais",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      value: "11.200+",
      label: "Médicos Ativos",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Trophy,
      value: "87%",
      label: "Taxa de Aprovação",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      value: "15",
      label: "Anos de Provas",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
