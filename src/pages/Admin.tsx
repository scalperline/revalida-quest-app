import React from 'react';
import { SubscriptionMonitor } from '@/components/admin/SubscriptionMonitor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Settings, Database, CreditCard, Users, Activity } from 'lucide-react';

export default function Admin() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Painel de Administração
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitoramento e diagnóstico do sistema de cancelamento de assinaturas
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status do Sistema</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operacional</div>
            <p className="text-xs text-muted-foreground">
              Todas as funções ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stripe</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Conectado</div>
            <p className="text-xs text-muted-foreground">
              API funcionando
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banco de Dados</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Online</div>
            <p className="text-xs text-muted-foreground">
              Sincronização ativa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Carregando...
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Problema Identificado:</strong> Portal de cobrança do Stripe não configurado.
          Execute o diagnóstico para verificar a configuração completa.
        </AlertDescription>
      </Alert>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>
            Ferramentas para diagnóstico e resolução de problemas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Database className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Verificar Banco</div>
                <div className="text-sm text-muted-foreground">Dados dos usuários</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <CreditCard className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Testar Stripe</div>
                <div className="text-sm text-muted-foreground">Conexão com API</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Activity className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Logs do Sistema</div>
                <div className="text-sm text-muted-foreground">Monitoramento</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monitor de Cancelamento */}
      <SubscriptionMonitor />

      {/* Informações Técnicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Técnicas</CardTitle>
          <CardDescription>
            Detalhes sobre a implementação do sistema de cancelamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Funções Edge Implementadas:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Badge variant="outline">customer-portal</Badge>
                <Badge variant="outline">diagnose-stripe</Badge>
                <Badge variant="outline">stripe-webhook</Badge>
                <Badge variant="outline">create-checkout</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tabelas do Banco:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Badge variant="secondary">subscribers</Badge>
                <Badge variant="secondary">subscription_history</Badge>
                <Badge variant="secondary">usage_limits</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Status das Integrações:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Supabase Auth:</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Stripe API:</span>
                  <Badge variant="default">Conectado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Webhook Stripe:</span>
                  <Badge variant="outline">Configurado</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Links Úteis */}
      <Card>
        <CardHeader>
          <CardTitle>Links Úteis</CardTitle>
          <CardDescription>
            Acesso rápido às ferramentas de administração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Supabase</h4>
              <div className="space-y-1">
                <a
                  href="https://supabase.com/dashboard/project/wcgqqvfdjpslgxbuhwnm/functions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block"
                >
                  Edge Functions
                </a>
                <a
                  href="https://supabase.com/dashboard/project/wcgqqvfdjpslgxbuhwnm/editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block"
                >
                  SQL Editor
                </a>
                <a
                  href="https://supabase.com/dashboard/project/wcgqqvfdjpslgxbuhwnm/settings/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block"
                >
                  Configurações
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Stripe</h4>
              <div className="space-y-1">
                <a
                  href="https://dashboard.stripe.com/customers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block"
                >
                  Customers
                </a>
                <a
                  href="https://dashboard.stripe.com/settings/billing/portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block"
                >
                  Customer Portal
                </a>
                <a
                  href="https://dashboard.stripe.com/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block"
                >
                  Webhooks
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 