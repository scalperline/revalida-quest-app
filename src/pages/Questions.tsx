import { QuestionCard } from "@/components/QuestionCard";
import { useState } from "react";

// Demo: Simulando banco de dados de questões
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";

export default function Questions() {
  const [filtro, setFiltro] = useState("");
  const questoesFiltradas = QUESTOES_REVALIDA_2011.filter(q =>
    q.enunciado.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.area.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.year.toString().includes(filtro)
  );

  return (
    <div className="max-w-4xl mx-auto pt-8 px-2">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold">Banco de Questões Oficiais</h2>
        <input
          className="border px-3 py-2 rounded-lg max-w-xs"
          placeholder="Buscar por enunciado, área ou ano..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
      </div>
      {questoesFiltradas.length === 0 ? (
        <div className="text-center text-muted-foreground py-32">Nenhuma questão encontrada.</div>
      ) : (
        <div>
          {questoesFiltradas.map(q => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
      <div className="mt-16 text-sm text-muted-foreground text-center">
        Dados fictícios para demonstração. Para produção, conectar com banco de questões oficial INEP.
      </div>
    </div>
  );
}
