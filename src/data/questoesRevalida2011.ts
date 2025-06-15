
/**
 * Banco de questões oficiais Revalida INEP 2011
 * Estrutura pronta para preenchimento por área
 */

export type Opcao = {
  id: string;
  text: string;
};

export type QuestaoRevalida = {
  id: number;
  year: 2011;
  area: 
    | "Clínica Médica"
    | "Cirurgia"
    | "Ginecologia e Obstetrícia"
    | "Pediatria"
    | "Medicina de Família e Comunidade"
    | "Saúde Coletiva"
    | "Temas Específicos"
    | "Outros";
  enunciado: string;
  options: Opcao[];
  correct: string;      // letra (A, B, C ou D)
  referencia?: string;  // referência do INEP, caso disponível
};

// Exemplo inicial com placeholders (edite conforme envio das questões)
export const QUESTOES_REVALIDA_2011: QuestaoRevalida[] = [
  // Exemplo de cadastro real (substitua pelo texto colado da imagem)
  {
    id: 1,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `EXEMPLO: Paciente de 40 anos, sexo masculino, queixa-se de dor abdominal há 12 horas...`,
    options: [
      { id: "A", text: "Opção A (resposta literal da alternativa da prova)" },
      { id: "B", text: "Opção B ..." },
      { id: "C", text: "Opção C ..." },
      { id: "D", text: "Opção D ..." }
    ],
    correct: "A", // substituir pela resposta correta
    referencia: "Ex: Prova Revalida INEP 2011, Q1"
  },
  // Após extração, adicione mais questões aqui!
];
