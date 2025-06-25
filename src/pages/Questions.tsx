
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 no-scroll-x">
      <Navbar />
      <div className="container mx-auto mobile-padding">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="mb-4 gradient-text">
              📚 Banco de Questões Revalida
            </h1>
            <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto">
              Explore questões oficiais do INEP organizadas por ano, área e dificuldade. 
              Cada resposta correta te aproxima da aprovação!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-200 dark:border-gray-700 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">
                Questões Encontradas
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-200 dark:border-gray-700 p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {anoSelecionado}
              </div>
              <div className="text-sm text-muted-foreground">
                Ano Selecionado
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-gray-700 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.ceil(totalQuestions / questionsPerPage)}
              </div>
              <div className="text-sm text-muted-foreground">
                Páginas Totais
              </div>
            </div>
          </div>

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

          {/* Questions List */}
          <div className="space-y-6 mb-8">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>

          {/* Pagination */}
          {totalQuestions > questionsPerPage && (
            <QuestionsPagination
              paginaAtual={currentPage}
              totalPaginas={Math.ceil(totalQuestions / questionsPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
