
import { Question } from "./questoesRevalida2011";
import { QUESTOES_REVALIDA_2012_1_10 } from "./questoesRevalida2012_1_10";
import { QUESTOES_REVALIDA_2012_11_20 } from "./questoesRevalida2012_11_20";
import { QUESTOES_REVALIDA_2012_21_30 } from "./questoesRevalida2012_21_30";
import { QUESTOES_REVALIDA_2012_31_40 } from "./questoesRevalida2012_31_40";

// Pode adicionar outros arquivos de questões usando o padrão abaixo.
export const QUESTOES_REVALIDA_2012: Question[] = [
  ...QUESTOES_REVALIDA_2012_1_10,
  ...QUESTOES_REVALIDA_2012_11_20,
  ...QUESTOES_REVALIDA_2012_21_30,
  ...QUESTOES_REVALIDA_2012_31_40,
];
