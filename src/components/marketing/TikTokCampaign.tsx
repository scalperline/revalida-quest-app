
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Share2, Copy, TrendingUp, Eye, Heart } from 'lucide-react';
import { useQuestions } from '@/hooks/useQuestions';
import { QuestionCard } from '@/components/QuestionCard';
import { toast } from 'sonner';

export function TikTokCampaign() {
  const { todasQuestoes } = useQuestions();
  const [currentVideoIdea, setCurrentVideoIdea] = useState(0);

  const videoIdeas = [
    {
      title: "Questão Pegadinha do Revalida 2024",
      description: "Mostre uma questão difícil sendo resolvida em 60 segundos",
      hashtags: "#revalida #medicina #medico #questoes #concurso #estudos",
      engagement: "~50K visualizações"
    },
    {
      title: "Erro Mais Comum no Revalida",
      description: "Explique um erro que 80% dos candidatos comete",
      hashtags: "#revalidabrasil #dicas #medicina #aprovacao #estudo",
      engagement: "~80K visualizações"
    },
    {
      title: "5 Questões em 60 Segundos",
      description: "Speed run de questões com explicações rápidas",
      hashtags: "#speedrun #revalida #questoes #medicina #rapido",
      engagement: "~120K visualizações"
    },
    {
      title: "Reação: Primeira Questão do Revalida",
      description: "Sua reação resolvendo uma questão pela primeira vez",
      hashtags: "#reacao #revalida #primeira #medicina #surpresa",
      engagement: "~90K visualizações"
    }
  ];

  const copyVideoScript = (idea: typeof videoIdeas[0]) => {
    const script = `🎬 ROTEIRO TIKTOK: ${idea.title}

📝 CONTEÚDO:
${idea.description}

🎯 HASHTAGS:
${idea.hashtags}

📊 POTENCIAL: ${idea.engagement}

🔗 CALL TO ACTION:
"Link na bio para mais questões! 👆
#RevalidaQuest - Sua aprovação garantida!"

📱 DICA DE GRAVAÇÃO:
- Use questões reais da plataforma
- Mantenha ritmo acelerado
- Adicione zoom nos pontos importantes
- Use música trending`;

    navigator.clipboard.writeText(script);
    toast.success("Roteiro copiado! Cole no seu bloco de notas 📝", {
      duration: 3000,
      className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
    });
  };

  const getRandomQuestion = () => {
    if (todasQuestoes.length === 0) return null;
    return todasQuestoes[Math.floor(Math.random() * todasQuestoes.length)];
  };

  const sampleQuestion = getRandomQuestion();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white border-0 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl lg:text-3xl font-bold mb-2">
            🎬 Campanha TikTok Viral
          </CardTitle>
          <p className="text-pink-100 text-lg">
            Roteiros prontos para viralizar e trazer milhares de usuários!
          </p>
        </CardHeader>
      </Card>

      {/* Video Ideas Carousel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-600" />
            Ideias de Vídeos Virais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {videoIdeas[currentVideoIdea].title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {videoIdeas[currentVideoIdea].description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {videoIdeas[currentVideoIdea].engagement}
                    </span>
                  </div>
                  <div className="text-sm text-blue-600 font-mono">
                    {videoIdeas[currentVideoIdea].hashtags}
                  </div>
                </div>
                <Badge className="bg-pink-500 text-white ml-4">
                  Viral Potential: HIGH
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => copyVideoScript(videoIdeas[currentVideoIdea])}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Roteiro Completo
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentVideoIdea((prev) => (prev + 1) % videoIdeas.length)}
                >
                  Próxima Ideia →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Question for Videos */}
      {sampleQuestion && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-600" />
              Questão Exemplo para Vídeo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-700 font-semibold mb-2">
                💡 Use esta questão no seu próximo vídeo TikTok!
              </p>
              <p className="text-xs text-yellow-600">
                Dica: Grave explicando a resposta em 60 segundos e use as hashtags acima
              </p>
            </div>
            <QuestionCard
              question={sampleQuestion}
              hideHeader={true}
              showAnswer={false}
              disabled={true}
            />
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📱 Script do Vídeo:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>0-5s:</strong> "Questão REAL do Revalida que derruba 70% dos candidatos..."</p>
                <p><strong>5-30s:</strong> Leia a questão e opções rapidamente</p>
                <p><strong>30-50s:</strong> Explique a resposta correta</p>
                <p><strong>50-60s:</strong> "Mais questões no link da bio! #RevalidaQuest"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            Métricas de Sucesso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">500K+</div>
              <div className="text-sm text-red-600">Likes Esperados/Mês</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Share2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-blue-600">Compartilhamentos</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">5K+</div>
              <div className="text-sm text-green-600">Novos Usuários/Dia</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
