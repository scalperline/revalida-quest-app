
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
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
                Política de Privacidade - Revalida Quest
              </span>
            </h1>
            
            <p className="text-center text-gray-600 dark:text-gray-400">
              <strong>Última atualização:</strong> 26 de junho de 2025
            </p>
          </div>

          {/* Privacy Content */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50">
            <CardContent className="p-6 sm:p-8">
              <div className="prose prose-blue max-w-none">
                
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Introdução</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Esta Política de Privacidade descreve como o Revalida Quest coleta, usa, armazena e protege suas informações pessoais. 
                    Estamos comprometidos em proteger sua privacidade e cumprir a Lei Geral de Proteção de Dados (LGPD).
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">2. Informações que Coletamos</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">2.1 Informações de Cadastro</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Nome completo</li>
                    <li>Email</li>
                    <li>Senha (armazenada de forma criptografada)</li>
                    <li>Data de criação da conta</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">2.2 Informações de Uso</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Progresso nos estudos e estatísticas de desempenho</li>
                    <li>Questões respondidas e acertos/erros</li>
                    <li>Tempo gasto na plataforma</li>
                    <li>Funcionalidades utilizadas</li>
                    <li>XP, níveis e badges conquistados</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">2.3 Informações de Pagamento</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Dados de cobrança são processados pelo Stripe</li>
                    <li>Não armazenamos informações de cartão de crédito</li>
                    <li>Mantemos apenas registros de transações (valor, data, status)</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">2.4 Informações Técnicas</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Endereço IP</li>
                    <li>Tipo de dispositivo e navegador</li>
                    <li>Cookies e dados de sessão</li>
                    <li>Logs de acesso e erro</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">3. Como Utilizamos suas Informações</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">3.1 Para Fornecer o Serviço</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Criar e gerenciar sua conta</li>
                    <li>Processar pagamentos e renovações</li>
                    <li>Personalizar sua experiência de estudo</li>
                    <li>Fornecer estatísticas e relatórios de progresso</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">3.2 Para Melhorar o Serviço</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Analisar padrões de uso da plataforma</li>
                    <li>Identificar e corrigir problemas técnicos</li>
                    <li>Desenvolver novas funcionalidades</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">3.3 Para Comunicação</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Enviar confirmações de pagamento</li>
                    <li>Notificar sobre atualizações importantes</li>
                    <li>Responder a solicitações de suporte</li>
                    <li>Enviar newsletters (apenas com seu consentimento)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">4. Base Legal para Processamento (LGPD)</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">Processamos seus dados com base em:</p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>Execução de contrato:</strong> Para fornecer os serviços contratados</li>
                    <li><strong>Interesse legítimo:</strong> Para melhorar nossos serviços e prevenir fraudes</li>
                    <li><strong>Consentimento:</strong> Para comunicações de marketing (opcional)</li>
                    <li><strong>Obrigação legal:</strong> Para cumprir exigências fiscais e regulatórias</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">5. Compartilhamento de Informações</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">5.1 NÃO Compartilhamos:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Dados pessoais para fins comerciais</li>
                    <li>Informações de estudo com terceiros</li>
                    <li>Listas de usuários ou emails</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">5.2 Compartilhamento Necessário:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>Stripe:</strong> Para processamento de pagamentos</li>
                    <li><strong>Supabase:</strong> Para hospedagem segura dos dados</li>
                    <li><strong>Prestadores de serviço:</strong> Apenas dados necessários para operação</li>
                    <li><strong>Autoridades:</strong> Quando exigido por lei</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">6. Segurança dos Dados</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">6.1 Medidas de Proteção:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Criptografia de dados em trânsito e em repouso</li>
                    <li>Autenticação segura com Supabase</li>
                    <li>Monitoramento de acessos não autorizados</li>
                    <li>Backups regulares e seguros</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">6.2 Acesso Restrito:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Apenas funcionários autorizados acessam dados pessoais</li>
                    <li>Acesso registrado e monitorado</li>
                    <li>Treinamento regular sobre privacidade</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">7. Seus Direitos (LGPD)</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">Você tem o direito de:</p>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">7.1 Acesso</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Consultar quais dados temos sobre você</li>
                    <li>Obter cópia dos seus dados</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">7.2 Correção</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Atualizar dados incorretos ou incompletos</li>
                    <li>Modificar informações do perfil</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">7.3 Exclusão</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Solicitar a exclusão dos seus dados</li>
                    <li>Cancelar sua conta permanentemente</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">7.4 Portabilidade</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li>Exportar seus dados em formato legível</li>
                    <li>Transferir dados para outro serviço</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">7.5 Oposição</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Recusar o processamento para marketing</li>
                    <li>Cancelar newsletters e comunicações</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">8. Cookies e Tecnologias Similares</h2>
                  
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">8.1 Tipos de Cookies:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                    <li><strong>Essenciais:</strong> Necessários para funcionamento básico</li>
                    <li><strong>Funcionais:</strong> Melhoram a experiência do usuário</li>
                    <li><strong>Analíticos:</strong> Ajudam a entender como você usa o site</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">8.2 Gerenciamento:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Você pode gerenciar cookies nas configurações do navegador</li>
                    <li>Alguns cookies são essenciais para o funcionamento da plataforma</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">9. Retenção de Dados</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>Dados de conta:</strong> Mantidos enquanto a conta estiver ativa</li>
                    <li><strong>Dados de pagamento:</strong> 5 anos para fins fiscais</li>
                    <li><strong>Logs de acesso:</strong> 6 meses</li>
                    <li><strong>Dados de marketing:</strong> Até você cancelar o consentimento</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">10. Transferência Internacional</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Seus dados podem ser processados em servidores fora do Brasil</li>
                    <li>Utilizamos apenas fornecedores com adequado nível de proteção</li>
                    <li>Stripe e Supabase possuem certificações de segurança internacionais</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">11. Menores de Idade</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Não coletamos intencionalmente dados de menores de 18 anos</li>
                    <li>Se identificarmos dados de menores, eles serão excluídos</li>
                    <li>Pais/responsáveis podem solicitar exclusão de dados de menores</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">12. Alterações nesta Política</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Podemos atualizar esta política periodicamente</li>
                    <li>Mudanças significativas serão comunicadas por email</li>
                    <li>A versão mais atual estará sempre disponível em nossa plataforma</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">13. Autoridade de Controle</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    Em caso de dúvidas sobre tratamento de dados, você pode contatar:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>ANPD (Autoridade Nacional de Proteção de Dados)</strong></li>
                    <li>Site: www.gov.br/anpd</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">14. Contato para Privacidade</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    <strong>Encarregado de Dados (DPO):</strong><br />
                    Email: privacidade@revalidaquest.com<br />
                    Resposta em até 15 dias úteis
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Suporte Geral:</strong><br />
                    Email: suporte@revalidaquest.com
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">15. Consentimento</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Ao usar o Revalida Quest, você consente com o tratamento dos seus dados conforme descrito nesta política.
                  </p>
                </section>

                <div className="border-t pt-6 mt-8">
                  <p className="text-center text-gray-600 dark:text-gray-400 italic">
                    Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
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
