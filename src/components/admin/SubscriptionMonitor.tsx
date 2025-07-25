import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisResult {
  success: boolean;
  diagnosis: {
    environment: {
      stripeKeyExists: boolean;
      stripeKeyFormat: string;
      supabaseUrlExists: boolean;
      supabaseKeyExists: boolean;
    };
    stripe: {
      accountStatus: string;
      billingPortalEnabled: boolean;
      customerExists: boolean;
      customerId: string | null;
    };
    database: {
      subscriberExists: boolean;
      customerIdInDb: string | null;
    };
    errors: string[];
  };
  recommendations: string[];
}

export function SubscriptionMonitor() {
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { toast } = useToast();

  const runDiagnosis = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('diagnose-stripe');

      if (error) throw error;

      setDiagnosis(data);

      toast({
        title: data.success ? "Diagnóstico Concluído ✅" : "Problemas Encontrados ⚠️",
        description: data.success
          ? "Todas as configurações estão corretas"
          : `${data.diagnosis.errors.length} problema(s) encontrado(s)`,
        variant: data.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Erro no diagnóstico:', error);
      toast({
        title: "Erro no Diagnóstico ❌",
        description: "Não foi possível executar o diagnóstico",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', 'oabquestion@gmail.com')
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'active': 'default',
      'inactive': 'destructive',
      'unknown': 'secondary',
      'valid': 'default',
      'invalid': 'destructive',
    };

    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Monitor de Cancelamento de Assinatura
          </CardTitle>
          <CardDescription>
            Diagnóstico completo do sistema de cancelamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              onClick={runDiagnosis}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Executar Diagnóstico
            </Button>

            <Button
              onClick={fetchUserData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar Dados
            </Button>
          </div>

          {/* Dados do Usuário */}
          {userData && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Dados do Usuário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Email:</span> {userData.email}
                  </div>
                  <div>
                    <span className="font-medium">Assinado:</span>
                    {getStatusIcon(userData.subscribed)}
                  </div>
                  <div>
                    <span className="font-medium">Tier:</span> {userData.subscription_tier}
                  </div>
                  <div>
                    <span className="font-medium">Customer ID:</span>
                    {userData.stripe_customer_id || 'Não definido'}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resultado do Diagnóstico */}
          {diagnosis && (
            <div className="space-y-4">
              {/* Status Geral */}
              <Alert className={diagnosis.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Status Geral:</strong> {diagnosis.success ? "Tudo OK" : "Problemas Detectados"}
                </AlertDescription>
              </Alert>

              {/* Ambiente */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuração do Ambiente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span>Stripe Key:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(diagnosis.diagnosis.environment.stripeKeyExists)}
                        {getStatusBadge(diagnosis.diagnosis.environment.stripeKeyFormat)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Supabase URL:</span>
                      {getStatusIcon(diagnosis.diagnosis.environment.supabaseUrlExists)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Supabase Key:</span>
                      {getStatusIcon(diagnosis.diagnosis.environment.supabaseKeyExists)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stripe */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status do Stripe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span>Conta:</span>
                      {getStatusBadge(diagnosis.diagnosis.stripe.accountStatus)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Portal de Cobrança:</span>
                      {getStatusIcon(diagnosis.diagnosis.stripe.billingPortalEnabled)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer Existe:</span>
                      {getStatusIcon(diagnosis.diagnosis.stripe.customerExists)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer ID:</span>
                      <span className="text-sm font-mono">
                        {diagnosis.diagnosis.stripe.customerId || 'Não encontrado'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Banco de Dados */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Banco de Dados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span>Subscriber Existe:</span>
                      {getStatusIcon(diagnosis.diagnosis.database.subscriberExists)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer ID no DB:</span>
                      <span className="text-sm font-mono">
                        {diagnosis.diagnosis.database.customerIdInDb || 'Não encontrado'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Erros */}
              {diagnosis.diagnosis.errors.length > 0 && (
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">Erros Encontrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm text-red-600">
                      {diagnosis.diagnosis.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Recomendações */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">Recomendações</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {diagnosis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 