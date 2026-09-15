import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { FooterWrapper } from './Component.client'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)().catch(() => null)
  const navItems = footerData?.navItems || []

  return (
    <FooterWrapper>
      <footer className="mt-auto border-t border-[#E8E6DF] bg-[#FAF8F5] text-[#121212] font-poppins">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            {/* Brand & Identity Column (6 Cols) */}
            <div className="space-y-4 md:col-span-5">
              <Link
                href="/"
                className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#121212] text-xs font-bold text-white shadow-xs transition-transform hover:scale-105">
                  A
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-[#121212]">
                    Feri Alfajri
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#0D99FF]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#0D99FF]">
                    Fullstack
                  </span>
                </div>
              </Link>

              <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-[#5C5A55]">
                Directing software interaction models, spatial node topologies, and design token
                pipelines for enterprise fintech &amp; cloud systems.
              </p>

              <div className="pt-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D5D0C5] bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#2C2A26] shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-[#0ACF83] animate-pulse" />
                  <span>Available for Select Contracts</span>
                </span>
              </div>
            </div>

            {/* Quick Links Column (3 Cols) */}
            <div className="space-y-3 md:col-span-3 md:pl-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#5C5A55]">
                {navItems.length > 0 ? (
                  navItems.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink
                        className="text-[#5C5A55] transition-colors hover:text-[#0D99FF]"
                        {...link}
                      />
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link href="/" className="transition-colors hover:text-[#0D99FF]">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/projects" className="transition-colors hover:text-[#0D99FF]">
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="transition-colors hover:text-[#0D99FF]">
                        Contact
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Network & Socials Column (4 Cols) */}
            <div className="space-y-3 md:col-span-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
                Connect
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#5C5A55]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0D99FF]"
                  >
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0D99FF]"
                  >
                    <span>GitHub</span>
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href="mailto:feri.alfajri@gmail.com"
                    className="font-mono text-xs text-[#0D99FF] hover:underline"
                  >
                    feri.alfajri@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Hairline Bar */}
          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#E8E6DF] pt-8 text-xs text-[#7A7873] sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span>&copy; {new Date().getFullYear()} Feri Alfajri.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </FooterWrapper>
  )
}
