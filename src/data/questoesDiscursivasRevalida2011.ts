
export type DiscursiveQuestion = {
  id: number;
  ano: number;
  ordem: number;
  titulo: string;
  enunciado: string;
  imagem?: string; // caminho relativo se houver imagem na questão
};

export const QUESTOES_DISCURSIVAS_REVALIDA_2011: DiscursiveQuestion[] = [
  {
    id: 1,
    ano: 2011,
    ordem: 1,
    titulo: "QUESTÃO 1",
    enunciado: `Um jovem, com 24 anos de idade, caixa de supermercado, previamente hígido, procurou a Unidade Básica de Saúde queixando-se de pouco apetite, febre baixa diária, emagrecimento, tosse frequente, expectoração e sudorese ao fim do dia, durante quase 3 meses. Portava uma radiografia de tórax em incidência posteroanterior feita na Unidade de Emergência há três dias, o que motivou seu encaminhamento, após avaliação, à Unidade Básica de Saúde. O exame físico realizado constatou regular estado geral, peso = 54 Kg e ausculta pulmonar com alguns roncos e crepitações na região superior do hemitórax esquerdo.

Exame radiográfico do tórax em incidência posteroanterior.
    `,
    imagem: "/lovable-uploads/a3f2ee7a-d3fd-40d1-bf47-5235555ea57e.png",
  },
  {
    id: 2,
    ano: 2011,
    ordem: 2,
    titulo: "QUESTÃO 2",
    enunciado: `Gestante, com 18 anos de idade, negra, G1P0A0, com 36 semanas e um dia de gestação, de acordo com exame ecográfico de primeiro trimestre e tempo de amenorreia, procura o Pronto-Atendimento Obstétrico queixando-se de cefaleia intensa, de início súbito há mais ou menos duas horas. Relata epigastralgia com início aproximado de meia hora e informa estar em seguimento no Ambulatório de Gestação de Alto Risco. Sua última consulta ocorreu há uma semana. Informa fazer uso de Alfa-Metil-Dopa 250mg, de 6/6h associada a Nifedipina 10 mg, ambos por via oral, de 12/12h. Os exames realizados após a última consulta mostram:

Hemograma (Hb = 12,2 g/dL; Ht = 32 %; leucócitos = 12.200 /mm³; plaquetas = 98.000 /mm³); proteinúria de 24h =1,2 g; creatinina sérica = 1,5 mg/dL, ácido úrico sérico= 7,0 mg/dl, AST = 200 U/L, ALT = 350 U/L, Exame ultrassonográfico com biometria fetal compatível para 33 semanas, oligoâmnio acentuado, exame dopplervelocimétrico sem alterações na artéria umbilical e cerebral média do feto.

Ao exame: Pressão arterial = 160 x 120 mmHg, pulso=85 bpm; altura uterina = 30 cm; Batimentos cardíacos fetais= 170 bpm; dinâmica uterina = ausente; Toque vaginal = colo fechado, grosso, posterior; edema em MMII ++++/4+; curta cardial e ausculta pulmonar sem alterações.

Parte I - Com base no quadro clínico-obstétrico, exame físico da mãe e exames complementares apresentados, descreva
a) duas suspeitas diagnósticas:
b) três informações que justifiquem corretamente a principal suspeita diagnóstica para esse quadro clínico:
c) duas medidas imediatas a serem tomadas pelo médico em relação à paciente ainda na sala de Pronto-Atendimento Obstétrico:

Parte II - Após as medidas iniciais de assistência à paciente, realizou-se exame de Cardiotocografia, reproduzida a seguir:
`,
    imagem: "/lovable-uploads/4b7f4319-ac33-47b3-9f27-d220031432d0.png",
  },
  {
    id: 3,
    ano: 2011,
    ordem: 3,
    titulo: "QUESTÃO 3",
    enunciado: `Mulher, com 17 anos de idade, procura atendimento médico de urgência porque está com “dor de barriga forte” e atribui o episódio ao fato de ter comido, há cerca de 12 horas, manga com leite. Comenta que a dor teve início há aproximadamente nove horas, com localização epigástrica, acompanhada de náuseas e um episódio de vômito, contendo os restos alimentares dessa refeição. Informa ainda que agora a dor está mais do lado direito, perto da “virilha”. Informa vida sexual ativa, sem uso de contraceptivos e não sabe informar quando foi a última menstruação. Nega outros sintomas e doenças prévias. Ao exame físico apresenta: Frequência cardíaca = 96 bpm, Pressão arterial = 110x70 mmHg, Frequência respiratória = 20 ipm. Está corada e hidratada. Temperatura axilar = 37,6°C. Não há alterações ao exame cardiovascular e respiratório. Exame abdominal: abdome plano com dor à percussão e à palpação do abdome inferior, principalmente na fossa ilíaca direita e região hipogástrica.

Com base nesse quadro clínico e na principal hipótese diagnóstica, descreva:
a) a complementação do exame físico do paciente que contribua para a confirmação da hipótese principal.
b) cite a principal hipótese diagnóstica e justifique.
c) cite dois diagnósticos diferenciais que devem ser considerados para o caso e justifique-os.
d) cite os exames de imagem a serem solicitados e os achados esperados para a principal hipótese diagnóstica e para os diagnósticos diferenciais.
`,
    imagem: "/lovable-uploads/e2ee5c66-34e4-4975-8042-9f0700016af1.png",
  },
  {
    id: 4,
    ano: 2011,
    ordem: 4,
    titulo: "QUESTÃO 4",
    enunciado: `Uma Equipe de Saúde da Família, que atua na Unidade Básica de Saúde há dois anos, identificou a oportunidade de apresentar novas ações no campo da atenção básica, tendo como foco a atividade física e o desenvolvimento do potencial de adesão da comunidade, pois almejava a redução de taxas de sedentarismo, que atinge quase 70% da população adulta.

Considerando essas informações, faça o que se pede a seguir:
a) apresente três ações de trabalho, em saúde da família, que facilitem a adesão da comunidade a uma proposta de promoção da saúde. Justifique cada uma das ações propostas.
b) descreva quatro etapas do planejamento que a equipe precisa realizar para que a implementação da proposta de promoção da saúde, a partir do diagnóstico comunitário de alto índice de sedentarismo, tenha adesão satisfatória da comunidade.
`,
    imagem: "/lovable-uploads/f1145e65-3578-4e12-b26d-53dad12c7586.png",
  },
  {
    id: 5,
    ano: 2011,
    ordem: 5,
    titulo: "QUESTÃO 5",
    enunciado: `Mãe leva seu terceiro filho à consulta médica, relatando que a criança, do sexo masculino, com 30 dias de vida, tem choro fraco e rouco, movimenta-se pouco e de forma lenta, e apresenta pele amarelada. Informa que a gestação evoluiu sem intercorrências, mas que só foram observados movimentos fetais a partir do sexto mês, quando a mãe passou a ter acompanhamento pré-natal regular. A criança ao nascer apresentou peso de 3000g, comprimento de 50 cm e Apgar final = 8, tendo eliminado mecônio após 48 horas de vida. Ao exame físico da criança observa-se respiração nasal ruidosa, hérnia umbilical e icterícia discreta (+/6); não apresenta más formações externas. A criança é alimentada exclusivamente com o leite materno. Não há consanguinidade entre os pais, e os dois irmãos da criança são saudáveis. O resultado do “teste do pezinho” ainda não está disponível.

Com base nos dados clínicos observados:
a) descreva a principal suspeita diagnóstica.
b) apresente cinco informações que fundamentam o diagnóstico estabelecido.
c) justifique como o “teste do pezinho” contribuirá para o prognóstico.
`,
    imagem: "/lovable-uploads/f1145e65-3578-4e12-b26d-53dad12c7586.png",
  },
];
