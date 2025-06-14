
import { useState } from "react";

export function useSimulado(questoes: any[], quantidade: number = 5) {
  // Simples: sorteia N questões
  const [questoesSelecionadas] = useState(() => {
    let copy = [...questoes];
    let sorteadas = [];
    while (sorteadas.length < Math.min(quantidade, questoes.length)) {
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
  };
}
