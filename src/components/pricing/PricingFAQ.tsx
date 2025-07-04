
import { Card, CardContent } from '@/components/ui/card';

export function PricingFAQ() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Perguntas Frequentes</h2>
      <div className="grid gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-white">Posso cancelar a qualquer momento?</h3>
            <p className="text-slate-300">
              Sim, você pode cancelar sua assinatura a qualquer momento através do portal do cliente. Não há taxas de cancelamento.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-white">Como funciona a Missão Suprema?</h3>
            <p className="text-slate-300">
              Complete 10 questões em 10 minutos com 100% de acerto e ganhe o Plano Premium pelo preço do Basic. Você tem 3 tentativas!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-white">Preciso de cartão de crédito para o plano gratuito?</h3>
            <p className="text-slate-300">
              Não, o plano gratuito não requer cartão de crédito. Apenas crie sua conta e comece a usar imediatamente.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-lg text-white">Posso fazer upgrade ou downgrade do meu plano?</h3>
            <p className="text-slate-300">
              Sim, você pode alterar seu plano a qualquer momento. As alterações são processadas imediatamente e o valor é ajustado proporcionalmente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
