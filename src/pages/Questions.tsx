
import { QuestionCard } from "@/components/QuestionCard";
import { useState } from "react";
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";

export default function Questions() {
  const [filtro, setFiltro] = useState("");
  const questoesFiltradas = QUESTOES_REVALIDA_2011.filter((q) =>
    q.enunciado.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.area.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
    q.year.toString().includes(filtro)
  );

  return (
    <div className="min-h-screen bg-background px-1 md:px-2 py-10 flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Banco de Questões Oficiais</h2>
        <input
          className="border border-muted px-3 py-2 rounded-lg max-w-xs bg-background text-foreground focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Buscar por enunciado, área ou ano..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
      </div>
      <div>
        {questoesFiltradas.length === 0 ? (
          <div className="text-center text-muted-foreground py-40 text-lg rounded-lg bg-card shadow max-w-2xl mx-auto">
            Nenhuma questão encontrada.
          </div>
        ) : (
          <div>
            {questoesFiltradas.map(q => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-16 text-xs text-muted-foreground text-center">
        Dados fictícios para demonstração. Para produção, conectar com banco de questões oficial INEP.
      </div>
    </div>
  );
}
