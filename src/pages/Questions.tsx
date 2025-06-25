
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
      
      {/* Optimized container with consistent spacing */}
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Centered content container */}
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header with unified design */}
          <div className="w-full">
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
          </div>

          {/* Questions list with consistent spacing */}
          <div className="space-y-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div key={question.id} className="w-full">
                  <QuestionCard question={question} />
                </div>
              ))
            ) : (
              /* Enhanced empty state */
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
                <div className="card-standard card-padding max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Nenhuma questão encontrada
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Tente ajustar os filtros ou buscar por outros termos.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination with consistent spacing */}
          {filteredQuestions.length > 0 && (
            <div className="flex justify-center pt-6 sm:pt-8 pb-8 sm:pb-12">
              <QuestionsPagination
                paginaAtual={currentPage}
                totalPaginas={Math.ceil(totalQuestions / questionsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
