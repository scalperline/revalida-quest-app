
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QuestionCard } from "@/components/QuestionCard";
import { useState } from "react";
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { QUESTOES_REVALIDA_2012 } from "@/data/questoesRevalida2012";
import { QUESTOES_REVALIDA_2013 } from "@/data/questoesRevalida2013";
import { QUESTOES_REVALIDA_2013_VERMELHA } from "@/data/questoesRevalida2013Vermelha";
import { QUESTOES_REVALIDA_2014 } from "@/data/questoesRevalida2014";
import { QuestionsHeader } from "@/components/QuestionsHeader";
import { QUESTOES_REVALIDA_2014_VERMELHA } from "@/data/questoesRevalida2014Vermelha";
import { type Question } from "@/components/QuestionCard";
import { QUESTOES_REVALIDA_2015 } from "@/data/questoesRevalida2015";
import { QUESTOES_REVALIDA_2015_VERMELHA } from "@/data/questoesRevalida2015Vermelha";

const QUESTOES_POR_PAGINA = 10;

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2015);
  const [tipoProva, setTipoProva] = useState<string>("Cinza");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const questoesAnoSelecionado: any[] = (() => {
    if (anoSelecionado === 2011) {
      return QUESTOES_REVALIDA_2011;
    }
    if (anoSelecionado === 2012) {
      return QUESTOES_REVALIDA_2012;
    }
    if (anoSelecionado === 2013) {
      if (tipoProva === "Cinza") {
        return QUESTOES_REVALIDA_2013;
      }
      if (tipoProva === "Vermelha") {
        return QUESTOES_REVALIDA_2013_VERMELHA;
      }
      return [];
    }
    if (anoSelecionado === 2014) {
      if (tipoProva === "Cinza") {
        return QUESTOES_REVALIDA_2014;
      }
      if (tipoProva === "Vermelha") {
        return QUESTOES_REVALIDA_2014_VERMELHA;
      }
      return [];
    }
    if (anoSelecionado === 2015) {
      if (tipoProva === "Cinza") {
        return QUESTOES_REVALIDA_2015;
      }
      if (tipoProva === "Vermelha") {
        return QUESTOES_REVALIDA_2015_VERMELHA;
      }
      return [];
    }
    return [];
  })();

  const sortedQuestoes = [...questoesAnoSelecionado].sort((a, b) => a.id - b.id);

  const totalPaginas = Math.ceil(sortedQuestoes.length / QUESTOES_POR_PAGINA);

  // Paginação correta das questões por tipo
  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesPaginadas = sortedQuestoes.slice(indiceInicio, indiceFim);

  function renderPagination() {
    if (totalPaginas <= 1) return null;

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPaginas) {
        setPaginaAtual(page);
      }
    };

    const pageItems = [];
    let startPage = Math.max(1, paginaAtual - 2);
    let endPage = Math.min(totalPaginas, paginaAtual + 2);

    if (paginaAtual <= 3) {
      endPage = Math.min(5, totalPaginas);
    }
    if (paginaAtual >= totalPaginas - 2) {
      startPage = Math.max(1, totalPaginas - 4);
    }

    if (startPage > 1) {
      pageItems.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pageItems.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={paginaAtual === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPaginas) {
      if (endPage < totalPaginas - 1) {
        pageItems.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pageItems.push(
        <PaginationItem key={totalPaginas}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(totalPaginas); }}>
            {totalPaginas}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(paginaAtual - 1);
              }}
              className={paginaAtual === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pageItems}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(paginaAtual + 1);
              }}
              className={paginaAtual === totalPaginas ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  function handleAnoSelecionado(v: number) {
    setAnoSelecionado(v);
    setPaginaAtual(1);
  }

  function handleTipoProva(v: string) {
    setTipoProva(v);
    setPaginaAtual(1);
  }

  return (
    <div className="min-h-screen bg-background px-1 md:px-2 py-10 flex flex-col">
      <QuestionsHeader
        anoSelecionado={anoSelecionado}
        setAnoSelecionado={handleAnoSelecionado}
        totalQuestoes={sortedQuestoes.length}
        tipoProva={tipoProva}
        setTipoProva={handleTipoProva}
      />

      {/* Questões */}
      <div>
        {sortedQuestoes.length === 0 ? (
          <div className="text-center text-muted-foreground py-40 text-lg rounded-lg bg-card shadow max-w-2xl mx-auto">
            Nenhuma questão encontrada para este filtro.
          </div>
        ) : (
          <div>
            {questoesPaginadas.map((q) => (
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
