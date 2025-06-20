
import { useState, useMemo } from "react";
import { type Question } from "@/components/QuestionCard";

export function useQuestionsFilters(questoes: Question[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas as áreas");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas as dificuldades");

  const filteredQuestoes = useMemo(() => {
    let filtered = [...questoes];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (questao) =>
          questao.enunciado.toLowerCase().includes(query) ||
          questao.area.toLowerCase().includes(query) ||
          questao.options.some(opt => opt.text.toLowerCase().includes(query))
      );
    }

    // Filter by area
    if (selectedArea !== "Todas as áreas") {
      filtered = filtered.filter((questao) => questao.area === selectedArea);
    }

    // Filter by difficulty (mock implementation - you'd need difficulty data)
    if (selectedDifficulty !== "Todas as dificuldades") {
      // This is a mock filter - you would need actual difficulty data
      // For now, we'll randomly assign difficulties based on question ID
      filtered = filtered.filter((questao) => {
        const mockDifficulty = questao.id % 4 === 0 ? "Muito Difícil" : 
                              questao.id % 3 === 0 ? "Difícil" :
                              questao.id % 2 === 0 ? "Médio" : "Fácil";
        return mockDifficulty === selectedDifficulty;
      });
    }

    return filtered.sort((a, b) => a.id - b.id);
  }, [questoes, searchQuery, selectedArea, selectedDifficulty]);

  return {
    searchQuery,
    selectedArea,
    selectedDifficulty,
    filteredQuestoes,
    setSearchQuery,
    setSelectedArea,
    setSelectedDifficulty,
  };
}
