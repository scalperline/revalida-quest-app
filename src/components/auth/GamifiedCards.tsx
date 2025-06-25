
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, Heart, Cross } from 'lucide-react';

export function GamifiedCards() {
  const cards = [
    {
      title: 'Questões',
      description: 'Pratique com questões reais do Revalida',
      icon: Microscope,
      value: '2.000+',
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/30',
    },
    {
      title: 'Sistema XP',
      description: 'Ganhe experiência a cada resposta',
      icon: Heart,
      value: 'Ilimitado',
      color: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-600/30',
    },
    {
      title: 'Ranking',
      description: 'Compare seu progresso com outros médicos',
      icon: Cross,
      value: 'Global',
      color: 'from-blue-700 to-blue-800',
      shadowColor: 'shadow-blue-700/30',
    },
  ];

  return (
    <div className="space-y-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card
            key={card.title}
            className={`
              bg-white/10 backdrop-blur-md border border-blue-200/20 
              hover:bg-white/15 transition-all duration-500 ease-out
              hover:shadow-2xl hover:scale-105 ${card.shadowColor}
              hover:border-blue-200/30 group cursor-pointer
            `}
            style={{
              animation: `slideInLeft 0.8s ease-out ${index * 0.2}s both`,
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`
                  p-3 rounded-xl bg-gradient-to-r ${card.color} 
                  shadow-lg group-hover:shadow-xl transition-all duration-300
                  group-hover:scale-110
                `}>
                  <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <CardTitle className="text-lg font-space-grotesk text-white font-semibold">
                    {card.title}
                  </CardTitle>
                  <p className="text-sm text-blue-200/80 mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`
                text-2xl font-bold bg-gradient-to-r ${card.color} 
                bg-clip-text text-transparent font-space-grotesk
                group-hover:scale-110 transition-transform duration-300
              `}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
