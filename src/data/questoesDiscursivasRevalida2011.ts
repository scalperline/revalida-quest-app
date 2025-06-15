
export type DiscursiveQuestion = {
  id: number;
  ano: number;
  ordem: number;
  titulo: string;
  enunciado: string;
  imagem?: string;
  gabarito: string;
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
    gabarito: `a) Os achados radiológicos podem ser descritos como:
- cavitação, caverna ou cavidade no ápice pulmonar/ápice do pulmão esquerdo ou lobo superior esquerdo/ápice do pulmão esquerdo ou região infraclavicular esquerda;
- infiltrado não homogêneo/opacidade não homogênea com cavitação, caverna, cavidade, no lobo superior esquerdo/ápice do pulmão esquerdo.

b) O candidato poderá citar como principal suspeita: tuberculose pulmonar ativa; ou tuberculose pulmonar; ou tuberculose; ou TB pulmonar.

c) O procedimento adequado é baciloscopia direta do escarro; ou coleta do escarro para baciloscopia; ou pesquisa de BAAR no escarro; ou pesquisa de bacilo álcool-ácido resistente no escarro; ou bacterioscopia/baciloscopia por Ziehl Neelsen de escarro.

d) O esquema básico composto por rifampicina 600 mg /isoniazida 300mg /pirazinamida 1.600mg ou 1,6g e etambutol 1.100mg ou 1,1g; esquema básico com 4 comprimidos (rifampicina /isoniazida /pirazinamida e etambutol ).

e) Os principais efeitos incluem manifestações gastrointestinais: vômitos, náuseas, alterações gastrintestinais, dor abdominal, epigastralgia, icterícia, hepatite, hepatotoxicidade, alteração de função hepática, alteração de enzimas hepáticas; manifestações dermatológicas, de pele ou alérgicas: prurido, exantema, acne, erupção acneiforme, dermatite esfoliativa; manifestações articulares: dor articular, artrite, artralgia, síndrome lúpus-like, hiperuricemia; manifestações oculares: neurite óptica, alteração da visão das cores, perda da visão lateral, cegueira/amaurose; manifestações renais: nefrite intersticial, mioglobinúria com insuficiência renal; manifestações hematológicas: anemia, anemia hemolítica, agranulocitose, trombocitopenia, púrpura; outras: rabdomiólise; outras manifestações: suor/urina de cor avermelhada.
(Obs.: qualquer associação de três dessas manifestações, independentemente de sistema, será considerada correta.)

Referência bibliográfica:
Sociedade Brasileira de Pneumologia e Tisiologia. III Diretrizes em Tuberculose. J Bras Pneumol. 2009; 35(Supl 10): 1018-48
Menna Barreto SS. Prática pneumológica. Cap 20 - Tuberculose. Rio de Janeiro: GuanabaraKoogan, 2010`
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
    gabarito: `a) As duas principais suspeitas diagnósticas são pré-eclâmpsia grave com iminência de eclâmpsia e pré-eclâmpsia grave com HELLP síndrome. Além disso, foi considerado o diagnóstico de restrição de crescimento intrauterino.

b) Os dados que justificam corretamente as principais suspeitas diagnósticas para esse quadro clínico incluem: Gestante primigesta; negra; hipertensão arterial ou PA > 160 x 110 mmhg; edema; proteinúria ou proteinúria acima de 1g/dia; creatinina de 1,5mg%; trombopenia ou plaquetas <100.000/mm ou plaquetas= 98.000/mm; enzimas hepáticas elevadas ou lesão hepatocelular ou AST = 200 U/L e ALT = 350 U/L; cefaleia, epigastralgia
OBSERVAÇÃO: Considerar um ponto para qualquer um dos itens mencionados e não repetidos – máximo de três.

c) O médico que atendeu a paciente no Pronto-Atendimento Obstétrico deverá tomar as seguintes medidas imediatas: administrar Hidralazina endovenosa; ou Sulfato de magnésio endovenoso e avaliar a vitalidade fetal ou cardiotocografia ou cardiotoco.

d) A descrição do laudo cardiotocográfico deverá ser semelhante à seguinte: Feto Inativo ou Inativo Hiporreativo ou Padrão tipo "line pencil" ou Cardiotocografia tipo 2 ou Traçado cardiotocográfico não tranquilizador (sofrimento fetal agudo).

e) Sim, há necessidade de internação devido aos riscos materno-fetais (HELLP síndrome na mãe e oligoâmnio e restrição de crescimento intrauterino com cardiotocografia não satisfatória no feto) ou devido ao risco de vida materno e fetal ou devido ao risco de convulsão na mãe e óbito fetal ou devido ao risco de falência hepática da mãe e óbito fetal.

f) A melhor conduta a ser tomada é a resolução da gestação por cesárea ou a interrupção imediata da gestação por cesárea, ou a indicação de cesárea ou a cesárea.

Referência bibliográfica:
Gestação de alto risco: manual técnico / Ministério da Saúde, Secretaria de Atenção à Saúde, Departamento de Ações Programáticas Estratégicas.p.27-44 – 5. ed. – Brasília : Editora do Ministério da Saúde, 2010. 302 p. – (Série A. Normas e Manuais Técnicos).`
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
    gabarito: `a) O exame físico deverá ser complementado por meio de: 1) exame pélvico (toque vaginal e/ou toque retal e/ou toque bigital); 2) descompressão brusca em FID (considerar também o teste em todos os quadrantes do abdômen); 3) outras manobras semiotécnicas empregadas na investigação de abdômen agudo (Rovsing, teste de Lennander, manobra do obturador interno, Giordano, manobra do iliopsoas, Murphy). Estes fazem parte da propedêutica diagnóstica de abdômen agudo a esclarecer, principalmente em mulheres jovens, em idade fértil e com vida sexual ativa.

b) A principal hipótese é a apendicite aguda, justificada pela característica da dor, inicialmente localizada no epigástrio e com localização na fossa ilíaca direita e no hipogástrio. O tempo de evolução justifica o sinal de presença de irritação peritoneal, caracterizada pela percussão dolorosa nesse local, o que é comum na apendicite aguda. (Townsend: Sabiston Textbook of surgery. 18th. ed. Maa J, Kirkwood KS., cap. 49).

c) Os diagnósticos que devem ser considerados são: 1) Gravidez tópica ou ectópica visto que não é possível definir um atraso menstrual ou não em uma paciente com vida sexual ativa e sem anticoncepção; 2) Doenças tubo ovarianas que podem se apresentar com abdômen agudo (cisto de ovário com sangramento ou torção e doença inflamatória pélvica); 3) Litíase renal/ureteral visto que pode ter náuseas, vômitos, dorepigástrica, dor forte em fossa ilíaca direita às vezes com alguma defesa abdominal.

OBSERVAÇÃO: Para infecção urinária, faltam vários aspectos característicos desta, como algúria, disúria, urgência urinária. Para linfadenite mesentérica, também faltam vários aspectos, principalmente relacionados com a história pregressa com ter estado gripada, ter tido outro quadro infeccioso prévio. (Townsend:Sabiston Textbook of surgery. 18th. ed. Maa J, Kirkwood KS., cap. 49).

d) Para a hipótese diagnóstica principal: Apendicite aguda o exame de escolha é a ultrassonografia de abdômen e pelve, pois não há emissão de raios X e permite estabelecer com sensibilidade e especificidade relevantes o diagnóstico diferencial das condições envolvidas. Achados possíveis: abscesso periapendicular ou aumento do apêndice ou bloqueio em fossa ilíaca direita.

O exame de RX simples (achados possíveis: fecalito ou apagamento do psoas ou escoliose antálgica ou alça sentinela) ou a TC de abdômen (achados possíveis: fecalito em FID, líquido periapendicular,espessamento do apêndice) só poderão ser realizados após afastar a hipótese de gravidez tópica.

Para o diagnóstico diferencial de prenhez tópica ou ectópica inicial: Ultrasson transvaginal ou de pelvetransabdominal. Achados possíveis: sangue na cavidade ou implante do embrião na tuba, ou prenhez tópica

Para o diagnóstico diferencial de doença tubo ovariana: ultrassonografia pélvica transvaginal ou transabdominal Achados possíveis: líquido livre na pelve, abscesso pélvico, edema tubário ou abscesso tubo-ovariano.

Para o diagnóstico diferencial de litíase renal/ureteral: ultrassonografia de abdômen. Achados possíveis hidronefrose à direita, imagem de calculo ureteral. Raios X de abdômen simples: Após excluir prenhez, imagem de calculo na topografia de FID.`
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
    gabarito: `a) Valor: 1,0 para cada ação citada e 1,0 para cada justificativa, considerando as possibilidades abaixo:
• As unidades são georreferenciadas, o que facilita o diagnóstico comunitário, o reconhecimento do potencial da comunidade (aparelhos sociais já existentes) e a implementação das ações.
• Acesso universal da população, que permite que os usuários busquem as unidades independentemente de situações específicas de adoecimento.
• Contato longitudinal com os usuários, o que amplia a adesão individual e coletiva às propostas de cuidado integral.
• Integralidade do cuidado como norteador da atenção à saúde, valorizando, em todas as oportunidades de contato com os profissionais de saúde, a promoção da saúde.
• Participação de equipe multiprofissional, que permite a construção de propostas que identificam necessidades diversas e oferecem alternativas diversas aos usuários.

Referência bibliográfica
PINTO, Maria Eugênia Bresolin; DEMARZO, Marcelo Marcos Piva. Atividade Física na APS
- Promef - ciclo 2, módulo 2. Porto Alegre: Artmed/Panamericana Editora, 2007, pp. 9-13.

b) Valor: 1,0 para cada etapa citada:
• Divulgar, na comunidade, informações sobre os riscos do sedentarismo e benefícios de um estilo de vida ativo.
• Identificar fatores de motivação e aderência individuais e coletivas para prática de atividades físicas.
• Avaliar clinicamente os indivíduos motivados, antes de iniciar sua participação nas práticas de atividades físicas.
• Definir as prescrições adequadas de atividades físicas, individuais e/ou de grupos homogêneos (crianças/adolescentes, gestantes, idosos, hipertensos etc.).
• Identificar os locais mais adequados da comunidade para que práticas coletivas de atividades físicas sejam implementadas.
• Buscar parceria dos aparelhos sociais (associação de moradores, escolas etc.) para apoio e divulgação do plano de ação.

Referência bibliográfica
PINTO, Maria Eugênia Bresolin; DEMARZO, Marcelo Marcos Piva. Atividade Física na APS -Promef - ciclo 2, módulo 2. Porto Alegre: Artmed/Panamericana Editora, 2007, pp. 11-23.`
  },
  {
    id: 5,
    ano: 2011,
    ordem: 5,
    titulo: "QUESTÃO 5",
    enunciado: `Mãe leva seu terceiro filho à consulta médica, relatando que a criança, do sexo masculino, com 30 dias de vida, tem choro fraco e rouco, movimenta-se pouco e de forma lenta, e apresenta pele amarelada. Informa que a gestação evoluiu sem intercorrências, mas que só foram observados movimentos fetais a partir do sexto mês, quando a mãe passou a ter acompanhamento pré-natal regular. A criança ao nascer apresentou peso de 3000g, comprimento de 50 cm e Apgar final = 8, tendo eliminado mecônio após 48 horas de vida. Ao exame físico da criança observa-se respiração nasal ruidosa, hérnia umbilical e icterícia discreta (+/6); não apresenta mais formações externas. A criança é alimentada exclusivamente com o leite materno. Não há consanguinidade entre os pais, e os dois irmãos da criança são saudáveis. O resultado do “teste do pezinho” ainda não está disponível.

Com base nos dados clínicos observados:
a) descreva a principal suspeita diagnóstica.
b) apresente cinco informações que fundamentam o diagnóstico estabelecido.
c) justifique como o “teste do pezinho” contribuirá para o prognóstico.
`,
    imagem: "/lovable-uploads/f1145e65-3578-4e12-b26d-53dad12c7586.png",
    gabarito: `a) A principal suspeita é hipotireoidismo congênito.

b) Informações que fundamentam o diagnóstico:
- atraso no desenvolvimento neuropsicomotor
- choro fraco e rouco
- hérnia umbilical
- icterícia prolongada
- atraso na eliminação de mecônio
- congestão nasal
- movimentos fetais tardios

c) O teste do pezinho favorecerá porque o diagnóstico até a quarta semana de vida garante o desenvolvimento neuropsicomotor adequado ou garantirá o desenvolvimento neuropsicomotor, ou preservará o desenvolvimento neuropsicomotor.

Referência bibliográfica:
Fonte: Setian, N. Hipotireoidismo na criança:diagnóstico e tratamento (revisão). j pediatr (Rio J), 2007;83(Supl):S209-16.`
  },
];
