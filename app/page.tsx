"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formSchema } from "@/lib/schema"
import { toast } from "@/components/ui/use-toast"
import { Footer } from "@/components/footer"
import { AlertCircle, FileText, Trash2, Bot, BookOpen, Download, Globe, Database } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReferencesDialog } from "@/components/references-dialog"
import { generateProjectContent, type Reference } from "@/lib/ai-service"
import { PDFModal } from "@/components/pdf-export/pdf-modal"
import {
  DadosGerais,
  ResponsavelLegal,
  ResponsavelTecnico,
  OutrosParticipes,
  DescricaoRealidade,
  SintesePropostas,
  CapacidadeInstalada,
  Sustentabilidade,
  CronogramaFisico,
  RecursosFinanceiros,
  CronogramaDesembolso,
  Declaracao,
} from "@/components/formulario"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Substituir a função FormularioSIGRH por esta versão atualizada
export default function FormularioSIGRH() {
  const [activeTab, setActiveTab] = useState("dados-gerais")
  const [isLoading, setIsLoading] = useState(false)
  const [aiReferences, setAiReferences] = useState<Reference[]>([])
  const [generationId, setGenerationId] = useState<string>("")
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [projectType, setProjectType] = useState<string>("ambiental")
  const [projectTopic, setProjectTopic] = useState<string>("")

  // Valores em branco para o formulário
  const emptyValues = {
    dadosGerais: {
      nome: "",
      cnpj: "",
      endereco: "",
      bairro: "",
      cep: "",
      telefones: "",
      email: "",
      cidade: "",
      uf: "",
    },
    responsavelLegal: {
      nome: "",
      cpf: "",
      rg: "",
      cargo: "",
      endereco: "",
      cep: "",
      bairro: "",
      telefones: "",
      email: "",
      cidade: "",
      uf: "",
    },
    responsavelTecnico: {
      nome: "",
      areaFormacao: "",
      registroConselho: "",
      endereco: "",
      cep: "",
      bairro: "",
      telefone: "",
      email: "",
      cidade: "",
      uf: "",
    },
    outrosParticipes: {
      nome: "",
      cgcCpf: "",
      endereco: "",
      cep: "",
    },
    descricaoRealidade: {
      historicoOrganizacao: "",
      projetosAnteriores: "",
      parceriasExistentes: "",
      informacoesConvenios: "",
    },
    sintesePropostas: {
      areaConcorrencia: "",
      titulo: "",
      objeto: "",
      justificativa: "",
      abrangencia: "",
      publicoBeneficiario: "",
      metaAtendimento: "",
      periodoInicio: "",
      periodoTermino: "",
      metodologia: "",
    },
    capacidadeInstalada: {
      equipe: [],
      estruturaFisica: "propria",
      instalacoesFisicas: [],
      equipamentosDisponiveis: [],
    },
    sustentabilidade: {
      descricao: "",
    },
    cronogramaFisico: {
      metas: [],
    },
    recursosFinanceiros: {
      pessoal: 0,
      diarias: 0,
      materialConsumo: 0,
      premiacoes: 0,
      passagens: 0,
      consultorias: 0,
      servicosTerceirosPF: 0,
      servicosTerceirosPJ: 0,
      obrigacoesTributarias: 0,
      equipamentosMaterial: 0,
    },
    cronogramaDesembolso: {
      meses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    declaracao: {
      localData: "",
      assinatura: false,
    },
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: emptyValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Formulário enviado com sucesso!",
      description: "Os dados foram enviados para processamento.",
    })
  }

  const tabs = [
    { id: "dados-gerais", label: "1. Dados Gerais" },
    { id: "responsavel-legal", label: "2. Responsável Legal" },
    { id: "responsavel-tecnico", label: "3. Responsável Técnico" },
    { id: "outros-participes", label: "4. Outros Partícipes" },
    { id: "descricao-realidade", label: "5. Descrição da Realidade" },
    { id: "sintese-propostas", label: "6. Síntese da Proposta" },
    { id: "capacidade-instalada", label: "7. Capacidade Instalada" },
    { id: "sustentabilidade", label: "8. Sustentabilidade" },
    { id: "cronograma-fisico", label: "9. Cronograma Físico" },
    { id: "recursos-financeiros", label: "10. Recursos Financeiros" },
    { id: "cronograma-desembolso", label: "11. Cronograma de Desembolso" },
    { id: "declaracao", label: "12. Declaração" },
  ]

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  const handleFormFill = (data: Partial<z.infer<typeof formSchema>>, references: Reference[], id: string) => {
    // Preenche o formulário com os dados fornecidos pela IA
    const currentValues = form.getValues()

    // Combina os valores atuais com os novos dados
    const newValues = {
      ...currentValues,
      ...data,
      // Garantimos que arrays importantes como equipe, metas, etc. sejam preservados
      capacidadeInstalada: {
        ...currentValues.capacidadeInstalada,
        ...data.capacidadeInstalada,
      },
      cronogramaFisico: {
        ...currentValues.cronogramaFisico,
        ...data.cronogramaFisico,
      },
    }

    // Atualiza o formulário
    Object.entries(newValues).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        form.setValue(key as any, value)
      }
    })

    // Salva as referências e o ID da geração
    setAiReferences(references)
    setGenerationId(id)

    toast({
      title: "Formulário preenchido pela IA!",
      description: "Os campos foram preenchidos com base nas informações encontradas.",
    })
  }

  // Função para limpar o formulário
  const handleClearForm = () => {
    setIsLoading(true)

    // Resetar todos os campos para valores vazios
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key as any, (emptyValues as any)[key])
    })

    // Limpar referências
    setAiReferences([])
    setGenerationId("")

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Formulário limpo",
        description: "Todos os campos foram limpos. Você pode começar a preencher do zero.",
      })
    }, 500)
  }

  // Função para preencher o formulário com dados de exemplo
  const handleFillFormWithAI = async () => {
    setIsLoading(true)
    setIsAIDialogOpen(false)

    try {
      // Gerar conteúdo usando a API de IA com o tipo de projeto e assunto especificados
      const result = await generateProjectContent(projectType as any, projectTopic)

      // Preencher o formulário com os dados gerados
      Object.keys(result.content).forEach((key) => {
        form.setValue(key as any, (result.content as any)[key])
      })

      // Salvar referências e ID da geração
      setAiReferences(result.references)
      setGenerationId(result.generationId)

      toast({
        title: "Formulário preenchido pela IA",
        description: "Os campos foram preenchidos automaticamente com base em dados relevantes e fontes externas.",
      })
    } catch (error) {
      toast({
        title: "Erro ao preencher formulário",
        description: "Ocorreu um erro ao gerar o conteúdo. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader className="bg-[#006400] text-white">
          <CardTitle className="text-2xl text-center">Formulário de Proposta de Projeto - SIGRH</CardTitle>
          <CardDescription className="text-gray-100 text-center">
            Preencha todos os campos para submeter sua proposta
          </CardDescription>
        </CardHeader>

        {/* Adicionar os botões de ação no topo */}
        <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-[#006400]" />
            <span className="font-medium">Gerenciar Formulário</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Botão de exportar PDF */}
            <PDFModal
              formData={form.getValues()}
              references={aiReferences}
              generationId={generationId}
              trigger={
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar PDF
                </Button>
              }
            />

            {aiReferences.length > 0 && <ReferencesDialog references={aiReferences} generationId={generationId} />}

            <Button
              variant="outline"
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleClearForm}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
              Limpar Formulário
            </Button>

            {/* Dialog para preenchimento com IA */}
            <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-[#006400] hover:bg-[#008800]" disabled={isLoading}>
                  <Bot className="h-4 w-4" />
                  Preencher com IA
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Preencher Formulário com IA</DialogTitle>
                  <DialogDescription>
                    Especifique o tipo de projeto e o assunto para que a IA possa gerar um conteúdo mais relevante.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectType" className="text-right">
                      Tipo
                    </Label>
                    <Select value={projectType} onValueChange={setProjectType} defaultValue="ambiental">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo de projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambiental">Ambiental</SelectItem>
                        <SelectItem value="educacional">Educacional</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="esporte">Esporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectTopic" className="text-right">
                      Assunto
                    </Label>
                    <Input
                      id="projectTopic"
                      placeholder="Ex: Conservação de nascentes"
                      className="col-span-3"
                      value={projectTopic}
                      onChange={(e) => setProjectTopic(e.target.value)}
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <Globe className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">
                        A IA consultará fontes externas e bases de dados oficiais para gerar o conteúdo mais relevante e
                        atualizado para o seu projeto.
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Integração com Copilot e outras ferramentas de IA para enriquecer as informações do seu
                        formulário.
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAIDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleFillFormWithAI}
                    className="bg-[#006400] hover:bg-[#008800]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <AlertCircle className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Database className="mr-2 h-4 w-4" />
                        Gerar Conteúdo
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading && (
          <div className="p-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Processando</AlertTitle>
              <AlertDescription>Aguarde enquanto processamos sua solicitação...</AlertDescription>
            </Alert>
          </div>
        )}

        {aiReferences.length > 0 && (
          <div className="p-4 bg-blue-50">
            <Alert variant="default" className="bg-blue-50 border-blue-200">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <AlertTitle className="text-blue-700">Conteúdo gerado por IA</AlertTitle>
              <AlertDescription className="text-blue-600">
                Este formulário contém conteúdo gerado automaticamente. Verifique as informações e ajuste conforme
                necessário.
                <Button
                  variant="link"
                  className="text-blue-700 p-0 h-auto font-normal"
                  onClick={() =>
                    document
                      .querySelector('[aria-label="Ver Referências"]')
                      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                  }
                >
                  Ver referências utilizadas.
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} className="text-xs md:text-sm">
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="dados-gerais">
                  <DadosGerais form={form} />
                </TabsContent>

                <TabsContent value="responsavel-legal">
                  <ResponsavelLegal form={form} />
                </TabsContent>

                <TabsContent value="responsavel-tecnico">
                  <ResponsavelTecnico form={form} />
                </TabsContent>

                <TabsContent value="outros-participes">
                  <OutrosParticipes form={form} />
                </TabsContent>

                <TabsContent value="descricao-realidade">
                  <DescricaoRealidade form={form} />
                </TabsContent>

                <TabsContent value="sintese-propostas">
                  <SintesePropostas form={form} />
                </TabsContent>

                <TabsContent value="capacidade-instalada">
                  <CapacidadeInstalada form={form} />
                </TabsContent>

                <TabsContent value="sustentabilidade">
                  <Sustentabilidade form={form} />
                </TabsContent>

                <TabsContent value="cronograma-fisico">
                  <CronogramaFisico form={form} />
                </TabsContent>

                <TabsContent value="recursos-financeiros">
                  <RecursosFinanceiros form={form} />
                </TabsContent>

                <TabsContent value="cronograma-desembolso">
                  <CronogramaDesembolso form={form} />
                </TabsContent>

                <TabsContent value="declaracao">
                  <Declaracao form={form} />
                </TabsContent>
              </Tabs>

              <CardFooter className="flex justify-between px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={activeTab === "dados-gerais"}
                >
                  Anterior
                </Button>

                {activeTab === "declaracao" ? (
                  <Button type="submit">Enviar Proposta</Button>
                ) : (
                  <Button type="button" onClick={handleNext}>
                    Próximo
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* Componente do Rodapé com IA */}
      <Footer onFillForm={handleFormFill} />
    </div>
  )
}
