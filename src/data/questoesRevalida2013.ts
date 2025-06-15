
import { Question } from "./questoesRevalida2011";
import { QUESTOES_REVALIDA_2013_1_10 } from "./questoesRevalida2013_1_10";
import { QUESTOES_REVALIDA_2013_11_20 } from "./questoesRevalida2013_11_20";
import { QUESTOES_REVALIDA_2013_21_29 } from "./questoesRevalida2013_21_29";
import { QUESTOES_REVALIDA_2013_30_41 } from "./questoesRevalida2013_30_41";
// Crie os próximos blocos similares conforme as próximas questões forem transcritas
export const QUESTOES_REVALIDA_2013: Question[] = [
  ...QUESTOES_REVALIDA_2013_1_10,
  ...QUESTOES_REVALIDA_2013_11_20,
  ...QUESTOES_REVALIDA_2013_21_29,
  ...QUESTOES_REVALIDA_2013_30_41,
  // ...import e adiciona depois os próximos blocos: _42_... etc.
];
