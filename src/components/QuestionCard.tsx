
import { useState } from "react";

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  options: Option[];
  correct: string;
  referencia?: string;
};

interface Props {
  question: Question;
  showAnswer?: boolean;
}

export function QuestionCard({ question, showAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-card shadow rounded-xl px-6 py-6 mb-4 border max-w-2xl mx-auto flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground pb-1">
        <span>{question.year}</span>
        <span className="mx-2 text-xs text-gray-400">|</span>
        <span className="capitalize">{question.area}</span>
      </div>
      <div className="font-medium text-lg text-gray-900 whitespace-pre-line">
        <span>{question.enunciado}</span>
      </div>
      <div className="flex flex-col gap-1 pt-2">
        {question.options.map((opt) => {
          const acerto = selected && opt.id === question.correct;
          const erro =
            selected === opt.id && selected !== question.correct;
          const marcado = selected === opt.id;
          return (
            <button
              key={opt.id}
              className={`px-4 py-2 rounded-md border flex text-left items-center gap-2 transition-colors
                ${
                  marcado
                    ? acerto
                      ? "bg-green-100 border-green-500 text-green-700"
                      : erro
                      ? "bg-red-100 border-red-400 text-red-700"
                      : "border-primary"
                    : "hover:bg-gray-50"
                }
                ${showAnswer && opt.id === question.correct && !marcado ? "bg-green-50 border-green-400" : ""}
              `}
              disabled={!!selected || showAnswer}
              onClick={() => setSelected(opt.id)}
            >
              <span className="w-[22px] h-[22px] flex items-center justify-center rounded-full border
                bg-white mr-2
                ">{opt.id}</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {(selected || showAnswer) && (
        <div className="mt-3 text-base flex flex-col gap-1">
          <span className={`font-semibold 
            ${selected === question.correct || showAnswer ? "text-green-600" : "text-red-600"}`}>
            Gabarito: {question.correct}
            {selected && (
              selected === question.correct
                ? " (Acertou 🎉)"
                : " (Errou 😓)"
            )}
          </span>
          {question.referencia && (
            <span className="text-xs text-slate-500">
              Referência: {question.referencia}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
