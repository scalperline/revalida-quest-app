
import { type Question } from "@/components/QuestionCard";
import { QUESTOES_REVALIDA_2021_1_36 } from "./questoesRevalida2021_1_36";
import { QUESTOES_REVALIDA_2021_74_100 } from "./questoesRevalida2021_74_100";

// TODO: Adicionar os outros arquivos de questões de 2021 quando disponíveis.
// Por enquanto, apenas as questões de 1 a 36 e de 74 a 100 estão incluídas.
export const QUESTOES_REVALIDA_2021: Question[] = [
  ...QUESTOES_REVALIDA_2021_1_36,
  ...QUESTOES_REVALIDA_2021_74_100,
];
