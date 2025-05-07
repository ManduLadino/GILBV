"use client"

import type React from "react"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UseFormReturn } from "react-hook-form"
import type { FormValues } from "@/lib/schema"

// Componente genérico para seções do formulário
function FormSection({
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

// Componente Declaracao
export function Declaracao({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormSection title="Declaração do Proponente">
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="declaracao.localData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local e Data</FormLabel>
              <FormControl>
                <Input placeholder="Cidade, DD de Mês de AAAA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declaracao.assinatura"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Assinatura Digital</FormLabel>
                <FormDescription>
                  Declaro para fins de prova junto ao Sistema de Gerenciamento de Recursos Hídricos que as informações
                  descritas neste documento são verdadeiras.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}
