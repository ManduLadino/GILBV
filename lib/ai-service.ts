// Serviço simulado de IA para geração de conteúdo e processamento de documentos

// Tipos de projetos que a IA pode gerar
export type ProjectType = "ambiental" | "educacional" | "saude" | "infraestrutura" | "cultural" | "social" | "esporte"

// Interface para as referências
export interface Reference {
  title: string
  url: string
  description: string
  date: string
}

// Interface para o resultado da IA
export interface AIGenerationResult {
  content: any
  references: Reference[]
  generationId: string
}

// Função para gerar um ID único para cada geração
function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Banco de dados simulado de referências
const referenceDatabase: Record<ProjectType, Reference[]> = {
  ambiental: [
    {
      title: "Plano Estadual de Recursos Hídricos do Piauí",
      url: "https://www.semar.pi.gov.br/plano-estadual-recursos-hidricos",
      description: "Documento oficial que estabelece diretrizes para gestão de recursos hídricos no estado",
      date: "2020-05-15",
    },
    {
      title: "Relatório de Qualidade Ambiental do Piauí",
      url: "https://www.semar.pi.gov.br/relatorio-qualidade-ambiental",
      description: "Análise da situação ambiental do estado com foco em recursos hídricos",
      date: "2023-02-10",
    },
    {
      title: "Mapeamento de Áreas Prioritárias para Conservação no Piauí",
      url: "https://www.icmbio.gov.br/portal/areas-prioritarias-pi",
      description: "Estudo técnico sobre áreas de conservação prioritárias",
      date: "2022-08-22",
    },
  ],
  educacional: [
    {
      title: "Plano Estadual de Educação do Piauí",
      url: "https://www.seduc.pi.gov.br/plano-estadual-educacao",
      description: "Diretrizes e metas para a educação no estado",
      date: "2021-03-18",
    },
    {
      title: "Censo Escolar do Piauí",
      url: "https://www.seduc.pi.gov.br/censo-escolar",
      description: "Dados estatísticos sobre a educação no estado",
      date: "2023-01-30",
    },
  ],
  saude: [
    {
      title: "Plano Estadual de Saúde do Piauí",
      url: "https://www.saude.pi.gov.br/plano-estadual-saude",
      description: "Diretrizes e metas para a saúde no estado",
      date: "2022-04-12",
    },
    {
      title: "Relatório Epidemiológico do Piauí",
      url: "https://www.saude.pi.gov.br/relatorio-epidemiologico",
      description: "Dados sobre a situação epidemiológica no estado",
      date: "2023-05-05",
    },
  ],
  infraestrutura: [
    {
      title: "Plano de Desenvolvimento da Infraestrutura do Piauí",
      url: "https://www.seid.pi.gov.br/plano-desenvolvimento-infraestrutura",
      description: "Planejamento de obras e infraestrutura no estado",
      date: "2021-09-28",
    },
    {
      title: "Relatório de Obras Públicas do Piauí",
      url: "https://www.seid.pi.gov.br/relatorio-obras-publicas",
      description: "Situação das obras públicas em andamento no estado",
      date: "2023-03-15",
    },
  ],
  cultural: [
    {
      title: "Plano Estadual de Cultura do Piauí",
      url: "https://www.cultura.pi.gov.br/plano-estadual-cultura",
      description: "Diretrizes e metas para a cultura no estado",
      date: "2022-06-20",
    },
    {
      title: "Mapeamento Cultural do Piauí",
      url: "https://www.cultura.pi.gov.br/mapeamento-cultural",
      description: "Levantamento dos equipamentos e manifestações culturais no estado",
      date: "2023-01-10",
    },
  ],
  social: [
    {
      title: "Plano Estadual de Assistência Social do Piauí",
      url: "https://www.sasc.pi.gov.br/plano-estadual-assistencia-social",
      description: "Diretrizes e metas para a assistência social no estado",
      date: "2022-02-15",
    },
    {
      title: "Diagnóstico Social do Piauí",
      url: "https://www.sasc.pi.gov.br/diagnostico-social",
      description: "Análise da situação social no estado",
      date: "2023-04-20",
    },
  ],
  esporte: [
    {
      title: "Plano Estadual de Esporte e Lazer do Piauí",
      url: "https://www.esporte.pi.gov.br/plano-estadual-esporte",
      description: "Diretrizes e metas para o desenvolvimento do esporte no estado",
      date: "2022-03-10",
    },
    {
      title: "Mapeamento de Instalações Esportivas do Piauí",
      url: "https://www.esporte.pi.gov.br/instalacoes-esportivas",
      description: "Levantamento das instalações esportivas disponíveis no estado",
      date: "2023-01-25",
    },
    {
      title: "Relatório de Projetos Esportivos Financiados",
      url: "https://www.esporte.pi.gov.br/projetos-financiados",
      description: "Análise dos projetos esportivos financiados pelo estado nos últimos anos",
      date: "2022-11-15",
    },
  ],
}

// Função para gerar nomes de organizações aleatórias
function generateOrganizationName(type: ProjectType): string {
  const prefixes = ["Associação", "Instituto", "Fundação", "Centro", "Organização"]

  const middleParts: Record<ProjectType, string[]> = {
    ambiental: ["de Proteção Ambiental", "de Conservação", "de Desenvolvimento Sustentável", "Ecológico"],
    educacional: ["Educacional", "de Educação", "de Ensino", "Pedagógico"],
    saude: ["de Saúde", "Médico", "de Assistência à Saúde", "de Bem-Estar"],
    infraestrutura: ["de Desenvolvimento Urbano", "de Infraestrutura", "de Obras", "de Engenharia"],
    cultural: ["Cultural", "de Cultura", "de Arte", "de Patrimônio Cultural"],
    social: ["de Assistência Social", "de Desenvolvimento Social", "Comunitário", "de Apoio Social"],
    esporte: ["Esportivo", "de Esporte e Lazer", "de Desenvolvimento Esportivo", "de Formação Atlética"],
  }

  const suffixes = [
    "do Piauí",
    "de Teresina",
    "do Vale do Parnaíba",
    "do Semiárido Piauiense",
    "do Vale do Gurguéia",
    "da Serra da Capivara",
    "do Litoral Piauiense",
  ]

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const middlePart = middleParts[type][Math.floor(Math.random() * middleParts[type].length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]

  return `${prefix} ${middlePart} ${suffix}`
}

// Função para gerar um CNPJ aleatório formatado
function generateCNPJ(): string {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)
  const n3 = Math.floor(Math.random() * 10)
  const n4 = Math.floor(Math.random() * 10)
  const n5 = Math.floor(Math.random() * 10)
  const n6 = Math.floor(Math.random() * 10)
  const n7 = Math.floor(Math.random() * 10)
  const n8 = Math.floor(Math.random() * 10)
  const n9 = Math.floor(Math.random() * 10)
  const n10 = Math.floor(Math.random() * 10)
  const n11 = Math.floor(Math.random() * 10)
  const n12 = Math.floor(Math.random() * 10)

  // Cálculo dos dígitos verificadores (simplificado para este exemplo)
  const d1 = 0
  const d2 = 0

  return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`
}

// Função para gerar um CPF aleatório formatado
function generateCPF(): string {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)
  const n3 = Math.floor(Math.random() * 10)
  const n4 = Math.floor(Math.random() * 10)
  const n5 = Math.floor(Math.random() * 10)
  const n6 = Math.floor(Math.random() * 10)
  const n7 = Math.floor(Math.random() * 10)
  const n8 = Math.floor(Math.random() * 10)
  const n9 = Math.floor(Math.random() * 10)

  // Cálculo dos dígitos verificadores (simplificado para este exemplo)
  const d1 = 0
  const d2 = 0

  return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`
}

// Função para gerar um nome de pessoa aleatório
function generatePersonName(): string {
  const firstNames = [
    "João",
    "Maria",
    "Pedro",
    "Ana",
    "Carlos",
    "Juliana",
    "Antônio",
    "Fernanda",
    "José",
    "Mariana",
    "Paulo",
    "Camila",
    "Lucas",
    "Amanda",
    "Rafael",
    "Patrícia",
  ]

  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Souza",
    "Lima",
    "Pereira",
    "Costa",
    "Rodrigues",
    "Almeida",
    "Nascimento",
    "Carvalho",
    "Gomes",
    "Martins",
    "Araújo",
    "Ribeiro",
    "Ferreira",
  ]

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)]
  const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)]

  return `${firstName} ${lastName1} ${lastName2}`
}

// Função para gerar um endereço aleatório
function generateAddress(): string {
  const streetTypes = ["Rua", "Avenida", "Alameda", "Travessa"]
  const streetNames = [
    "das Flores",
    "dos Ipês",
    "das Palmeiras",
    "Principal",
    "São João",
    "Sete de Setembro",
    "Quinze de Novembro",
    "José de Alencar",
    "Castro Alves",
  ]

  const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)]
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)]
  const number = Math.floor(Math.random() * 2000) + 1

  return `${streetType} ${streetName}, ${number}`
}

// Função para gerar um CEP aleatório formatado
function generateCEP(): string {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)
  const n3 = Math.floor(Math.random() * 10)
  const n4 = Math.floor(Math.random() * 10)
  const n5 = Math.floor(Math.random() * 10)
  const n6 = Math.floor(Math.random() * 10)
  const n7 = Math.floor(Math.random() * 10)
  const n8 = Math.floor(Math.random() * 10)

  return `${n1}${n2}${n3}${n4}${n5}-${n6}${n7}${n8}`
}

// Função para gerar um telefone aleatório formatado
function generatePhone(): string {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)
  const n3 = Math.floor(Math.random() * 10)
  const n4 = Math.floor(Math.random() * 10)
  const n5 = Math.floor(Math.random() * 10)
  const n6 = Math.floor(Math.random() * 10)
  const n7 = Math.floor(Math.random() * 10)
  const n8 = Math.floor(Math.random() * 10)
  const n9 = Math.floor(Math.random() * 10)

  return `(86) 9${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`
}

// Função para gerar um email aleatório
function generateEmail(name: string): string {
  const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "uol.com.br"]
  const domain = domains[Math.floor(Math.random() * domains.length)]

  // Simplifica o nome para usar no email
  const simplifiedName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join(".")

  return `${simplifiedName}@${domain}`
}

// Função para gerar uma data aleatória no formato YYYY-MM-DD
function generateDate(startYear: number, endYear: number): string {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1 // Simplificado para evitar problemas com meses

  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
}

// Função para gerar um projeto ambiental
function generateEnvironmentalProject(): any {
  const organizationName = generateOrganizationName("ambiental")
  const responsavelLegalName = generatePersonName()
  const responsavelTecnicoName = generatePersonName()

  return {
    dadosGerais: {
      nome: organizationName,
      cnpj: generateCNPJ(),
      endereco: generateAddress(),
      bairro: "Centro",
      cep: generateCEP(),
      telefones: generatePhone(),
      email: generateEmail(organizationName),
      cidade: "Teresina",
      uf: "PI",
    },
    responsavelLegal: {
      nome: responsavelLegalName,
      cpf: generateCPF(),
      rg: `${Math.floor(Math.random() * 10000000)} SSP/PI`,
      cargo: "Presidente",
      endereco: generateAddress(),
      cep: generateCEP(),
      bairro: "Centro",
      telefones: generatePhone(),
      email: generateEmail(responsavelLegalName),
      cidade: "Teresina",
      uf: "PI",
    },
    responsavelTecnico: {
      nome: responsavelTecnicoName,
      areaFormacao: "Engenharia Ambiental",
      registroConselho: `CREA-PI ${Math.floor(Math.random() * 100000)}`,
      endereco: generateAddress(),
      cep: generateCEP(),
      bairro: "Centro",
      telefone: generatePhone(),
      email: generateEmail(responsavelTecnicoName),
      cidade: "Teresina",
      uf: "PI",
    },
    outrosParticipes: {
      nome: "Secretaria Estadual de Meio Ambiente e Recursos Hídricos do Piauí",
      cgcCpf: generateCNPJ(),
      endereco: "Rua 13 de Maio, 307, Centro",
      cep: "64000-150",
    },
    descricaoRealidade: {
      historicoOrganizacao: `${organizationName} foi fundada em ${2000 + Math.floor(Math.random() * 20)} com o objetivo de promover ações de conservação ambiental e desenvolvimento sustentável no estado do Piauí. Ao longo dos anos, a organização tem trabalhado em parceria com comunidades locais, poder público e iniciativa privada para implementar projetos que conciliam preservação ambiental e geração de renda para populações vulneráveis.`,
      projetosAnteriores: `Projeto Águas Vivas (${2018 + Math.floor(Math.random() * 5)}-${2020 + Math.floor(Math.random() * 3)}): Recuperação de nascentes e matas ciliares na bacia do Rio Parnaíba, beneficiando ${10 + Math.floor(Math.random() * 10)} comunidades rurais.\n\nPrograma de Educação Ambiental nas Escolas (${2019 + Math.floor(Math.random() * 4)}-${2021 + Math.floor(Math.random() * 3)}): Capacitação de professores e alunos em ${20 + Math.floor(Math.random() * 20)} escolas públicas de Teresina e região metropolitana.\n\nCampanha Piauí Verde (${2020 + Math.floor(Math.random() * 3)}): Plantio de ${5000 + Math.floor(Math.random() * 10000)} mudas de espécies nativas do cerrado e caatinga em áreas degradadas.`,
      parceriasExistentes: `Secretaria Estadual de Meio Ambiente e Recursos Hídricos do Piauí: Apoio técnico e financeiro para projetos de recuperação ambiental.\n\nUniversidade Federal do Piauí: Parceria para pesquisas e desenvolvimento de tecnologias sustentáveis.\n\nFundação Banco do Brasil: Financiamento de projetos socioambientais em comunidades rurais.`,
      informacoesConvenios: `Convênio nº ${Math.floor(Math.random() * 100)}/2019 - SEMAR-PI: Projeto de Recuperação de Áreas Degradadas no Sul do Piauí, valor R$ ${200000 + Math.floor(Math.random() * 100000)},00, concluído com êxito em 2021.\n\nConvênio nº ${Math.floor(Math.random() * 100)}/2020 - Secretaria de Educação do Piauí: Programa de Educação Ambiental nas Escolas, valor R$ ${150000 + Math.floor(Math.random() * 100000)},00, concluído com aprovação total da prestação de contas.`,
    },
    sintesePropostas: {
      areaConcorrencia: "area1",
      titulo: "Revitalização e Monitoramento de Recursos Hídricos na Região Semiárida do Piauí",
      objeto: `O projeto visa a revitalização e monitoramento de recursos hídricos em ${5 + Math.floor(Math.random() * 10)} comunidades rurais da região semiárida do Piauí, através da recuperação de nascentes, implementação de sistemas de captação de água de chuva e formação de agentes ambientais comunitários para monitoramento da qualidade da água.`,
      justificativa: `A região semiárida do Piauí enfrenta graves problemas de escassez hídrica, agravados pelas mudanças climáticas e pelo uso inadequado dos recursos naturais. Muitas comunidades rurais dependem de fontes de água que estão degradadas ou contaminadas, comprometendo a saúde e a qualidade de vida da população. A revitalização dessas fontes hídricas, aliada a um sistema de monitoramento comunitário, é fundamental para garantir a segurança hídrica dessas comunidades e promover o uso sustentável da água.`,
      abrangencia: `${5 + Math.floor(Math.random() * 10)} comunidades rurais nos municípios de São Raimundo Nonato, Coronel José Dias e São João do Piauí`,
      publicoBeneficiario: `${300 + Math.floor(Math.random() * 500)} famílias de agricultores familiares e comunidades tradicionais da região semiárida do Piauí`,
      metaAtendimento: `${1000 + Math.floor(Math.random() * 2000)} pessoas diretamente beneficiadas e ${3000 + Math.floor(Math.random() * 5000)} indiretamente`,
      periodoInicio: generateDate(2025, 2026),
      periodoTermino: generateDate(2026, 2027),
      metodologia: `O projeto será desenvolvido em três etapas principais:\n\n1. Diagnóstico participativo: Mapeamento das fontes hídricas e avaliação da qualidade da água nas comunidades, com participação ativa dos moradores.\n\n2. Intervenções físicas: Recuperação de nascentes, construção de sistemas de captação de água de chuva e implementação de tecnologias sociais de tratamento de água.\n\n3. Formação e monitoramento: Capacitação de agentes ambientais comunitários para monitoramento da qualidade da água e manutenção das estruturas implementadas.`,
    },
    // Outros campos seriam preenchidos de forma semelhante
  }
}

// Adicionar função para gerar projeto esportivo
function generateSportsProject(): any {
  const organizationName = generateOrganizationName("esporte")
  const responsavelLegalName = generatePersonName()
  const responsavelTecnicoName = generatePersonName()

  return {
    dadosGerais: {
      nome: organizationName,
      cnpj: generateCNPJ(),
      endereco: generateAddress(),
      bairro: "Centro",
      cep: generateCEP(),
      telefones: generatePhone(),
      email: generateEmail(organizationName),
      cidade: "Teresina",
      uf: "PI",
    },
    responsavelLegal: {
      nome: responsavelLegalName,
      cpf: generateCPF(),
      rg: `${Math.floor(Math.random() * 10000000)} SSP/PI`,
      cargo: "Presidente",
      endereco: generateAddress(),
      cep: generateCEP(),
      bairro: "Centro",
      telefones: generatePhone(),
      email: generateEmail(responsavelLegalName),
      cidade: "Teresina",
      uf: "PI",
    },
    responsavelTecnico: {
      nome: responsavelTecnicoName,
      areaFormacao: "Educação Física",
      registroConselho: `CREF-PI ${Math.floor(Math.random() * 100000)}`,
      endereco: generateAddress(),
      cep: generateCEP(),
      bairro: "Centro",
      telefone: generatePhone(),
      email: generateEmail(responsavelTecnicoName),
      cidade: "Teresina",
      uf: "PI",
    },
    outrosParticipes: {
      nome: "Secretaria Estadual de Esporte e Lazer do Piauí",
      cgcCpf: generateCNPJ(),
      endereco: "Av. Pedro Freitas, s/n, Centro Administrativo",
      cep: "64018-900",
    },
    descricaoRealidade: {
      historicoOrganizacao: `${organizationName} foi fundada em ${2000 + Math.floor(Math.random() * 20)} com o objetivo de promover a prática esportiva e o desenvolvimento de atletas no estado do Piauí. Ao longo dos anos, a organização tem trabalhado em parceria com comunidades locais, poder público e iniciativa privada para implementar projetos que democratizam o acesso ao esporte e descobrem novos talentos.`,
      projetosAnteriores: `Projeto Esporte para Todos (${2018 + Math.floor(Math.random() * 5)}-${2020 + Math.floor(Math.random() * 3)}): Iniciação esportiva em ${5 + Math.floor(Math.random() * 10)} modalidades diferentes, beneficiando ${200 + Math.floor(Math.random() * 300)} crianças e adolescentes.\n\nCampeonato Interescolar (${2019 + Math.floor(Math.random() * 4)}-${2021 + Math.floor(Math.random() * 3)}): Competição entre ${15 + Math.floor(Math.random() * 20)} escolas públicas de Teresina e região metropolitana.\n\nFormação de Atletas (${2020 + Math.floor(Math.random() * 3)}): Treinamento especializado para ${50 + Math.floor(Math.random() * 100)} jovens atletas em modalidades olímpicas.`,
      parceriasExistentes: `Secretaria Estadual de Esporte e Lazer do Piauí: Apoio técnico e financeiro para projetos esportivos.\n\nUniversidade Federal do Piauí: Parceria para avaliação física e acompanhamento de atletas.\n\nComitê Olímpico Brasileiro: Suporte metodológico para formação de atletas de alto rendimento.`,
      informacoesConvenios: `Convênio nº ${Math.floor(Math.random() * 100)}/2019 - SEMEL-PI: Projeto de Iniciação Esportiva em Comunidades Vulneráveis, valor R$ ${150000 + Math.floor(Math.random() * 100000)},00, concluído com êxito em 2021.\n\nConvênio nº ${Math.floor(Math.random() * 100)}/2020 - Ministério do Esporte: Programa de Formação de Atletas, valor R$ ${200000 + Math.floor(Math.random() * 150000)},00, concluído com aprovação total da prestação de contas.`,
    },
    sintesePropostas: {
      areaConcorrencia: "area1",
      titulo: "Desenvolvimento Esportivo e Formação de Atletas em Comunidades Ribeirinhas",
      objeto: `O projeto visa promover o desenvolvimento esportivo e a formação de atletas em ${5 + Math.floor(Math.random() * 10)} comunidades ribeirinhas do Piauí, através da implementação de núcleos esportivos, capacitação de professores locais e realização de competições regionais, utilizando os recursos hídricos da região como diferencial para modalidades aquáticas.`,
      justificativa: `As comunidades ribeirinhas do Piauí possuem grande potencial para o desenvolvimento de atletas em modalidades aquáticas, mas carecem de infraestrutura e orientação técnica adequada. O projeto busca aproveitar os recursos hídricos naturais da região para promover a prática esportiva, melhorar a qualidade de vida da população local e identificar talentos esportivos, contribuindo para o desenvolvimento sustentável dessas comunidades através do esporte.`,
      abrangencia: `${5 + Math.floor(Math.random() * 10)} comunidades ribeirinhas nos municípios de Parnaíba, Luís Correia e Ilha Grande`,
      publicoBeneficiario: `${300 + Math.floor(Math.random() * 500)} crianças e adolescentes entre 7 e 17 anos e suas famílias`,
      metaAtendimento: `${1000 + Math.floor(Math.random() * 2000)} pessoas diretamente beneficiadas e ${3000 + Math.floor(Math.random() * 5000)} indiretamente`,
      periodoInicio: generateDate(2025, 2026),
      periodoTermino: generateDate(2026, 2027),
      metodologia: `O projeto será desenvolvido em três etapas principais:\n\n1. Diagnóstico e mobilização: Mapeamento das comunidades, identificação de espaços para prática esportiva e mobilização da população local.\n\n2. Implementação dos núcleos: Estruturação dos espaços, aquisição de equipamentos e capacitação de professores e monitores locais.\n\n3. Desenvolvimento esportivo: Realização de aulas regulares, festivais e competições, com acompanhamento técnico e avaliação periódica dos participantes.`,
    },
    // Outros campos seriam preenchidos de forma semelhante
  }
}

// Atualizar a função generateProjectContent para aceitar um parâmetro de assunto
export async function generateProjectContent(
  projectType: ProjectType = "ambiental",
  searchQuery?: string,
): Promise<AIGenerationResult> {
  // Simula o tempo de processamento da IA
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Seleciona referências relevantes
  let selectedReferences = referenceDatabase[projectType].slice(0, 2 + Math.floor(Math.random() * 2))

  // Se houver um assunto específico, adiciona referências relacionadas
  if (searchQuery && searchQuery.trim() !== "") {
    // Simula a busca de referências adicionais baseadas no assunto
    const additionalReferences: Reference[] = [
      {
        title: `Estudo sobre ${searchQuery} no contexto de ${projectType}`,
        url: `https://www.sigrh.pi.gov.br/estudos/${projectType}/${searchQuery.toLowerCase().replace(/\s+/g, "-")}`,
        description: `Análise detalhada sobre ${searchQuery} e sua aplicação em projetos de ${projectType}`,
        date: new Date(Date.now() - Math.random() * 31536000000).toISOString().split("T")[0], // Data aleatória no último ano
      },
      {
        title: `Diretrizes para implementação de projetos de ${searchQuery}`,
        url: `https://www.gov.br/diretrizes/${searchQuery.toLowerCase().replace(/\s+/g, "-")}`,
        description: `Documento oficial com diretrizes para projetos relacionados a ${searchQuery}`,
        date: new Date(Date.now() - Math.random() * 31536000000).toISOString().split("T")[0],
      },
    ]

    // Adiciona as referências específicas do assunto
    selectedReferences = [...selectedReferences, ...additionalReferences]
  }

  // Gera conteúdo baseado no tipo de projeto
  let content
  switch (projectType) {
    case "ambiental":
      content = generateEnvironmentalProject()
      break
    case "esporte":
      content = generateSportsProject()
      break
    // Outros tipos de projetos seriam implementados de forma semelhante
    default:
      content = generateEnvironmentalProject() // Fallback para ambiental
  }

  // Se houver um assunto específico, personaliza o conteúdo
  if (searchQuery && searchQuery.trim() !== "") {
    // Personaliza o título e objeto do projeto com base no assunto
    if (content.sintesePropostas) {
      content.sintesePropostas.titulo = `Projeto de ${projectType} com foco em ${searchQuery}`
      content.sintesePropostas.objeto = `O projeto visa desenvolver ações relacionadas a ${searchQuery} no contexto de ${projectType}, promovendo melhorias significativas para a comunidade e meio ambiente.`
      content.sintesePropostas.justificativa = `A implementação de um projeto focado em ${searchQuery} é fundamental para o desenvolvimento sustentável da região, considerando os desafios atuais e a necessidade de soluções inovadoras nesta área.`
    }
  }

  return {
    content,
    references: selectedReferences,
    generationId: generateUniqueId(),
  }
}

// Atualizar a função processDocument para melhorar o processamento de PDFs
export async function processDocument(file: File): Promise<AIGenerationResult> {
  // Verifica se é um PDF
  const isPDF = file.type === "application/pdf"

  // Simula o tempo de processamento do documento (mais longo para PDFs)
  await new Promise((resolve) => setTimeout(resolve, isPDF ? 3000 : 2000))

  // Como não podemos realmente processar o documento, geramos conteúdo aleatório
  // Em um caso real, aqui seria feita a análise do documento
  const projectType: ProjectType = "ambiental"

  // Para PDFs, criamos uma referência específica para o arquivo
  let selectedReferences = referenceDatabase[projectType].slice(0, 2 + Math.floor(Math.random() * 2))

  if (isPDF) {
    // Adiciona o próprio PDF como referência principal
    const pdfReference: Reference = {
      title: `Documento: ${file.name}`,
      url: "#", // Em um caso real, seria o URL do documento armazenado
      description: "Documento PDF fornecido pelo usuário como fonte principal de informações",
      date: new Date().toISOString().split("T")[0],
    }

    // Coloca o PDF como primeira referência
    selectedReferences = [pdfReference, ...selectedReferences]
  }

  return {
    content: generateEnvironmentalProject(),
    references: selectedReferences,
    generationId: generateUniqueId(),
  }
}

// Função para buscar projetos similares
export async function searchSimilarProjects(query: string): Promise<AIGenerationResult> {
  // Simula o tempo de busca
  await new Promise((resolve) => setTimeout(resolve, 1800))

  // Determina o tipo de projeto com base na consulta
  let projectType: ProjectType = "ambiental"

  if (query.toLowerCase().includes("educa") || query.toLowerCase().includes("escola")) {
    projectType = "educacional"
  } else if (query.toLowerCase().includes("saude") || query.toLowerCase().includes("hospital")) {
    projectType = "saude"
  } else if (query.toLowerCase().includes("infraestrutura") || query.toLowerCase().includes("obra")) {
    projectType = "infraestrutura"
  } else if (query.toLowerCase().includes("cultura") || query.toLowerCase().includes("arte")) {
    projectType = "cultural"
  } else if (query.toLowerCase().includes("social") || query.toLowerCase().includes("assistencia")) {
    projectType = "social"
  } else if (query.toLowerCase().includes("esporte") || query.toLowerCase().includes("atleta")) {
    projectType = "esporte"
  }

  // Seleciona referências relevantes
  const selectedReferences = referenceDatabase[projectType].slice(0, 2 + Math.floor(Math.random() * 2))

  // Gera conteúdo baseado no tipo de projeto
  let content
  switch (projectType) {
    case "ambiental":
      content = generateEnvironmentalProject()
      break
    case "esporte":
      content = generateSportsProject()
      break
    // Outros tipos de projetos seriam implementados de forma semelhante
    default:
      content = generateEnvironmentalProject() // Fallback para ambiental
  }

  return {
    content,
    references: selectedReferences,
    generationId: generateUniqueId(),
  }
}
