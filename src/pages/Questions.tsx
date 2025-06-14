
import { QuestionCard } from "@/components/QuestionCard";
import { useState } from "react";

// Demo: Simulando banco de dados de questões
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

export default function Questions() {
  const [filtro, setFiltro] = useState("");
  const questoesFiltradas = QUESTOES.filter(q =>
    q.enunciado.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.area.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.year.toString().includes(filtro)
  );

  return (
    <div className="max-w-4xl mx-auto pt-8 px-2">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold">Banco de Questões Oficiais</h2>
        <input
          className="border px-3 py-2 rounded-lg max-w-xs"
          placeholder="Buscar por enunciado, área ou ano..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
      </div>
      {questoesFiltradas.length === 0 ? (
        <div className="text-center text-muted-foreground py-32">Nenhuma questão encontrada.</div>
      ) : (
        <div>
          {questoesFiltradas.map(q => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
      <div className="mt-16 text-sm text-muted-foreground text-center">
        Dados fictícios para demonstração. Para produção, conectar com banco de questões oficial INEP.
      </div>
    </div>
  );
}
