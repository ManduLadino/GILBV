"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Upload, Minimize2, Maximize2, X, FileText, Search, Loader2, Globe } from "lucide-react"
import type { FormValues } from "@/lib/schema"
import { processDocument, searchSimilarProjects, type Reference } from "@/lib/ai-service"

interface FooterProps {
  onFillForm: (data: Partial<FormValues>, references: Reference[], generationId: string) => void
}

export function Footer({ onFillForm }: FooterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<{ type: "user" | "bot"; content: string }[]>([
    {
      type: "bot",
      content: "Olá! Sou PIA, sua assistente virtual para preenchimento do formulário SIGRH. Como posso ajudar?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [processingResult, setProcessingResult] = useState<{
    references: Reference[]
    generationId: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isConnectedToInternet, setIsConnectedToInternet] = useState(true)

  // Scroll para o final das mensagens quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Simular verificação de conexão com a internet
  useEffect(() => {
    const checkConnection = () => {
      setIsConnectedToInternet(navigator.onLine)
    }

    window.addEventListener("online", checkConnection)
    window.addEventListener("offline", checkConnection)

    return () => {
      window.removeEventListener("online", checkConnection)
      window.removeEventListener("offline", checkConnection)
    }
  }, [])

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMessage.trim()) return

    // Adiciona a mensagem do usuário
    setMessages([...messages, { type: "user", content: inputMessage }])

    // Simula resposta da IA (em um caso real, aqui seria feita uma chamada a uma API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Estou analisando sua solicitação. Para preencher o formulário automaticamente, você pode enviar um documento, usar a barra de pesquisa para encontrar projetos similares, ou me informar o assunto do seu projeto.",
        },
      ])
    }, 1000)

    setInputMessage("")
  }

  // Atualizar a função handleFileUpload para melhorar o processamento de PDFs
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedFile(file)

    // Adiciona mensagem sobre o upload
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: `Arquivo enviado: ${file.name}`,
      },
    ])

    try {
      // Verifica se é um PDF
      const isPDF = file.type === "application/pdf"

      // Mensagem específica para PDFs
      if (isPDF) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: `Arquivo PDF "${file.name}" recebido. Estou extraindo o texto e analisando o conteúdo para preencher o formulário com alta precisão...`,
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: `Arquivo "${file.name}" recebido. Estou analisando o conteúdo para preencher o formulário...`,
          },
        ])
      }

      // Processa o documento usando a API de IA
      const result = await processDocument(file)
      setProcessingResult({
        references: result.references,
        generationId: result.generationId,
      })

      // Mensagem específica para PDFs
      if (isPDF) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Análise do PDF concluída! Extraí informações detalhadas do documento e identifiquei dados relevantes para o formulário. O PDF foi adicionado como referência principal para o preenchimento automático. Deseja que eu preencha o formulário agora?",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Análise concluída! Encontrei informações relevantes que podem preencher vários campos do formulário. Deseja que eu preencha automaticamente?",
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Ocorreu um erro ao processar o documento. Por favor, tente novamente.",
        },
      ])
    } finally {
      setIsUploading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)
    setMessages([...messages, { type: "user", content: `Pesquisando: ${searchQuery}` }])

    try {
      // Busca projetos similares usando a API de IA
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Buscando projetos similares a "${searchQuery}" na internet e bases de dados do SIGRH...`,
        },
      ])

      const result = await searchSimilarProjects(searchQuery)
      setProcessingResult({
        references: result.references,
        generationId: result.generationId,
      })

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Encontrei informações relevantes sobre "${searchQuery}" no banco de dados do SIGRH e em fontes externas. Posso usar essas informações para preencher o formulário automaticamente.`,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Ocorreu um erro ao buscar projetos similares. Por favor, tente novamente.",
        },
      ])
    } finally {
      setIsSearching(false)
    }
  }

  // Atualizar a função handleAutofill para melhorar a precisão
  const handleAutofill = async () => {
    if (!processingResult) return

    setIsProcessing(true)

    try {
      // Em um caso real, os dados viriam da análise do documento ou da busca
      const result = await processDocument(uploadedFile || new File([], "dummy"))

      // Adicionar mensagem sobre a precisão do preenchimento
      const isPDF = uploadedFile?.type === "application/pdf"

      if (isPDF) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Analisando o PDF em profundidade para garantir máxima precisão no preenchimento...",
          },
        ])

        // Simular um processamento mais detalhado para PDFs
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      onFillForm(result.content, processingResult.references, processingResult.generationId)

      if (isPDF) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Formulário preenchido com alta precisão baseado no PDF fornecido! Todos os campos foram preenchidos com dados extraídos diretamente do documento. O PDF foi adicionado como referência principal e pode ser consultado clicando no botão 'Ver Referências' no topo do formulário.",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Formulário preenchido com as informações encontradas! Verifique os dados e complete os campos que faltam. Você pode consultar as referências utilizadas clicando no botão 'Ver Referências' no topo do formulário.",
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Ocorreu um erro ao preencher o formulário. Por favor, tente novamente.",
        },
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      {/* Botão flutuante da IA sempre visível */}
      <Button
        onClick={handleToggleChat}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 bg-[#006400] hover:bg-[#008800] shadow-lg z-50"
      >
        <Bot size={24} />
      </Button>

      {/* Janela de chat da IA */}
      {isOpen && (
        <Card
          className={`fixed right-4 shadow-lg z-40 transition-all duration-300 ease-in-out ${
            isMinimized ? "bottom-20 w-60 h-12" : "bottom-20 w-80 md:w-96 h-[500px] max-h-[calc(100vh-120px)]"
          }`}
        >
          <div className="bg-[#006400] text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <Bot size={20} className="mr-2" />
              <span>PIA - Assistente SIGRH</span>
              {isConnectedToInternet && (
                <div className="flex items-center ml-2 text-xs bg-green-700 px-1.5 py-0.5 rounded-full">
                  <Globe size={10} className="mr-1" />
                  <span>Online</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={handleMinimize}>
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button onClick={handleToggleChat}>
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(100%-48px)]">
              {/* Área de pesquisa */}
              <div className="p-2 border-b">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Pesquisar projetos ou assunto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm"
                    disabled={isSearching}
                  />
                  <Button type="submit" size="sm" className="bg-[#006400] hover:bg-[#008800]" disabled={isSearching}>
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search size={16} />}
                  </Button>
                </form>
              </div>

              {/* Área de mensagens */}
              <div className="flex-1 overflow-auto p-4 space-y-4" style={{ maxHeight: "calc(100% - 160px)" }}>
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.type === "user" ? "bg-[#E1F5E1] text-gray-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {uploadedFile && (
                  <div className="flex justify-center my-2">
                    <div className="bg-gray-100 rounded-lg p-2 flex items-center">
                      <FileText size={16} className="mr-2 text-[#006400]" />
                      <span className="text-sm truncate max-w-[180px]">{uploadedFile.name}</span>
                    </div>
                  </div>
                )}

                {processingResult && (
                  <div className="flex justify-center my-2">
                    <Button
                      size="sm"
                      className="bg-[#006400] hover:bg-[#008800]"
                      onClick={handleAutofill}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Preenchendo...
                        </>
                      ) : (
                        "Preencher Formulário"
                      )}
                    </Button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Controles de upload */}
              <div className="p-2 border-t">
                <div className="flex justify-center mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#006400] border-[#006400]"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload size={16} className="mr-2" />
                        Enviar PDF/Documento
                      </>
                    )}
                  </Button>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                </div>

                {/* Área de entrada de mensagem */}
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Pergunte algo sobre o formulário..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <Button type="submit" className="bg-[#006400] hover:bg-[#008800]">
                    Enviar
                  </Button>
                </form>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
