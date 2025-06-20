
import { useState } from "react";
import { useSimulado } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { QuestionCard } from "@/components/QuestionCard";
import { Navbar } from "@/components/Navbar";
import { NavigationButtons } from "@/components/NavigationButtons";

// Usando o mesmo banco fictício
const QUESTOES = [
  {
    id: 1,
    year: 2022,
    area: "Clínica Médica",
    enunciado: `Paciente, 28 anos, apresenta febre, tosse produtiva há 3 dias. Ao exame, crepitações no pulmão direito. Assinale a alternativa correta sobre a conduta inicial:`,
    options: [
      { id: "A", text: "Observar em casa e prescrever antitérmico apenas." },
      { id: "B", text: "Internar e iniciar antibiótico endovenoso." },
      { id: "C", text: "Solicitar radiografia de tórax e prescrever antibiótico oral." },
      { id: "D", text: "Prescrever antiviral para influenza e liberar." }
    ],
    correct: "C",
    referencia: "Manual de Pneumonia INEP 2022"
  },
  {
    id: 2,
    year: 2021,
    area: "Pediatria",
    enunciado: `Criança de 2 anos, com desidratação grave. Qual a conduta prioritária?`,
    options: [
      { id: "A", text: "Indicação de antibióticos sem hidratação." },
      { id: "B", text: "Reposição oral com soro caseiro." },
      { id: "C", text: "Reposição venosa com solução isotônica." },
      { id: "D", text: "Alta para cuidados domiciliares." }
    ],
    correct: "C",
    referencia: "Manual de Reidratação INEP 2021"
  }
];

export default function Simulado() {
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const simulado = useSimulado(QUESTOES, 2);
  const { completeSimulado } = useGamification();
  const { playSound } = useAudio();

  function iniciar() {
    setIniciado(true);
    setFinalizado(false);
    playSound('click');
  }

  function encerrar() {
    setFinalizado(true);
    
    // Calculate score and update gamification
    const acertos = simulado.questoesSelecionadas.filter(
      (q) => simulado.respostas[q.id] === q.correct
    ).length;
    
    completeSimulado(acertos, simulado.total);
    
    // Play completion sound
    if (acertos / simulado.total >= 0.7) {
      playSound('achievement');
    } else {
      playSound('click');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Buttons */}
        <div className="mb-8">
          <NavigationButtons />
        </div>

        {!iniciado && (
          <div className="max-w-2xl mx-auto pt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Simulado Revalida</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Teste seus conhecimentos! Simulado baseado em questões reais do INEP. Cronômetro incluso.
                </p>
              </div>
              <button
                onClick={iniciar}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Iniciar Simulado
              </button>
            </div>
          </div>
        )}

        {(finalizado || simulado.terminou) && (
          <div className="max-w-3xl mx-auto pt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Resultado do Simulado</h2>
                <div className="text-2xl font-bold text-green-600 mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  🎯 Você acertou {simulado.questoesSelecionadas.filter(
                    (q) => simulado.respostas[q.id] === q.correct
                  ).length} de {simulado.total} questões
                </div>
              </div>
              <div className="space-y-6 mb-8">
                {simulado.questoesSelecionadas.map(q => (
                  <QuestionCard key={q.id} question={q} showAnswer />
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    setIniciado(false); 
                    setFinalizado(false);
                    window.scrollTo({top:0,behavior:"smooth"});
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Refazer Simulado
                </button>
              </div>
            </div>
          </div>
        )}

        {iniciado && !finalizado && !simulado.terminou && (
          <div className="max-w-3xl mx-auto pt-8">
            <div className="mb-6">
              <SimuladoTimer
                running={!finalizado && iniciado && !simulado.terminou}
                onFinish={encerrar}
                initialMinutes={2}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6 text-center text-blue-600">
                Questão {simulado.index + 1} de {simulado.total}
              </h2>
              {simulado.atual && (
                <div>
                  <QuestionCard
                    question={simulado.atual}
                    showAnswer={!!simulado.respostaAtual()}
                  />
                  {!simulado.respostaAtual() && (
                    <div className="flex justify-center mt-6 gap-3">
                      {simulado.atual.options.map(opt => (
                        <button
                          key={opt.id}
                          className="px-6 py-3 bg-gray-50 hover:bg-blue-50 dark:bg-gray-700 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 font-medium"
                          onClick={() => {
                            playSound('click');
                            simulado.responder(opt.id);
                            setTimeout(() => simulado.proxima(), 650);
                          }}
                          disabled={!!simulado.respostaAtual()}
                        >
                          {opt.id}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {iniciado && !finalizado && simulado.terminou && (
          <div className="text-center mt-12">
            <button
              onClick={encerrar}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Ver Resultado
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
