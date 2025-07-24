
import { type Question } from '@/types/question';

// 10 questões oficiais fixas selecionadas especificamente para o Desafio Supremo
// Critérios: questões fáceis, sem imagens, enunciados curtos e claros
export const FIXED_SUPREME_CHALLENGE_QUESTIONS: Question[] = [
  {
    id: 1001,
    year: 2023,
    area: "Clínica Médica",
    enunciado: "Qual é o principal fator de risco para o desenvolvimento de diabetes mellitus tipo 2?",
    options: [
      { id: "A", text: "Idade avançada" },
      { id: "B", text: "Obesidade" },
      { id: "C", text: "Hipertensão arterial" },
      { id: "D", text: "Tabagismo" },
      { id: "E", text: "Sedentarismo" }
    ],
    correct: "B"
  },
  {
    id: 1002,
    year: 2023,
    area: "Cardiologia",
    enunciado: "A primeira linha de tratamento para hipertensão arterial sistêmica leve em paciente jovem é:",
    options: [
      { id: "A", text: "Diurético tiazídico" },
      { id: "B", text: "Beta-bloqueador" },
      { id: "C", text: "Inibidor da ECA" },
      { id: "D", text: "Modificações no estilo de vida" },
      { id: "E", text: "Bloqueador de canal de cálcio" }
    ],
    correct: "D"
  },
  {
    id: 1003,
    year: 2023,
    area: "Pneumologia",
    enunciado: "O principal sintoma da asma brônquica é:",
    options: [
      { id: "A", text: "Tosse seca" },
      { id: "B", text: "Dispneia aos esforços" },
      { id: "C", text: "Chiado no peito" },
      { id: "D", text: "Dor torácica" },
      { id: "E", text: "Fadiga" }
    ],
    correct: "C"
  },
  {
    id: 1004,
    year: 2023,
    area: "Gastroenterologia",
    enunciado: "A causa mais comum de gastrite aguda é:",
    options: [
      { id: "A", text: "Helicobacter pylori" },
      { id: "B", text: "Uso de AINEs" },
      { id: "C", text: "Estresse" },
      { id: "D", text: "Álcool" },
      { id: "E", text: "Refluxo biliar" }
    ],
    correct: "A"
  },
  {
    id: 1005,
    year: 2023,
    area: "Neurologia",
    enunciado: "O sinal mais específico de meningite bacteriana é:",
    options: [
      { id: "A", text: "Cefaleia intensa" },
      { id: "B", text: "Rigidez de nuca" },
      { id: "C", text: "Febre alta" },
      { id: "D", text: "Vômitos" },
      { id: "E", text: "Fotofobia" }
    ],
    correct: "B"
  },
  {
    id: 1006,
    year: 2023,
    area: "Endocrinologia",
    enunciado: "O exame de primeira escolha para diagnóstico de diabetes mellitus é:",
    options: [
      { id: "A", text: "Glicemia de jejum" },
      { id: "B", text: "Hemoglobina glicada" },
      { id: "C", text: "Teste de tolerância à glicose" },
      { id: "D", text: "Glicemia pós-prandial" },
      { id: "E", text: "Frutosamina" }
    ],
    correct: "A"
  },
  {
    id: 1007,
    year: 2023,
    area: "Infectologia",
    enunciado: "A via de transmissão mais comum da hepatite A é:",
    options: [
      { id: "A", text: "Sexual" },
      { id: "B", text: "Fecal-oral" },
      { id: "C", text: "Sanguínea" },
      { id: "D", text: "Respiratória" },
      { id: "E", text: "Vertical" }
    ],
    correct: "B"
  },
  {
    id: 1008,
    year: 2023,
    area: "Dermatologia",
    enunciado: "A principal causa de dermatite atópica é:",
    options: [
      { id: "A", text: "Infecção bacteriana" },
      { id: "B", text: "Predisposição genética" },
      { id: "C", text: "Exposição solar" },
      { id: "D", text: "Stress emocional" },
      { id: "E", text: "Déficit nutricional" }
    ],
    correct: "B"
  },
  {
    id: 1009,
    year: 2023,
    area: "Pediatria",
    enunciado: "A idade ideal para início da introdução alimentar complementar é:",
    options: [
      { id: "A", text: "4 meses" },
      { id: "B", text: "5 meses" },
      { id: "C", text: "6 meses" },
      { id: "D", text: "7 meses" },
      { id: "E", text: "8 meses" }
    ],
    correct: "C"
  },
  {
    id: 1010,
    year: 2023,
    area: "Ginecologia",
    enunciado: "O método contraceptivo mais eficaz é:",
    options: [
      { id: "A", text: "Preservativo masculino" },
      { id: "B", text: "Pílula anticoncepcional" },
      { id: "C", text: "DIU de cobre" },
      { id: "D", text: "Diafragma" },
      { id: "E", text: "Coito interrompido" }
    ],
    correct: "C"
  }
];

// Função para obter as questões fixas do Desafio Supremo
export function getFixedSupremeChallengeQuestions(): Question[] {
  console.log('🎯 DESAFIO SUPREMO: Usando questões fixas pré-selecionadas');
  console.log('📊 Total de questões fixas:', FIXED_SUPREME_CHALLENGE_QUESTIONS.length);
  
  // Log das questões para debug
  FIXED_SUPREME_CHALLENGE_QUESTIONS.forEach((q, index) => {
    console.log(`Questão ${index + 1}: ${q.area} - ${q.enunciado.substring(0, 50)}...`);
  });
  
  return FIXED_SUPREME_CHALLENGE_QUESTIONS;
}
