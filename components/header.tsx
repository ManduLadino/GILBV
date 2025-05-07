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
            width={200}
            height={80}
            className="h-auto w-48"
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>
    </header>
  )
}
