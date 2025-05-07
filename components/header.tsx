"use client"

import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white border-b py-3">
      <div className="container mx-auto flex items-center px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-mp2ia.png"
            alt="MP2 IA Logo"
            width={180}
            height={72}
            className="h-16 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  )
}
