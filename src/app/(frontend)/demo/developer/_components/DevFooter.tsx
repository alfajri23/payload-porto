import React from 'react'
import Link from 'next/link'

export function DevFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 sm:flex-row text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Feri Alfajri. Built with Next.js and Tailwind CSS.
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 font-medium">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            LinkedIn
          </a>
          <Link href="/demo/developer/projects" className="hover:text-slate-900 transition-colors">
            All Projects
          </Link>
          <Link href="/demo/developer/contact" className="hover:text-slate-900 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
