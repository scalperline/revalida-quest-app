
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface DiscursiveQuestionProps {
  ordem: number;
  titulo: string;
  enunciado: string;
  imagem?: string;
}

export function DiscursiveQuestionCard({ ordem, titulo, enunciado, imagem }: DiscursiveQuestionProps) {
  const [resposta, setResposta] = useState("");

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
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-semibold text-muted-foreground mb-1" htmlFor={`resposta-q${ordem}`}>
          Escreva sua resposta para esta questão:
        </label>
        <Textarea
          id={`resposta-q${ordem}`}
          placeholder="Digite sua resposta aqui..."
          className="min-h-[120px] resize-vertical border-2 border-blue-300 focus:border-primary font-medium text-base bg-background"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />
      </div>
    </div>
  );
}

