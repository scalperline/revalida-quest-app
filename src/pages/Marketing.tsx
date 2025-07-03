
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { AffiliatePanel } from '@/components/marketing/AffiliatePanel';
import { TikTokCampaign } from '@/components/marketing/TikTokCampaign';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Video, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

export default function Marketing() {
  const [activeMetric, setActiveMetric] = useState('revenue');

  const metrics = {
    revenue: { value: 'R$ 15.500', change: '+127%', color: 'text-green-600' },
    users: { value: '2.847', change: '+89%', color: 'text-blue-600' },
    conversion: { value: '8.4%', change: '+34%', color: 'text-purple-600' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6">
              <Badge className="bg-red-500 text-white animate-pulse">FASE 1</Badge>
              <span className="font-semibold text-purple-800">Marketing de Guerrilha</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              🚀 <span className="gradient-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Centro de Marketing
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sistema completo para implementar a Fase 1 do plano milionário: 
              afiliados, campanhas virais e estratégias de conversão.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-green-200">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-2">R$ 15.500</div>
                <div className="text-sm text-gray-600">Receita Mensal Projetada</div>
                <Badge className="bg-green-100 text-green-800 mt-2">+127% vs. atual</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-blue-200">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-2">2.847</div>
                <div className="text-sm text-gray-600">Novos Usuários/Mês</div>
                <Badge className="bg-blue-100 text-blue-800 mt-2">+89% vs. atual</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-purple-200">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-2">8.4%</div>
                <div className="text-sm text-gray-600">Taxa de Conversão</div>
                <Badge className="bg-purple-100 text-purple-800 mt-2">+34% vs. atual</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="affiliates" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <TabsTrigger 
                value="affiliates" 
                className="flex items-center gap-3 p-4 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                Sistema de Afiliados
              </TabsTrigger>
              <TabsTrigger 
                value="tiktok" 
                className="flex items-center gap-3 p-4 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <Video className="w-5 h-5" />
                Campanha TikTok
              </TabsTrigger>
            </TabsList>

            <TabsContent value="affiliates" className="space-y-8">
              <AffiliatePanel />
            </TabsContent>

            <TabsContent value="tiktok" className="space-y-8">
              <TikTokCampaign />
            </TabsContent>
          </Tabs>

          {/* Action Plan Summary */}
          <Card className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
                Plano de Ação - Próximos 30 Dias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3 text-orange-800">🎯 Semana 1-2:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge className="bg-green-500 w-2 h-2 p-0 rounded-full"></Badge>
                      Gerar código de afiliado pessoal
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="bg-green-500 w-2 h-2 p-0 rounded-full"></Badge>
                      Criar primeiro vídeo TikTok
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="bg-green-500 w-2 h-2 p-0 rounded-full"></Badge>
                      Compartilhar em 5 grupos WhatsApp
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3 text-orange-800">🚀 Semana 3-4:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge className="bg-blue-500 w-2 h-2 p-0 rounded-full"></Badge>
                      Publicar 10 vídeos TikTok
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="bg-blue-500 w-2 h-2 p-0 rounded-full"></Badge>
                      Recrutar 5 afiliados
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="bg-blue-500 w-2 h-2 p-0 rounded-full"></Badge>
                      Meta: R$ 5K em vendas
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
