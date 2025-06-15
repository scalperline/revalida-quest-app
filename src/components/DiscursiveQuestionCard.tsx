
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface DiscursiveQuestionProps {
  ordem: number;
  titulo: string;
  enunciado: string;
  imagem?: string;
  gabarito: string;
}

export function DiscursiveQuestionCard({ ordem, titulo, enunciado, imagem, gabarito }: DiscursiveQuestionProps) {
  const [resposta, setResposta] = useState("");
  const [enviada, setEnviada] = useState(false);

  const handleSend = () => {
    setEnviada(true);
  };

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
          disabled={enviada}
        />
        {!enviada && (
          <Button
            className="mt-2 self-end"
            onClick={handleSend}
            disabled={resposta.trim().length === 0}
          >
            Enviar resposta
          </Button>
        )}
        {enviada && (
          <div className="mt-6 border rounded-lg bg-muted/70 p-4">
            <div className="font-semibold text-primary mb-2">
              Resposta enviada! Compare com o gabarito oficial:
            </div>
            <div className="text-foreground whitespace-pre-line mb-2">
              <span className="font-bold">Sua resposta:</span>
              <br />
              <span className="pl-2">{resposta}</span>
            </div>
            <div className="text-foreground whitespace-pre-line mb-2">
              <span className="font-bold">Resposta esperada (gabarito):</span>
              <br />
              <span className="pl-2">{gabarito}</span>
            </div>
            <div className="text-sm text-muted-foreground italic">
              Compare cuidadosamente sua resposta ao gabarito. Identifique pontos de melhoria e ajuste seu texto para maximizar sua performance!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

