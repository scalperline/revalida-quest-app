/**
 * Banco de questões oficiais Revalida INEP 2011
 * Estrutura organizada com enunciado, alternativas, resposta correta, feedback e referência
 */

export type Opcao = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
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
  correct: string; // letra (A, B, C, D ou E)
  referencia?: string; // referência do INEP ou bibliográfica, caso disponível
  imagemEnunciado?: string; // Caminho para a imagem do enunciado, caso exista
};

// Questões extraídas das páginas 1 e 2 (primeiras 10 questões das imagens)
export const QUESTOES_REVALIDA_2011: QuestaoRevalida[] = [
  {
    id: 1,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Mulher com 54 anos de idade, Índice de Massa Corporal (IMC) = 32,6, portadora de diabetes tipo 2, controlado com medidas dietéticas e uso de glibenclamida, comparece à Unidade Básica de Saúde com queixa de dor, do tipo cólica, em hipocôndrio direito, que se irradia para o ombro direito e piora após ingestão de alimentos, especialmente gordurosos. Relata episódios de vômitos durante algumas crises. Disse, ainda, que o quadro iniciou-se há mais ou menos seis meses, agravando-se no último mês. Após a realização do exame físico, o médico solicitou ultrassonografia de abdome que evidenciou “colecistopatia calculosa crônica”. Ao explicar o diagnóstico para a paciente, ela informou que gostaria de passar seis meses visitando a filha que mora em Portugal. Baseado nessa situação, você diria à paciente que seu quadro clínico`,
    options: [
      { id: "A", text: "é crônico e o tratamento cirúrgico pode ser adiado.", feedbackCorreta: "Quadros crônicos e estáveis de colecistopatia calculosa permitem programar a cirurgia, sendo possível adiamento controlado na ausência de complicações.", feedbackErrada: "" },
      { id: "B", text: "requer tratamento cirúrgico antes da viagem.", feedbackErrada: "Não há indicação absoluta de urgência cirúrgica na ausência de sinais de complicação aguda." },
      { id: "C", text: "requer tratamento cirúrgico imediato.", feedbackErrada: "A cirurgia imediata está indicada apenas em casos complicados ou agudos." },
      { id: "D", text: "requer acompanhamento imediato quando aparecerem indícios de complicações.", feedbackErrada: "O acompanhamento imediato é importante, mas a conduta descrita na alternativa correta é mais adequada." },
      { id: "E", text: "requer antibioticoterapia imediata e uso de antiespasmódicos.", feedbackErrada: "A antibioticoterapia está reservada para casos infecciosos/agudos, não para quadros crônicos estáveis." }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q1. Adicionar referência oficial."
  },
  {
    id: 2,
    year: 2011,
    area: "Pediatria",
    enunciado: `Menina com cinco anos de idade, acometida de leucemia linfóide aguda (LLA), internada em enfermaria pediátrica, está sendo submetida à quimioterapia para tratamento da leucemia. Em outra ala da enfermaria, uma criança apresentou febre e desenvolveu lesões eritematobolhosas sugestivas de varicela. Nesse contexto, a conduta ideal a ser tomada em relação a criança com leucemia é`,
    options: [
      { id: "A", text: "administrar vacina contra varicela.", feedbackErrada: "Vacina de vírus vivo atenuado é contraindicada em imunodeprimidos." },
      { id: "B", text: "aplicar imunoglobulina específica anti-varicela.", feedbackCorreta: "Imunoglobulina específica é indicada como prevenção em situação de exposição de imunodeprimido ao vírus da varicela.", feedbackErrada: "" },
      { id: "C", text: "administrar aciclovir por 10 dias.", feedbackErrada: "Aciclovir está indicado em casos confirmados de varicela, não profilaticamente." },
      { id: "D", text: "administrar a vacina contra varicela e o aciclovir por 10 dias.", feedbackErrada: "Vacina continua contraindicada, aciclovir não é necessário profilaticamente." },
      { id: "E", text: "administrar a vacina contra varicela e imunoglobulina específica.", feedbackErrada: "Vacina não é indicada para imunodeprimidos." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q2. Adicionar referência oficial."
  },
  {
    id: 3,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: `Ao atender uma mulher, com 24 anos de idade, você observa grande resistência dela para continuar o aleitamento materno de seu filho de dois meses. Além dos inquestionáveis benefícios para a criança, você orienta a paciente sobre os benefícios que o aleitamento materno traz para a mulher que amamenta, entre os quais figuram, a proteção contra o câncer de mama e contra`,
    options: [
      { id: "A", text: "o câncer de colo uterino.", feedbackErrada: "Os estudos não demonstram relação com proteção ao câncer de colo uterino." },
      { id: "B", text: "o câncer de endométrio.", feedbackCorreta: "O aleitamento materno reduz risco de câncer de ovário e endométrio.", feedbackErrada: "" },
      { id: "C", text: "os tumores da vulva.", feedbackErrada: "Não há comprovação científica de que previna tumores da vulva." },
      { id: "D", text: "o desenvolvimento de miomas.", feedbackErrada: "Aleitamento materno não previne miomas." },
      { id: "E", text: "o câncer de ovário.", feedbackErrada: "Principal benefício é para câncer de mama e endométrio; câncer de ovário existe mas é menos documentado." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q3. Adicionar referência oficial."
  },
  {
    id: 4,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: `Mulher com 45 anos de idade, cor branca, multípara, proveniente de zona rural, procura consulta ginecológica com queixa de peso na região pélvica há cerca de 60 dias, perda de peso corporal e distensão abdominal. A paciente não faz uso de método contraceptivo oral e não apresenta dismenorreia. A paciente tem antecedente de neoplasia maligna de mama e a mãe, história de câncer de ovário. Ao exame, observou-se massa palpável em anexo esquerdo.
De acordo com o exame clínico e com os antecedentes pessoais e familiares informados pela paciente, qual a principal hipótese diagnóstica?`,
    options: [
      { id: "A", text: "Cisto benigno de ovário.", feedbackErrada: "O quadro é sugestivo de neoplasia maligna, não cisto benigno." },
      { id: "B", text: "Neoplasia maligna de ovário.", feedbackCorreta: "Fatores de risco presentes e achados clínicos sugerem neoplasia maligna ovariana.", feedbackErrada: "" },
      { id: "C", text: "Endometrioma.", feedbackErrada: "Endometrioma tende a cursar com dismenorreia e outros sintomas ginecológicos." },
      { id: "D", text: "Tuberculose genital (ovário e trompa).", feedbackErrada: "Não há história epidemiológica para tuberculose." },
      { id: "E", text: "Abscesso ovariano.", feedbackErrada: "Ausência de sinais infecciosos agudos." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q4. Adicionar referência oficial."
  },
  {
    id: 5,
    year: 2011,
    area: "Pediatria",
    enunciado: `Criança com um ano de idade foi amamentada com leite materno exclusivamente até os seis meses, quando passou a receber alimentação complementar com frutas, papa salgada composta de vegetais, cereais e, às vezes, carne. Na ocasião da consulta de puericultura, por apresentar palidez, o médico solicitou eritrograma que apresentou os seguintes resultados :
Hemoglobina = 10,2 mg/dL (valor normal = 11 - 13 mg/dL); Hematócrito = 30,8 % (valor normal = 36-44 %); Volume Corpuscular Médio = 75 fL (valor normal = 77- 101 fL); Hemoglobina Corpuscular Média = 21 pg (valor normal = 23-31 pg); Concentração de Hemoglobina Corpuscular Média = 26 g/dL (valor normal = 28-33 g/dL) e RDW = 15,5 % (valor normal <14 %).

A hipótese diagnóstica elaborada pelo médico e o exame complementar que melhor confirma esse diagnóstico são, respectivamente,`,
    options: [
      { id: "A", text: "anemia falciforme e contagem de reticulócitos.", feedbackErrada: "Anemia falciforme não está sugerida pelos dados do caso." },
      { id: "B", text: "anemia por deficiência de ácido fólico e dosagem de folatos.", feedbackErrada: "Os dados não sugerem anemia megaloblástica." },
      { id: "C", text: "anemia megaloblástica e eletroforese de hemoglobina.", feedbackErrada: "Dados são mais sugestivos de anemia ferropriva/microcítica." },
      { id: "D", text: "anemia carencial ferropriva e dosagem da ferritina sérica.", feedbackCorreta: "Epidemiologia, história alimentar e resultados laboratoriais apontam fortemente para anemia ferropriva." },
      { id: "E", text: "talassemia e dosagem de ferro sérico.", feedbackErrada: "Dados laboratoriais são mais sugestivos de carência nutricional/ferropriva do que talassemia." }
    ],
    correct: "D",
    referencia: "Prova Revalida INEP 2011, Q5. Adicionar referência oficial."
  },
  {
    id: 6,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: `Quanto ao desenvolvimento de diabetes gestacional em paciente primigesta, com 29 anos de idade, estatura de 1,50 m , peso pré-gravídico de 70Kg, peso atual de 75Kg na 24ª semana de gestação e glicemia em jejum de 90mg/dl, pode-se afirmar`,
    options: [
      { id: "A", text: "a ausência de risco pela idade inferior a 30 anos da gestante.", feedbackErrada: "Idade menor que 30 não exclui risco, outros fatores devem ser considerados." },
      { id: "B", text: "a existência de risco pelo ganho excessivo de peso na gestação.", feedbackCorreta: "Ganho de peso excessivo durante a gestação é fator de risco importante para diabetes gestacional.", feedbackErrada: "" },
      { id: "C", text: "a ausência de risco pela normalidade da glicemia de jejum da gestante.", feedbackErrada: "Stressor de risco permanece mesmo com glicemia inicial normal." },
      { id: "D", text: "a existência de risco pelo IMC pré-gravídico superior a 27Kg/m2.", feedbackCorreta: "", feedbackErrada: "IMC superior a 27 também é fator de risco; alternativa correta é a B por considerar ganho durante a gestação." },
      { id: "E", text: "a ausência de risco pela inexistência de antecedentes familiares da gestante.", feedbackErrada: "Mesmo sem antecedentes familiares, demais fatores de risco mantém necessidade de triagem e vigilância." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q6. Adicionar referência oficial."
  },
  {
    id: 7,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: `Mulher com 34 anos de idade, gestante de 28 semanas, iniciou quadro febril há cinco dias associado a dor no hemitórax esquerdo à respiração profunda. Há dois dias passou a apresentar tosse produtiva com expectoração amarelada. Procurou Unidade de Pronto Atendimento.

Ao exame: bom estado geral; sinais vitais: Pulso = 100 bpm; Pressão arterial = 120 x 80 mmHg; Frequência respiratória = 23 irpm. Temperatura axilar = 39 ºC; Ausculta pulmonar: crepitações, broncofonia e aumento do frêmito tóraco-vocal na base do pulmão esquerdo. O leucograma apresenta 15.800 leucócitos/mm³, com predomínio de polimorfonucleares neutrófilos.

Qual a conduta a ser tomada, com relação a exames de imagem e tratamento antimicrobiano?`,
    options: [
      { id: "A", text: "Solicitar radiografia de tórax com proteção abdominal e iniciar tratamento com amoxicilina oral.", feedbackCorreta: "A proteção abdominal na radiografia é fundamental em gestantes e amoxicilina é antibiótico seguro e eficaz na gestação.", feedbackErrada: "" },
      { id: "B", text: "Solicitar ultrassonografia de tórax e iniciar tratamento com quinolona respiratória oral.", feedbackErrada: "Quinolonas têm restrição absolutas em gestantes; USG não substitui radiografia para este fim." },
      { id: "C", text: "Solicitar tomografia computadorizada do tórax e iniciar tratamento com aminoglicosídeo injetável.", feedbackErrada: "Ambos são contraindicados em gestantes devido à exposição e toxicidade." },
      { id: "D", text: "Solicitar radiografia de tórax com proteção abdominal e iniciar claritromicina oral.", feedbackErrada: "Claritromicina deve ser evitada sempre que possível em gestantes pelo risco teratogênico potencial." },
      { id: "E", text: "Solicitar tomografia computadorizada do tórax e iniciar vancomicina injetável.", feedbackErrada: "Não há indicação nem segurança neste contexto para essas opções." }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q7. Adicionar referência oficial."
  },
  {
    id: 8,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Mulher com 48 anos de idade, parda, comerciante, procura o posto de saúde por apresentar astenia, palidez e fadiga fácil ao realizar suas tarefas diárias. Na história da doença atual relata que esteve bem de saúde até há 15 dias, quando iniciaram estes sinais e sintomas. Nega doenças como diabetes, hipertensão, doenças da tireóide. Nega também o uso de medicamentos.
Ao exame físico apresenta palidez, icterícia (2+/4+), esplenomegalia de 4 cm do rebordo costal esquerdo e hepatomegalia de 2 cm do rebordo costal direito. Exames laboratoriais realizados mostram hemoglobina = 4,2 g/dL; hematócrito = 13 %; VCM = 110 fL (VR = 80 – 100 fL); HCM = 32 pg (VR = 26 – 34 pg); leucograma = 10.500 / mm3 com diferencial normal; plaquetas = 240.000 / mm3; reticulócitos aumentados; bilirrubina total = 4,0 mg/dL (VR=0,3 - 1,2 mg/dL) com fração direta de 0,8 mg/dL (VR = 0 - 0,2 mg/dL).

Qual o diagnóstico mais provável para anemia da paciente?`,
    options: [
      { id: "A", text: "Anemia por déficit de produção ocasionado por deficiência de vitamina B12.", feedbackErrada: "O quadro é de anemia hemolítica, não de deficiência de B12." },
      { id: "B", text: "Anemia do tipo regenerativa provocada por doença hemolítica adquirida.", feedbackCorreta: "Bicitopenia, reticulocitose e hiperbilirrubinemia são típicos de anemia hemolítica.", feedbackErrada: "" },
      { id: "C", text: "Anemia arregenarativa por deficiência quantitativa de células progenitoras associada à hepatite viral.", feedbackErrada: "O leucograma normal e a ausência de hepatite viral tornam improvável essa hipótese." },
      { id: "D", text: "Anemia por deficiência na síntese do heme durante a diferenciação das células eritroides.", feedbackErrada: "Falta de achados laboratoriais específicos para porfirias e quadro incompatível." },
      { id: "E", text: "Anemia por deficiência na síntese da globina durante a diferenciação das células eritroides.", feedbackErrada: "O conjunto clínico-laboratorial não aponta para hemoglobinopatias congênitas." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q8. Adicionar referência oficial."
  },
  {
    id: 9,
    year: 2011,
    area: "Pediatria",
    enunciado: `Um menino com cinco anos e oito meses foi levado pela mãe à Unidade Básica de Saúde. Há três semanas vem apresentando dor abdominal inespecífica, tosse, febre e hábito de comer terra. Ao exame físico, o médico encontrou palidez cutânea moderada e hepatomegalia. Foram solicitados alguns exames: 1) hemograma: hemoglobina 10 g/dL, hematócrito 30 %; leucocitose (16.000/mm3), eosinofilia (12 %), plaquetas normais; 2) exame parasitológico das fezes (em andamento) e 3) exame ultrassonográfico do abdome que revelou imagens hipoecogênicas micronodulares no fígado.

Com base na história clínica e nos exames complementares, o diagnóstico principal e o tratamento são`,
    options: [
      { id: "A", text: "ancilostomíase; utilizar mebendazol, 100 mg, duas vezes ao dia, durante três dias.", feedbackErrada: "Ancilostomíase não é hepatotrópica e raramente se manifesta por essas alterações hepáticas." },
      { id: "B", text: "giardíase; utilizar secnidazol, 30 mg/Kg, dose única.", feedbackErrada: "Giardíase não costuma causar quadro hepático." },
      { id: "C", text: "toxocaríase; utilizar albendazol, 10 mg/Kg, uma vez ao dia, durante cinco dias.", feedbackCorreta: "A toxocaríase é clássica em crianças geofágicas com eosinofilia, hepatomegalia e nódulos hepáticos.", feedbackErrada: "" },
      { id: "D", text: "estrongiloidíase; utilizar secnidazol, 25 mg/Kg, uma vez ao dia, de cinco a sete dias.", feedbackErrada: "Estrongiloidíase usualmente não se manifesta com nódulos hepáticos." },
      { id: "E", text: "amebíase; utilizar secnidazol, 30 mg/Kg, dose única.", feedbackErrada: "Amebíase normalmente não se manifesta desse modo em crianças." }
    ],
    correct: "C",
    referencia: "Prova Revalida INEP 2011, Q9. Adicionar referência oficial."
  },
  {
    id: 10,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: `Mulher multípara, com gestação de 34 semanas e um dia, chega à maternidade com queixa de dor em cólica e endurecimento do abdome. Ao exame: presença de contrações uterinas frequentes (uma a cada cinco minutos), colo uterino com 50% de esvaecimento e 1cm de dilatação, vitalidade fetal preservada. A conduta correta a ser adotada para a paciente é`,
    options: [
      { id: "A", text: "administrar terbutalina associada a corticosteroide.", feedbackErrada: "Terbutalina está em desuso pelo perfil de efeitos adversos, preferência no Brasil é por outro tocolítico." },
      { id: "B", text: "iniciar partograma e acompanhar evolução do trabalho de parto.", feedbackErrada: "Partograma é útil após fase ativa do trabalho de parto, quando o diagnóstico de ameaça/parto prematuro não se coloca." },
      { id: "C", text: "administrar indometacina e iniciar antibioticoterapia por via endovenosa.", feedbackErrada: "Indometacina não é primeira escolha como tocolítico nesta idade gestacional e antibioticoterapia sem infecção não é indicada." },
      { id: "D", text: "guardar repouso em observação e reavaliar o quadro após duas horas.", feedbackCorreta: "Toda ameaça de parto prematuro deve ter uma conduta expectante inicial com monitoramento.", feedbackErrada: "" },
      { id: "E", text: "administrar nifedipina sem associação de corticosteroide.", feedbackErrada: "Nifedipina isolada pode ser útil, mas sem corticosteroide não atinge objetivo fundamental de maturidade fetal." }
    ],
    correct: "D",
    referencia: "Prova Revalida INEP 2011, Q10. Adicionar referência oficial."
  },
  {
    id: 11,
    year: 2011,
    area: "Pediatria",
    enunciado: `Uma senhora comparece à Unidade Básica de Saúde com seu filho de seis meses de idade, dizendo-se preocupada com o desenvolvimento da criança, e sem qualquer outra queixa. O peso da criança ao nascer foi de 3.400g. Em sua alimentação atual estão sendo introduzidos alimentos sólidos e o calendário de vacinação vem sendo cumprido. O exame físico da criança é inteiramente normal.

Como indicador do desenvolvimento neuropsicomotor normal para criança nessa faixa etária (6 meses), o médico deverá observar se a criança`,
    options: [
      { id: "A", text: "apresenta choro excessivo e faz o acompanhamento com o olhar.", feedbackErrada: "Choro excessivo não é esperado, acompanhamento com o olhar é esperado para meses anteriores." },
      { id: "B", text: "faz a preensão de objetos com a mão e apresenta sorriso social.", feedbackCorreta: "A preensão voluntária de objetos e sorriso social são esperados no desenvolvimento de 6 meses." },
      { id: "C", text: "senta-se sem apoio e fala sílabas.", feedbackErrada: "Sentar sem apoio e falar sílabas são marcos de maturidade um pouco mais avançada." },
      { id: "D", text: "rola sem auxílio e reconhece pessoas.", feedbackErrada: "Rolar e reconhecer pessoas normalmente aparecem antes dos 6 meses." },
      { id: "E", text: "firma a cabeça e apanha objetos.", feedbackErrada: "Firmar a cabeça é esperado já nos primeiros meses de vida." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q11."
  },
  {
    id: 12,
    year: 2011,
    area: "Pediatria",
    enunciado: `Você é chamado para prestar assistência neonatal durante um parto no qual foi constatado sofrimento fetal com líquido amniótico meconial. O Recém Nascido nasceu com Apgar 2 (Frequência cardíaca = 1 e Frequência Respiratória = 1). A conduta inicial, conforme as normas vigentes de Reanimação Neonatal, é`,
    options: [
      { id: "A", text: "iniciar ventilação com ambu e máscara, aspirando o Recém Nascido após a recuperação da frequência cardíaca.", feedbackErrada: "A aspiração deve ser realizada previamente à ventilação para evitar maiores complicações." },
      { id: "B", text: "iniciar ventilação com tubo oro-traqueal e aspirar o Recém Nascido após recuperação da frequência cardíaca.", feedbackErrada: "A aspiração nas normas atuais é indicada antes da ventilação, especialmente em RN deprimido." },
      { id: "C", text: "iniciar ventilação com pressão positiva e administrar adrenalina e massagem cardíaca.", feedbackErrada: "A prioridade inicial não é adrenalina, e sim desobstrução das vias aéreas se presença de líquido meconial." },
      { id: "D", text: "aspirar laringe e traquéia do Recém Nascido e ventilar com pressão positiva ao ambiente.", feedbackCorreta: "RN deprimido com líquido meconial: aspiração traqueal e ventilação são prioridades." },
      { id: "E", text: "aspirar laringe e traquéia do Recém Nascido e oferecer oxigênio inalatório a 100%.", feedbackErrada: "O mais importante é ventilar com pressão positiva se indicado." }
    ],
    correct: "D",
    referencia: "Prova Revalida INEP 2011, Q12."
  },
  {
    id: 13,
    year: 2011,
    area: "Saúde Coletiva",
    enunciado: `Paciente do sexo masculino, com 45 anos de idade, é dependente químico de cocaína, com uso por via inalatória e procurou o serviço especializado do CAPS (Centro de Apoio Psicossocial) para tratamento. A oferta desse atendimento no Sistema Único de Saúde caracteriza ações de que tipo?`,
    options: [
      { id: "A", text: "Prevenção primordial.", feedbackErrada: "A prevenção primordial visa impedir o surgimento de fatores de risco e não é o caso aqui." },
      { id: "B", text: "Prevenção quaternária.", feedbackErrada: "Prevenção quaternária está relacionada a evitar excessos médicos desnecessários, não aplicação aqui." },
      { id: "C", text: "Prevenção terciária.", feedbackCorreta: "Atendimento no CAPS caracteriza ação de prevenção terciária (minimizar danos e reabilitação de pacientes adoecidos)." },
      { id: "D", text: "Prevenção secundária.", feedbackErrada: "A prevenção secundária refere-se a diagnóstico e tratamento precoce, não se enquadra." },
      { id: "E", text: "Prevenção primária.", feedbackErrada: "Aqui não se trata da prevenção primária, pois o paciente já está adoecido." }
    ],
    correct: "C",
    referencia: "Prova Revalida INEP 2011, Q13."
  },
  {
    id: 14,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Homem, com 58 anos de idade, é atendido em serviço de urgência e relata a ocorrência, há cerca de seis meses, de modificação de seu hábito intestinal - períodos de constipação intercalados por evacuações de fezes pastosas, às vezes acompanhadas da eliminação de muco e sangue. Nesse período foi visto em consultas, nas quais foi prescrito tratamento antiparasitário, não havendo melhora da sintomatologia. O paciente informa ainda que há cerca de um mês, vem apresentando intensificação do esforço evacuatório. Nesse período as fezes têm se tornado cada vez mais afiladas e há dois dias vem observando a diminuição quase completa da eliminação de flatos e fezes, relatando também a ocorrência de náuseas e um episódio de vômitos de conteúdo biliar.

Com base nessa história, qual a conduta imediata a ser seguida?`,
    options: [
      { id: "A", text: "Instalar sonda nasogástrica, prescrever hidratação parenteral, lactulona e antieméticos e manter paciente em observação.", feedbackErrada: "Lactulona pode ser prejudicial se houver obstrução intestinal; caso suspeito de obstrução, não é recomendado." },
      { id: "B", text: "Instalar sonda nasogástrica, prescrever hidratação parenteral, clister com solução glicerinada e manter paciente em observação.", feedbackCorreta: "Medidas de suporte e desimpactação precedem avaliação invasiva/cirurgia em obstrução de ID por neoplasia." },
      { id: "C", text: "Instalar sonda nasogástrica, prescrever hidratação parenteral e clister com solução glicerinada. A posteriori instalar sonda retal e manter paciente em observação.", feedbackErrada: "Excesso de procedimentos pode não ser seguro na apresentação clínica descrita." },
      { id: "D", text: "Prescrever antiespasmódicos, dimeticona e solicitar colonoscopia com biópsia e dosagem de antígeno carcino-embrionário.", feedbackErrada: "Colonoscopia não é conduta imediata em suspeita de obstrução intestinal aguda." },
      { id: "E", text: "Encaminhar imediatamente o paciente para avaliação cirúrgica.", feedbackErrada: "Nem todos pacientes requerem cirurgia de imediato se não há instabilidade ou sinais de sofrimento visceral iminente." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q14."
  },
  {
    id: 15,
    year: 2011,
    area: "Pediatria",
    enunciado: `Uma criança que nasceu prematura, com 32 semanas de idade gestacional e peso de 1850g, foi encaminhada à Unidade de Saúde para iniciar as imunizações. Atualmente, com um mês de vida, pesa 1900g e recebe aleitamento materno exclusivo.

Para essa situação, qual a alternativa que indica o esquema inicial de vacinação recomendado?`,
    options: [
      { id: "A", text: "Iniciar o esquema vacinal aplicando a vacina BCG e a primeira dose da vacina contra a Hepatite B.", feedbackErrada: "A vacina BCG é indicada com peso mínimo de 2.000g. Jar a Hepatite B pode ser feita em neonatos de baixo peso." },
      { id: "B", text: "Aplicar a primeira dose da vacina contra a Hepatite B e aguardar a criança atingir 2000g para programar a vacina BCG.", feedbackCorreta: "BCG: indicada >2.000g; Hepatite B: pode ser aplicada antes. Essa é a conduta correta para prematuros." },
      { id: "C", text: "Aguardar a criança atingir 2500g para aplicar a vacina BCG e contra a Hepatite B (primeira dose).", feedbackErrada: "Peso mínimo para BCG é 2.000g; Hepatite B pode e deve ser aplicada logo ao nascimento." },
      { id: "D", text: "Aguardar a criança atingir 2000g para aplicar a vacina contra a Hepatite B (primeira dose) e 2500g para aplicar a vacina BCG.", feedbackErrada: "Vacina de Hepatite B não necessita peso mínimo." },
      { id: "E", text: "Aplicar as vacinas BCG e contra a Hepatite B (primeira dose) e programar a segunda dose desta última para 15 dias depois.", feedbackErrada: "A segunda dose de Hepatite B segue cronograma padrão." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q15."
  },
  {
    id: 16,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Homem, com 43 anos de idade, é atendido na Unidade Básica de Saúde com queixa de dispneia aos grandes esforços, há seis meses. Não relata dor precordial, síncope ou palpitações. No exame, encontra-se em bom estado geral, eupneico, hidratado, corado. Pressão arterial = 100x70 mmHg, Frequência cardíaca = 112bpm, Frequência respiratória = 18irpm; temperatura axilar = 36,5°C. Murmúrio vesicular presente e simétrico bilateralmente. Ritmo cardíaco regular, em dois tempos, bulhas hipofonéticas, com sopro sistólico de regurgitação mitral discreto. Abdome flácido, sem visceromegalias, ruídos hidroaéreos presentes e regularmente distribuídos. Sem edema de membros inferiores. Radiografia de tórax atual mostra aumento global da área cardíaca, sem congestão pulmonar. Ecocardiograma transtorácico mostra a fração de ejeção do ventrículo esquerdo igual a 35%.

Com base nas evidências científicas indique a opção terapêutica para o caso.`,
    options: [
      { id: "A", text: "Hidroclorotiazida e carvedilol.", feedbackErrada: "Não há indicação de tiazídico nesse contexto. Carvedilol isoladamente é correto." },
      { id: "B", text: "Carvedilol e digoxina.", feedbackCorreta: "Carvedilol é primeira linha em insuficiência cardíaca com fração de ejeção reduzida." },
      { id: "C", text: "Enalapril e metoprolol.", feedbackErrada: "Enalapril isoladamente pode não ser suficiente; angiotensina e carvedilol são preferidos aqui." },
      { id: "D", text: "Espironolactona e enalapril.", feedbackErrada: "Pode ser útil, mas carvedilol está mais indicado." },
      { id: "E", text: "Digoxina e hidroclorotiazida.", feedbackErrada: "Digoxina pode ser coadjuvante, não de primeira escolha nesse contexto." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q16."
  },
  {
    id: 17,
    year: 2011,
    area: "Pediatria",
    enunciado: `O Agente Comunitário de Saúde lhe solicita explicações sobre um recém-nascido que apresenta coloração amarelada da pele. Você colhe, junto ao Agente Comunitário de Saúde, informações sobre a duração da gestação, as condições do parto e da criança ao nascer, o tempo de aparecimento do sintoma específico e verifica também resultados de exames do recém-nascido, realizados na maternidade: hemograma, dosagem de bilirrubinas e teste de Coombs. Diante dos dados clínicos e do resultado de exames, você conclui que trata-se de Icterícia Fisiológica do Recém-Nascido.

O que seria correto você informar ao Agente Comunitário de Saúde sobre a Icterícia Fisiológica do Recém-Nascido?`,
    options: [
      { id: "A", text: "Desaparece após três semanas do início da manifestação em neonatos nascidos a termo.", feedbackCorreta: "A icterícia fisiológica desaparece em até 3 semanas em recém-nascidos a termo." },
      { id: "B", text: "Desaparece após a primeira semana de vida em neonatos nascidos a termo.", feedbackErrada: "Icterícia fisiológica pode persistir até 3 semanas." },
      { id: "C", text: "Atinge níveis de bilirrubinemia bastante elevados, superiores a 14 mg%.", feedbackErrada: "Níveis tão altos sugerem patologia grave, não icterícia fisiológica." },
      { id: "D", text: "Deve-se a anemia hemolítica por incompatibilidade RH.", feedbackErrada: "Icterícia fisiológica não é anêmica ou patológica." },
      { id: "E", text: "Está presente desde o nascimento na hiperuricémia fetal.", feedbackErrada: "Não aparece logo ao nascer; manifesta-se após 24h de vida normal." }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q17."
  },
  {
    id: 18,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Homem, com 26 anos de idade, foi internado há dois dias com o diagnóstico de doença inflamatória intestinal na forma fulminante com megacólon tóxico. Há cerca de uma hora apresentou piora súbita da dor abdominal, vômitos e desconforto respiratório. O exame físico revela paciente taquicárdico, taquidispneico e com abdome muito doloroso difusamente. A complicação é frequente e o principal recurso diagnóstico para demonstrá-la são`,
    options: [
      { id: "A", text: "perfuração intestinal; radiografia de tórax e de abdome em ortostase e decúbito dorsal.", feedbackCorreta: "A principal complicação de megacólon tóxico fulminante é a perfuração intestinal, diagnosticada por RX." },
      { id: "B", text: "pneumotórax intestinal; enema opaco com contraste iodado.", feedbackErrada: "Enema opaco está contraindicado pelo risco de perfuração." },
      { id: "C", text: "abscesso perirretal; tomografia computadorizada de abdome.", feedbackErrada: "Abscesso perirretal é possível, mas não o principal risco imediato." },
      { id: "D", text: "vólvulo de sigmoide; colonoscopia.", feedbackErrada: "Vólvulo não é a causa mais comum neste contexto e colonoscopia pode ser perigosa." },
      { id: "E", text: "hematoma intraluminal; colonoscopia.", feedbackErrada: "Hematoma não é esperado como complicação principal." }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q18."
  },
  {
    id: 19,
    year: 2011,
    area: "Pediatria",
    enunciado: `Criança do sexo feminino, com sete anos de idade, é trazida pela mãe à Unidade Básica de Saúde, porque há três dias apresenta-se com adinamia, urina escura (cor de “coca-cola”) e inchaço nos olhos pela manhã. A mãe informa que há 15 dias a criança apresentou febre elevada e “dor de garganta” que regrediram com uso de antitérmico e de anti-inflamatório não hormonal (ibuprofeno). Na consulta o médico observa que a criança encontra-se em regular estado geral, afebril, eupneica, hipocorada (+/4), com frequência cardíaca de 116 bpm, Pressão arterial=118x82 mmHg, edema de face (+/4) e de membros inferiores (+/4). Os demais aspectos do exame físico são normais.

Na síndrome que a criança apresenta, a resposta inflamatória responsável pela instalação da lesão nefrítica`,
    options: [
      { id: "A", text: "é consequência da ativação de complemento, da liberação de fatores quimiotáticos e do recrutamento de neutrófilos.", feedbackErrada: "Complemento e quimiotaxia estão presentes, mas a lesão característica é infiltrado celular pelas alças glomerulares." },
      { id: "B", text: "decorre da fixação de estreptococos beta-hemolíticos nas alças capilares glomerulares e da consequente infiltração celular.", feedbackCorreta: "A fisiopatologia clássica é infiltrado celular após infecção estreptocócica." },
      { id: "C", text: "deve-se a modificações de uma IgM que, no contexto de uma infecção, torna-se imunogênica e desenvolve afinidade pelo glomérulo renal.", feedbackErrada: "Não é o mecanismo principal da glomerulonefrite." },
      { id: "D", text: "depende da deposição mesangial de C3, fibrina e IgA, e da proliferação de células mesangiais com expansão da matriz.", feedbackErrada: "Esse mecanismo é mais relacionado à nefropatia por IgA e não a pós-estreptocócica." },
      { id: "E", text: "manifesta-se por hipercelularidade glomerular, expansão da matriz mesangial e duplicação da membrana basal glomerular.", feedbackErrada: "A duplicação da membrana basal é característica de glomerulonefrite membranoproliferativa." }
    ],
    correct: "B",
    referencia: "Prova Revalida INEP 2011, Q19."
  },
  {
    id: 20,
    year: 2011,
    area: "Outros",
    enunciado: `Uma médica, durante plantão em serviço de emergência, atendeu um paciente com múltiplas lesões no antebraço direito, vítima de mordedura de cão que ocorrera há 3 horas. O acidente ocorreu na rua, mas o dono do animal foi identificado. O caso deverá ser conduzido por ela de acordo com o protocolo do Ministério da Saúde, que recomenda`,
    options: [
      { id: "A", text: "iniciar o esquema de vacinação e observar o animal por 10 dias.", feedbackCorreta: "Esse é o protocolo do Ministério da Saúde para animais identificados e saudáveis." },
      { id: "B", text: "aplicar o soro antirrábico e a vacina por 10 dias.", feedbackErrada: "Soro não é necessário se animal foi identificado e está sob observação." },
      { id: "C", text: "observar o cão durante 10 dias após a exposição, para iniciar a vacinação antirrábica.", feedbackErrada: "Deve-se iniciar já o esquema." },
      { id: "D", text: "aplicar soro antirrábico (dose única) no 10º dia de observação do animal.", feedbackErrada: "O protocolo recomenda iniciar o esquema imediatamente, não esperar 10 dias." },
      { id: "E", text: "sacrificar o animal imediatamente para evitar contaminação.", feedbackErrada: "Sacrifício é procedimento extremo e não faz parte do protocolo para animal conhecido e saudável." }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q20."
  },
  {
    id: 41,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Paciente, com 57 anos de idade, sexo masculino, chega ao pronto atendimento queixando-se de palpitações que se iniciaram há três dias, associadas à tontura e à dispneia. Relata fazer uso de metimazol 10 mg/dia há um mês por diagnóstico de hipertireoidismo. Faz uso ainda de enalapril 20 mg para hipertensão arterial desde os 45 anos de idade. 
Ao exame: Pressão arterial = 110 x 70 mmHg; Frequência cardíaca = 160 BPM; Frequência respiratória = 26 irpm; ritmo cardíaco taquicárdico, irregular, em dois tempos, sem sopros; murmúrio vesicular fisiológico com crepitações bibasais; abdome livre, indolor, ruídos hidroaéreos positivos; aparelho locomotor sem alterações. Saturação periférica de oxigênio de 87%. Solicitado ECG:`,
    imagemEnunciado: "/questao_images/2011_q41_ecg.png",
    options: [
      {
        id: "A",
        text: "Flutter atrial e amiodarona.",
        feedbackCorreta: "O ECG mostra padrão característico de flutter atrial (ondas F serrilhadas e resposta ventricular rápida e regular), e a amiodarona é antiarrítmico seguro na emergência. Em hipertireoidismo, é preferível à digoxina, pois controla melhor a FC.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "Taquicardia supra ventricular paroxística e procainamida.",
        feedbackErrada: "O ECG não mostra P' retrógradas nem complexos QRS anormais, além do ritmo não ser de dissociação AV. Procainamida não seria antiarrítmico de escolha."
      },
      {
        id: "C",
        text: "Síndrome de Wolff-Parkinson-White e beta bloqueador.",
        feedbackErrada: "Não há sopro tipo delta wave nem PR curto; além disso, o uso de betabloqueador pode ser arriscado em pacientes com via acessória no contexto de WPW."
      },
      {
        id: "D",
        text: "Taquicardia atrial multifocal e bloqueadores de canais de cálcio.",
        feedbackErrada: "O ECG não mostra várias ondas P de morfologias distintas, como esperado em taquicardia atrial multifocal."
      },
      {
        id: "E",
        text: "Fibrilação atrial e digitálico.",
        feedbackErrada: "Embora a apresentação clínica seja compatível, o traçado revela flutter, não fibrilação. Digitálico não é a melhor escolha no contexto de hipertireoidismo."
      }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q41. Referência: Goldman's Cecil Medicina, 25ª ed., Cap. 54; UpToDate – Management of supraventricular arrhythmias."
  },
  {
    id: 42,
    year: 2011,
    area: "Cirurgia",
    enunciado: `Mulher, com 35 anos de idade, procura atendimento médico por apresentar quadro de dor de início súbito, com localização inicial na região epigástrica, inicialmente acompanhada de vômitos, com rápida expansão para o flanco e a fossa ilíaca direita e, posteriormente, para todo o abdome. A paciente apresenta extremidades frias e respiração superficial; busca manter-se imóvel e adota posição antálgica, com pernas fletidas sobre o tronco.
O abdome é difusamente doloroso, sendo evidentes a contratura abdominal e a rigidez da musculatura abdominal à palpação e à respiração. A radiografia de tórax e a radiografia simples de abdome, ambas realizadas em ortostase, mostram pneumoperitônio.

Com relação à complicação apresentada pela paciente, é correto afirmar que`,
    options: [
      {
        id: "A",
        text: "A figura entra as causas mais frequentes de abdome agudo não traumático e metade dos casos ocorrem em pacientes com idade entre 20 e 40 anos.",
        feedbackErrada: "A maior incidência é realmente nessa faixa etária, porém o enunciado se refere à incidência de úlceras perfuradas, não apenas ao pneumoperitônio."
      },
      {
        id: "B",
        text: "Nas úlceras duodenais as perfurações ocorrem, de um modo geral, na parede posterior e na curvatura do duodeno.",
        feedbackErrada: "A maioria das perfurações de úlcera duodenal ocorre na parede anterior do bulbo duodenal, não na posterior."
      },
      {
        id: "C",
        text: "Nas úlceras gástricas as perfurações ocorrem, usualmente, na parede posterior do antro e da região pré-pilórica.",
        feedbackErrada: "O mais comum é a perfuração pela parede anterior do antro gástrico e não da posterior."
      },
      {
        id: "D",
        text: "A área mais acometida por perfurações de úlceras pépticas é o estômago, na proporção de 14:1 em relação ao duodeno.",
        feedbackErrada: "A incidência é inversa: a perfuração ocorre 14 vezes mais no duodeno do que no estômago."
      },
      {
        id: "E",
        text: "A mortalidade é proporcionalmente maior nas perfurações duodenais, em torno de 20%, talvez porque acometam pacientes mais idosos.",
        feedbackCorreta: "A letalidade das perfurações é de fato maior nos quadros de úlcera duodenal em pacientes idosos e a mortalidade pode chegar a 20%."
      }
    ],
    correct: "E",
    referencia: "Prova Revalida INEP 2011, Q42. Referência: Sabiston – Tratado de Cirurgia, 18ª ed., Cap. 49."
  },
  {
    id: 43,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Paciente, com 35 anos de idade, sexo masculino, etilista, é trazido por familiares ao hospital após ter apresentado crise convulsiva generalizada e perda de consciência. Esposa relata que o paciente não fazia uso de medicamentos, tendo realizado consulta médica recente. Nega que tenham ocorrido quedas ou traumatismos antecedendo o início do quadro. Ao exame: Pressão arterial = 190 x 100 mmHg, Frequência cardíaca = 50 bpm ritmo cardíaco regular em dois tempos, sem sopros; murmúrio vesicular fisiológico sem ruídos adventícios. Escala de coma de Glasgow: 7, pupilas anisocóricas (maior à direita) e fotorreagentes; hemiplegia à esquerda. Saturação periférica de oxigênio de 98 %.

Qual a conduta a ser tomada para esse paciente no momento da admissão?`,
    options: [
      {
        id: "A",
        text: "Entubação orotraqueal + hiperventilação mecânica; manitol.",
        feedbackCorreta: "A escala de Glasgow menor que 8 indica rebaixamento do nível de consciência, exigindo proteção de vias aéreas e controle da hipertensão intracraniana com manitol.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "Ventilação não invasiva; manitol e solução hipertônica.",
        feedbackErrada: "Ventilação não invasiva está contraindicada em pacientes com rebaixamento do nível de consciência devido ao risco de aspiração."
      },
      {
        id: "C",
        text: "Suplementação de oxigênio por máscara; manitol.",
        feedbackErrada: "Apenas a suplementação de oxigênio não é suficiente para proteger vias aéreas e evitar aspiração."
      },
      {
        id: "D",
        text: "Entubação orotraqueal + ventilação mecânica.",
        feedbackErrada: "O tratamento ideal inclui, além da ventilação, o uso de manitol para controle da hipertensão intracraniana."
      },
      {
        id: "E",
        text: "Entubação orotraqueal + ventilação mecânica + anti-hipertensivo.",
        feedbackErrada: "Apesar da PA elevada, o tratamento com anti-hipertensivos deve ser criterioso para não induzir redução crítica da perfusão cerebral."
      }
    ],
    correct: "A",
    referencia: "Prova Revalida INEP 2011, Q43. Referência: Adams & Victor – Princípios de Neurologia, 8ª ed., Cap. 34."
  },
  {
    id: 44,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Homem, assintomático, com 45 anos de idade e que apresenta tumor renal, procura atendimento em consultório médico portando documento que o identifica como Testemunha de Jeová, informando que não deverá ser submetido à transfusão de sangue. O documento foi registrado em cartório e enumera todos os motivos pelos quais o mesmo tem o direito de não receber transfusão de sangue. É provável que este paciente seja submetido a tratamento cirúrgico, pois esta alternativa terapêutica aponta melhor sobrevida. Ele se nega veementemente a receber transfusão, caso seja necessário. Qual a conduta baseada nos princípios éticos positivos na última versão do Código de Ética Médica brasileiro?`,
    options: [
      {
        id: "A",
        text: "Não dar certeza ao paciente que não transfundirá o sangue e realizar o procedimento cirúrgico.",
        feedbackErrada: "O respeito à autonomia exige que se siga a vontade expressa do paciente; não há justificativa para descumprir decisão fundamentada."
      },
      {
        id: "B",
        text: "Garantir ao paciente que tentará ao máximo não transfundir, mas transfundir se necessário.",
        feedbackErrada: "Mesmo tentando respeitar a autonomia, o correto é respeitar integralmente decisão do paciente habilitado e consciente."
      },
      {
        id: "C",
        text: "Tentar dissuadir o paciente da sua crença religiosa para o bem da sua saúde.",
        feedbackErrada: "Não se deve tentar impor crenças ou pressões pessoais sobre decisões de foro íntimo do paciente consciente e bem orientado."
      },
      {
        id: "D",
        text: "Realizar o procedimento cirúrgico e, se necessário, transfundir, informando a família.",
        feedbackErrada: "Família não pode substituir manifestação expressa de vontade do próprio paciente lúcido e emancipado."
      },
      {
        id: "E",
        text: "Negar-se a realizar o procedimento e orientar o paciente a procurar outro médico.",
        feedbackCorreta: "O princípio da autonomia exige o respeito à decisão do paciente, inclusive em situações de risco; não se pode obrigar ou coagir a conduta."
      }
    ],
    correct: "E",
    referencia: "Prova Revalida INEP 2011, Q44. Referência: Código de Ética Médica 2010, Cap. I (Princípios Fundamentais), Resolução CFM 1931/09."
  }
];
