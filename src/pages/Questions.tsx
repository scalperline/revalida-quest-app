import { QuestionCard } from "@/components/QuestionCard";
import { useState } from "react";
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { QuestionsHeader } from "@/components/QuestionsHeader";

// NOVO: anos disponíveis para prova oficial
const ANOS_PROVA = [
  { value: 2011, label: "Revalida 2011" },
  // { value: 2012, label: "Revalida 2012" },
  // { value: 2013, label: "Revalida 2013" },
];

// Remover os valores "" dos filtros para Select. Usar valores default válidos.
const ESPECIALIDADES = [
  { value: "clinica-medica", label: "Clínica Médica" },
  { value: "cirurgia-geral", label: "Cirurgia Geral" },
  { value: "ginecologia-obstetricia", label: "Ginecologia e Obstetrícia" },
  { value: "pediatria", label: "Pediatria" },
  { value: "medicina-preventiva", label: "Medicina Preventiva" },
];
// TEMAS também precisa remover ""
const TEMAS = [
  { value: "tema1", label: "Tema 1" },
  { value: "tema2", label: "Tema 2" },
];

const QUESTOES_POR_PAGINA = 10;

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2011);
  const [especialidade, setEspecialidade] = useState<string>(ESPECIALIDADES[0].value); // default válido
  const [temaSelecionado, setTemaSelecionado] = useState<string>(TEMAS[0].value); // default válido
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [abaSelecionada, setAbaSelecionada] = useState<"todas" | "favoritas" | "erradas" | "acertadas">("todas");

  const questoesAnoSelecionado =
    anoSelecionado === 2011
      ? QUESTOES_REVALIDA_2011.filter((q) => q.year === anoSelecionado)
      : [];

  // Atualizando filtro UI (ajustado para valores válidos)
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

  // Calcula o índice de início e fim das questões para esta página
  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesPaginadas = questoesFiltradas.slice(indiceInicio, indiceFim);

  // Sempre que filtro ou ano mudar, voltar para página 1
  function atualizarFiltro(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltro(e.target.value);
    setPaginaAtual(1);
  }
  function atualizarAno(e: React.ChangeEvent<HTMLSelectElement>) {
    setAnoSelecionado(Number(e.target.value));
    setPaginaAtual(1);
    setFiltro("");
  }

  // Paginação (idêntica à existente)
  function renderPagination() {
    if (totalPaginas <= 1) return null;
    const items = [];
    const mostrarPaginas = Math.max(Math.min(7, totalPaginas), 1);

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
        <PaginationItem key={1}>
          <PaginationLink
            isActive={paginaAtual === 1}
            onClick={(e) => {
              e.preventDefault(); setPaginaAtual(1);
            }}
            href="#"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (start > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <span className="px-2 select-none">...</span>
          </PaginationItem>
        );
      }
    }

    for (let i = start; i <= end; ++i) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={paginaAtual === i}
            onClick={e => {
              e.preventDefault();
              setPaginaAtual(i);
            }}
            href="#"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPaginas) {
      if (end < totalPaginas - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <span className="px-2 select-none">...</span>
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPaginas}>
          <PaginationLink
            isActive={paginaAtual === totalPaginas}
            onClick={e => {
              e.preventDefault();
              setPaginaAtual(totalPaginas);
            }}
            href="#"
          >
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
              onClick={e => {
                e.preventDefault();
                if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
              }}
              href="#"
              aria-disabled={paginaAtual === 1}
            />
          </PaginationItem>
          {items}
          <PaginationItem>
            <PaginationNext
              onClick={e => {
                e.preventDefault();
                if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
              }}
              href="#"
              aria-disabled={paginaAtual === totalPaginas}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  // Novo: opções de abas (somente UI)
  const abas = [
    { key: "todas", label: "Todas" },
    { key: "favoritas", label: "Favoritas" },
    { key: "erradas", label: "Erradas" },
    { key: "acertadas", label: "Acertadas" },
  ];

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
            {questoesFiltradas
              .slice((paginaAtual - 1) * QUESTOES_POR_PAGINA, paginaAtual * QUESTOES_POR_PAGINA)
              .map(q => (
                <QuestionCard key={q.id} question={q} />
              ))
            }
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
