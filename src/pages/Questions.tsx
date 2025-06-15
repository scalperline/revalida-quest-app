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

// NOVO: anos disponíveis para prova oficial
const ANOS_PROVA = [
  { value: 2011, label: "Revalida 2011" },
  // { value: 2012, label: "Revalida 2012" },
  // { value: 2013, label: "Revalida 2013" },
];
const ESPECIALIDADES = [
  { value: "", label: "Selecione" },
  { value: "clínica médica", label: "Clínica Médica" },
  { value: "cirurgia geral", label: "Cirurgia Geral" },
  { value: "ginecologia e obstetrícia", label: "Ginecologia e Obstetrícia" },
  { value: "pediatria", label: "Pediatria" },
  { value: "medicina preventiva", label: "Medicina Preventiva" },
];
const TEMAS = [
  { value: "", label: "Selecione" },
  // Adicione mais temas se desejar, ou popule de acordo com as questões futuramente
];

const QUESTOES_POR_PAGINA = 10;

export default function Questions() {
  // Novo estado para o ano selecionado, padrão: 2011 (único por enquanto)
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2011);
  const [especialidade, setEspecialidade] = useState<string>("");
  const [temaSelecionado, setTemaSelecionado] = useState<string>("");
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [abaSelecionada, setAbaSelecionada] = useState<"todas" | "favoritas" | "erradas" | "acertadas">("todas");

  // NOVO: especialidade/tema/ano (filtros UI, só UI agora)
  // Filtre as questões pelo ano selecionado
  const questoesAnoSelecionado =
    anoSelecionado === 2011
      ? QUESTOES_REVALIDA_2011.filter((q) => q.year === anoSelecionado)
      : [];

  // Filtra as questões pelo campo de busca e (UI) especialidade/tema/ano (apenas UI)
  const questoesFiltradas = questoesAnoSelecionado.filter((q) =>
    (especialidade ? q.area.toLocaleLowerCase() === especialidade : true) &&
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
      {/* NOVO: Título e contador */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-2">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">Banco de Questões</h2>
        <span className="border rounded-full px-4 py-1 text-base font-semibold text-foreground bg-background shadow-md border-muted/60">
          {questoesFiltradas.length} questões encontradas
        </span>
      </div>
      
      {/* NOVO: caixa de filtros (busca, especialidade, ano, tema) */}
      <div className="max-w-6xl mx-auto w-full p-6 rounded-2xl border border-muted bg-card shadow flex flex-col gap-6 mb-8">
        <div>
          <Label className="mb-1 text-lg font-semibold">Buscar</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-muted-foreground">
              <Search size={20} />
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 h-12 rounded-lg bg-background border border-muted text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Buscar questões..."
              value={filtro}
              onChange={(e) => { setFiltro(e.target.value); setPaginaAtual(1); }}
              type="search"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Especialidade */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="especialidade" className="font-semibold">Especialidade</Label>
            <Select value={especialidade} onValueChange={(v) => { setEspecialidade(v); setPaginaAtual(1); }}>
              <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {ESPECIALIDADES.map(e => (
                  <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Ano */}
          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Ano</Label>
            <Select value={anoSelecionado.toString()} onValueChange={v => { setAnoSelecionado(Number(v)); setPaginaAtual(1); }}>
              <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {ANOS_PROVA.map(a => (
                  <SelectItem key={a.value} value={a.value.toString()}>{a.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Tema */}
          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Tema</Label>
            <Select value={temaSelecionado} onValueChange={v => { setTemaSelecionado(v); setPaginaAtual(1); }}>
              <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {TEMAS.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Abas de filtro */}
      <div className="max-w-6xl mx-auto w-full flex gap-1 md:gap-3 mb-6">
        {abas.map(tab => (
          <Button
            key={tab.key}
            variant={abaSelecionada === tab.key ? "secondary" : "ghost"}
            className={`rounded-xl px-5 py-2 font-semibold text-base border 
              ${abaSelecionada === tab.key ? "bg-secondary text-foreground border-ring shadow" : "bg-card text-muted-foreground border-border"}`}
            onClick={() => setAbaSelecionada(tab.key as typeof abaSelecionada)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

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
