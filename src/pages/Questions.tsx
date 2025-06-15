
import { QuestionCard } from "@/components/QuestionCard";
import { useState } from "react";
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { QuestionsHeader } from "@/components/QuestionsHeader";

const ESPECIALIDADES = [
  { value: "clinica-medica", label: "Clínica Médica" },
  { value: "cirurgia-geral", label: "Cirurgia Geral" },
  { value: "ginecologia-obstetricia", label: "Ginecologia e Obstetrícia" },
  { value: "pediatria", label: "Pediatria" },
  { value: "medicina-preventiva", label: "Medicina Preventiva" },
];
const TEMAS = [
  { value: "tema1", label: "Tema 1" },
  { value: "tema2", label: "Tema 2" },
];

const QUESTOES_POR_PAGINA = 10;

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2011);
  const [especialidade, setEspecialidade] = useState<string>(ESPECIALIDADES[0].value);
  const [temaSelecionado, setTemaSelecionado] = useState<string>(TEMAS[0].value);
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [abaSelecionada, setAbaSelecionada] = useState<"todas" | "favoritas" | "erradas" | "acertadas">("todas");

  // Inclui todas as questões do ano selecionado
  const questoesAnoSelecionado =
    anoSelecionado === 2011
      ? QUESTOES_REVALIDA_2011.filter((q) => q.year === anoSelecionado)
      : [];

  // Filtros aplicados corretamente ao banco
  const questoesFiltradas = questoesAnoSelecionado.filter((q) =>
    (especialidade ? q.area.toLocaleLowerCase().replace(/ /g, "-") === especialidade : true) &&
    (temaSelecionado ? q.enunciado.toLocaleLowerCase().includes(temaSelecionado) : true) &&
    (
      q.enunciado.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
      q.area.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
      q.year.toString().includes(filtro)
    )
  );

  const totalPaginas = Math.ceil(questoesFiltradas.length / QUESTOES_POR_PAGINA);

  // Paginação correta das questões (1 a 110)
  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesPaginadas = questoesFiltradas.slice(indiceInicio, indiceFim);

  // Sempre que filtro ou ano muda, volta para página 1
  function atualizarFiltro(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltro(e.target.value);
    setPaginaAtual(1);
  }

  // Renderização da paginação (simplificada para clareza, pode customizar conforme o código original)
  function renderPagination() {
    if (totalPaginas <= 1) return null;
    const items = [];
    let start = Math.max(1, paginaAtual - 2);
    let end = Math.min(totalPaginas, paginaAtual + 2);

    if (paginaAtual <= 3) {
      end = Math.min(5, totalPaginas);
    }
    if (paginaAtual >= totalPaginas - 2) {
      start = Math.max(1, totalPaginas - 4);
    }

    if (start > 1) {
      items.push(
        <button key={1} onClick={() => setPaginaAtual(1)} className={`px-3 py-1 rounded-lg text-sm ${paginaAtual === 1 ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}>1</button>
      );
      if (start > 2) items.push(<span key="start-ellipsis" className="px-2 select-none">...</span>);
    }
    for (let i = start; i <= end; ++i) {
      items.push(
        <button key={i} onClick={() => setPaginaAtual(i)} className={`px-3 py-1 rounded-lg text-sm ${paginaAtual === i ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}>{i}</button>
      );
    }
    if (end < totalPaginas) {
      if (end < totalPaginas - 1) items.push(<span key="end-ellipsis" className="px-2 select-none">...</span>);
      items.push(
        <button key={totalPaginas} onClick={() => setPaginaAtual(totalPaginas)} className={`px-3 py-1 rounded-lg text-sm ${paginaAtual === totalPaginas ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}>{totalPaginas}</button>
      );
    }
    return (
      <div className="flex gap-1 md:gap-2">
        <button
          className="px-2 py-1 rounded disabled:opacity-40"
          disabled={paginaAtual === 1}
          onClick={() => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1)}
        >
          {"<"}
        </button>
        {items}
        <button
          className="px-2 py-1 rounded disabled:opacity-40"
          disabled={paginaAtual === totalPaginas}
          onClick={() => paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1)}
        >
          {">"}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-1 md:px-2 py-10 flex flex-col">
      <QuestionsHeader
        filtro={filtro}
        setFiltro={(v) => { setFiltro(v); setPaginaAtual(1); }}
        especialidade={especialidade}
        setEspecialidade={(v) => { setEspecialidade(v); setPaginaAtual(1); }}
        anoSelecionado={anoSelecionado}
        setAnoSelecionado={(v) => { setAnoSelecionado(v); setPaginaAtual(1); }}
        temaSelecionado={temaSelecionado}
        setTemaSelecionado={(v) => { setTemaSelecionado(v); setPaginaAtual(1); }}
        totalQuestoes={questoesFiltradas.length}
        abaSelecionada={abaSelecionada}
        setAbaSelecionada={setAbaSelecionada}
      />

      {/* Questões */}
      <div>
        {questoesFiltradas.length === 0 ? (
          <div className="text-center text-muted-foreground py-40 text-lg rounded-lg bg-card shadow max-w-2xl mx-auto">
            Nenhuma questão encontrada.
          </div>
        ) : (
          <div>
            {questoesPaginadas.map(q => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>

      {/* Paginação */}
      <div className="flex-1" />
      <div className="max-w-6xl mx-auto mt-4 flex justify-end">
        {renderPagination()}
      </div>
      <div className="mt-16 text-xs text-muted-foreground text-center">
        Dados fictícios para demonstração. Para produção, conectar com banco de questões oficial INEP.
      </div>
    </div>
  );
}
