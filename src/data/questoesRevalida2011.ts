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

export const QUESTOES_REVALIDA_2011: Question[] = [
  {
    id: 1,
    year: 2011,
    area: "Clínica Médica",
    enunciado: "Um paciente de 62 anos de idade, previamente hígido, procura atendimento médico queixando-se de febre baixa (37,8°C), tosse seca e cefaleia há 5 dias. Relata ainda mialgia e ageusia. Ao exame físico, apresenta-se em bom estado geral, hidratado, acianótico e anictérico. A ausculta pulmonar e cardíaca não revelam alterações. A pressão arterial é de 130 x 80 mmHg, a frequência cardíaca é de 88 bpm e a frequência respiratória é de 16 irpm. O médico assistente levanta a hipótese diagnóstica de influenza.Nesse caso, a conduta terapêutica mais adequada seria:",
    options: [
      { id: "A", text: "Oseltamivir, VO, 75 mg, 12/12 horas, por 5 dias." },
      { id: "B", text: "Amantadina, VO, 100 mg, 12/12 horas, por 5 dias." },
      { id: "C", text: "Zanamivir, inalatório, 10 mg, 12/12 horas, por 5 dias." },
      { id: "D", text: "Ribavirina, VO, 200 mg, 8/8 horas, por 10 dias." },
    ],
    correct: "A",
    referencia: "Protocolo de Tratamento de Influenza – Ministério da Saúde.",
  },
  {
    id: 2,
    year: 2011,
    area: "Cirurgia Geral",
    enunciado: "Um paciente de 25 anos de idade, vítima de ferimento por arma de fogo no abdome, é admitido na sala de emergência, apresentando pressão arterial = 80 x 40 mmHg, frequência cardíaca = 120 bpm e frequência respiratória = 30 irpm. Após infusão de 2000 mL de solução de Ringer com lactato, mantém os mesmos sinais vitais.O passo seguinte da conduta a ser tomada, nesse caso, é:",
    options: [
      { id: "A", text: "Realizar lavado peritoneal diagnóstico." },
      { id: "B", text: "Solicitar tomografia computadorizada de abdome." },
      { id: "C", text: "Indicar laparotomia exploradora." },
      { id: "D", text: "Aguardar melhora clínica com reposição volêmica." },
    ],
    correct: "C",
    referencia: "Advanced Trauma Life Support (ATLS) – American College of Surgeons.",
  },
  {
    id: 3,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: "Uma paciente de 30 anos de idade, G2P1A0, com idade gestacional de 39 semanas e índice de massa corporal pré-gestacional de 35 kg/m², procura a emergência da maternidade queixando-se de perda de líquido via vaginal há 2 horas. Ao exame, apresenta pressão arterial = 140 x 90 mmHg, frequência cardíaca = 88 bpm, altura uterina = 38 cm, batimentos cardiofetais = 140 bpm e dinâmica uterina ausente. O toque vaginal revela colo uterino com 2 cm de dilatação, 50% de apagamento e apresentação cefálica alta. Diante do caso clínico apresentado, a conduta obstétrica mais adequada é:",
    options: [
      { id: "A", text: "Ocitocina venosa." },
      { id: "B", text: "Misoprostol vaginal." },
      { id: "C", text: "Cesariana." },
      { id: "D", text: "Conduta expectante." },
    ],
    correct: "C",
    referencia: "Protocolos Assistenciais – Obstetrícia – FEBRASGO.",
  },
  {
    id: 4,
    year: 2011,
    area: "Pediatria",
    enunciado: "Um lactente de 4 meses de idade é levado à Unidade de Saúde pela mãe, que relata febre há 3 dias e coriza. Há algumas horas, a criança apresenta prostração e recusa alimentar. Ao exame físico, o paciente apresenta-se em regular estado geral, desidratado (++/IV), taquipneico e com gemido audível. A ausculta pulmonar revela estertores subcrepitantes difusos. A frequência respiratória é de 70 irpm e a saturação de O2 é de 90%.Considerando o quadro clínico apresentado, a hipótese diagnóstica e a conduta inicial mais adequadas são:",
    options: [
      { id: "A", text: "Pneumonia bacteriana – internação hospitalar e antibioticoterapia." },
      { id: "B", text: "Bronquiolite viral aguda – oferta de oxigênio e prova terapêutica com broncodilatador." },
      { id: "C", text: "Asma – nebulização com beta-agonista e corticoide venoso." },
      { id: "D", text: "Pneumonia por Mycoplasma – antibioticoterapia com macrolídeo." },
    ],
    correct: "B",
    referencia: "Manual de Condutas em Pediatria – Instituto Fernandes Figueira.",
  },
  {
    id: 5,
    year: 2011,
    area: "Medicina Preventiva e Social",
    enunciado: "Em uma Unidade Básica de Saúde (UBS), foi implantado o Programa de Controle do Tabagismo. Em relação a esse Programa, é correto afirmar que:",
    options: [
      { id: "A", text: "A terapia de reposição de nicotina é contraindicada para gestantes." },
      { id: "B", text: "O aconselhamento individual é a estratégia mais eficaz para o abandono do tabagismo." },
      { id: "C", text: "A participação em grupos de apoio aumenta as chances de sucesso no tratamento." },
      { id: "D", text: "O tratamento medicamentoso deve ser oferecido a todos os pacientes que desejam parar de fumar." },
    ],
    correct: "C",
    referencia: "Diretrizes para Cessação do Tabagismo – Sociedade Brasileira de Pneumologia e Tisiologia.",
  },
  {
    id: 6,
    year: 2011,
    area: "Clínica Médica",
    enunciado: "Um paciente de 55 anos de idade, portador de hipertensão arterial sistêmica e diabetes mellitus tipo 2, em uso de captopril e metformina, comparece à consulta médica queixando-se de edema nos membros inferiores e cansaço aos esforços. Ao exame físico, apresenta pressão arterial = 160 x 100 mmHg, frequência cardíaca = 92 bpm, ausculta pulmonar com estertores creptantes em bases e edema (2+/4+) em membros inferiores. Os exames laboratoriais revelam: creatinina = 2,5 mg/dL, ureia = 60 mg/dL, potássio = 5,8 mEq/L e proteinúria = 3,0 g/24 horas.Nesse caso, a conduta inicial mais adequada seria:",
    options: [
      { id: "A", text: "Iniciar hemodiálise de urgência." },
      { id: "B", text: "Prescrever furosemida e restringir a ingesta de potássio." },
      { id: "C", text: "Suspender o captopril e prescrever hidroclorotiazida." },
      { id: "D", text: "Administrar resina de troca iônica e suspender a metformina." },
    ],
    correct: "D",
    referencia: "Tratado de Nefrologia – Riella.",
  },
  {
    id: 7,
    year: 2011,
    area: "Cirurgia Geral",
    enunciado: "Um paciente de 40 anos de idade, previamente hígido, procura atendimento médico queixando-se de dor abdominal intensa, de forte intensidade, que se iniciou subitamente há 6 horas. Ao exame físico, apresenta-se em regular estado geral, taquicárdico (110 bpm), taquipneico (28 irpm) e com sudorese fria. O abdome encontra-se distendido, tenso e com dor difusa à palpação, associada à descompressão brusca positiva. Diante da suspeita diagnóstica de abdome agudo perfurativo, o exame complementar que deve ser solicitado inicialmente é:",
    options: [
      { id: "A", text: "Tomografia computadorizada de abdome." },
      { id: "B", text: "Radiografia simples de abdome." },
      { id: "C", text: "Ultrassonografia abdominal." },
      { id: "D", text: "Ressonância magnética de abdome." },
    ],
    correct: "B",
    referencia: "Clínica Cirúrgica – Colégio Brasileiro de Cirurgiões.",
  },
  {
    id: 8,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: "Uma paciente de 25 anos de idade, G1P0A0, com idade gestacional de 30 semanas, comparece à consulta de pré-natal queixando-se de prurido generalizado, principalmente nas palmas das mãos e nas plantas dos pés, que se intensifica à noite. Ao exame físico, não se observam lesões cutâneas. Os exames laboratoriais revelam: bilirrubina total = 1,5 mg/dL (VR = até 1,2 mg/dL) e fosfatase alcalina = 300 U/L (VR = até 220 U/L).Diante do caso clínico apresentado, a conduta inicial mais adequada é:",
    options: [
      { id: "A", text: "Prescrever colestiramina e realizar cardiotocografia anteparto semanalmente." },
      { id: "B", text: "Prescrever calamina e tranquilizar a paciente quanto à benignidade do quadro." },
      { id: "C", text: "Indicar corticoterapia para amadurecimento pulmonar fetal e interromper a gestação." },
      { id: "D", text: "Investigar outras causas de colestase e manter conduta expectante." },
    ],
    correct: "A",
    referencia: "Protocolos Assistenciais – Obstetrícia – FEBRASGO.",
  },
  {
    id: 9,
    year: 2011,
    area: "Pediatria",
    enunciado: "Uma criança de 3 anos de idade é levada à emergência com história de febre alta e irritabilidade há 2 dias. A mãe relata que a criança apresenta dificuldade para deambular e chora muito quando é tocada. Ao exame físico, observa-se bom estado geral, temperatura axilar de 39°C, frequência cardíaca de 120 bpm e frequência respiratória de 24 irpm. O paciente deambula com dificuldade e mantém o membro inferior esquerdo em semiflexão e rotação externa. A palpação do quadril esquerdo desencadeia choro intenso. Os exames laboratoriais revelam leucocitose com desvio à esquerda e velocidade de hemossedimentação (VHS) elevada.Considerando o quadro clínico apresentado, a hipótese diagnóstica mais provável é:",
    options: [
      { id: "A", text: "Artrite séptica." },
      { id: "B", text: "Doença de Legg-Calvé-Perthes." },
      { id: "C", text: "Sinovite transitória do quadril." },
      { id: "D", text: "Osteomielite." },
    ],
    correct: "A",
    referencia: "Semiologia Pediátrica – Celmo Celeno Porto.",
  },
  {
    id: 10,
    year: 2011,
    area: "Medicina Preventiva e Social",
    enunciado: "Em relação à vigilância epidemiológica das doenças transmissíveis, é correto afirmar que:",
    options: [
      { id: "A", text: "A notificação compulsória é obrigatória apenas para os casos confirmados." },
      { id: "B", text: "A investigação epidemiológica é restrita aos casos de doenças de notificação compulsória." },
      { id: "C", text: "O objetivo principal é identificar os casos e seus contatos para tratamento oportuno." },
      { id: "D", text: "As ações de controle devem ser implementadas apenas após a confirmação laboratorial dos casos." },
    ],
    correct: "C",
    referencia: "Guia de Vigilância Epidemiológica – Ministério da Saúde.",
  },
  {
    id: 11,
    year: 2011,
    area: "Clínica Médica",
    enunciado: "Um paciente de 30 anos de idade, previamente hígido, procura atendimento médico queixando-se de febre alta, calafrios e tosse produtiva com expectoração purulenta há 3 dias. Relata ainda dor torácica ventilatório-dependente. Ao exame físico, apresenta-se em regular estado geral, taquipneico (28 irpm) e taquicárdico (110 bpm). A ausculta pulmonar revela estertores crepitantes em base de hemitórax direito. A radiografia de tórax demonstra consolidação lobar no lobo inferior direito.Nesse caso, o tratamento antimicrobiano empírico mais adequado seria:",
    options: [
      { id: "A", text: "Amoxicilina, VO, 500 mg, 8/8 horas, por 7 dias." },
      { id: "B", text: "Azitromicina, VO, 500 mg no 1° dia e, a seguir, 250 mg/dia, por 4 dias." },
      { id: "C", text: "Ceftriaxona, IM, 1 g/dia, por 7 dias." },
      { id: "D", text: "Levofloxacina, VO, 750 mg/dia, por 7 dias." },
    ],
    correct: "D",
    referencia: "Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade – Sociedade Brasileira de Pneumologia e Tisiologia.",
  },
  {
    id: 12,
    year: 2011,
    area: "Cirurgia Geral",
    enunciado: "Um paciente de 50 anos de idade, portador de cirrose hepática por etilismo, é admitido na emergência com quadro de hematêmese. Ao exame físico, apresenta-se desorientado, ictérico e com ascite. A pressão arterial é de 90 x 60 mmHg, a frequência cardíaca é de 120 bpm e a frequência respiratória é de 24 irpm. Após a estabilização hemodinâmica, o passo seguinte da conduta a ser tomada, nesse caso, é:",
    options: [
      { id: "A", text: "Realizar endoscopia digestiva alta." },
      { id: "B", text: "Administrar vitamina K." },
      { id: "C", text: "Iniciar antibioticoterapia profilática." },
      { id: "D", text: "Puncionar o líquido ascítico para análise." },
    ],
    correct: "A",
    referencia: "Tratado de Gastroenterologia – Dani.",
  },
  {
    id: 13,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: "Uma paciente de 45 anos de idade, G3P3A0, comparece à consulta ginecológica queixando-se de sangramento uterino anormal há 6 meses. Relata que a menstruação tornou-se mais frequente e abundante, com duração de 8 a 10 dias, causando anemia e fadiga. Ao exame físico, não se observam alterações. O exame especular revela colo uterino normal. O toque vaginal demonstra útero de tamanho normal e anexos livres. A ultrassonografia transvaginal evidencia espessamento endometrial difuso de 15 mm.Diante do caso clínico apresentado, a conduta inicial mais adequada é:",
    options: [
      { id: "A", text: "Realizar histeroscopia com biópsia endometrial." },
      { id: "B", text: "Prescrever anticoncepcional hormonal combinado." },
      { id: "C", text: "Indicar histerectomia total." },
      { id: "D", text: "Realizar curetagem uterina." },
    ],
    correct: "A",
    referencia: "Tratado de Ginecologia – FEBRASGO.",
  },
  {
    id: 14,
    year: 2011,
    area: "Pediatria",
    enunciado: "Um lactente de 6 meses de idade é levado à Unidade de Saúde para consulta de puericultura. A mãe relata que o bebê está mamando bem e ganhando peso adequadamente. Nega intercorrências. Ao exame físico, observa-se bom estado geral, hidratado, corado e afebril. O exame neurológico é normal. O calendário vacinal está atualizado.Considerando a idade e o estado de saúde do lactente, qual o alimento que deve ser introduzido inicialmente em sua dieta?",
    options: [
      { id: "A", text: "Frutas." },
      { id: "B", text: "Legumes." },
      { id: "C", text: "Carnes." },
      { id: "D", text: "Cereais." },
    ],
    correct: "A",
    referencia: "Dez Passos para uma Alimentação Saudável – Ministério da Saúde.",
  },
  {
    id: 15,
    year: 2011,
    area: "Medicina Preventiva e Social",
    enunciado: "Em relação à Política Nacional de Imunização (PNI), é correto afirmar que:",
    options: [
      { id: "A", text: "A vacina BCG deve ser administrada em dose única, independentemente da idade." },
      { id: "B", text: "A vacina contra a febre amarela é contraindicada para gestantes e lactentes menores de 6 meses." },
      { id: "C", text: "A vacina tríplice viral (sarampo, caxumba e rubéola) deve ser administrada aos 9 meses de idade." },
      { id: "D", text: "A vacina contra a poliomielite (VIP) deve ser administrada em 3 doses, com reforços anuais." },
    ],
    correct: "B",
    referencia: "Manual de Normas de Vacinação – Ministério da Saúde.",
  },
  {
    id: 16,
    year: 2011,
    area: "Clínica Médica",
    enunciado: "Um paciente de 40 anos de idade, previamente hígido, procura atendimento médico queixando-se de fadiga, perda de peso e sudorese noturna há 2 meses. Ao exame físico, apresenta-se em bom estado geral, hidratado, corado e afebril. Observam-se linfonodomegalias cervicais e axilares, indolores e móveis. A radiografia de tórax revela aumento do mediastino.Nesse caso, a hipótese diagnóstica mais provável é:",
    options: [
      { id: "A", text: "Tuberculose ganglionar." },
      { id: "B", text: "Sarcoidose." },
      { id: "C", text: "Linfoma." },
      { id: "D", text: "Doença de Castleman." },
    ],
    correct: "C",
    referencia: "Semiologia Médica – Celmo Celeno Porto.",
  },
  {
    id: 17,
    year: 2011,
    area: "Cirurgia Geral",
    enunciado: "Um paciente de 60 anos de idade, tabagista e etilista inveterado, procura atendimento médico queixando-se de disfagia progressiva para sólidos e líquidos há 3 meses, associada à perda ponderal de 10 kg no período. O exame contrastado do esôfago revela estenose esofágica irregular no terço médio.Diante da suspeita diagnóstica de neoplasia do esôfago, o exame complementar que deve ser solicitado inicialmente é:",
    options: [
      { id: "A", text: "Tomografia computadorizada de tórax e abdome." },
      { id: "B", text: "Endoscopia digestiva alta com biópsia." },
      { id: "C", text: "Ultrassonografia endoscópica." },
      { id: "D", text: "Ressonância magnética de tórax." },
    ],
    correct: "B",
    referencia: "Clínica Cirúrgica – Colégio Brasileiro de Cirurgiões.",
  },
  {
    id: 18,
    year: 2011,
    area: "Ginecologia e Obstetrícia",
    enunciado: "Uma paciente de 28 anos de idade, G2P1A0, com idade gestacional de 32 semanas, comparece à emergência da maternidade queixando-se de sangramento vaginal indolor e intermitente há 2 dias. Ao exame, apresenta pressão arterial = 130 x 80 mmHg, frequência cardíaca = 80 bpm, altura uterina = 34 cm, batimentos cardiofetais = 140 bpm e dinâmica uterina ausente. A ultrassonografia obstétrica revela placenta prévia total.Diante do caso clínico apresentado, a conduta obstétrica mais adequada é:",
    options: [
      { id: "A", text: "Ocitocina venosa." },
      { id: "B", text: "Tocolítico venoso." },
      { id: "C", text: "Amniotomia." },
      { id: "D", text: "Cesariana." },
    ],
    correct: "D",
    referencia: "Protocolos Assistenciais – Obstetrícia – FEBRASGO.",
  },
  {
    id: 19,
    year: 2011,
    area: "Pediatria",
    enunciado: "Uma criança de 5 anos de idade é levada à emergência com história de febre alta, prostração e dor abdominal há 24 horas. Ao exame físico, observa-se regular estado geral, desidratada, taquicárdica e hipotensa. O abdome encontra-se distendido e doloroso à palpação, com sinais de irritação peritoneal. Os exames laboratoriais revelam leucocitose com desvio à esquerda e elevação das provas de atividade inflamatória.Considerando o quadro clínico apresentado, a hipótese diagnóstica mais provável é:",
    options: [
      { id: "A", text: "Apendicite aguda." },
      { id: "B", text: "Gastroenterite aguda." },
      { id: "C", text: "Púrpura de Henoch-Schönlein." },
      { id: "D", text: "Febre tifoide." },
    ],
    correct: "A",
    referencia: "Emergências em Pediatria – Sociedade Brasileira de Pediatria.",
  },
  {
    id: 20,
    year: 2011,
    area: "Medicina Preventiva e Social",
    enunciado: "Em relação ao Sistema Nacional de Vigilância Sanitária (SNVS), é correto afirmar que:",
    options: [
      { id: "A", text: "A Agência Nacional de Vigilância Sanitária (ANVISA) é responsável pela regulamentação e controle de todos os produtos e serviços relacionados à saúde." },
      { id: "B", text: "As ações de vigilância sanitária são restritas aos estabelecimentos de saúde, como hospitais e clínicas." },
      { id: "C", text: "O objetivo principal é garantir a qualidade e a segurança dos produtos e serviços submetidos à vigilância sanitária." },
      { id: "D", text: "A participação da sociedade civil nas ações de vigilância sanitária é facultativa." },
    ],
    correct: "C",
    referencia: "Lei nº 9.782/99 – Dispõe sobre o Sistema Nacional de Vigilância Sanitária.",
  },
];
