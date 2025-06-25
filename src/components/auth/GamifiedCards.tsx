
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
      shadowColor: 'shadow-blue-500/40',
    },
    {
      title: 'Sistema XP',
      description: 'Ganhe experiência a cada resposta',
      icon: Heart,
      value: 'Ilimitado',
      color: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-600/40',
    },
    {
      title: 'Ranking',
      description: 'Compare seu progresso com outros médicos',
      icon: Trophy,
      value: 'Global',
      color: 'from-blue-700 to-blue-800',
      shadowColor: 'shadow-blue-700/40',
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
              bg-white/15 backdrop-blur-md border-2 border-blue-200/30 
              hover:bg-white/25 transition-all duration-500 ease-out
              hover:scale-105 ${card.shadowColor}
              hover:border-blue-200/45 group cursor-pointer
            `}
            style={{
              animation: `slideInLeft 0.8s ease-out ${index * 0.2}s both`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 8px 40px rgba(59, 130, 246, 0.2)'
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`
                  p-3 rounded-xl bg-gradient-to-r ${card.color} 
                  shadow-lg group-hover:shadow-xl transition-all duration-300
                  group-hover:scale-110
                `}
                style={{
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}>
                  <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl font-space-grotesk text-white font-semibold drop-shadow-sm">
                    {card.title}
                  </CardTitle>
                  <p className="text-sm sm:text-base text-blue-100 mt-1 leading-relaxed drop-shadow-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`
                text-xl sm:text-2xl font-bold bg-gradient-to-r ${card.color} 
                bg-clip-text text-transparent font-space-grotesk
                group-hover:scale-110 transition-transform duration-300
                drop-shadow-sm
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
