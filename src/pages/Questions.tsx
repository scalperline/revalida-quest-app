
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedHeader } from "@/components/GamifiedHeader";
import { useQuestions } from "@/hooks/useQuestions";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { QuestionsHeader } from "@/components/QuestionsHeader";

export default function Questions() {
  const {
    anoSelecionado,
    tipoProva,
    paginaAtual,
    questoesPaginadas,
    totalQuestoes,
    totalPaginas,
    handleAnoSelecionado,
    handleTipoProva,
    handlePageChange,
    questoesAnoSelecionado,
  } = useQuestions();

  const {
    searchQuery,
    selectedArea,
    selectedDifficulty,
    filteredQuestoes,
    setSearchQuery,
    setSelectedArea,
    setSelectedDifficulty,
  } = useQuestionsFilters(questoesAnoSelecionado);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Gamified Header */}
      <GamifiedHeader
        totalQuestoes={filteredQuestoes.length}
        onSearch={setSearchQuery}
        onAreaFilter={setSelectedArea}
        onDifficultyFilter={setSelectedDifficulty}
        searchQuery={searchQuery}
        selectedArea={selectedArea}
        selectedDifficulty={selectedDifficulty}
      />

      <div className="px-1 md:px-2 py-10 flex flex-col">
        {/* Year and Test Type Filters */}
        <QuestionsHeader
          anoSelecionado={anoSelecionado}
          setAnoSelecionado={handleAnoSelecionado}
          totalQuestoes={filteredQuestoes.length}
          tipoProva={tipoProva}
          setTipoProva={handleTipoProva}
        />

        {/* Questions */}
        <div>
          {filteredQuestoes.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto border border-blue-100 dark:border-gray-700 shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Nenhuma questão encontrada
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tente ajustar os filtros ou termos de busca
                </p>
              </div>
            </div>
          ) : (
            <div>
              {questoesPaginadas.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex-1" />
        <div className="max-w-6xl mx-auto mt-4 flex justify-end w-full">
          <QuestionsPagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="mt-16 text-xs text-muted-foreground text-center">
          Dados oficiais do INEP - Revalida Quest
        </div>
      </div>
    </div>
  );
}
