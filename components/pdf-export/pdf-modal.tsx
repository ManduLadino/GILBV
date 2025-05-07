"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PDFPreview, PDFDownload } from "@/components/pdf-export/pdf-document"
import type { FormValues } from "@/lib/schema"
import type { Reference } from "@/lib/ai-service"
import { Download, FileText, Loader2 } from "lucide-react"

interface PDFModalProps {
  formData: FormValues
  references: Reference[]
  generationId: string
  trigger?: React.ReactNode
}

export function PDFModal({ formData, references, generationId, trigger }: PDFModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = () => {
    setIsLoading(true)
    setOpen(true)
    // Simular tempo de carregamento para renderização do PDF
    setTimeout(() => setIsLoading(false), 1000)
  }

  const fileName = `formulario-sigrh-${formData.dadosGerais.nome?.replace(/\s+/g, "-").toLowerCase() || "projeto"}.pdf`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={handleOpen}>
        {trigger || (
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-[900px] max-h-[90vh] h-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Visualização do PDF</DialogTitle>
          <DialogDescription>
            Visualize o formulário em formato PDF antes de baixá-lo. Você pode baixar o arquivo clicando no botão
            abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#006400]" />
                <p>Gerando visualização do PDF...</p>
              </div>
            </div>
          ) : (
            <PDFPreview data={formData} references={references} generationId={generationId} />
          )}
        </div>

        <DialogFooter>
          <PDFDownload data={formData} references={references} generationId={generationId} fileName={fileName}>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
          </PDFDownload>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
