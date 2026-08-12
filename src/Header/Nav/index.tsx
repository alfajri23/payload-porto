'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ChevronDown, SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => {
        const { link, hasDropdown, subMenu } = item

        if (hasDropdown && subMenu && subMenu.length > 0) {
          return (
            <div key={i} className="relative group py-2">
              {/* Parent Label / Trigger */}
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium transition hover:text-primary focus:outline-none"
              >
                <span>{link?.label}</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu Container */}
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 min-w-[200px]">
                <div className="flex flex-col p-2 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg gap-1">
                  {subMenu.map((subItem, subIndex) => {
                    return (
                      <div
                        key={subIndex}
                        className="px-3 py-2 rounded-lg hover:bg-muted/80 transition text-sm"
                      >
                        <CMSLink
                          {...subItem.link}
                          appearance="inline"
                          className="w-full block text-foreground hover:text-primary transition font-medium"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }

        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
