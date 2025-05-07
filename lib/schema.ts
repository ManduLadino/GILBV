import * as z from "zod"

// Esquema para validação do formulário
export const formSchema = z.object({
  dadosGerais: z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    cnpj: z.string().optional(),
    endereco: z.string().optional(),
    bairro: z.string().optional(),
    cep: z.string().optional(),
    telefones: z.string().optional(),
    email: z.string().email("E-mail inválido").optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
  }),
  responsavelLegal: z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    cargo: z.string().optional(),
    endereco: z.string().optional(),
    cep: z.string().optional(),
    bairro: z.string().optional(),
    telefones: z.string().optional(),
    email: z.string().email("E-mail inválido").optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
  }),
  responsavelTecnico: z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    areaFormacao: z.string().optional(),
    registroConselho: z.string().optional(),
    endereco: z.string().optional(),
    cep: z.string().optional(),
    bairro: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().email("E-mail inválido").optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
  }),
  outrosParticipes: z.object({
    nome: z.string().optional(),
    cgcCpf: z.string().optional(),
    endereco: z.string().optional(),
    cep: z.string().optional(),
  }),
  descricaoRealidade: z.object({
    historicoOrganizacao: z.string().optional(),
    projetosAnteriores: z.string().optional(),
    parceriasExistentes: z.string().optional(),
    informacoesConvenios: z.string().optional(),
  }),
  sintesePropostas: z.object({
    areaConcorrencia: z.string().optional(),
    titulo: z.string().min(1, "Título é obrigatório"),
    objeto: z.string().min(1, "Objeto é obrigatório"),
    justificativa: z.string().min(1, "Justificativa é obrigatória"),
    abrangencia: z.string().optional(),
    publicoBeneficiario: z.string().optional(),
    metaAtendimento: z.string().optional(),
    periodoInicio: z.string().optional(),
    periodoTermino: z.string().optional(),
    metodologia: z.string().optional(),
  }),
  capacidadeInstalada: z.object({
    equipe: z.array(z.any()).default([]),
    estruturaFisica: z.string().default("propria"),
    instalacoesFisicas: z.array(z.any()).default([]),
    equipamentosDisponiveis: z.array(z.any()).default([]),
  }),
  sustentabilidade: z.object({
    descricao: z.string().optional(),
  }),
  cronogramaFisico: z.object({
    metas: z.array(z.any()).default([]),
  }),
  recursosFinanceiros: z.object({
    pessoal: z.number().default(0),
    diarias: z.number().default(0),
    materialConsumo: z.number().default(0),
    premiacoes: z.number().default(0),
    passagens: z.number().default(0),
    consultorias: z.number().default(0),
    servicosTerceirosPF: z.number().default(0),
    servicosTerceirosPJ: z.number().default(0),
    obrigacoesTributarias: z.number().default(0),
    equipamentosMaterial: z.number().default(0),
  }),
  cronogramaDesembolso: z.object({
    meses: z.array(z.number()).length(12).default([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  }),
  declaracao: z.object({
    localData: z.string().optional(),
    assinatura: z.boolean().default(false),
  }),
})

// Tipo derivado do esquema
export type FormValues = z.infer<typeof formSchema>
