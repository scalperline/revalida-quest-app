
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame, Star, Zap, Award } from 'lucide-react';

export function GamifiedMissionsDashboard() {
  const { userProgress } = useGamification();

  const stats = [
    {
      label: 'Nível Atual',
      value: userProgress.level,
      icon: Star,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50 border-yellow-200'
    },
    {
      label: 'XP Total', 
      value: userProgress.xp,
      icon: Zap,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      label: 'Sequência',
      value: `${userProgress.streakDias} dias`,
      icon: Flame,
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      label: 'Conquistas',
      value: userProgress.achievements?.filter(a => a.unlocked).length || 0,
      icon: Trophy,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50 border-purple-200'
    }
  ];

  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`${stat.bgColor} border-2 hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
