
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Crown, Zap, ArrowRight, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UsageLimitsCard() {
  const navigate = useNavigate();
  const { 
    usageLimits, 
    subscribed, 
    subscription_tier, 
    canUseFeature,
    loading 
  } = useSubscription();

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
  const monthlySimuladosLimit = 1;

  const questionsUsed = usageLimits.daily_questions_used;
  const simuladosUsed = usageLimits.monthly_simulados_used;

  const questionsPercentage = subscribed ? 100 : (questionsUsed / dailyQuestionsLimit) * 100;
  const simuladosPercentage = subscribed ? 100 : (simuladosUsed / monthlySimuladosLimit) * 100;

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

        {/* Simulados Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Simulados (mês)</span>
            </div>
            <span className="text-gray-600">
              {subscribed ? 'Ilimitado' : `${simuladosUsed}/${monthlySimuladosLimit}`}
            </span>
          </div>
          <Progress 
            value={simuladosPercentage} 
            className="h-2"
          />
          {!subscribed && simuladosUsed >= monthlySimuladosLimit && (
            <p className="text-xs text-red-600">
              Limite mensal atingido. Faça upgrade para mais simulados!
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
              Desbloqueie questões e simulados ilimitados
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
