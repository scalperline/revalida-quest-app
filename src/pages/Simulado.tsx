
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SimuladoHeader } from "@/components/SimuladoHeader";
import { SimuladoProgress } from "@/components/SimuladoProgress";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { useQuestions } from "@/hooks/useQuestions";
import { useSimulado, type SimuladoConfig } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";

export default function Simulado() {
  const [config, setConfig] = useState<SimuladoConfig | undefined>(undefined);
  const questionsData = useQuestions();
  const simulado = useSimulado(questionsData.questoesAnoSelecionado || [], config);
  const { addXP } = useGamification();

  const handleStart = (newConfig: SimuladoConfig) => {
    setConfig(newConfig);
  };

  const handleFinish = () => {
    const score = Object.values(simulado.respostas).filter((resposta, index) => 
      resposta === simulado.questoesSelecionadas[index]?.gabarito
    ).length;
    
    addXP(score * 10);
    console.log(`Simulado finalizado! Pontuação: ${score}/${simulado.total}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Simulado Revalida</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Pratique com questões oficiais em formato de prova cronometrada ⏱️
            </p>
          </div>

          {!config ? (
            <SimuladoHeader onStart={handleStart} />
          ) : (
            <>
              <SimuladoProgress 
                currentQuestion={simulado.index + 1} 
                totalQuestions={simulado.total} 
              />
              
              {config.tempoMinutos && (
                <SimuladoTimer 
                  initialTime={config.tempoMinutos * 60} 
                  onTimeUp={handleFinish}
                />
              )}

              {simulado.atual && (
                <div className="mb-8">
                  <QuestionCard 
                    question={simulado.atual}
                    onAnswer={(resposta) => simulado.responder(resposta)}
                    selectedAnswer={simulado.respostaAtual()}
                  />
                  
                  <div className="flex justify-between mt-6">
                    <button 
                      className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                      disabled={simulado.index === 0}
                      onClick={() => {/* Implementar navegação anterior */}}
                    >
                      Anterior
                    </button>
                    
                    {simulado.index < simulado.total - 1 ? (
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={simulado.proxima}
                      >
                        Próxima
                      </button>
                    ) : (
                      <button 
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={handleFinish}
                      >
                        Finalizar
                      </button>
                    )}
                  </div>
                </div>
              )}

              {simulado.terminou && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Simulado Concluído!</h2>
                  <p>Suas respostas foram registradas.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
