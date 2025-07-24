import { Trophy, Sparkles, Gift, Zap, Clock } from 'lucide-react';

export function SupremeChallengeFeatures() {
  const features = [{
    icon: Trophy,
    text: "Plano Premium pelo preço do Básico"
  }, {
    icon: Sparkles,
    text: "10 questões oficiais do INEP"
  }, {
    icon: Gift,
    text: "Economia de R$ 50,00/mês"
  }, {
    icon: Clock,
    text: "Valor promocional válido por 12 meses"
  }, {
    icon: Zap,
    text: "Apenas 3 tentativas disponíveis"
  }];
  
  return <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 flex-1">
      {features.map((feature, index) => {
      const Icon = feature.icon;
      return <div key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg bg-transparent">
              <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white font-bold" />
            </div>
            <span className="font-medium leading-relaxed text-sm lg:text-base text-white">
              {feature.text}
            </span>
          </div>;
    })}
    </div>;
}