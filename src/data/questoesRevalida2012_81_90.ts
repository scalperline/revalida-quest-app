
import type { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_81_90: Question[] = [
  // ...(questões 81 a 89, conforme já existente e correto)...
  // Vou corrigir apenas a sintaxe e garantir que cada objeto esteja separado por vírgula,
  // que todos os colchetes estejam fechados, e não há símbolos estranhos.

  {
    id: 81,
    year: 2012,
    area: "Ética Médica / Ginecologia / Saúde Pública",
    enunciado: `Primigesta, 14 anos de idade, na 12.ª semana de gestação, comparece à Unidade de Saúde da Família acompanhada por seu namorado. Queixa-se de cólicas intensas em baixo ventre e sangramento vaginal, em grande quantidade, há 2 horas. Após exame clínico, o médico constata que a paciente apresenta sinais de instabilidade hemodinâmica em virtude de um abortamento incompleto e indica sua transferência imediata para o serviço hospitalar especializado, para realização de curetagem uterina. A paciente concorda com a indicação do médico, pede para que a situação só seja mantida em sigilo, pois seus pais não sabem que ela está grávida. Teme que possam expulsá-la de casa ao saber do ocorrido. Explica que seu namorado é maior de idade e irá acompanhá-la ao hospital.\n\nDiante dessa situação, o médico deve`,
    options: [
      {
        id: "A",
        text: "manter o sigilo profissional, pois o mesmo somente pode ser quebrado com a autorização da paciente.",
        feedbackErrada: "Jovem menor de idade em situação de risco deve ter responsável legal informado."
      },
      {
        id: "B",
        text: "manter o sigilo profissional, pois a paciente apresentou um responsável maior de idade para acompanhá-la ao hospital.",
        feedbackErrada: "O acompanhante não substitui comunicação a responsável legal em menores."
      },
      {
        id: "C",
        text: "manter o sigilo profissional, pois a paciente demonstra capacidade para avaliar seu problema e conduzir-se por seus próprios meios para solução.",
        feedbackErrada: "Menor de 18 anos em risco de vida deve ter família informada."
      },
      {
        id: "D",
        text: "comunicar o Conselho Tutelar, que será responsável por relevar a situação se saúde da paciente aos seus pais e intermediar os conflitos que possam surgir.",
        feedbackCorreta: "Correto. É dever comunicar o conselho tutelar em situações de risco para menor."
      },
      {
        id: "E",
        text: "comunicar os pais da paciente, após explicar a ela os motivos que fundamentam a quebra do sigilo profissional.",
        feedbackErrada: "O correto é acionar o Conselho Tutelar como intermediador para proteção da menor."
      }
    ],
    correct: "D",
    referencia: "Estatuto da Criança e Adolescente / Código de Ética Médica"
  },
  {
    id: 82,
    year: 2012,
    area: "Clínica Médica / Parasitologia",
    enunciado: `Um paciente com 50 anos de idade, morador de zona rural, em condições precárias, sem banheiro na residência e sem rede de água e esgoto na localidade, procura a Unidade Básica de Saúde (UBS) por apresentar dor abdominal de leve intensidade em epigástrio, que piora com a alimentação, associada a náuseas. Refere também urticária. Realizou exame parasitológico de fezes, que foi negativo.\n\nQual o diagnóstico mais provável nesse caso?`,
    options: [
      {
        id: "A",
        text: "Ancilostomíase.",
        feedbackErrada: "Não há referência a anemia ou sinais compatíveis."
      },
      {
        id: "B",
        text: "Ascaridíase.",
        feedbackErrada: "Sintomas são pouco compatíveis com essa etiologia isolada."
      },
      {
        id: "C",
        text: "Giardíase.",
        feedbackErrada: "Quadro clínico não é típico para giardíase (diarreia/mal-estar intestinal crônico)."
      },
      {
        id: "D",
        text: "Estrongiloidíase.",
        feedbackCorreta: "Correto. Dor epigástrica com piora pós-prandial e urticária é bastante sugestivo."
      },
      {
        id: "E",
        text: "Esquistossomose.",
        feedbackErrada: "Sem sinais de hepatoesplenomegalia e localidade não é referida como endêmica."
      }
    ],
    correct: "D",
    referencia: "OPAS/Ministério da Saúde – Parasitologia clínica"
  },
  {
    id: 83,
    year: 2012,
    area: "Saúde Pública / Medicina da Família",
    enunciado: `Um médico de família atende uma população de 3 850 pessoas na unidade de saúde em Caruaru, Pernambuco. Atualmente, tem cerca de 305 pessoas com hipertensão cadastradas. Reconhece, porém, que esse número não representa a totalidade das pessoas com pressão arterial alterada. Organiza, em conjunto com a equipe, atividades de grupo por microréa de cada agente comunitário para identificar novos casos e avaliar adesão ao tratamento e controle pressórico. Durante as atividades coletivas, agenda os pacientes recém-diagnosticados para confirmação em consulta, assim como os pacientes descontrolados. Para os sem adesão ao tratamento, reforça as orientações para administração dos medicamentos e mudanças de hábitos. Durante a atividade, toda a equipe participa compartilhando tarefas e resultados.\n\nAs pessoas que participam do grupo, mas não aderem ao tratamento farmacológico ou não farmacológico, estão em qual estágio de mudança de comportamento, segundo o Modelo Transteórico?`,
    options: [
      {
        id: "A",
        text: "Pré-contemplação.",
        feedbackCorreta: "Correto. Preferem manter comportamento atual e ignoram orientação."
      },
      {
        id: "B",
        text: "Contemplação.",
        feedbackErrada: "Contemplo o problema, mas ainda sem mudança."
      },
      {
        id: "C",
        text: "Desmotivação.",
        feedbackErrada: "Não existe esse estágio no Modelo Transteórico."
      },
      {
        id: "D",
        text: "Preparação.",
        feedbackErrada: "Preparação: já desejam mudar e planejam ação."
      },
      {
        id: "E",
        text: "Manutenção.",
        feedbackErrada: "Manutenção é o estágio final, após atingida mudança."
      }
    ],
    correct: "A",
    referencia: "Prochaska & DiClemente – Mudança de Comportamento"
  },
  {
    id: 84,
    year: 2012,
    area: "Pediatria / Nefrologia",
    enunciado: `Uma criança de 8 anos de idade é admitida na Emergência com quadro de edema generalizado e diminuição do volume urinário com 4 dias de evolução. Ao exame físico: PA = 100 X 60 mmHg; edema bipalpebral, abdominal e de membros inferiores. Presença de ascite discreta. Ausculta cardíaca e pulmonar sem anormalidades. O exame de urina mostrou: leucócitos: 10 000/mL, hemácias 8 000/mL, proteinúria 3+/4+; relação proteína/creatinina urinária = 3,5; perfil lipídico: colesterol total = 450 mg/dL (valor de referência < 200 mg/dL) e triglicerídeos = 700 mg/dL (valor de referência < 150 mg/dL), albuminemia = 2,4 g/dL (valor de referência > 4 g/dL).\n\nConsiderando a principal hipótese diagnóstica, a conduta inicial indicada é`,
    options: [
      {
        id: "A",
        text: "furosemida IV e internação hospitalar.",
        feedbackErrada: "Somente diurético pode levar a piora da hipovolemia sem tratar etiologia."
      },
      {
        id: "B",
        text: "ciclosporina VO e coleta de proteinúria de 24 horas.",
        feedbackErrada: "Não é terapia inicial, ciclosporina não é primeira linha."
      },
      {
        id: "C",
        text: "albumina IV e retorno em 24 horas para reavaliação clínica.",
        feedbackErrada: "Albumina não é recomendada de rotina e exige monitorização hospitalar."
      },
      {
        id: "D",
        text: "indometacina VO e observação rigorosa no Pronto-Socorro.",
        feedbackErrada: "Não é tratamento do quadro clínico nem reduz risco de complicação."
      },
      {
        id: "E",
        text: "prednisona VO e encaminhamento ao ambulatório de Nefrologia Pediátrica.",
        feedbackCorreta: "Correto. Síndrome nefrótica em criança: prednisona é primeira escolha."
      }
    ],
    correct: "E",
    referencia: "Manual de Nefrologia Pediátrica – SBP"
  },
  {
    id: 85,
    year: 2012,
    area: "Clínica Médica / Gastroenterologia / Cirurgia",
    enunciado: `Uma mulher de 45 anos de idade foi admitida na Unidade de Emergência com dor no hipocôndrio D e vômitos há 48 horas. Apresenta piora progressiva do quadro e, no momento, encontra-se sonolenta, confusa, com facies de sofrimento, desidratada (++/4+) e ictérica (++/4+), com extremidades frias, pulsos finos, sem cianose. Sinais vitais: T = 39°C, FC = 130 bpm, FR = 35 rpm, PA = 110 x 60 mmHg. Ausculta cardíaca e pulmonar sem alterações. Abdome com distensão abdominal moderada, dor à palpação superficial do epigástrio e hipocôndrio D, sem sinais de irritação peritoneal, com ruídos hidroaéreos reduzidos. Exames complementares: hematócrito = 36% (valor de referência: 42± 6%); hemoglobina = 12,3 g/dL (valor de referência: 13,8 ± 2,5 g/dL), leucócitos = 18 200 /mm³ (valor de referência: 3 800 a 10 600 /mm³) com 17% de bastões, Proteína C Reativa = 8,3 mg/dL (valor de referência = 0,3 a 0,5 mg/dL), bilirrubina total = 5,2 mg/dL (valor de referência = até 1,2 mg/dL), bilirrubina direta = 4,1 mg/dL (valor de referência = até 0,4 mg/dL), glicemia = 300 mg/dL, ultrassonografia abdominal: ausência de líquido livre em cavidade peritoneal, distensão de alças que prejudica a técnica do exame, vias biliares dilatadas.\n\nAlém da reposição volêmica, qual a conduta inicial requerida para o caso?",
    options: [
      {
        id: "A",
        text: "Laparotomia exploradora.",
        feedbackErrada: "Exame físico e quadro sugerem colecistite complicada, não perfuração livre."
      },
      {
        id: "B",
        text: "Colecistectomia videolaparoscópica.",
        feedbackErrada: "Paciente instável e sinais infecciosos graves: contraindica procedimento cirúrgico imediato."
      },
      {
        id: "C",
        text: "Antibioticoterapia de amplo espectro.",
        feedbackCorreta: "Correto. Quadro compatível com colangite aguda, prioridade é antibiótico venoso."
      },
      {
        id: "D",
        text: "Drenagem percutânea de vias bilio pancreáticas.",
        feedbackErrada: "Primeiro estabilizar paciente com antibiótico, dreno só se refratário."
      },
      {
        id: "E",
        text: "Colangiografia endoscópica retrógrada com papilotomia.",
        feedbackErrada: "Posterga-se até estabilização clínica."
      }
    ],
    correct: "C",
    referencia: "Manual de Urgências Cirúrgicas – Ministério da Saúde"
  },
  {
    id: 86,
    year: 2012,
    area: "Saúde Pública / Epidemiologia",
    enunciado: `A declaração de óbito é um documento do Sistema de Informações sobre Mortalidade e tem por objetivo cumprir as exigências legais de registro de óbitos, cumprir os princípios de cidadania e servir como fonte de informações estatísticas de saúde. A declaração de óbito compõe os serviços de Vigilância em Saúde.\n\nEm qual das seguintes situações será necessária investigação compulsória pela equipe de vigilância de óbitos, por meio de comitê específico para esse fim, em conjunto com a equipe da atenção primária?`,
    options: [
      {
        id: "A",
        text: "Adolescente com óbito por uso de drogas.",
        feedbackCorreta: "Correto. Óbito de adolescente é sempre de investigação compulsória."
      },
      {
        id: "B",
        text: "Idoso vítima de violência domiciliar.",
        feedbackErrada: "Apesar da gravidade, não é incluído entre compulsórios por portaria nacional."
      },
      {
        id: "C",
        text: "Criança que morreu no domicílio.",
        feedbackErrada: "Exige visita domiciliar, mas não é compulsória para investigação."
      },
      {
        id: "D",
        text: "Adulto no ambiente de trabalho.",
        feedbackErrada: "Não é obrigatória investigação compulsória por portaria nacional."
      },
      {
        id: "E",
        text: "Mulher em idade fértil.",
        feedbackErrada: "Não configura necessariamente compulsoriedade sem gestação."
      }
    ],
    correct: "A",
    referencia: "Portaria MS - Vigilância de Óbitos"
  },
  {
    id: 87,
    year: 2012,
    area: "Clínica Médica / Reumatologia",
    enunciado: `Uma mulher de 45 anos, com queixas de dores articulares há 5 meses, comparece ao ambulatório para mostrar resultado de exames. Seu quadro começou com dores em mãos e pés, pela manhã, com melhora durante o dia. Evoluiu há um mês com surto de dor em articulações interfalangeanas proximais, punhos, cotovelos e joelhos, com sinais de flogose, que melhorou com o uso de indometacina por 10 dias. Ao exame, apresenta hipocromia de mucosas, edema e sinais de flogose discretos em mãos, com presença de nódulos justarticulares e ausência de deformidades. Traz exames complementares: hemograma com Hb = 11,0 g/dL (valor referência: 13,8 ± 2,5 g/dL), VHS = 56 mm na primeira hora (valor referência: ≤ 20 mm/h), prova do látex para reumatóide positiva, e radiografia das mãos que mostram redução da densidade óssea periarticular em articulações interfalangeanas proximais e punhos. A paciente, costureira, teme não poder trabalhar mais.\nQual a medicação que poderia impedir a progressão da doença?`,
    options: [
      {
        id: "A",
        text: "Aspirina.",
        feedbackErrada: "Aspirina é anti-inflamatório, não impede progressão de doença autoimune."
      },
      {
        id: "B",
        text: "Colchicina.",
        feedbackErrada: "Colchicina é para gota, não para artrite reumatoide."
      },
      {
        id: "C",
        text: "Metotrexate.",
        feedbackCorreta: "Correto. Metotrexate é droga DMARD padrão-ouro na AR."
      },
      {
        id: "D",
        text: "Indometacina.",
        feedbackErrada: "Indometacina é anti-inflamatório e só controla sintomas."
      },
      {
        id: "E",
        text: "Metilprednisona.",
        feedbackErrada: "Corticóides agem nos sintomas, não inibem progressão estrutural."
      }
    ],
    correct: "C",
    referencia: "Sociedade Brasileira de Reumatologia – Protocolo AR"
  },
  {
    id: 88,
    year: 2012,
    area: "Pediatria / Endocrinologia",
    enunciado: `Uma criança de 9 anos de idade é levada ao serviço médico de urgência com quadro de confusão mental e desidratação. Os pais relatam perda de 2 kg nos últimos 15 dias, apesar do aumento da ingestão alimentar e sede constante. Ao exame físico: paciente desidratado +++/4, com hálito cetônico. Exames laboratoriais: glicemia = 560 mg/dL (valor de referência < 100 mg/dL), gasometria: pH = 7,2 e bicarbonato = 12 mEq/L, sódio = 140 mEq/L, potássio = 5,7 mEq/L; exame de urina: glicose = ++, proteínas = ausentes, corpos cetônicos = ++, leucócitos = 2 000/mL e eritrócitos = 3 000/mL.\nQual a conduta mais adequada no caso?`,
    options: [
      {
        id: "A",
        text: "Sistema de infusão contínua de insulina e hidratação parenteral com potássio e bicarbonato.",
        feedbackErrada: "Bicarbonato só é indicado em acidose grave (< 6,9 pH)."
      },
      {
        id: "B",
        text: "Insulina de ação prolongada (glargina) e hidratação por via oral com soro e bicarbonato de sódio.",
        feedbackErrada: "Bicarbonato não é recomendado de rotina e insulina de ação rápida deve ser utilizada."
      },
      {
        id: "C",
        text: "Insulina de ação regular (regular) por via intravenosa e hidratação parenteral com soro fisiológico, sem bicarbonato.",
        feedbackCorreta: "Correto. Insulina regular IV e hidratação isenta de bicarbonato."
      },
      {
        id: "D",
        text: "Insulina de ação intermediária (NPH) por via subcutânea e hidratação parenteral com soro fisiológico, sem potássio.",
        feedbackErrada: "Insulina SC é menos efetiva em cetose grave na infância."
      },
      {
        id: "E",
        text: "Insulina de ação prolongada (NPH) e insulina de ação rápida (basal-bolus) e hidratação por via oral com soro glicosado, sem potássio.",
        feedbackErrada: "Manejo inicial é insulina regular IV e hidratação venosa, não só oral."
      }
    ],
    correct: "C",
    referencia: "SBP / Manual de Diabetes Pediátrico"
  },
  {
    id: 89,
    year: 2012,
    area: "Clínica Médica / Infectologia",
    enunciado: `Um paciente do sexo masculino, 30 anos de idade, procedente do Rio de Janeiro, foi admitido na Emergência hospitalar referindo febre, dor de cabeça, diarreia e dor articular, iniciados há 6 dias. Informa que a febre cessou há dois dias e, há um dia, passou a apresentar dor abdominal contínua de forte intensidade, sem melhora com o uso de paracetamol. O paciente nega doenças prévias. Ao exame físico, apresenta estado geral regular, eupneico, hidratado, corado, consciente e orientado; ausculta respiratória e cardíaca normais; pressão arterial = 120 x 80 mmHg; prova do laço negativa; abdome depressível, doloroso à palpação em hipocôndrio direito, sem visceromegalias.\nNesse caso, a melhor conduta a ser tomada é`,
    options: [
      {
        id: "A",
        text: "dar alta após solicitação de hemograma e sorologia viral e orientar o paciente a retornar após seis horas para avaliar o resultado do hemograma.",
        feedbackCorreta: "Correto. Abordagem expectante em paciente sem sinais de gravidade."
      },
      {
        id: "B",
        text: "colocar o paciente em observação por 12 horas na unidade de emergência e administrar medicamentos sintomáticos e hidratação oral.",
        feedbackErrada: "Não há indicação de internamento prolongado sem sinais de gravidade."
      },
      {
        id: "C",
        text: "transferir o paciente para unidade de cuidados semi-intensivos para monitorização contínua e realização de exames.",
        feedbackErrada: "Não há sinais de gravidade no caso apresentado."
      },
      {
        id: "D",
        text: "dar alta com orientações para acompanhamento ambulatorial na unidade de atenção primária.",
        feedbackErrada: "Requer reavaliação do hemograma em curto prazo por risco de dengue grave."
      },
      {
        id: "E",
        text: "internar o paciente por 48 horas para observação e realização de exames complementares.",
        feedbackErrada: "Não há sinais de gravidade que justifiquem internação prolongada."
      }
    ],
    correct: "A",
    referencia: "Ministério da Saúde – Protocolo de Dengue"
  },
  {
    id: 90,
    year: 2012,
    area: "Clínica Médica / Urologia",
    enunciado: `Um homem de 47 anos de idade, portador de diabetes do tipo 1, foi submetido a vasectomia há 5 dias. Hoje comparece à Unidade de Emergência queixando-se de febre alta, grande aumento de volume escrotal, edema, dor acentuada e coloração avermelhada no escroto. Ao exame de palpação do escroto, verifica-se a presença de enfisema subcutâneo.\nQual o diagnóstico mais provável e a conduta adequada para o caso?`,
    options: [
      {
        id: "A",
        text: "Fasceíte necrotizante; debridamento cirúrgico e antibioticoterapia de amplo espectro.",
        feedbackCorreta: "Correto. Diabetes é fator de risco para fasceíte escrotal pós-procedimento."
      },
      {
        id: "B",
        text: "Abscesso escrotal; drenagem e antibioticoterapia de amplo espectro.",
        feedbackErrada: "Ausência de coleção definida e enfisema sugerem fasceíte."
      },
      {
        id: "C",
        text: "Abscesso escrotal; drenagem, anti-inflamatório inibidor da ciclo-oxigenase 2.",
        feedbackErrada: "Conduta inadequada para quadro de fasceíte."
      },
      {
        id: "D",
        text: "Coleção serosa; drenagem por punção, anti-inflamatório inibidor da ciclo-oxigenase 2.",
        feedbackErrada: "Não corresponde ao quadro clínico apresentando."
      },
      {
        id: "E",
        text: "Torção testicular iatrogênica; intervenção cirúrgica de liberação do testículo.",
        feedbackErrada: "Torção não explicaria enfisema subcutâneo."
      }
    ],
    correct: "A",
    referencia: "Manual de Urologia – SBU"
  }
];
