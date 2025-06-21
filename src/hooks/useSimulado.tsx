
import { useState, useMemo } from "react";
import { type Question } from "@/components/QuestionCard";

export interface SimuladoConfig {
  quantidade: number;
  areas: string[];
  tempoMinutos: number;
}

export function useSimulado(questoes: Question[], config?: SimuladoConfig) {
  // Usa useMemo para evitar recalculo desnecessário das questões quando a config não muda
  const questoesSelecionadas = useMemo(() => {
    let questoesFiltradas = [...questoes];
    
    console.log('=== DEBUG USESIMULADO ===');
    console.log('Questões totais disponíveis:', questoesFiltradas.length);
    console.log('Configuração recebida:', config);
    
    // Se não há configuração, usar padrões
    if (!config) {
      console.log('Sem configuração, usando padrões');
      const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
      const questoesSorteadas = questoesEmbaralhadas.slice(0, 10);
      console.log('Questões finais selecionadas (padrão):', questoesSorteadas.length);
      console.log('=== FIM DEBUG ===');
      return questoesSorteadas;
    }
    
    // Filtra por áreas se especificado
    if (config.areas && config.areas.length > 0) {
      const questoesAntesDoFiltro = questoesFiltradas.length;
      questoesFiltradas = questoesFiltradas.filter(q => 
        config.areas.includes(q.area)
      );
      console.log(`Questões após filtro por área: ${questoesFiltradas.length} (eram ${questoesAntesDoFiltro})`);
      console.log('Áreas selecionadas:', config.areas);
      
      // Se não há questões nas áreas selecionadas, usar todas
      if (questoesFiltradas.length === 0) {
        console.log('Nenhuma questão encontrada nas áreas selecionadas, usando todas as questões');
        questoesFiltradas = [...questoes];
      }
    }
    
    // Determina a quantidade solicitada
    const quantidadeSolicitada = config.quantidade || 10;
    console.log('Quantidade solicitada:', quantidadeSolicitada);
    
    // Embaralha as questões disponíveis
    const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
    
    // Pega exatamente a quantidade solicitada (ou todas disponíveis se for menor)
    const quantidadeFinal = Math.min(quantidadeSolicitada, questoesEmbaralhadas.length);
    const questoesSorteadas = questoesEmbaralhadas.slice(0, quantidadeFinal);
    
    console.log('Questões finais selecionadas:', questoesSorteadas.length);
    console.log('IDs das questões selecionadas:', questoesSorteadas.map(q => q.id));
    console.log('=== FIM DEBUG ===');
    
    return questoesSorteadas;
  }, [questoes, config?.quantidade, config?.areas?.join(',')]); // Dependências específicas

  const [respostas, setRespostas] = useState<{[id: number]: string}>({});
  const [index, setIndex] = useState(0);

  function respostaAtual() {
    return respostas[questoesSelecionadas[index]?.id];
  }
  
  function responder(resp: string) {
    if (questoesSelecionadas[index]) {
      setRespostas(r => ({ ...r, [questoesSelecionadas[index].id]: resp }));
    }
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
    config: config || { quantidade: 10, areas: [], tempoMinutos: 120 }
  };
}
