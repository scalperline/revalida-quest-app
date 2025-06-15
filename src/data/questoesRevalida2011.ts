
export type Option = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
};

export type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  options: Option[];
  correct: string;
  referencia?: string;
};

import { QUESTOES_REVALIDA_2011_1_10 } from "./questoesRevalida2011_1_10";
import { QUESTOES_REVALIDA_2011_11_20 } from "./questoesRevalida2011_11_20";

// Concatenar todas as páginas para exportação principal
export const QUESTOES_REVALIDA_2011: Question[] = [
  ...QUESTOES_REVALIDA_2011_1_10,
  ...QUESTOES_REVALIDA_2011_11_20,
];
