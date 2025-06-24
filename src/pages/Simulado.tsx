
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SimuladoHeader } from "@/components/SimuladoHeader";
import { QuestionCard } from "@/components/QuestionCard";
import { SimuladoProgress } from "@/components/SimuladoProgress";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { Button } from "@/components/ui/button";
import { useSimulado, type SimuladoConfig } from "@/hooks/useSimulado";
import { useQuestions } from "@/hooks/useQuestions";
import { useGamification } from "@/hooks/useGamification";

export default function Simulado() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { questoes } = useQuestions();
  const { completeSimulado } = useGamification();
  const [config, setConfig] = useState<SimuladoConfig | undefined>();
  const [simuladoIniciado, setSimuladoIniciado] = useState(false);
  const [resultados, setResultados] = useState<{[id: number]: boolean}>({});

  // Check for URL parameters on mount
  useEffect(() => {
    const areasParam = searchParams.get('areas');
    const quantidadeParam = searchParams.get('quantidade');
    
    if (areasParam || quantidadeParam) {
      const urlConfig: SimuladoConfig = {
        quantidade: quantidadeParam ? parseInt(quantidadeParam) : 10,
        areas: areasParam ? areasParam.split(',').filter(Boolean) : [],
        tempoMinutos: 120
      };
      
      setConfig(urlConfig);
      setSimuladoIniciado(true);
    }
  }, [searchParams]);

  const simulado = useSimulado(questoes, config);

  const handleStart = (newConfig: SimuladoConfig) => {
    setConfig(newConfig);
    setSimuladoIniciado(true);
  };

  const handleAnswer = (optionId: string) => {
    simulado.responder(optionId);
    const questaoAtual = simulado.atual;
    if (questaoAtual) {
      const correct = optionId === questaoAtual.correct;
      setResultados(prev => ({ ...prev, [questaoAtual.id]: correct }));
    }
  };

  const handleNext = () => {
    simulado.proxima();
  };

  const handleFinish = () => {
    const totalCorretas = Object.values(resultados).filter(Boolean).length;
    const porcentagem = (totalCorretas / simulado.total) * 100;
    
    completeSimulado({
      totalQuestions: simulado.total,
      correctAnswers: totalCorretas,
      percentage: porcentagem,
      areas: config?.areas || []
    });

    navigate('/estatisticas', {
      state: {
        simuladoCompleto: true,
        resultados: {
          total: simulado.total,
          acertos: totalCorretas,
          porcentagem
        }
      }
    });
  };

  const handleTimeUp = () => {
    handleFinish();
  };

  if (!simuladoIniciado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4">
          <SimuladoHeader onStart={handleStart} />
        </div>
      </div>
    );
  }

  if (simulado.terminou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎉 Simulado Concluído!
            </h1>
            <p className="text-lg text-muted-foreground">
              Parabéns! Você completou todas as {simulado.total} questões.
            </p>
            <Button 
              onClick={handleFinish}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Ver Resultados
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar com progresso e timer */}
          <div className="lg:w-80 space-y-4">
            <SimuladoProgress 
              current={simulado.index + 1} 
              total={simulado.total}
              answers={simulado.respostas}
              questions={simulado.questoesSelecionadas}
            />
            
            <SimuladoTimer 
              tempoMinutos={config?.tempoMinutos || 120}
              onTimeUp={handleTimeUp}
            />
          </div>
          
          {/* Questão atual */}
          <div className="flex-1">
            {simulado.atual && (
              <div className="space-y-6">
                <QuestionCard
                  question={simulado.atual}
                  onAnswer={handleAnswer}
                  showAnswer={!!simulado.respostaAtual()}
                />
                
                {simulado.respostaAtual() && (
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {simulado.index < simulado.total - 1 ? 'Próxima Questão' : 'Finalizar Simulado'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
