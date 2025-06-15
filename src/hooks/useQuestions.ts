
import { useState, useMemo } from "react";
import { type Question } from "@/components/QuestionCard";
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { QUESTOES_REVALIDA_2012 } from "@/data/questoesRevalida2012";
import { QUESTOES_REVALIDA_2013 } from "@/data/questoesRevalida2013";
import { QUESTOES_REVALIDA_2013_VERMELHA } from "@/data/questoesRevalida2013Vermelha";
import { QUESTOES_REVALIDA_2014 } from "@/data/questoesRevalida2014";
import { QUESTOES_REVALIDA_2014_VERMELHA } from "@/data/questoesRevalida2014Vermelha";
import { QUESTOES_REVALIDA_2015 } from "@/data/questoesRevalida2015";
import { QUESTOES_REVALIDA_2015_VERMELHA } from "@/data/questoesRevalida2015Vermelha";

const QUESTOES_POR_PAGINA = 10;

export function useQuestions() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2015);
  const [tipoProva, setTipoProva] = useState<string>("Cinza");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const questoesAnoSelecionado: Question[] = useMemo(() => {
    if (anoSelecionado === 2011) {
      return QUESTOES_REVALIDA_2011;
    }
    if (anoSelecionado === 2012) {
      return QUESTOES_REVALIDA_2012;
    }
    if (anoSelecionado === 2013) {
      return tipoProva === "Cinza"
        ? QUESTOES_REVALIDA_2013
        : QUESTOES_REVALIDA_2013_VERMELHA;
    }
    if (anoSelecionado === 2014) {
      return tipoProva === "Cinza"
        ? QUESTOES_REVALIDA_2014
        : QUESTOES_REVALIDA_2014_VERMELHA;
    }
    if (anoSelecionado === 2015) {
      return tipoProva === "Cinza"
        ? QUESTOES_REVALIDA_2015
        : QUESTOES_REVALIDA_2015_VERMELHA;
    }
    return [];
  }, [anoSelecionado, tipoProva]);

  const sortedQuestoes = useMemo(
    () => [...questoesAnoSelecionado].sort((a, b) => a.id - b.id),
    [questoesAnoSelecionado]
  );

  const totalPaginas = Math.ceil(sortedQuestoes.length / QUESTOES_POR_PAGINA);

  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesPaginadas = sortedQuestoes.slice(indiceInicio, indiceFim);

  function handleAnoSelecionado(v: number) {
    setAnoSelecionado(v);
    setPaginaAtual(1);
  }

  function handleTipoProva(v: string) {
    setTipoProva(v);
    setPaginaAtual(1);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPaginas) {
      setPaginaAtual(page);
    }
  };

  return {
    anoSelecionado,
    tipoProva,
    paginaAtual,
    questoesPaginadas,
    totalQuestoes: sortedQuestoes.length,
    totalPaginas,
    handleAnoSelecionado,
    handleTipoProva,
    handlePageChange,
  };
}
