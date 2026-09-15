'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  if (pathname?.startsWith('/demo')) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E6DF] bg-[#FAF8F5]/90 backdrop-blur-md font-poppins" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 md:px-10">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#121212] text-xs font-bold text-white transition-transform hover:scale-105">
            AP
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-[#121212]">
              Adrian Pratama
            </span>
            <span className="hidden items-center gap-1 rounded bg-[#0D99FF]/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#0D99FF] sm:inline-flex">
              UI/UX
            </span>
          </div>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
