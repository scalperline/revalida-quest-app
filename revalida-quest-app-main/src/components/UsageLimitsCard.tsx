
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Crown, Zap, ArrowRight, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMissions } from '@/hooks/useMissions';
import { useEffect, useState } from 'react';

export function UsageLimitsCard() {
  const navigate = useNavigate();
  const { 
    usageLimits, 
    subscribed, 
    subscription_tier, 
    canUseFeature,
    loading 
  } = useSubscription();

  const { getMissionLimit, getMissionAttemptsThisMonth, missions } = useMissions();
  const [missionsAttempts, setMissionsAttempts] = useState<{used: number, limit: number} | null>(null);
  useEffect(() => {
    let mounted = true;
    async function fetchMissionAttempts() {
      if (!missions || missions.length === 0) return;
      const limit = getMissionLimit();
      let maxUsed = 0;
      for (const mission of missions) {
        const used = await getMissionAttemptsThisMonth(mission.id);
        if (used > maxUsed) maxUsed = used;
      }
      if (mounted) setMissionsAttempts({ used: maxUsed, limit });
    }
    fetchMissionAttempts();
    return () => { mounted = false; };
  }, [missions, getMissionLimit, getMissionAttemptsThisMonth]);

  if (loading || !usageLimits) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Free plan limits
  const dailyQuestionsLimit = 10;

  const questionsUsed = usageLimits.daily_questions_used;

  const questionsPercentage = subscribed ? 100 : (questionsUsed / dailyQuestionsLimit) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Seu Uso
          </CardTitle>
          {subscribed && (
            <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
              <Crown className="w-4 h-4" />
              {subscription_tier}
            </div>
          )}
        </div>
        <CardDescription>
          {subscribed 
            ? `Plano ${subscription_tier} - Acesso ilimitado a todas as funcionalidades`
            : 'Plano Gratuito - Experimente nossas funcionalidades premium'
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Questions Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Questões (hoje)</span>
            </div>
            <span className="text-gray-600">
              {subscribed ? 'Ilimitado' : `${questionsUsed}/${dailyQuestionsLimit}`}
            </span>
          </div>
          <Progress 
            value={questionsPercentage} 
            className="h-2"
          />
          {!subscribed && questionsUsed >= dailyQuestionsLimit && (
            <p className="text-xs text-red-600">
              Limite diário atingido. Faça upgrade para continuar!
            </p>
          )}
        </div>

        {/* Missões Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="font-medium">Missões (mês)</span>
            </div>
            <span className="text-gray-600">
              {subscribed ? 'Ilimitado' : missionsAttempts ? `${missionsAttempts.used}/${missionsAttempts.limit === 9999 ? '∞' : missionsAttempts.limit}` : '...'}
            </span>
          </div>
          <Progress 
            value={subscribed ? 100 : missionsAttempts ? (missionsAttempts.used / missionsAttempts.limit) * 100 : 0} 
            className="h-2 bg-purple-100"
          />
          {!subscribed && missionsAttempts && missionsAttempts.used >= missionsAttempts.limit && missionsAttempts.limit !== 9999 && (
            <p className="text-xs text-red-600">
              Limite mensal de missões atingido. Faça upgrade para continuar!
            </p>
          )}
        </div>

        {!subscribed && (
          <div className="pt-4 border-t">
            <Button 
              onClick={() => navigate('/pricing')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <Crown className="w-4 h-4 mr-2" />
              Fazer Upgrade
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Desbloqueie questões ilimitadas
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
