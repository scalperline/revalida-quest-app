
import { useState } from "react";
import { useSimulado } from "@/hooks/useSimulado";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { QuestionCard } from "@/components/QuestionCard";

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

  function iniciar() {
    setIniciado(true);
    setFinalizado(false);
  }

  function encerrar() {
    setFinalizado(true);
  }

  if (!iniciado)
    return (
      <div className="max-w-xl mx-auto pt-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Simulado Revalida</h2>
        <p className="mb-8 text-muted-foreground">
          Teste seus conhecimentos! Simulado baseado em questões reais do INEP. Cronômetro incluso.
        </p>
        <button
          onClick={iniciar}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold text-lg transition"
        >
          Iniciar Simulado
        </button>
      </div>
    );

  if (finalizado || simulado.terminou) {
    // calcular resultado
    const acertos = simulado.questoesSelecionadas.filter(
      (q, idx) => simulado.respostas[q.id] === q.correct
    ).length;

    return (
      <div className="max-w-2xl mx-auto pt-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Resultado do Simulado</h2>
        <div className="text-lg font-semibold text-green-700 mb-3">
          🎯 Você acertou {acertos} de {simulado.total} questões
        </div>
        <div className="grid gap-3 mb-4">
          {simulado.questoesSelecionadas.map(q => (
            <QuestionCard key={q.id} question={q} showAnswer />
          ))}
        </div>
        <button
          onClick={() => {
            setIniciado(false); setFinalizado(false);
            window.scrollTo({top:0,behavior:"smooth"});
          }}
          className="mt-5 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Refazer Simulado
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <div className="mb-3">
        <SimuladoTimer
          running={!finalizado && iniciado && !simulado.terminou}
          onFinish={encerrar}
          initialMinutes={2}
        />
      </div>
      <h2 className="text-lg font-bold mb-3">
        Questão {simulado.index + 1} de {simulado.total}
      </h2>
      {simulado.atual && (
        <div>
          <QuestionCard
            question={simulado.atual}
            showAnswer={!!simulado.respostaAtual()}
          />
          {!simulado.respostaAtual() && (
            <div className="flex justify-center mt-3">
              {simulado.atual.options.map(opt => (
                <button
                  key={opt.id}
                  className="mx-2 px-4 py-2 bg-secondary hover:bg-primary text-gray-700 rounded border transition"
                  onClick={() => {
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
      {!simulado.terminou ? null : (
        <div className="text-center mt-8">
          <button
            onClick={encerrar}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Ver Resultado
          </button>
        </div>
      )}
    </div>
  );
}
