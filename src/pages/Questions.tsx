
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { GamifiedHeader } from "@/components/GamifiedHeader";
import { QuestsPanel } from "@/components/QuestsPanel";
import { useQuestions } from "@/hooks/useQuestions";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { Navbar } from "@/components/Navbar";

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
    searchTerm,
    setSearchTerm,
    selectedArea,
    setSelectedArea,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredQuestions,
  } = useQuestionsFilters(questoesAnoSelecionado);

  // Calculate paginated questions from filtered results
  const QUESTOES_POR_PAGINA = 10;
  const sortedFilteredQuestoes = [...filteredQuestions].sort((a, b) => a.id - b.id);
  const totalFilteredPages = Math.ceil(sortedFilteredQuestoes.length / QUESTOES_POR_PAGINA);
  const indiceInicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
  const indiceFim = indiceInicio + QUESTOES_POR_PAGINA;
  const questoesFiltradas = sortedFilteredQuestoes.slice(indiceInicio, indiceFim);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="px-1 md:px-2 py-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          {/* Gamified Header */}
          <GamifiedHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <GamifiedQuestionsHeader
                anoSelecionado={anoSelecionado}
                setAnoSelecionado={handleAnoSelecionado}
                totalQuestoes={filteredQuestions.length}
                tipoProva={tipoProva}
                setTipoProva={handleTipoProva}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
              />

              {/* Questões */}
              <div>
                {filteredQuestions.length === 0 ? (
                  <div className="text-center text-muted-foreground py-40 text-lg rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl max-w-2xl mx-auto border border-blue-100 dark:border-gray-700">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.2-5.5-3m11.5 3.207a7.966 7.966 0 01-.217-1.09c0-3.584-2.916-6.5-6.5-6.5s-6.5 2.916-6.5 6.5a7.963 7.963 0 002.026 5.291c.033.03.066.058.1.086l.001.002c.548.542 1.281.84 2.064.84.783 0 1.516-.298 2.064-.84l.001-.002c.034-.028.067-.057.1-.086z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Nenhuma quest encontrada</h3>
                      <p>Tente ajustar os filtros ou termos de busca.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questoesFiltradas.map((q) => (
                      <QuestionCard key={q.id} question={q} />
                    ))}
                  </div>
                )}
              </div>

              {/* Paginação */}
              <div className="flex-1" />
              <div className="max-w-6xl mx-auto mt-8 flex justify-end w-full">
                <QuestionsPagination
                  paginaAtual={paginaAtual}
                  totalPaginas={Math.max(1, totalFilteredPages)}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            
            {/* Sidebar with Quests */}
            <div className="lg:col-span-1">
              <QuestsPanel />
            </div>
          </div>
          
          <div className="mt-16 text-xs text-muted-foreground text-center">
            Sistema de gamificação ativo! Continue respondendo quests para evoluir! 🎮✨
          </div>
        </div>
      </div>
    </div>
  );
}
