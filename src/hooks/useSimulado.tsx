
import { useState } from "react";
import { type Question } from "@/components/QuestionCard";

export interface SimuladoConfig {
  quantidade: number;
  areas: string[];
  tempoMinutos: number;
}

export function useSimulado(questoes: Question[], config?: SimuladoConfig) {
  // Filtra questões baseado na configuração
  const [questoesSelecionadas] = useState(() => {
    let questoesFiltradas = [...questoes];
    
    // Filtra por áreas se especificado
    if (config?.areas && config.areas.length > 0) {
      questoesFiltradas = questoesFiltradas.filter(q => 
        config.areas.includes(q.area)
      );
    }
    
    // Sorteia a quantidade especificada
    const quantidade = config?.quantidade || 5;
    let sorteadas = [];
    let copy = [...questoesFiltradas];
    
    while (sorteadas.length < Math.min(quantidade, questoesFiltradas.length)) {
      const idx = Math.floor(Math.random() * copy.length);
      sorteadas.push(copy.splice(idx, 1)[0]);
    }
    
    return sorteadas;
  });

  const [respostas, setRespostas] = useState<{[id: number]: string}>({});
  const [index, setIndex] = useState(0);

  function respostaAtual() {
    return respostas[questoesSelecionadas[index]?.id];
  }
  
  function responder(resp: string) {
    setRespostas(r => ({ ...r, [questoesSelecionadas[index].id]: resp }));
  }
  
  function proxima() {
    setIndex(i => i + 1);
  }
  
  return {
    questoesSelecionadas,
    respostas,
    index,
    total: questoesSelecionadas.length,
    atual: questoesSelecionadas[index],
    respostaAtual,
    responder,
    proxima,
    terminou: index >= questoesSelecionadas.length,
    config: config || { quantidade: 5, areas: [], tempoMinutos: 20 }
  };
}
