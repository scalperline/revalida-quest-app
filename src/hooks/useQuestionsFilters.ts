
import { useState, useMemo } from "react";
import { type Question } from "@/components/QuestionCard";

export function useQuestionsFilters(questions: Question[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");

  const filteredQuestions = useMemo(() => {
    let filtered = [...questions];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.enunciado.toLowerCase().includes(term) ||
          q.options.some((opt) => opt.text.toLowerCase().includes(term)) ||
          q.area.toLowerCase().includes(term) ||
          (q.referencia && q.referencia.toLowerCase().includes(term))
      );
    }

    // Filter by area
    if (selectedArea !== "Todos") {
      filtered = filtered.filter((q) => q.area === selectedArea);
    }

    // Filter by difficulty (mock implementation based on question characteristics)
    if (selectedDifficulty !== "Todas") {
      filtered = filtered.filter((q) => {
        const textLength = q.enunciado.length;
        const hasImage = !!q.image;
        
        // Simple heuristic for difficulty
        if (selectedDifficulty === "Fácil") {
          return textLength < 300 && !hasImage;
        } else if (selectedDifficulty === "Médio") {
          return textLength >= 300 && textLength < 600;
        } else if (selectedDifficulty === "Difícil") {
          return textLength >= 600 || hasImage;
        }
        return true;
      });
    }

    return filtered;
  }, [questions, searchTerm, selectedArea, selectedDifficulty]);

  return {
    searchTerm,
    setSearchTerm,
    selectedArea,
    setSelectedArea,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredQuestions,
  };
}
