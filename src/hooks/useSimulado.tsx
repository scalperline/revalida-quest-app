
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
    
    console.log('=== DEBUG USESIMULADO ===');
    console.log('Questões totais disponíveis:', questoesFiltradas.length);
    console.log('Configuração recebida:', config);
    
    // Filtra por áreas se especificado
    if (config?.areas && config.areas.length > 0) {
      questoesFiltradas = questoesFiltradas.filter(q => 
        config.areas.includes(q.area)
      );
      console.log('Questões após filtro por área:', questoesFiltradas.length);
      console.log('Áreas selecionadas:', config.areas);
    }
    
    // Determina a quantidade solicitada - CORRIGINDO AQUI
    const quantidadeSolicitada = config?.quantidade || 10; // Mudando de 5 para 10 como padrão
    console.log('Quantidade solicitada:', quantidadeSolicitada);
    
    // Se não há questões suficientes nas áreas selecionadas, usar todas as questões disponíveis
    if (questoesFiltradas.length === 0) {
      console.log('Nenhuma questão encontrada nas áreas selecionadas, usando todas as questões');
      questoesFiltradas = [...questoes];
    }
    
    // Embaralha as questões disponíveis
    const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
    
    // Pega exatamente a quantidade solicitada (ou todas disponíveis se for menor)
    const quantidadeFinal = Math.min(quantidadeSolicitada, questoesEmbaralhadas.length);
    const questoesSorteadas = questoesEmbaralhadas.slice(0, quantidadeFinal);
    
    console.log('Questões finais selecionadas:', questoesSorteadas.length);
    console.log('IDs das questões selecionadas:', questoesSorteadas.map(q => q.id));
    console.log('=== FIM DEBUG ===');
    
    return questoesSorteadas;
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
    config: config || { quantidade: 10, areas: [], tempoMinutos: 120 } // Mudando padrão de 5 para 10
  };
}
