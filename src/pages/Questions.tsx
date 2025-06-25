
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { getDefaultTipoProva } from "@/utils/questionSelector";
import { Trophy, Target, BookOpen } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="relative container mx-auto px-4 pt-8 pb-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Banco de Questões
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pratique com questões oficiais do Revalida e acelere sua preparação com feedback inteligente
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{totalQuestions}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Questões Disponíveis</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{anoSelecionado}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ano Selecionado</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{Math.ceil(totalQuestions / questionsPerPage)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Páginas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto">
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

          {/* Questions Container */}
          <div className="space-y-8">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <QuestionCard question={question} />
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 shadow-lg max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Nenhuma questão encontrada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tente ajustar os filtros para encontrar questões
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalQuestions > questionsPerPage && (
            <div className="mt-12">
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
