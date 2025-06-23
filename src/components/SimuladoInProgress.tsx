
import { ArrowLeft, ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { FloatingTimer } from "@/components/FloatingTimer";

interface SimuladoInProgressProps {
  simulado: any;
  configuracao: any;
  questaoRespondida: boolean;
  timeElapsed: number;
  timerRunning: boolean;
  onVoltarConfiguracao: () => void;
  onResposta: (optionId: string) => void;
  onContinuar: () => void;
  onEncerrar: () => void;
}

export function SimuladoInProgress({
  simulado,
  configuracao,
  questaoRespondida,
  timeElapsed,
  timerRunning,
  onVoltarConfiguracao,
  onResposta,
  onContinuar,
  onEncerrar
}: SimuladoInProgressProps) {
  return (
    <div className="pt-8">
      {/* Header com botão voltar */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onVoltarConfiguracao}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar às Configurações
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
            <Target className="w-5 h-5" />
            Questão {simulado.index + 1} de {simulado.total}
          </div>
        </div>
        
        {simulado.atual && (
          <div>
            {/* Usando key para forçar re-render quando muda questão */}
            <QuestionCard
              key={`${simulado.atual.id}-${simulado.index}`}
              question={simulado.atual}
              showAnswer={questaoRespondida}
              onAnswer={onResposta}
              disabled={questaoRespondida}
            />
            
            {/* Botão Continuar - só aparece quando respondida */}
            {questaoRespondida && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={onContinuar}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Timer */}
      <FloatingTimer
        running={timerRunning}
        onFinish={onEncerrar}
        initialMinutes={configuracao.tempoMinutos}
        currentQuestion={simulado.index + 1}
        totalQuestions={simulado.total}
        onForceFinish={onEncerrar}
        timeElapsed={timeElapsed}
      />
    </div>
  );
}
