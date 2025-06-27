
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
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
          {/* Header with Back Button */}
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Início
            </Link>
            
            <h1 className="text-3xl font-bold mb-2 text-center leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Termos de Uso - Revalida Quest
              </span>
            </h1>
            
            <p className="text-center text-gray-600 dark:text-gray-400">
              <strong>Última atualização:</strong> 26 de junho de 2025
            </p>
          </div>

          {/* Terms Content */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50">
            <CardContent className="p-6 sm:p-8">
              <div className="prose prose-blue max-w-none">
                
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Aceitação dos Termos</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Ao acessar e utilizar a plataforma Revalida Quest, você concorda com estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">2. Descrição do Serviço</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    O Revalida Quest é uma plataforma digital de preparação para o exame Revalida, oferecendo:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Banco de questões oficiais do Revalida (2011-2025)</li>
                    <li>Sistema de simulados</li>
                    <li>Sistema de gamificação e ranking</li>
                    <li>Estatísticas de desempenho</li>
                    <li>Planos de assinatura com diferentes níveis de acesso</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">3. Planos e Pagamentos</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">3.1 Planos Disponíveis</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li><strong>Gratuito:</strong> 10 questões por dia, 1 simulado por mês</li>
                    <li><strong>Basic (R$ 29,90/mês):</strong> Acesso ampliado às funcionalidades</li>
                    <li><strong>Premium (R$ 49,90/mês):</strong> Acesso completo a todas as funcionalidades</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">3.2 Cobrança e Renovação</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>As assinaturas são cobradas mensalmente de forma recorrente</li>
                    <li>O valor será debitado automaticamente na data de renovação</li>
                    <li>Você pode cancelar sua assinatura a qualquer momento através do portal do cliente</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">3.3 Política de Reembolso</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Reembolsos podem ser solicitados em até 7 dias após a cobrança</li>
                    <li>Não oferecemos reembolsos proporcionais para cancelamentos após o período de 7 dias</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">4. Uso Aceitável</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">4.1 Você Pode:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Utilizar o conteúdo para sua preparação pessoal para o Revalida</li>
                    <li>Compartilhar seu progresso nas redes sociais</li>
                    <li>Acessar o conteúdo de acordo com os limites do seu plano</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">4.2 Você NÃO Pode:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Compartilhar sua conta com terceiros</li>
                    <li>Reproduzir, distribuir ou comercializar o conteúdo da plataforma</li>
                    <li>Usar ferramentas automatizadas (bots) para acessar o serviço</li>
                    <li>Tentar contornar as limitações do seu plano</li>
                    <li>Usar o serviço para qualquer atividade ilegal</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">5. Propriedade Intelectual</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>O conteúdo das questões oficiais pertence aos órgãos responsáveis pelo Revalida</li>
                    <li>O sistema, interface e funcionalidades da plataforma são de propriedade do Revalida Quest</li>
                    <li>Você mantém os direitos sobre os dados que cria na plataforma (estatísticas, progresso)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">6. Privacidade e Dados</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Coletamos e processamos seus dados conforme nossa Política de Privacidade</li>
                    <li>Seus dados de desempenho são utilizados para melhorar sua experiência na plataforma</li>
                    <li>Não vendemos ou compartilhamos seus dados pessoais com terceiros sem consentimento</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">7. Disponibilidade do Serviço</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Nos esforçamos para manter o serviço disponível 24/7</li>
                    <li>Podem ocorrer interrupções para manutenção ou atualizações</li>
                    <li>Não nos responsabilizamos por perdas decorrentes de indisponibilidade temporária</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">8. Modificações dos Termos</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Podemos atualizar estes termos a qualquer momento</li>
                    <li>Mudanças significativas serão comunicadas por email</li>
                    <li>O uso continuado após as mudanças constitui aceitação dos novos termos</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">9. Cancelamento e Suspensão</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">9.1 Por Sua Parte:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Você pode cancelar sua conta a qualquer momento</li>
                    <li>O acesso permanece ativo até o final do período pago</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">9.2 Por Nossa Parte:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Podemos suspender contas que violem estes termos</li>
                    <li>Em casos graves, podemos encerrar contas sem reembolso</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">10. Limitação de Responsabilidade</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>O Revalida Quest é uma ferramenta de apoio aos estudos</li>
                    <li>Não garantimos aprovação no exame Revalida</li>
                    <li>Nossa responsabilidade é limitada ao valor pago pelos serviços</li>
                    <li>Não nos responsabilizamos por danos indiretos ou lucros cessantes</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">11. Suporte</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">Para dúvidas ou problemas:</p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Email: suporte@revalidaquest.com</li>
                    <li>Página de ajuda: /ajuda</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">12. Lei Aplicável</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca onde está localizada nossa sede.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">13. Contato</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    <strong>Revalida Quest</strong><br />
                    Email: contato@revalidaquest.com
                  </p>
                </section>

                <div className="border-t pt-6 mt-8">
                  <p className="text-center text-gray-600 dark:text-gray-400 italic">
                    Ao utilizar o Revalida Quest, você declara ter lido, compreendido e concordado com estes Termos de Uso.
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
