"use client"

import type React from "react"
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, Font } from "@react-pdf/renderer"
import type { FormValues } from "@/lib/schema"
import type { Reference } from "@/lib/ai-service"

// Registrar fontes
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
})

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#006400",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    color: "#006400",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: 700,
    width: "30%",
  },
  value: {
    fontSize: 10,
    width: "70%",
  },
  textBlock: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: "justify",
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#006400",
    paddingTop: 10,
    fontSize: 8,
    textAlign: "center",
    color: "#666",
  },
  references: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  referenceTitle: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 5,
  },
  referenceItem: {
    fontSize: 8,
    marginBottom: 3,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 20,
    right: 20,
    color: "#666",
  },
})

// Componente para renderizar um campo simples
const Field = ({ label, value }: { label: string; value: string | number | undefined | null }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || "Não informado"}</Text>
  </View>
)

// Componente para renderizar um bloco de texto
const TextBlock = ({ label, value }: { label: string; value: string | undefined | null }) => (
  <View style={styles.section}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.textBlock}>{value || "Não informado"}</Text>
  </View>
)

// Componente para renderizar uma tabela simples
const SimpleTable = ({ title, items }: { title: string; items: { label: string; value: string | number }[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.label}>{item.label}:</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    ))}
  </View>
)

// Componente para renderizar as referências
const References = ({ references, generationId }: { references: Reference[]; generationId: string }) => (
  <View style={styles.references}>
    <Text style={styles.referenceTitle}>Referências utilizadas pela IA (ID: {generationId})</Text>
    {references.map((ref, index) => (
      <Text key={index} style={styles.referenceItem}>
        {index + 1}. {ref.title} - {ref.description} ({new Date(ref.date).toLocaleDateString("pt-BR")})
      </Text>
    ))}
  </View>
)

// Componente principal do PDF
const FormularioPDF = ({
  data,
  references,
  generationId,
}: {
  data: FormValues
  references: Reference[]
  generationId: string
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Formulário de Proposta de Projeto - SIGRH</Text>
        <Text style={styles.subtitle}>Sistema de Gerenciamento de Recursos Hídricos</Text>
      </View>

      {/* Dados Gerais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1 – DADOS GERAIS DO PROPONENTE</Text>
        <Field label="Nome" value={data.dadosGerais.nome} />
        <Field label="CNPJ" value={data.dadosGerais.cnpj} />
        <Field label="Endereço" value={data.dadosGerais.endereco} />
        <Field label="Bairro" value={data.dadosGerais.bairro} />
        <Field label="CEP" value={data.dadosGerais.cep} />
        <Field label="Telefones" value={data.dadosGerais.telefones} />
        <Field label="E-mail" value={data.dadosGerais.email} />
        <Field label="Cidade" value={data.dadosGerais.cidade} />
        <Field label="UF" value={data.dadosGerais.uf} />
      </View>

      {/* Responsável Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2 – IDENTIFICAÇÃO DO RESPONSÁVEL LEGAL DO PROPONENTE</Text>
        <Field label="Nome" value={data.responsavelLegal.nome} />
        <Field label="CPF" value={data.responsavelLegal.cpf} />
        <Field label="RG" value={data.responsavelLegal.rg} />
        <Field label="Cargo" value={data.responsavelLegal.cargo} />
        <Field label="Endereço" value={data.responsavelLegal.endereco} />
        <Field label="CEP" value={data.responsavelLegal.cep} />
        <Field label="Bairro" value={data.responsavelLegal.bairro} />
        <Field label="Telefones" value={data.responsavelLegal.telefones} />
        <Field label="E-mail" value={data.responsavelLegal.email} />
        <Field label="Cidade" value={data.responsavelLegal.cidade} />
        <Field label="UF" value={data.responsavelLegal.uf} />
      </View>

      {/* Responsável Técnico */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3 – IDENTIFICAÇÃO DO RESPONSÁVEL TÉCNICO PELO PROJETO</Text>
        <Field label="Nome" value={data.responsavelTecnico.nome} />
        <Field label="Área de Formação" value={data.responsavelTecnico.areaFormacao} />
        <Field label="Registro no Conselho" value={data.responsavelTecnico.registroConselho} />
        <Field label="Endereço" value={data.responsavelTecnico.endereco} />
        <Field label="CEP" value={data.responsavelTecnico.cep} />
        <Field label="Bairro" value={data.responsavelTecnico.bairro} />
        <Field label="Telefone" value={data.responsavelTecnico.telefone} />
        <Field label="E-mail" value={data.responsavelTecnico.email} />
        <Field label="Cidade" value={data.responsavelTecnico.cidade} />
        <Field label="UF" value={data.responsavelTecnico.uf} />
      </View>

      {/* Outros Partícipes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4 – OUTROS PARTÍCIPES</Text>
        <Field label="Nome" value={data.outrosParticipes.nome} />
        <Field label="CGC/CPF" value={data.outrosParticipes.cgcCpf} />
        <Field label="Endereço" value={data.outrosParticipes.endereco} />
        <Field label="CEP" value={data.outrosParticipes.cep} />
      </View>

      {/* Descrição da Realidade */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5 – DESCRIÇÃO DA REALIDADE</Text>
        <TextBlock label="Histórico da Organização" value={data.descricaoRealidade.historicoOrganizacao} />
        <TextBlock label="Projetos Anteriores" value={data.descricaoRealidade.projetosAnteriores} />
        <TextBlock label="Parcerias Existentes" value={data.descricaoRealidade.parceriasExistentes} />
        <TextBlock label="Informações sobre Convênios" value={data.descricaoRealidade.informacoesConvenios} />
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Síntese da Proposta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6 – SÍNTESE DA PROPOSTA</Text>
        <Field label="Área a que concorre" value={data.sintesePropostas.areaConcorrencia} />
        <Field label="Título da Proposta" value={data.sintesePropostas.titulo} />
        <TextBlock label="Identificação do Objeto" value={data.sintesePropostas.objeto} />
        <TextBlock label="Justificativa da Proposta" value={data.sintesePropostas.justificativa} />
        <Field label="Abrangência da proposta" value={data.sintesePropostas.abrangencia} />
        <Field label="Público Beneficiário" value={data.sintesePropostas.publicoBeneficiario} />
        <Field label="Meta de Atendimento" value={data.sintesePropostas.metaAtendimento} />
        <Field label="Período de Início" value={data.sintesePropostas.periodoInicio} />
        <Field label="Período de Término" value={data.sintesePropostas.periodoTermino} />
        <TextBlock label="Metodologia e Abordagem" value={data.sintesePropostas.metodologia} />
      </View>

      {/* Capacidade Instalada - Resumo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7 – CAPACIDADE INSTALADA</Text>
        <Text style={styles.textBlock}>Equipe: {data.capacidadeInstalada.equipe?.length || 0} profissionais</Text>
        <Text style={styles.textBlock}>
          Estrutura Física: {data.capacidadeInstalada.estruturaFisica || "Não informado"}
        </Text>
        <Text style={styles.textBlock}>
          Instalações: {data.capacidadeInstalada.instalacoesFisicas?.length || 0} cômodos
        </Text>
        <Text style={styles.textBlock}>
          Equipamentos: {data.capacidadeInstalada.equipamentosDisponiveis?.length || 0} itens
        </Text>
      </View>

      {/* Sustentabilidade */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8 – SUSTENTABILIDADE DA PROPOSTA</Text>
        <TextBlock label="Descrição" value={data.sustentabilidade.descricao} />
      </View>

      {/* Cronograma Físico - Resumo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9 – CRONOGRAMA FÍSICO DE EXECUÇÃO DO OBJETO</Text>
        <Text style={styles.textBlock}>Total de Metas: {data.cronogramaFisico.metas?.length || 0}</Text>
        {data.cronogramaFisico.metas?.map((meta, index) => (
          <Text key={index} style={styles.textBlock}>
            Meta {index + 1}: {meta.descricao?.substring(0, 100)}... ({meta.etapas?.length || 0} etapas)
          </Text>
        ))}
      </View>

      {/* Recursos Financeiros - Resumo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10 – DETALHAMENTO DA APLICAÇÃO DOS RECURSOS FINANCEIROS</Text>
        <SimpleTable
          title="Recursos"
          items={[
            { label: "Pessoal", value: `R$ ${data.recursosFinanceiros.pessoal.toFixed(2)}` },
            { label: "Diárias", value: `R$ ${data.recursosFinanceiros.diarias.toFixed(2)}` },
            { label: "Material de Consumo", value: `R$ ${data.recursosFinanceiros.materialConsumo.toFixed(2)}` },
            { label: "Premiações", value: `R$ ${data.recursosFinanceiros.premiacoes.toFixed(2)}` },
            { label: "Passagens", value: `R$ ${data.recursosFinanceiros.passagens.toFixed(2)}` },
            { label: "Consultorias", value: `R$ ${data.recursosFinanceiros.consultorias.toFixed(2)}` },
            { label: "Serviços PF", value: `R$ ${data.recursosFinanceiros.servicosTerceirosPF.toFixed(2)}` },
            { label: "Serviços PJ", value: `R$ ${data.recursosFinanceiros.servicosTerceirosPJ.toFixed(2)}` },
            {
              label: "Obrigações Tributárias",
              value: `R$ ${data.recursosFinanceiros.obrigacoesTributarias.toFixed(2)}`,
            },
            { label: "Equipamentos", value: `R$ ${data.recursosFinanceiros.equipamentosMaterial.toFixed(2)}` },
            {
              label: "TOTAL",
              value: `R$ ${Object.values(data.recursosFinanceiros)
                .reduce((acc, curr) => acc + (curr || 0), 0)
                .toFixed(2)}`,
            },
          ]}
        />
      </View>

      {/* Cronograma de Desembolso - Resumo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11 – CRONOGRAMA DE DESEMBOLSO</Text>
        <Text style={styles.textBlock}>
          Total: R$ {data.cronogramaDesembolso.meses.reduce((acc, curr) => acc + curr, 0).toFixed(2)}
        </Text>
      </View>

      {/* Declaração */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12 – DECLARAÇÃO DO PROPONENTE</Text>
        <Field label="Local e Data" value={data.declaracao.localData} />
        <Field label="Assinatura" value={data.declaracao.assinatura ? "Assinado digitalmente" : "Não assinado"} />
      </View>

      {/* Referências da IA, se houver */}
      {references.length > 0 && <References references={references} generationId={generationId} />}

      <View style={styles.footer}>
        <Text>Documento gerado em {new Date().toLocaleString("pt-BR")}</Text>
        <Text>Sistema de Gerenciamento de Recursos Hídricos - SIGRH</Text>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </Page>
  </Document>
)

// Componente para visualização do PDF
export const PDFPreview = ({
  data,
  references,
  generationId,
}: {
  data: FormValues
  references: Reference[]
  generationId: string
}) => (
  <PDFViewer style={{ width: "100%", height: "70vh" }}>
    <FormularioPDF data={data} references={references} generationId={generationId} />
  </PDFViewer>
)

// Componente para download do PDF
export const PDFDownload = ({
  data,
  references,
  generationId,
  fileName = "formulario-sigrh.pdf",
  children,
}: {
  data: FormValues
  references: Reference[]
  generationId: string
  fileName?: string
  children: React.ReactNode
}) => (
  <PDFDownloadLink
    document={<FormularioPDF data={data} references={references} generationId={generationId} />}
    fileName={fileName}
  >
    {({ loading }) => (loading ? "Gerando PDF..." : children)}
  </PDFDownloadLink>
)
