import { categories, type Category, type CategoryId } from "./categories";
import { cities, type City, type CityId } from "./cities";

export type JobType = "CLT" | "PJ" | "Estágio" | "Temporário";
export type JobModality = "Presencial" | "Híbrido" | "Remoto";

export type Job = {
  id: string;
  slug: string;
  title: string;
  company: string;
  cityId: CityId;
  categoryId: CategoryId;
  type: JobType;
  modality: JobModality;
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
};

export const jobs: Job[] = [
  {
    id: "1",
    slug: "marceneiro-moveis-paraisopolis",
    title: "Marceneiro(a)",
    company: "Móveis Serra da Mantiqueira",
    cityId: "paraisopolis-mg",
    categoryId: "industria",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 2.800 - R$ 3.500",
    description:
      "Vaga para marceneiro(a) no polo moveleiro de Paraisópolis. Atuação na produção de móveis residenciais, corte, montagem e acabamento em madeira.",
    requirements: [
      "Experiência com marcenaria ou produção de móveis",
      "Leitura de projetos e medidas",
      "Disponibilidade para trabalhar em escala comercial",
    ],
    postedAt: "2026-08-28",
  },
  {
    id: "2",
    slug: "vendedor-externo-paraisopolis",
    title: "Vendedor(a) Externo",
    company: "Distribuidora Centro Sul",
    cityId: "paraisopolis-mg",
    categoryId: "comercio-vendas",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 2.200 + comissão",
    description:
      "Responsável por atender lojistas da região, apresentar o mix de produtos e bater metas de vendas em Paraisópolis e cidades vizinhas.",
    requirements: [
      "CNH categoria B",
      "Experiência em vendas externas",
      "Boa comunicação e organização de rota",
    ],
    postedAt: "2026-08-25",
  },
  {
    id: "3",
    slug: "auxiliar-administrativo-paraisopolis",
    title: "Auxiliar Administrativo",
    company: "Cooperativa Vale Verde",
    cityId: "paraisopolis-mg",
    categoryId: "administracao",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 2.100",
    description:
      "Apoio à rotina administrativa: emissão de notas, atendimento ao associado, arquivo e controle de documentos.",
    requirements: [
      "Ensino médio completo",
      "Pacote Office básico",
      "Organização e atenção a detalhes",
    ],
    postedAt: "2026-08-20",
  },
  {
    id: "4",
    slug: "enfermeiro-hospital-pouso-alegre",
    title: "Enfermeiro(a)",
    company: "Hospital Regional do Sul de Minas",
    cityId: "pouso-alegre-mg",
    categoryId: "saude",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 4.800 - R$ 5.500",
    description:
      "Atuação em enfermagem hospitalar, plantões e assistência a pacientes internados no hospital regional de Pouso Alegre.",
    requirements: [
      "Graduação em Enfermagem e registro no COREN",
      "Disponibilidade para plantões 12x36",
      "Experiência em ambiente hospitalar (desejável)",
    ],
    postedAt: "2026-08-30",
  },
  {
    id: "5",
    slug: "analista-logistica-pouso-alegre",
    title: "Analista de Logística",
    company: "Transul Minas",
    cityId: "pouso-alegre-mg",
    categoryId: "logistica",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 3.600 - R$ 4.200",
    description:
      "Planejamento de rotas, controle de frota e indicadores de entrega para operações no sul de Minas, com base em Pouso Alegre.",
    requirements: [
      "Superior em Logística, Administração ou áreas afins",
      "Experiência com controle de estoque e expedição",
      "Excel intermediário",
    ],
    postedAt: "2026-08-27",
  },
  {
    id: "6",
    slug: "vendedor-loja-pouso-alegre",
    title: "Vendedor(a) de Loja",
    company: "Magazine Serra",
    cityId: "pouso-alegre-mg",
    categoryId: "comercio-vendas",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 1.800 + comissão",
    description:
      "Atendimento ao cliente no varejo, reposição de gôndolas e cumprimento de metas da loja no centro de Pouso Alegre.",
    requirements: [
      "Ensino médio completo",
      "Experiência em varejo (desejável)",
      "Disponibilidade para sábados e feriados",
    ],
    postedAt: "2026-08-22",
  },
  {
    id: "7",
    slug: "assistente-rh-pouso-alegre",
    title: "Assistente de RH",
    company: "Alimentos Sulminas",
    cityId: "pouso-alegre-mg",
    categoryId: "administracao",
    type: "CLT",
    modality: "Híbrido",
    salary: "R$ 2.900",
    description:
      "Apoio em recrutamento, admissão, benefícios e ponto eletrônico de uma indústria alimentícia em Pouso Alegre.",
    requirements: [
      "Cursando ou formado em Psicologia, Administração ou Gestão de Pessoas",
      "Conhecimento da CLT",
      "Boa comunicação e sigilo",
    ],
    postedAt: "2026-08-18",
  },
  {
    id: "8",
    slug: "desenvolvedor-frontend-itajuba",
    title: "Desenvolvedor(a) Frontend Júnior",
    company: "Mantiqueira Tech",
    cityId: "itajuba-mg",
    categoryId: "tecnologia",
    type: "CLT",
    modality: "Híbrido",
    salary: "R$ 3.800 - R$ 4.500",
    description:
      "Desenvolvimento de interfaces web com React para produtos de empresas da região. Time pequeno, com mentoria e rotina híbrida em Itajubá.",
    requirements: [
      "Conhecimento em HTML, CSS, JavaScript e React",
      "Git na rotina de trabalho",
      "Vontade de aprender e comunicar bem com o time",
    ],
    postedAt: "2026-08-29",
  },
  {
    id: "9",
    slug: "estagio-engenharia-eletrica-itajuba",
    title: "Estágio em Engenharia Elétrica",
    company: "Helix Energia",
    cityId: "itajuba-mg",
    categoryId: "engenharia",
    type: "Estágio",
    modality: "Presencial",
    salary: "R$ 1.600 + benefícios",
    description:
      "Estágio em projetos elétricos industriais, acompanhamento de campo e apoio à equipe de engenharia em Itajubá.",
    requirements: [
      "Cursando Engenharia Elétrica a partir do 5º período",
      "Conhecimento básico de circuitos e normas",
      "Disponibilidade de 30h semanais",
    ],
    postedAt: "2026-08-26",
  },
  {
    id: "10",
    slug: "professor-matematica-itajuba",
    title: "Professor(a) de Matemática",
    company: "Colégio Horizonte Itajubá",
    cityId: "itajuba-mg",
    categoryId: "educacao",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 3.200",
    description:
      "Ministrar aulas de matemática para o ensino fundamental II e médio, elaborar avaliações e participar de reuniões pedagógicas.",
    requirements: [
      "Licenciatura em Matemática",
      "Experiência em sala de aula (desejável)",
      "Disponibilidade no período da tarde",
    ],
    postedAt: "2026-08-21",
  },
  {
    id: "11",
    slug: "tecnico-manutencao-itajuba",
    title: "Técnico(a) de Manutenção",
    company: "Indústria Precisa Sul",
    cityId: "itajuba-mg",
    categoryId: "industria",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 3.400",
    description:
      "Manutenção preventiva e corretiva de máquinas industriais, com atuação em turnos na planta de Itajubá.",
    requirements: [
      "Curso técnico em Mecânica, Eletromecânica ou Elétrica",
      "Experiência com manutenção industrial",
      "Disponibilidade para turnos",
    ],
    postedAt: "2026-08-16",
  },
  {
    id: "12",
    slug: "recepcionista-pousada-sao-bento",
    title: "Recepcionista de Pousada",
    company: "Pousada Pedra do Baú",
    cityId: "sao-bento-do-sapucai-sp",
    categoryId: "turismo-hospitalidade",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 2.000 + gorjetas",
    description:
      "Atendimento na recepção, check-in/check-out, reservas e suporte aos hóspedes em pousada em São Bento do Sapucaí.",
    requirements: [
      "Ensino médio completo",
      "Boa comunicação e cordialidade",
      "Disponibilidade para finais de semana e feriados",
    ],
    postedAt: "2026-08-24",
  },
  {
    id: "13",
    slug: "guia-turismo-sao-bento",
    title: "Guia de Turismo",
    company: "Mantiqueira Expedições",
    cityId: "sao-bento-do-sapucai-sp",
    categoryId: "turismo-hospitalidade",
    type: "PJ",
    modality: "Presencial",
    salary: "A combinar",
    description:
      "Condução de grupos em trilhas e mirantes da Serra da Mantiqueira, com ênfase em São Bento do Sapucaí e arredores.",
    requirements: [
      "Cadastur ou experiência comprovada como guia",
      "Bom condicionamento físico",
      "Conhecimento da região da Mantiqueira",
    ],
    postedAt: "2026-08-19",
  },
  {
    id: "14",
    slug: "cozinheiro-sao-bento",
    title: "Cozinheiro(a)",
    company: "Restaurante Alto da Serra",
    cityId: "sao-bento-do-sapucai-sp",
    categoryId: "turismo-hospitalidade",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 2.400",
    description:
      "Preparo de pratos da cozinha mineira e cardápio sazonal para restaurante voltado a turistas e moradores.",
    requirements: [
      "Experiência em cozinha profissional",
      "Higiene e organização da estação",
      "Disponibilidade para almoço e jantar aos fins de semana",
    ],
    postedAt: "2026-08-15",
  },
  {
    id: "15",
    slug: "auxiliar-producao-rural-brazopolis",
    title: "Auxiliar de Produção Rural",
    company: "Sítio Recanto das Águas",
    cityId: "brazopolis-mg",
    categoryId: "agropecuaria",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 1.900 + cesta",
    description:
      "Apoio no manejo de lavoura e pecuária de leite em propriedade rural de Brazópolis, com atividades de campo no dia a dia.",
    requirements: [
      "Experiência em lida rural",
      "Disponibilidade para começar cedo",
      "CNH categoria B (desejável)",
    ],
    postedAt: "2026-08-23",
  },
  {
    id: "16",
    slug: "atendente-farmacia-brazopolis",
    title: "Atendente de Farmácia",
    company: "Farmácia São José",
    cityId: "brazopolis-mg",
    categoryId: "saude",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 1.850",
    description:
      "Atendimento ao balcão, organização de estoque e apoio ao farmacêutico responsável na farmácia do centro de Brazópolis.",
    requirements: [
      "Ensino médio completo",
      "Curso de atendente de farmácia (desejável)",
      "Simpatia no atendimento ao público",
    ],
    postedAt: "2026-08-17",
  },
  {
    id: "17",
    slug: "motorista-entregas-brazopolis",
    title: "Motorista de Entregas",
    company: "Comercial Brazópolis",
    cityId: "brazopolis-mg",
    categoryId: "logistica",
    type: "CLT",
    modality: "Presencial",
    salary: "R$ 2.300",
    description:
      "Realizar entregas de mercadorias em Brazópolis e municípios vizinhos, com conferência de notas e cuidado com a carga.",
    requirements: [
      "CNH categoria B",
      "Experiência com entregas",
      "Conhecimento da região",
    ],
    postedAt: "2026-08-12",
  },
  {
    id: "18",
    slug: "analista-sistemas-itajuba",
    title: "Analista de Sistemas",
    company: "UNIFEI Tech Park",
    cityId: "itajuba-mg",
    categoryId: "tecnologia",
    type: "PJ",
    modality: "Híbrido",
    salary: "R$ 6.000 - R$ 7.500",
    description:
      "Levantamento de requisitos, integração de sistemas e apoio a projetos de software para empresas instaladas no entorno de Itajubá.",
    requirements: [
      "Superior em Computação, Sistemas de Informação ou afins",
      "Experiência com APIs e banco de dados",
      "Boa comunicação com áreas de negócio",
    ],
    postedAt: "2026-08-31",
  },
];

export function getJobCity(job: Job): City {
  const city = cities.find((item) => item.id === job.cityId);
  if (!city) {
    throw new Error(`Cidade não encontrada: ${job.cityId}`);
  }
  return city;
}

export function getJobCategory(job: Job): Category {
  const category = categories.find((item) => item.id === job.categoryId);
  if (!category) {
    throw new Error(`Categoria não encontrada: ${job.categoryId}`);
  }
  return category;
}

const NEW_JOB_MAX_DAYS = 3;

export function isNewJob(job: Job, now = new Date()): boolean {
  const posted = new Date(`${job.postedAt}T00:00:00`);
  const diffDays = (now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= NEW_JOB_MAX_DAYS;
}

export function getRecentJobs(count = 3): Job[] {
  return [...jobs]
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
    .slice(0, count);
}

export function getJobCountByCategory(categoryId: CategoryId): number {
  return jobs.filter((job) => job.categoryId === categoryId).length;
}
