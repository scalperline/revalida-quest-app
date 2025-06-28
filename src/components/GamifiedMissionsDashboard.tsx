
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={stat.label} className={`${stat.bgColor} border-2 hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${stat.color} text-white shadow-md`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                <p className="text-xs text-gray-600 truncate">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* XP Progress Bar - Spans full width on mobile, half on larger screens */}
      <Card className="col-span-2 lg:col-span-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Progresso para Nível {userProgress.level + 1}</span>
            </div>
            <Badge variant="outline" className="bg-white border-blue-300 text-blue-700">
              {userProgress.xp}/{userProgress.xpToNextLevel} XP
            </Badge>
          </div>
          <Progress value={xpPercentage} className="h-3 bg-gray-200" />
          <p className="text-xs text-gray-600 mt-2 text-center">
            Faltam {userProgress.xpToNextLevel - userProgress.xp} XP para o próximo nível
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
