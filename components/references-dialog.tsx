"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, FileText, Info } from "lucide-react"
import type { Reference } from "@/lib/ai-service"

interface ReferencesDialogProps {
  references: Reference[]
  generationId: string
}

export function ReferencesDialog({ references, generationId }: ReferencesDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          <span>Ver Referências</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Referências Utilizadas</DialogTitle>
          <DialogDescription>Fontes utilizadas pela IA para gerar o conteúdo do formulário.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              <span>ID da Geração: {generationId}</span>
            </div>
            <p>
              Este conteúdo foi gerado automaticamente com base nas seguintes fontes. Recomendamos verificar e adaptar
              as informações conforme necessário.
            </p>
          </div>

          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-4">
              {references.map((reference, index) => (
                <div
                  key={index}
                  className={`border-b pb-3 last:border-0 ${reference.title.startsWith("Documento: ") ? "bg-blue-50 p-3 rounded-md" : ""}`}
                >
                  <h3 className="font-medium flex items-center gap-2">
                    {reference.title.startsWith("Documento: ") && <FileText className="h-4 w-4 text-blue-500" />}
                    {reference.title}
                    {reference.title.startsWith("Documento: ") && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">PDF Importado</span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{reference.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">
                      Data: {new Date(reference.date).toLocaleDateString("pt-BR")}
                    </span>
                    {reference.url !== "#" ? (
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#006400] hover:underline"
                      >
                        Acessar <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-blue-600">Documento local</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
