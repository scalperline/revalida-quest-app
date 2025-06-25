
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { QuestionsHeader } from "@/components/QuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { useQuestions } from "@/hooks/useQuestions";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";

export default function Questions() {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsData = useQuestions();
  const filtersData = useQuestionsFilters(questionsData.questoesAnoSelecionado);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Banco de Questões</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Explore todas as questões oficiais do Revalida INEP organizadas por ano e área médica 📚
            </p>
          </div>

          <QuestionsHeader 
            anoSelecionado={questionsData.anoSelecionado}
            setAnoSelecionado={questionsData.handleAnoSelecionado}
            totalQuestoes={questionsData.totalQuestoes}
          />

          {questionsData.questoesPaginadas && questionsData.questoesPaginadas.length === 0 && (
            <div className="text-center">Nenhuma questão encontrada.</div>
          )}

          <div className="grid grid-cols-1 gap-6 mb-8">
            {questionsData.questoesPaginadas?.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>

          <QuestionsPagination
            paginaAtual={questionsData.paginaAtual}
            totalPaginas={questionsData.totalPaginas}
            onPageChange={questionsData.handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
