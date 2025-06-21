import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { useQuestions } from "@/hooks/useQuestions";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState(2022);
  const [tipoProva, setTipoProva] = useState<string | null>(null);
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

  const { questions } = useQuestions(anoSelecionado, tipoProva);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GamifiedQuestionsHeader
            anoSelecionado={anoSelecionado}
            setAnoSelecionado={setAnoSelecionado}
            totalQuestoes={totalQuestions}
            tipoProva={tipoProva || undefined}
            setTipoProva={setTipoProva}
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
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            questionsPerPage={questionsPerPage}
            totalQuestions={totalQuestions}
          />
        </div>
      </div>
    </div>
  );
}
