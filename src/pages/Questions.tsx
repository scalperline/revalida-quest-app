
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
      
      {/* Container otimizado para mobile */}
      <div className="w-full max-w-none px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Container centralizado para o conteúdo */}
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          
          {/* Header com melhor responsividade */}
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

          {/* Lista de questões com espaçamento otimizado */}
          <div className="space-y-4 sm:space-y-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div key={question.id} className="w-full">
                  <QuestionCard question={question} />
                </div>
              ))
            ) : (
              /* Estado vazio melhorado */
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Nenhuma questão encontrada
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Tente ajustar os filtros ou buscar por outros termos.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Paginação com melhor espaçamento */}
          {filteredQuestions.length > 0 && (
            <div className="flex justify-center pt-4 sm:pt-6 pb-8 sm:pb-12">
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
