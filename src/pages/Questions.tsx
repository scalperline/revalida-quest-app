
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionsHeader } from "@/components/QuestionsHeader";
import { useQuestions } from "@/hooks/useQuestions";
import { QuestionsPagination } from "@/components/QuestionsPagination";

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
  } = useQuestions();

  return (
    <div className="min-h-screen bg-background px-1 md:px-2 py-10 flex flex-col">
      <QuestionsHeader
        anoSelecionado={anoSelecionado}
        setAnoSelecionado={handleAnoSelecionado}
        totalQuestoes={totalQuestoes}
        tipoProva={tipoProva}
        setTipoProva={handleTipoProva}
      />

      {/* Questões */}
      <div>
        {totalQuestoes === 0 ? (
          <div className="text-center text-muted-foreground py-40 text-lg rounded-lg bg-card shadow max-w-2xl mx-auto">
            Nenhuma questão encontrada para este filtro.
          </div>
        ) : (
          <div>
            {questoesPaginadas.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>

      {/* Paginação */}
      <div className="flex-1" />
      <div className="max-w-6xl mx-auto mt-4 flex justify-end w-full">
        <QuestionsPagination
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="mt-16 text-xs text-muted-foreground text-center">
        Dados fictícios para demonstração. Para produção, conectar com banco de
        questões oficial INEP.
      </div>
    </div>
  );
}
