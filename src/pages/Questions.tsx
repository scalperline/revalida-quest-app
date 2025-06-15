
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

// Número de questões por página
const QUESTOES_POR_PAGINA = 10;

export default function Questions() {
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Filtra as questões conforme o campo de busca
  const questoesFiltradas = QUESTOES_REVALIDA_2011.filter((q) =>
    q.enunciado.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.area.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.year.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(questoesFiltradas.length / QUESTOES_POR_PAGINA);

  // Calcula o índice de início e fim das questões para esta página
  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesPaginadas = questoesFiltradas.slice(indiceInicio, indiceFim);

  // Navegação auxiliar (mostra primeira, as próximas, anterior e última se houver muitas páginas)
  function renderPagination() {
    // Oculta se só tem uma página
    if (totalPaginas <= 1) return null;

    // Gerar os itens da paginação (máximo de 7 visíveis para UX)
    const items = [];
    const mostrarPaginas = Math.max(Math.min(7, totalPaginas), 1);

    // Lógica: mostra sempre a primeira, última, atual, e até 2 antes/depois se possível
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
            onClick={() => setPaginaAtual(1)}
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

  // Sempre que filtro mudar, voltar para página 1
  function atualizarFiltro(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltro(e.target.value);
    setPaginaAtual(1);
  }

  return (
    <div className="min-h-screen bg-background px-1 md:px-2 py-10 flex flex-col">
      {/* Botão de voltar para home */}
      <div className="max-w-4xl mx-auto w-full flex items-center gap-2 mb-2">
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg p-2 bg-muted hover:bg-accent transition-colors group border border-muted shadow">
          <ArrowLeft size={22} className="text-primary group-hover:text-blue-500 transition-colors" />
          <span className="font-medium text-sm text-foreground group-hover:text-blue-500 transition-colors">
            Voltar para Home
          </span>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Banco de Questões Oficiais</h2>
        <input
          className="border border-muted px-3 py-2 rounded-lg max-w-xs bg-background text-foreground focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Buscar por enunciado, área ou ano..."
          value={filtro}
          onChange={atualizarFiltro}
        />
      </div>
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
      {/* Paginação no canto inferior */}
      <div className="flex-1" />
      <div className="max-w-4xl mx-auto mt-4 flex justify-end">
        {renderPagination()}
      </div>
      <div className="mt-16 text-xs text-muted-foreground text-center">
        Dados fictícios para demonstração. Para produção, conectar com banco de questões oficial INEP.
      </div>
    </div>
  );
}
