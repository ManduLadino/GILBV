"use client"

import type React from "react"

import Image from "next/image"
import { Facebook, Instagram, Linkedin, MessageSquare, Twitter, ChevronDown, ChevronUp } from "lucide-react"
import { SOCIAL_LINKS } from "@/config/social-links"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Componente para ícone de rede social (sem usar Tooltip que pode estar causando o erro)
function SocialIcon({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-[#006400] transition-colors duration-200 p-1.5"
      aria-label={label}
      title={label}
    >
      <Icon size={20} />
    </a>
  )
}

// Componente para seção colapsável em dispositivos móveis
function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b md:border-none pb-2 md:pb-0">
      <button
        className="flex items-center justify-between w-full py-2 md:py-0 md:pointer-events-none"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <h3 className="font-semibold text-base">{title}</h3>
        <span className="md:hidden">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:h-auto md:opacity-100",
          isOpen ? "h-auto opacity-100 mt-2" : "h-0 opacity-0 md:h-auto md:opacity-100",
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t py-6 md:py-10 mt-8 md:mt-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Logo centralizado em dispositivos móveis */}
        <div className="md:hidden flex justify-center mb-6">
          <Image
            src="/images/logo-mp2ia.png"
            alt="MP2 IA Logo"
            width={160}
            height={64}
            className="h-auto w-40"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Coluna 1: Logo e Gil Ferreira */}
          <div className="space-y-4">
            {/* Logo visível apenas em desktop */}
            <div className="hidden md:block">
              <Image
                src="/images/logo-mp2ia.png"
                alt="MP2 IA Logo"
                width={180}
                height={72}
                className="h-auto w-40 mb-5"
                style={{ objectFit: "contain" }}
              />
            </div>

            <CollapsibleSection title="Gil Ferreira">
              <div className="text-sm text-gray-600 space-y-1 mt-2">
                <p>Presidente da Fundação Primeira Potência</p>
                <p>
                  E-mail:{" "}
                  <a href="mailto:gilbv@potenciapiaui.com" className="text-[#006400] hover:underline">
                    gilbv@potenciapiaui.com
                  </a>
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  <SocialIcon href={SOCIAL_LINKS.gil.whatsapp} icon={MessageSquare} label="WhatsApp Gil BV" />
                  <SocialIcon href={SOCIAL_LINKS.gil.instagram} icon={Instagram} label="Instagram Gil BV" />
                  <SocialIcon href={SOCIAL_LINKS.gil.facebook} icon={Facebook} label="Facebook Gil BV" />
                  <SocialIcon href={SOCIAL_LINKS.gil.linkedin} icon={Linkedin} label="LinkedIn Gil BV" />
                  <SocialIcon href={SOCIAL_LINKS.gil.twitter} icon={Twitter} label="X (Twitter) Gil BV" />
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Coluna 2: Fundação Primeira Potência */}
          <div className="space-y-4">
            <CollapsibleSection title="Fundação Primeira Potência">
              <div className="text-sm text-gray-600 space-y-1 mt-2">
                <p>CNPJ: 29.969.683/0001-71</p>
                <p className="break-words">
                  Sede: Rua Doutor Mário Teodomiro Carvalho, 150, Planalto Ininga, Teresina - PI
                </p>
                <p>A Fundação está registrada no Mapa do IPEA</p>

                <p className="mt-4">
                  <span className="inline-block mr-2">⚡</span>
                  <a
                    href={SOCIAL_LINKS.fundacao.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#006400] hover:underline"
                  >
                    Visite nosso site: www.potenciapiaui.com
                  </a>
                </p>

                <div className="mt-2">
                  <p className="mb-1">Redes da Fundação:</p>
                  <div className="flex flex-wrap gap-1">
                    <SocialIcon href={SOCIAL_LINKS.fundacao.instagram} icon={Instagram} label="Instagram da Fundação" />
                    <SocialIcon href={SOCIAL_LINKS.fundacao.facebook} icon={Facebook} label="Facebook da Fundação" />
                    <SocialIcon href={SOCIAL_LINKS.fundacao.linkedin} icon={Linkedin} label="LinkedIn da Fundação" />
                    <SocialIcon href={SOCIAL_LINKS.fundacao.twitter} icon={Twitter} label="X (Twitter) da Fundação" />
                    <SocialIcon
                      href={SOCIAL_LINKS.fundacao.whatsapp}
                      icon={MessageSquare}
                      label="WhatsApp da Fundação"
                    />
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Coluna 3: Mandu Ladino (Parceiro) */}
          <div className="space-y-4">
            <CollapsibleSection title="Parceiro: Mandu Ladino">
              <div className="text-sm text-gray-600 space-y-1 mt-2">
                <p>Consultoria em Projetos e Inovação</p>
                <p>CNPJ: 12.345.678/0001-90</p>
                <p className="break-words">Endereço: Av. Frei Serafim, 2280, Centro, Teresina - PI</p>
                <p>
                  E-mail:{" "}
                  <a href="mailto:contato@manduladino.com.br" className="text-[#006400] hover:underline break-words">
                    contato@manduladino.com.br
                  </a>
                </p>
                <p>
                  Telefone:{" "}
                  <a href="tel:+558632230000" className="text-[#006400] hover:underline">
                    (86) 3223-0000
                  </a>
                </p>

                <div className="mt-2">
                  <p className="mb-1">Redes Sociais:</p>
                  <div className="flex flex-wrap gap-1">
                    <SocialIcon
                      href="https://www.instagram.com/manduladino/"
                      icon={Instagram}
                      label="Instagram Mandu Ladino"
                    />
                    <SocialIcon
                      href="https://www.facebook.com/manduladino/"
                      icon={Facebook}
                      label="Facebook Mandu Ladino"
                    />
                    <SocialIcon
                      href="https://www.linkedin.com/company/manduladino/"
                      icon={Linkedin}
                      label="LinkedIn Mandu Ladino"
                    />
                    <SocialIcon href="https://wa.me/5586999999999" icon={MessageSquare} label="WhatsApp Mandu Ladino" />
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fundação Primeira Potência. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
