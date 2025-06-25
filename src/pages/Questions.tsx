
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { getDefaultTipoProva } from "@/utils/questionSelector";

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState(2025);
  const [tipoProva, setTipoProva] = useState<string | null>(getDefaultTipoProva(2025));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");

  const {
    filteredQuestions,
    totalQuestions,
    questionsPerPage,
  } = useQuestionsFilters({
    ano: anoSelecionado,
    tipo: tipoProva,
    searchTerm,
    area: selectedArea,
    difficulty: selectedDifficulty,
    page: currentPage,
  });

  const handleAnoChange = (ano: number) => {
    setAnoSelecionado(ano);
    setCurrentPage(1);
    // Set appropriate default tipo for the selected year
    const defaultTipo = getDefaultTipoProva(ano);
    setTipoProva(defaultTipo);
  };

  const handleTipoChange = (tipo: string) => {
    setTipoProva(tipo);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GamifiedQuestionsHeader
            anoSelecionado={anoSelecionado}
            setAnoSelecionado={handleAnoChange}
            totalQuestoes={totalQuestions}
            tipoProva={tipoProva || undefined}
            setTipoProva={handleTipoChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />

          {filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}

          <QuestionsPagination
            paginaAtual={currentPage}
            totalPaginas={Math.ceil(totalQuestions / questionsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
