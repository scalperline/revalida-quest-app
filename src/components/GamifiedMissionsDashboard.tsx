
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame, Star, Zap, Award } from 'lucide-react';

export function GamifiedMissionsDashboard() {
  const { userProgress } = useGamification();
  
  const stats = [
    {
      label: 'Nível',
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
      value: `${userProgress.streakDias}d`,
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className={`${stat.bgColor} border-2 transition-all duration-300 hover:shadow-lg`}>
            <CardContent className="p-2 sm:p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">{stat.label}</p>
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
