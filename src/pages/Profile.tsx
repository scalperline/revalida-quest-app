import { Navbar } from '@/components/Navbar';
import { ProfilePageHeader } from '@/components/ProfilePageHeader';
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
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <ProfilePageHeader />

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
