
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Trophy, Target, Zap, TrendingUp, Star, Award, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function GamifiedProgressBalance() {
  const { userProgress, getAccuracy } = useGamification();
  const { subscribed, subscription_tier } = useSubscription();
  
  const progressPercentage = userProgress.xpToNextLevel > 0 
    ? ((userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel) * 100
    : 0;

  const accuracy = getAccuracy();

  // Get plan info with elegant styling
  const getPlanInfo = () => {
    if (!subscribed) return { 
      name: 'Gratuito', 
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      icon: Target
    };
    
    switch (subscription_tier) {
      case 'Basic':
        return { 
          name: 'Basic', 
          color: 'from-blue-400 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          icon: Award
        };
      case 'Premium':
        return { 
          name: 'Premium', 
          color: 'from-purple-400 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          icon: Star
        };
      case 'Pro':
        return { 
          name: 'Pro', 
          color: 'from-amber-400 to-amber-600',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          icon: Crown
        };
      default:
        return { 
          name: 'Premium', 
          color: 'from-purple-400 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          icon: Star
        };
    }
  };

  const planInfo = getPlanInfo();
  const PlanIcon = planInfo.icon;

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50/30 border-blue-100 shadow-lg backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        {/* Header with Level and Plan */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-gray-700">{userProgress.level}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Nível {userProgress.level}</h3>
              <p className="text-sm text-gray-600">Aventureiro Médico</p>
            </div>
          </div>
          
          <Badge className={`${planInfo.bgColor} ${planInfo.textColor} border-0 px-3 py-1 font-medium`}>
            <PlanIcon className="w-3 h-3 mr-1" />
            {planInfo.name}
          </Badge>
        </div>

        {/* XP Progress with Elegant Animation */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Experiência</span>
            <span className="text-sm text-gray-600">
              {userProgress.xp}/{userProgress.xpToNextLevel} XP
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="absolute right-0 -top-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium shadow-md">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-800">Questões</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-900">{userProgress.totalQuestions}</div>
              <div className="text-xs text-blue-700">{userProgress.correctAnswers} acertos</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-emerald-800">Precisão</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-emerald-900">{accuracy.toFixed(0)}%</div>
              <div className="text-xs text-emerald-700">Taxa de acerto</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-purple-800">Sequência</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-900">{userProgress.streakDias}</div>
              <div className="text-xs text-purple-700">dias seguidos</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-orange-800">Simulados</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-900">{userProgress.simuladosCompletos}</div>
              <div className="text-xs text-orange-700">concluídos</div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Continue sua jornada!</p>
              <p className="text-xs text-green-700">
                Faltam {userProgress.xpToNextLevel - userProgress.xp} XP para o próximo nível
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
