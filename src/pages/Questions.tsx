import { QuestionCard } from "@/components/QuestionCard";
import { DiscursiveQuestionCard } from "@/components/DiscursiveQuestionCard";
import { useState } from "react";
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { QUESTOES_DISCURSIVAS_REVALIDA_2011 } from "@/data/questoesDiscursivasRevalida2011";
import { QUESTOES_REVALIDA_2012 } from "@/data/questoesRevalida2012";
import { QuestionsHeader } from "@/components/QuestionsHeader";

const QUESTOES_POR_PAGINA = 10;

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2011);
  const [tipoProva, setTipoProva] = useState<string>("objetiva");
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Filtros por tipo de prova
  const questoesObjetivas =
    anoSelecionado === 2011
      ? QUESTOES_REVALIDA_2011.filter((q) => q.year === anoSelecionado)
      : anoSelecionado === 2012
      ? QUESTOES_REVALIDA_2012.filter((q) => q.year === anoSelecionado)
      : [];

  const questoesDiscursivas =
    anoSelecionado === 2011
      ? QUESTOES_DISCURSIVAS_REVALIDA_2011.filter((q) => q.ano === anoSelecionado)
      : []; // Aqui entrará as discursivas de 2012 no futuro

  // Escolher a lista de questões conforme o tipo
  const questoesAnoSelecionado =
    tipoProva === "objetiva" ? questoesObjetivas : questoesDiscursivas;

  const totalPaginas = Math.ceil(questoesAnoSelecionado.length / QUESTOES_POR_PAGINA);

  // Paginação correta das questões por tipo
  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesPaginadas = questoesAnoSelecionado.slice(indiceInicio, indiceFim);

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
          className="flex items-center border border-muted rounded-lg px-3 py-2 text-base font-semibold bg-background hover:bg-muted transition-colors disabled:opacity-40"
          disabled={paginaAtual === 1}
          onClick={() => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1)}
        >
          <span className="mr-2">{'←'}</span>
          <span className="text-primary font-bold">anterior</span>
        </button>
        {items}
        <button
          className="flex items-center border border-muted rounded-lg px-3 py-2 text-base font-semibold bg-background hover:bg-muted transition-colors disabled:opacity-40"
          disabled={paginaAtual === totalPaginas}
          onClick={() => paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1)}
        >
          <span className="text-primary font-bold">próximo</span>
          <span className="ml-2">{'→'}</span>
        </button>
      </div>
    );
  }

  function handleAnoSelecionado(v: number) {
    setAnoSelecionado(v);
    setPaginaAtual(1);
  }

  // Quando troca o tipo de prova, volta para página 1
  function handleTipoProva(tipo: string) {
    setTipoProva(tipo);
    setPaginaAtual(1);
  }

  return (
    <div className="min-h-screen bg-background px-1 md:px-2 py-10 flex flex-col">
      <QuestionsHeader
        anoSelecionado={anoSelecionado}
        setAnoSelecionado={handleAnoSelecionado}
        totalQuestoes={questoesAnoSelecionado.length}
        tipoProva={tipoProva}
        setTipoProva={handleTipoProva}
      />

      {/* Questões */}
      <div>
        {questoesAnoSelecionado.length === 0 ? (
          <div className="text-center text-muted-foreground py-40 text-lg rounded-lg bg-card shadow max-w-2xl mx-auto">
            Nenhuma questão encontrada para este filtro.
          </div>
        ) : (
          <div>
            {tipoProva === "objetiva"
              ? questoesPaginadas.map((q) => (
                  // @ts-ignore
                  <QuestionCard key={q.id} question={q} />
                ))
              : questoesPaginadas.map((q: any) => (
                  <DiscursiveQuestionCard
                    key={q.id}
                    ordem={q.ordem}
                    titulo={q.titulo}
                    enunciado={q.enunciado}
                    imagem={q.imagem}
                    gabarito={q.gabarito}
                  />
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
