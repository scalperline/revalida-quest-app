
import { useState, useMemo } from "react";
import { type Question } from "@/components/QuestionCard";
import { getQuestionsByYearAndType, getDefaultTipoProva } from "@/utils/questionSelector";

const QUESTOES_POR_PAGINA = 10;

export function useQuestions() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2025);
  const [tipoProva, setTipoProva] = useState<string>(getDefaultTipoProva(2025));
  const [paginaAtual, setPaginaAtual] = useState(1);

  const questoesAnoSelecionado: Question[] = useMemo(() => {
    return getQuestionsByYearAndType(anoSelecionado, tipoProva);
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
    const defaultTipo = getDefaultTipoProva(v);
    setTipoProva(defaultTipo);
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
    questoesAnoSelecionado, // Expose this for compatibility
  };
}
