"use client"

import Image from "next/image"
import { Facebook, Instagram, Linkedin, MessageSquare, Twitter } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SOCIAL_LINKS } from "@/config/social-links"

// Componente para ícone de rede social com tooltip
function SocialIcon({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#006400] transition-colors duration-200"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t py-10 mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src="/images/logo-mp2ia.png"
              alt="MP2 IA Logo"
              width={160}
              height={64}
              className="h-14 w-auto mb-5"
            />
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold">Gil Ferreira</p>
              <p>Presidente da Fundação Primeira Potência</p>
              <p>
                E-mail:{" "}
                <a href="mailto:gilbv@potenciapiaui.com" className="text-[#006400] hover:underline">
                  gilbv@potenciapiaui.com
                </a>
              </p>

              <div className="flex space-x-3 mt-2">
                <SocialIcon href={SOCIAL_LINKS.gil.whatsapp} icon={MessageSquare} label="WhatsApp Gil BV" />
                <SocialIcon href={SOCIAL_LINKS.gil.instagram} icon={Instagram} label="Instagram Gil BV" />
                <SocialIcon href={SOCIAL_LINKS.gil.facebook} icon={Facebook} label="Facebook Gil BV" />
                <SocialIcon href={SOCIAL_LINKS.gil.linkedin} icon={Linkedin} label="LinkedIn Gil BV" />
                <SocialIcon href={SOCIAL_LINKS.gil.twitter} icon={Twitter} label="X (Twitter) Gil BV" />
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <h3 className="font-semibold mb-2">Fundação Primeira Potência</h3>
            <div className="space-y-1">
              <p>CNPJ: 29.969.683/0001-71</p>
              <p>Sede: Rua Doutor Mário Teodomiro Carvalho, 150, Planalto Ininga, Teresina - PI</p>
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
                <div className="flex space-x-3">
                  <SocialIcon href={SOCIAL_LINKS.fundacao.instagram} icon={Instagram} label="Instagram da Fundação" />
                  <SocialIcon href={SOCIAL_LINKS.fundacao.facebook} icon={Facebook} label="Facebook da Fundação" />
                  <SocialIcon href={SOCIAL_LINKS.fundacao.linkedin} icon={Linkedin} label="LinkedIn da Fundação" />
                  <SocialIcon href={SOCIAL_LINKS.fundacao.twitter} icon={Twitter} label="X (Twitter) da Fundação" />
                  <SocialIcon href={SOCIAL_LINKS.fundacao.whatsapp} icon={MessageSquare} label="WhatsApp da Fundação" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fundação Primeira Potência. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
