
import { useState } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Target, Trophy } from 'lucide-react';

interface QuickChallengeProps {
  onStart: () => void;
  className?: string;
}

export function QuickChallenge({ onStart, className }: QuickChallengeProps) {
  const { userProgress } = useGamification();
  const [selectedDuration, setSelectedDuration] = useState<5 | 10>(5);

  const challenges = [
    {
      duration: 5,
      title: 'Desafio Relâmpago',
      description: '5 questões em 5 minutos',
      reward: '+30 XP',
      icon: <Zap className="w-5 h-5 text-yellow-500" />
    },
    {
      duration: 10,
      title: 'Maratona Express',
      description: '10 questões em 10 minutos',
      reward: '+60 XP',
      icon: <Target className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Desafio Relâmpago INEP
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {challenges.map(challenge => (
            <div
              key={challenge.duration}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedDuration === challenge.duration
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedDuration(challenge.duration)}
            >
              <div className="flex items-center gap-3 mb-2">
                {challenge.icon}
                <h3 className="font-semibold">{challenge.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {challenge.description}
              </p>
              <Badge variant="secondary" className="text-xs">
                {challenge.reward}
              </Badge>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span className="font-medium text-orange-800 dark:text-orange-200">
              Bônus por Performance
            </span>
          </div>
          <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
            <li>• 100% acerto: +50 XP bônus</li>
            <li>• 80%+ acerto: +25 XP bônus</li>
            <li>• Tempo restante: +1 XP por segundo</li>
          </ul>
        </div>

        <Button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3"
          size="lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          Iniciar Desafio {selectedDuration} Min
        </Button>

        {userProgress.streakDias > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            🔥 Streak Ativo: +{Math.min(userProgress.streakDias * 2, 20)} XP bônus
          </div>
        )}
      </CardContent>
    </Card>
  );
}
