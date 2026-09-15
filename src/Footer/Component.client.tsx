'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  if (pathname?.startsWith('/demo')) {
    return null
  }

  return <div className={pathname?.startsWith('/demo') ? 'hidden' : ''}>{children}</div>
}
