
import { useState, useEffect, useMemo } from 'react';
import { questoesRevalida2025_1 } from '@/data/questoesRevalida2025_1';
import { questoesRevalida2024_1 } from '@/data/questoesRevalida2024_1';
import { questoesRevalida2023_1 } from '@/data/questoesRevalida2023_1';
import { questoesRevalida2023_2 } from '@/data/questoesRevalida2023_2';
import { questoesRevalida2022_1 } from '@/data/questoesRevalida2022_1';
import { questoesRevalida2022_2 } from '@/data/questoesRevalida2022_2';
import { questoesRevalida2021 } from '@/data/questoesRevalida2021';
import { questoesRevalida2020 } from '@/data/questoesRevalida2020';
import { type Question } from '@/types/question';

// Consolidar todas as questões
const todasQuestoes: Question[] = [
  ...questoesRevalida2025_1,
  ...questoesRevalida2024_1,
  ...questoesRevalida2023_1,
  ...questoesRevalida2023_2,
  ...questoesRevalida2022_1,
  ...questoesRevalida2022_2,
  ...questoesRevalida2021,
  ...questoesRevalida2020
];

export function useQuestions() {
  const [anoSelecionado, setAnoSelecionado] = useState<string>('todos');
  const [areaSelecionada, setAreaSelecionada] = useState<string>('todas');
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState<string>('todas');

  // Filtrar questões baseado nos filtros selecionados
  const questoesAnoSelecionado = useMemo(() => {
    console.log('=== FILTERING QUESTIONS ===');
    console.log('Total questions available:', todasQuestoes.length);
    console.log('Year filter:', anoSelecionado);
    console.log('Area filter:', areaSelecionada);
    console.log('Difficulty filter:', dificuldadeSelecionada);

    let questoesFiltradas = [...todasQuestoes];

    // Filtro por ano
    if (anoSelecionado !== 'todos') {
      questoesFiltradas = questoesFiltradas.filter(q => q.ano === parseInt(anoSelecionado));
    }

    // Filtro por área
    if (areaSelecionada !== 'todas') {
      questoesFiltradas = questoesFiltradas.filter(q => q.area === areaSelecionada);
    }

    // Filtro por dificuldade
    if (dificuldadeSelecionada !== 'todas') {
      questoesFiltradas = questoesFiltradas.filter(q => q.dificuldade === dificuldadeSelecionada);
    }

    console.log('Filtered questions count:', questoesFiltradas.length);
    return questoesFiltradas;
  }, [anoSelecionado, areaSelecionada, dificuldadeSelecionada]);

  // Areas disponíveis baseadas nas questões filtradas
  const areasDisponiveis = useMemo(() => {
    const areas = new Set<string>();
    questoesAnoSelecionado.forEach(q => {
      if (q.area) areas.add(q.area);
    });
    return Array.from(areas).sort();
  }, [questoesAnoSelecionado]);

  // Anos disponíveis
  const anosDisponiveis = useMemo(() => {
    const anos = new Set<number>();
    todasQuestoes.forEach(q => {
      if (q.ano) anos.add(q.ano);
    });
    return Array.from(anos).sort((a, b) => b - a);
  }, []);

  // Debug logs
  useEffect(() => {
    console.log('=== useQuestions Debug ===');
    console.log('Total questions loaded:', todasQuestoes.length);
    console.log('Available years:', anosDisponiveis);
    console.log('Available areas:', areasDisponiveis);
    console.log('Filtered questions:', questoesAnoSelecionado.length);
  }, [questoesAnoSelecionado.length, anosDisponiveis, areasDisponiveis]);

  return {
    questoesAnoSelecionado,
    anoSelecionado,
    setAnoSelecionado,
    areaSelecionada,
    setAreaSelecionada,
    dificuldadeSelecionada,
    setDificuldadeSelecionada,
    anosDisponiveis,
    areasDisponiveis,
    todasQuestoes
  };
}
