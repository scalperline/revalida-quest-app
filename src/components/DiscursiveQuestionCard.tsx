
import React from "react";

interface DiscursiveQuestionProps {
  ordem: number;
  titulo: string;
  enunciado: string;
  imagem?: string;
}

export function DiscursiveQuestionCard({ ordem, titulo, enunciado, imagem }: DiscursiveQuestionProps) {
  return (
    <div className="bg-card shadow-lg rounded-2xl px-6 py-8 mb-7 border border-muted max-w-2xl mx-auto flex flex-col gap-4 transition-colors duration-200">
      <div className="flex items-center gap-2 pb-1">
        <div className="rounded-xl border-2 border-neutral-500 bg-neutral-200/50 px-4 py-1 font-bold text-neutral-700 text-base shadow-sm select-none">
          {titulo}
        </div>
      </div>
      {imagem && (
        <div className="w-full flex justify-center mb-2">
          <img
            src={imagem}
            alt={`Imagem da ${titulo}`}
            className="max-h-72 object-contain rounded-lg border border-muted"
          />
        </div>
      )}
      <div className="whitespace-pre-line font-medium text-base text-foreground">
        {enunciado}
      </div>
      {/* Opcional: espaço para respostas se quiser, por enquanto apenas apresentação */}
    </div>
  );
}
