"use client"

import type React from "react"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UseFormReturn } from "react-hook-form"
import type { FormValues } from "@/lib/schema"

// Componente genérico para seções do formulário
export function FormSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}

// Componente DadosGerais
export function DadosGerais({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Dados Gerais do Proponente">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="dadosGerais.nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Instituição</FormLabel>
              <FormControl>
                <Input placeholder="Nome da instituição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dadosGerais.cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000/0000-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dadosGerais.endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dadosGerais.bairro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dadosGerais.cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dadosGerais.telefones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefones</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dadosGerais.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dadosGerais.cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dadosGerais.uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UF</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormSection>
  )
}

// Componente ResponsavelLegal
export function ResponsavelLegal({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Identificação do Responsável Legal do Proponente">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="responsavelLegal.nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="000.000.000-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.rg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl>
                <Input placeholder="0000000 SSP/UF" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.cargo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <FormControl>
                <Input placeholder="Cargo ou função" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.bairro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.telefones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefones</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelLegal.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="responsavelLegal.cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsavelLegal.uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UF</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormSection>
  )
}

// Componente ResponsavelTecnico
export function ResponsavelTecnico({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Identificação do Responsável Técnico pelo Projeto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="responsavelTecnico.nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.areaFormacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área de Formação</FormLabel>
              <FormControl>
                <Input placeholder="Área de formação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.registroConselho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registro no Conselho</FormLabel>
              <FormControl>
                <Input placeholder="Número de registro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.bairro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsavelTecnico.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="responsavelTecnico.cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsavelTecnico.uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UF</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormSection>
  )
}

// Componente OutrosParticipes
export function OutrosParticipes({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Outros Partícipes">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="outrosParticipes.nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da instituição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outrosParticipes.cgcCpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CGC/CPF</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000/0000-00 ou 000.000.000-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outrosParticipes.endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outrosParticipes.cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}

// Componente DescricaoRealidade
export function DescricaoRealidade({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Descrição da Realidade">
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="descricaoRealidade.historicoOrganizacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Histórico da Organização</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o histórico da organização" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricaoRealidade.projetosAnteriores"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projetos Anteriores</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os projetos anteriores realizados pela organização"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricaoRealidade.parceriasExistentes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parcerias Existentes</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva as parcerias existentes" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricaoRealidade.informacoesConvenios"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações sobre Convênios</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Informe detalhes sobre convênios anteriores"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}

// Componente SintesePropostas
export function SintesePropostas({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Síntese da Proposta">
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="sintesePropostas.areaConcorrencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área a que concorre</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area1">Área 1 - Gestão de Recursos Hídricos</SelectItem>
                    <SelectItem value="area2">Área 2 - Conservação de Mananciais</SelectItem>
                    <SelectItem value="area3">Área 3 - Educação Ambiental</SelectItem>
                    <SelectItem value="area4">Área 4 - Saneamento Básico</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sintesePropostas.titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título da Proposta</FormLabel>
              <FormControl>
                <Input placeholder="Título da proposta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sintesePropostas.objeto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificação do Objeto</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o objeto da proposta" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sintesePropostas.justificativa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justificativa da Proposta</FormLabel>
              <FormControl>
                <Textarea placeholder="Apresente a justificativa da proposta" className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="sintesePropostas.abrangencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abrangência da proposta</FormLabel>
                <FormControl>
                  <Input placeholder="Área de abrangência" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sintesePropostas.publicoBeneficiario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Público Beneficiário</FormLabel>
                <FormControl>
                  <Input placeholder="Público beneficiário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sintesePropostas.metaAtendimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta de Atendimento</FormLabel>
                <FormControl>
                  <Input placeholder="Meta de atendimento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sintesePropostas.periodoInicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período de Início</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sintesePropostas.periodoTermino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período de Término</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="sintesePropostas.metodologia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metodologia e Abordagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva a metodologia e abordagem do projeto"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}

// Componente CapacidadeInstalada (simplificado)
export function CapacidadeInstalada({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Capacidade Instalada">
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="capacidadeInstalada.estruturaFisica"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estrutura Física</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de estrutura" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="propria">Própria</SelectItem>
                    <SelectItem value="alugada">Alugada</SelectItem>
                    <SelectItem value="cedida">Cedida</SelectItem>
                    <SelectItem value="compartilhada">Compartilhada</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Equipe do Projeto</FormLabel>
          <FormDescription>Informações simplificadas sobre a equipe</FormDescription>
          <Input placeholder="Número de profissionais na equipe" disabled />
        </FormItem>
        <FormItem>
          <FormLabel>Instalações Físicas</FormLabel>
          <FormDescription>Informações simplificadas sobre as instalações</FormDescription>
          <Input placeholder="Número de instalações disponíveis" disabled />
        </FormItem>
        <FormItem>
          <FormLabel>Equipamentos Disponíveis</FormLabel>
          <FormDescription>Informações simplificadas sobre os equipamentos</FormDescription>
          <Input placeholder="Número de equipamentos disponíveis" disabled />
        </FormItem>
      </div>
    </FormSection>
  )
}

// Componente Sustentabilidade
export function Sustentabilidade({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Sustentabilidade da Proposta">
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="sustentabilidade.descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição da Sustentabilidade</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva como o projeto será sustentável após o término do financiamento"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}

// Componente CronogramaFisico (simplificado)
export function CronogramaFisico({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Cronograma Físico de Execução do Objeto">
      <div className="grid grid-cols-1 gap-6">
        <FormItem>
          <FormLabel>Metas do Projeto</FormLabel>
          <FormDescription>Informações simplificadas sobre as metas</FormDescription>
          <Input placeholder="Número de metas do projeto" disabled />
        </FormItem>
        <FormItem>
          <FormDescription>Para adicionar metas detalhadas, use a interface completa do sistema SIGRH.</FormDescription>
        </FormItem>
      </div>
    </FormSection>
  )
}

// Componente RecursosFinanceiros
export function RecursosFinanceiros({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Detalhamento da Aplicação dos Recursos Financeiros">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="recursosFinanceiros.pessoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pessoal</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.diarias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diárias</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.materialConsumo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material de Consumo</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.premiacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Premiações</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.passagens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passagens</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.consultorias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consultorias</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.servicosTerceirosPF"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviços de Terceiros - Pessoa Física</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.servicosTerceirosPJ"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviços de Terceiros - Pessoa Jurídica</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.obrigacoesTributarias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Obrigações Tributárias</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recursosFinanceiros.equipamentosMaterial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipamentos e Material Permanente</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}

// Componente CronogramaDesembolso (simplificado)
export function CronogramaDesembolso({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Cronograma de Desembolso">
      <div className="grid grid-cols-1 gap-6">
        <FormItem>
          <FormLabel>Valores Mensais</FormLabel>
          <FormDescription>Informações simplificadas sobre o cronograma de desembolso</FormDescription>
          <Input placeholder="Total do cronograma de desembolso" disabled />
        </FormItem>
        <FormItem>
          <FormDescription>
            Para adicionar valores detalhados por mês, use a interface completa do sistema SIGRH.
          </FormDescription>
        </FormItem>
      </div>
    </FormSection>
  )
}

// E remova todo o código do componente Declaracao que estava neste arquivo
// (desde "// Componente Declaracao" até o final da função)

// Componente Declaracao

// Remova o componente Declaracao inteiro (a função completa) e mantenha a exportação no final do arquivo:

export { Declaracao } from "./declaracao"
