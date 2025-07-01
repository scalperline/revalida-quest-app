
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, ArrowRight, Crown, Zap, Star } from 'lucide-react';

interface JourneyMapProps {
  currentPlan: string;
}

export function MedicalJourneyMap({ currentPlan }: JourneyMapProps) {
  const journeyStages = [
    {
      plan: 'Gratuito',
      title: 'Estudante Iniciante',
      description: 'Primeiros passos na jornada médica',
      icon: Stethoscope,
      color: 'from-gray-400 to-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      emoji: '🩺'
    },
    {
      plan: 'Basic',
      title: 'Residente Dedicado',
      description: 'Aprofundando conhecimentos clínicos',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      emoji: '⭐'
    },
    {
      plan: 'Premium',
      title: 'Especialista Elite',
      description: 'Dominando a arte médica',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      emoji: '👑'
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          🗺️ Sua Jornada Médica
        </h2>
        <p className="text-gray-600">Evolua através dos estágios da preparação para o Revalida</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
        {journeyStages.map((stage, index) => {
          const isActive = currentPlan === stage.plan;
          const isPassed = journeyStages.findIndex(s => s.plan === currentPlan) > index;
          const Icon = stage.icon;

          return (
            <div key={stage.plan} className="flex items-center">
              <Card className={`
                relative transition-all duration-300 hover:scale-105
                ${isActive ? 'ring-4 ring-yellow-300 shadow-2xl scale-105' : ''}
                ${isPassed ? 'opacity-75' : ''}
                ${stage.bgColor} ${stage.borderColor} border-2
              `}>
                <CardContent className="p-6 text-center">
                  {isActive && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">
                      Você está aqui!
                    </Badge>
                  )}
                  
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stage.color} rounded-full flex items-center justify-center ${isActive ? 'animate-pulse' : ''}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-3xl mb-2">{stage.emoji}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{stage.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {stage.plan}
                  </Badge>
                </CardContent>
              </Card>

              {index < journeyStages.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mx-2 hidden md:block animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
