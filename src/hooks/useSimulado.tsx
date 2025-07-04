
import { useState, useMemo } from "react";
import { type Question } from "@/types/question";
import { useLimitChecker } from "./useLimitChecker";

export interface SimuladoConfig {
  quantidade: number;
  areas: string[];
  tempoMinutos: number;
}

export function useSimulado(questoes: Question[], config?: SimuladoConfig) {
  const { checkSimuladoLimit, incrementSimuladoUsage } = useLimitChecker();
  
  const questoesSelecionadas = useMemo(() => {
    let questoesFiltradas = [...questoes];
    
    console.log('=== DEBUG USESIMULADO - RECALCULANDO QUESTÕES ===');
    console.log('Questões totais disponíveis:', questoesFiltradas.length);
    console.log('Configuração recebida:', config);
    
    if (!config) {
      console.log('Sem configuração, usando padrões (10 questões, todas as áreas)');
      const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
      const questoesSorteadas = questoesEmbaralhadas.slice(0, 10);
      console.log('Questões finais selecionadas (padrão):', questoesSorteadas.length);
      return questoesSorteadas;
    }
    
    if (config.areas && config.areas.length > 0) {
      const questoesAntesDoFiltro = questoesFiltradas.length;
      questoesFiltradas = questoesFiltradas.filter(q => 
        config.areas.includes(q.area)
      );
      console.log(`Questões após filtro por área: ${questoesFiltradas.length} (eram ${questoesAntesDoFiltro})`);
      
      if (questoesFiltradas.length === 0) {
        console.log('AVISO: Nenhuma questão encontrada nas áreas selecionadas, usando todas as questões');
        questoesFiltradas = [...questoes];
      }
    }
    
    const quantidadeSolicitada = config.quantidade || 10;
    console.log('Quantidade solicitada:', quantidadeSolicitada);
    
    const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
    const quantidadeFinal = Math.min(quantidadeSolicitada, questoesEmbaralhadas.length);
    const questoesSorteadas = questoesEmbaralhadas.slice(0, quantidadeFinal);
    
    console.log('Questões finais selecionadas:', questoesSorteadas.length);
    console.log('=== FIM DEBUG ===');
    
    return questoesSorteadas;
  }, [questoes, config?.quantidade, config?.areas, config?.tempoMinutos]);

  const [respostas, setRespostas] = useState<{[id: number]: string}>({});
  const [index, setIndex] = useState(0);
  const [simuladoIniciado, setSimuladoIniciado] = useState(false);

  function respostaAtual() {
    const questaoAtual = questoesSelecionadas[index];
    const resposta = questaoAtual ? respostas[questaoAtual.id] : undefined;
    return resposta;
  }
  
  function responder(resp: string) {
    if (questoesSelecionadas[index]) {
      const questaoId = questoesSelecionadas[index].id;
      console.log('Respondendo questão ID:', questaoId, 'com resposta:', resp);
      setRespostas(r => ({ ...r, [questaoId]: resp }));
    }
  }
  
  function proxima() {
    const novoIndex = index + 1;
    console.log('Navegando para próxima questão. Índice atual:', index, 'Novo índice:', novoIndex);
    setIndex(novoIndex);
  }

  const iniciarSimulado = async (): Promise<boolean> => {
    if (simuladoIniciado) {
      return true;
    }

    const podeIniciar = await checkSimuladoLimit();
    
    if (!podeIniciar) {
      return false;
    }

    await incrementSimuladoUsage();
    setSimuladoIniciado(true);
    
    return true;
  };
  
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
    config: config || { quantidade: 10, areas: [], tempoMinutos: 120 },
    iniciarSimulado,
    simuladoIniciado
  };
}
