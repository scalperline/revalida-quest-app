
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Star, Zap, Trophy, Shield, Flame, Sparkles } from 'lucide-react';

interface ExclusiveBadgesProps {
  userPlan: string;
}

export function ExclusiveBadges({ userPlan }: ExclusiveBadgesProps) {
  const badgesByPlan = {
    Gratuito: [
      { name: 'Primeiro Passo', icon: Star, description: 'Completou o primeiro simulado', unlocked: true },
      { name: 'Estudante', icon: Zap, description: 'Respondeu 100 questões', unlocked: true },
    ],
    Basic: [
      { name: 'Dedicado', icon: Trophy, description: 'Acertou 80% em simulado', unlocked: false },
      { name: 'Consistente', icon: Flame, description: 'Streak de 7 dias', unlocked: false },
      { name: 'Explorador', icon: Shield, description: 'Testou todas as áreas', unlocked: false },
    ],
    Premium: [
      { name: 'Mestre Médico', icon: Crown, description: 'Acertou 95% em simulado', unlocked: false },
      { name: 'Elite', icon: Sparkles, description: 'Top 10 do ranking', unlocked: false },
      { name: 'Lendário', icon: Crown, description: 'Completou 50 simulados', unlocked: false },
      { name: 'Imortal', icon: Star, description: 'Streak de 30 dias', unlocked: false },
    ]
  };

  const isAccessible = (planRequired: string) => {
    const planHierarchy = { 'Gratuito': 0, 'Basic': 1, 'Premium': 2 };
    return planHierarchy[userPlan as keyof typeof planHierarchy] >= planHierarchy[planRequired as keyof typeof planHierarchy];
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🏆 Badges Exclusivas por Plano
        </h2>
        <p className="text-gray-600">Desbloqueie conquistas únicas em cada nível da sua jornada</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(badgesByPlan).map(([plan, badges]) => {
          const accessible = isAccessible(plan);
          
          return (
            <Card key={plan} className={`
              transition-all duration-300 hover:scale-105
              ${accessible ? 'bg-white border-2' : 'bg-gray-50 border-2 border-gray-200'}
              ${plan === 'Basic' ? 'border-blue-200' : plan === 'Premium' ? 'border-purple-200' : 'border-gray-200'}
              ${!accessible ? 'opacity-60' : ''}
            `}>
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {!accessible && <Lock className="w-4 h-4 text-gray-400" />}
                  <CardTitle className={`text-lg ${
                    plan === 'Basic' ? 'text-blue-600' : 
                    plan === 'Premium' ? 'text-purple-600' : 
                    'text-gray-600'
                  }`}>
                    {plan === 'Gratuito' ? '🆓' : plan === 'Basic' ? '⭐' : '👑'} {plan}
                  </CardTitle>
                </div>
                {!accessible && (
                  <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                    Upgrade necessário
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  const isLocked = !accessible;
                  
                  return (
                    <div key={index} className={`
                      flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200
                      ${isLocked ? 'bg-gray-100 border-gray-200' : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:border-gray-300'}
                    `}>
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isLocked ? 'bg-gray-300' : 
                          plan === 'Basic' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                          plan === 'Premium' ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
                          'bg-gradient-to-r from-gray-400 to-gray-500'
                        }
                      `}>
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Icon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                          {badge.name}
                        </h4>
                        <p className={`text-xs ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {badge.description}
                        </p>
                      </div>
                      
                      {!isLocked && (
                        <div className="text-xs text-gray-500">
                          {badge.unlocked ? '✅' : '🔒'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
