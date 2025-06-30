import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionBadge } from '@/components/SubscriptionBadge';
import { UsageMonitor } from '@/components/UsageMonitor';
import { PrivacySettings } from '@/components/PrivacySettings';
import { User, Crown, Settings, Mail, Calendar, ExternalLink } from 'lucide-react';
export default function Profile() {
  const {
    user
  } = useAuth();
  const {
    subscribed,
    openCustomerPortal
  } = useSubscription();
  const handleManageSubscription = () => {
    openCustomerPortal();
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent text-center">
              Meu Perfil
            </h1>
            <p className="mt-2 text-center text-slate-800">
              Gerencie sua conta e configurações
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informações da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm text-gray-600">{user?.email}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Plano:</span>
                  <SubscriptionBadge />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cadastro:</span>
                  <span className="text-sm text-gray-600">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                  </span>
                </div>

                {subscribed && <div className="pt-4 border-t">
                    <Button onClick={handleManageSubscription} className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Portal do Cliente
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Gerencie pagamentos e assinatura
                    </p>
                  </div>}
              </CardContent>
            </Card>

            {/* Usage Monitor */}
            <UsageMonitor />

            {/* Privacy Settings */}
            <div className="md:col-span-2">
              <PrivacySettings />
            </div>
          </div>
        </div>
      </div>
    </div>;
}