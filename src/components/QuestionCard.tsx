
import { useState } from "react";

type Option = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
};

type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  options: Option[];
  correct: string;
  referencia?: string;
  image?: string;
};

interface Props {
  question: Question;
  showAnswer?: boolean;
}

export function QuestionCard({ question, showAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const respostaRevelada = selected || showAnswer;

  return (
    <div className="bg-card shadow-lg rounded-2xl px-6 py-8 mb-7 border border-muted max-w-2xl mx-auto flex flex-col gap-4 transition-colors duration-200">
      {/* Número da questão oficial com borda em destaque */}
      <div className="flex items-center gap-2 pb-1">
        <div className="rounded-xl border-2 border-primary bg-primary/10 px-4 py-1 font-bold text-primary text-base shadow-sm select-none">
          Questão {question.id}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground pb-1">
        <span>{question.year}</span>
        <span className="mx-2 text-xs opacity-80">|</span>
        <span className="capitalize">{question.area}</span>
      </div>
      <div className="font-semibold text-lg md:text-xl text-foreground whitespace-pre-line">
        {question.enunciado}
      </div>
      {question.image && (
        <div className="my-4">
          <img
            src={question.image}
            alt={`Imagem para a questão ${question.id}`}
            className="rounded-lg mx-auto border"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 pt-2">
        {question.options.map((opt) => {
          const acerto = selected && opt.id === question.correct;
          const erro = selected === opt.id && selected !== question.correct;
          const marcado = selected === opt.id;
          const showHighlight = respostaRevelada && opt.id === question.correct;

          return (
            <button
              key={opt.id}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg border text-left transition-colors text-base font-normal
                ${
                  marcado
                    ? acerto
                      ? "bg-green-100 border-green-500 text-green-800"
                      : erro
                      ? "bg-red-100 border-red-400 text-red-700"
                      : "border-primary"
                    : showHighlight
                    ? "bg-green-50 border-green-400 text-green-800"
                    : "bg-background hover:bg-muted border-muted"
                }
                ${
                  respostaRevelada
                    ? "cursor-not-allowed opacity-90"
                    : "hover:ring-2 hover:ring-primary/50"
                }
              `}
              disabled={!!selected || showAnswer}
              onClick={() => setSelected(opt.id)}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full border  text-lg font-semibold
                  ${
                    marcado
                      ? acerto
                        ? "bg-green-500 text-white border-green-600"
                        : erro
                        ? "bg-red-400 text-white border-red-700"
                        : "border-primary"
                      : "bg-white border-muted"
                  }
                `}
              >
                {opt.id}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {respostaRevelada && (
        <div className="mt-3 p-4 rounded-lg bg-muted border-l-4 border-primary shadow">
          <span className={`font-semibold text-lg ${selected === question.correct || showAnswer ? "text-green-600" : "text-red-600"}`}>
            Gabarito: {question.correct}
            {selected && (selected === question.correct
              ? " (Acertou 🎉)"
              : " (Errou 😓)")}
          </span>
        </div>
      )}
    </div>
  );
}
