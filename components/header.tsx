"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
  const [isMobile, setIsMobile] = useState(false)

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <header className="bg-white border-b py-2 md:py-3 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-mp2ia.png"
            alt="MP2 IA Logo"
            width={200}
            height={80}
            className={`h-auto ${isMobile ? "w-36" : "w-48"}`}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Espaço para futuros elementos de navegação */}
        <div className="flex items-center">{/* Placeholder para menu mobile */}</div>
      </div>
    </header>
  )
}
