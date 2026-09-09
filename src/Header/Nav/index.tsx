'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ChevronDown, SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item, i) => {
        const { link, hasDropdown, subMenu } = item

        if (hasDropdown && subMenu && subMenu.length > 0) {
          return (
            <div key={i} className="relative group py-1">
              {/* Parent Label / Trigger */}
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-[#6E6D68] transition-colors hover:text-[#0D99FF] focus:outline-none"
              >
                <span>{link?.label}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu Container */}
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 min-w-[200px]">
                <div className="flex flex-col p-2 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E8E6DF] rounded-xl shadow-lg gap-1">
                  {subMenu.map((subItem, subIndex) => {
                    return (
                      <div
                        key={subIndex}
                        className="px-3 py-2 rounded-lg hover:bg-[#EAE7E0] transition-colors text-sm"
                      >
                        <CMSLink
                          {...subItem.link}
                          appearance="inline"
                          className="w-full block text-[#121212] hover:text-[#0D99FF] transition font-medium"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className="text-sm font-medium text-[#6E6D68] hover:text-[#0D99FF] transition-colors"
          />
        )
      })}
      <Link href="/search" className="p-1.5 rounded-full text-[#6E6D68] hover:text-[#0D99FF] hover:bg-[#EAE7E0]/60 transition-colors">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-4 h-4" />
      </Link>
      <a
        href="#contact"
        className="hidden sm:inline-flex min-h-[38px] items-center justify-center rounded-full bg-[#121212] px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#0D99FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
      >
        Contact
      </a>
    </nav>
  )
}
