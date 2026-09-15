'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DevNav() {
  const pathname = usePathname()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('feri.alfajri@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const isHome = pathname === '/demo/developer'
  const isProjects = pathname?.startsWith('/demo/developer/projects')
  const isContact = pathname === '/demo/developer/contact'

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-3.5 sm:py-4">
        {/* Brand Logo with Asterisk Emblem */}
        <Link href="/demo/developer" className="flex items-center gap-2.5 group shrink-0">
          <svg
            className="h-6 w-6 text-slate-900 transition-transform duration-300 group-hover:rotate-45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-yellow-500">
            <span className="font-light text-slate-500">.dev</span>
          </span>
        </Link>

        {/* Desktop Centered Navigation */}
        <nav
          aria-label="Developer navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
        >
          <Link
            href="/demo/developer/projects"
            className={`transition-colors hover:text-slate-900 ${
              isProjects ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Projects
          </Link>
          <Link href="/demo/developer#tools" className="transition-colors hover:text-slate-900">
            Tools &amp; Stack
          </Link>
          <Link
            href="/demo/developer#experience"
            className="transition-colors hover:text-slate-900"
          >
            Experience
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/demo/developer/contact"
            className="inline-flex min-h-[38px] items-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 hover:border-slate-900 hover:bg-slate-50 transition-all shadow-2xs"
          >
            Contact
          </Link>

          <button
            onClick={handleCopyEmail}
            className="hidden sm:inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>{copiedEmail ? 'Copied' : 'Email'}</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <Link
              href="/demo/developer"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 transition-colors hover:text-slate-900 ${
                isHome ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Overview
            </Link>
            <Link
              href="/demo/developer/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 transition-colors hover:text-slate-900 ${
                isProjects ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Projects Archive
            </Link>
            <Link
              href="/demo/developer#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 transition-colors hover:text-slate-900"
            >
              Tools &amp; Stack
            </Link>
            <Link
              href="/demo/developer#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 transition-colors hover:text-slate-900"
            >
              Experience &amp; Education
            </Link>
            <Link
              href="/demo/developer/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 transition-colors hover:text-slate-900 ${
                isContact ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Contact Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
