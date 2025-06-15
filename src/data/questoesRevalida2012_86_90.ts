import type { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_86_90: Question[] = [
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
    correct: "C",
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
    correct: "E",
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
