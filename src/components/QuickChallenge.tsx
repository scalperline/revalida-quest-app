
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
      duration: 5 as const,
      title: 'Relâmpago',
      description: '5 questões em 5 min',
      reward: '+30 XP',
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
    },
    {
      duration: 10 as const,
      title: 'Express',
      description: '10 questões em 10 min',
      reward: '+60 XP',
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
    }
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
          <span className="leading-tight">Desafio Relâmpago INEP</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {challenges.map(challenge => (
            <div
              key={challenge.duration}
              className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedDuration === challenge.duration
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedDuration(challenge.duration)}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                {challenge.icon}
                <h3 className="font-semibold text-sm sm:text-base leading-tight">{challenge.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-tight">
                {challenge.description}
              </p>
              <Badge variant="secondary" className="text-xs">
                {challenge.reward}
              </Badge>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-3 sm:p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
            <span className="font-medium text-orange-800 dark:text-orange-200 text-sm sm:text-base">
              Bônus Performance
            </span>
          </div>
          <ul className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 space-y-1">
            <li>• 100% acerto: +50 XP bônus</li>
            <li>• 80%+ acerto: +25 XP bônus</li>
            <li>• Tempo restante: +1 XP/seg</li>
          </ul>
        </div>

        <Button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base"
          size="lg"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
          Iniciar {selectedDuration} Min
        </Button>

        {userProgress.streakDias > 0 && (
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            🔥 Streak: +{Math.min(userProgress.streakDias * 2, 20)} XP bônus
          </div>
        )}
      </CardContent>
    </Card>
  );
}
