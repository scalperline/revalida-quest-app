
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAffiliateSystem } from '@/hooks/useAffiliateSystem';
import { Share2, Copy, DollarSign, Users, TrendingUp, Gift } from 'lucide-react';
import { toast } from 'sonner';

export function AffiliatePanel() {
  const { affiliateData, loading, generateAffiliateCode } = useAffiliateSystem();
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    const code = await generateAffiliateCode();
    if (code) {
      toast.success(`Código de afiliado criado: ${code}`, {
        duration: 3000,
        className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
      });
    }
  };

  const copyAffiliateLink = () => {
    if (!affiliateData?.affiliateCode) return;
    
    const link = `${window.location.origin}?ref=${affiliateData.affiliateCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copiado!", {
      duration: 2000,
      className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      platform: 'WhatsApp',
      url: `https://wa.me/?text=🎯 Descobri uma plataforma incrível para estudar para o Revalida! ${window.location.origin}?ref=${affiliateData?.affiliateCode}`,
      color: 'bg-green-500'
    },
    {
      platform: 'Telegram',
      url: `https://t.me/share/url?url=${window.location.origin}?ref=${affiliateData?.affiliateCode}&text=🎯 Plataforma completa para o Revalida!`,
      color: 'bg-blue-400'
    },
    {
      platform: 'Instagram',
      url: `https://www.instagram.com/`,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  if (loading) {
    return (
      <Card className="w-full animate-pulse">
        <CardContent className="p-6">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white border-0 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Share2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl lg:text-3xl font-bold mb-2">
            💰 Sistema de Afiliados
          </CardTitle>
          <p className="text-blue-100 text-lg">
            Ganhe 20% de comissão em cada venda que você indicar!
          </p>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      {affiliateData?.isAffiliate && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">R$ {affiliateData.totalEarnings.toFixed(2)}</div>
              <div className="text-green-100 text-sm">Total Ganho</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{affiliateData.referralCount}</div>
              <div className="text-blue-100 text-sm">Indicações</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{affiliateData.conversionRate.toFixed(1)}%</div>
              <div className="text-purple-100 text-sm">Taxa Conversão</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generate or Share Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            {affiliateData?.isAffiliate ? 'Seu Link de Afiliado' : 'Torne-se um Afiliado'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!affiliateData?.isAffiliate ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Gere seu código de afiliado e comece a ganhar R$ 15,98 por cada venda!
              </p>
              <Button onClick={handleGenerateCode} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Share2 className="w-4 h-4 mr-2" />
                Gerar Código de Afiliado
              </Button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <Input 
                  value={`${window.location.origin}?ref=${affiliateData.affiliateCode}`}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={copyAffiliateLink} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-500">Seu Código</Badge>
                  <code className="font-mono font-bold text-lg">{affiliateData.affiliateCode}</code>
                </div>
                <p className="text-sm text-yellow-700">
                  Compartilhe este link e ganhe R$ 15,98 (20%) para cada pessoa que assinar o Premium!
                </p>
              </div>

              {/* Quick Share Buttons */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Compartilhar Rapidamente:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {shareLinks.map((social) => (
                    <Button
                      key={social.platform}
                      onClick={() => window.open(social.url, '_blank')}
                      className={`${social.color} hover:opacity-90 text-white`}
                      size="sm"
                    >
                      {social.platform}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Marketing Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 Dicas de Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Badge className="bg-blue-100 text-blue-800 px-2 py-1">1</Badge>
              <p><strong>Grupos do WhatsApp:</strong> Compartilhe em grupos de médicos estrangeiros</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge className="bg-green-100 text-green-800 px-2 py-1">2</Badge>
              <p><strong>Redes Sociais:</strong> Poste sobre sua experiência com o RevalidaQuest</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge className="bg-purple-100 text-purple-800 px-2 py-1">3</Badge>
              <p><strong>Stories/TikTok:</strong> Mostre questões sendo resolvidas na plataforma</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge className="bg-orange-100 text-orange-800 px-2 py-1">4</Badge>
              <p><strong>Universidades:</strong> Compartilhe com colegas que estão estudando</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
