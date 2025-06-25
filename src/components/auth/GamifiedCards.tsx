
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, Heart, Trophy } from 'lucide-react';

export function GamifiedCards() {
  const cards = [
    {
      title: 'Questões',
      description: 'Pratique com questões reais do Revalida',
      icon: Microscope,
      value: '2.000+',
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/30',
      valueGradient: false,
    },
    {
      title: 'Sistema XP',
      description: 'Ganhe experiência a cada resposta',
      icon: Heart,
      value: 'Ilimitado',
      color: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-600/30',
      valueGradient: false,
    },
    {
      title: 'Ranking',
      description: 'Compare seu progresso com outros médicos',
      icon: Trophy,
      value: 'Global',
      color: 'from-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-500/30',
      valueGradient: true,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card
            key={card.title}
            className={`
              bg-white/15 backdrop-blur-md border-2 border-blue-200/25 
              hover:bg-white/20 transition-all duration-500 ease-out
              hover:shadow-2xl hover:scale-105 ${card.shadowColor}
              hover:border-orange-400/35 group cursor-pointer
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
                  <CardTitle className="text-lg sm:text-xl font-space-grotesk text-white font-semibold">
                    {card.title}
                  </CardTitle>
                  <p className="text-sm sm:text-base text-blue-100/90 mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`
                text-xl sm:text-2xl font-bold font-space-grotesk
                group-hover:scale-110 transition-transform duration-300
                ${card.valueGradient 
                  ? 'gradient-gold' 
                  : `bg-gradient-to-r ${card.color} bg-clip-text text-transparent`
                }
              `}>
                {card.value}
                {card.title === 'Ranking' && <span className="ml-1">🏆</span>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
