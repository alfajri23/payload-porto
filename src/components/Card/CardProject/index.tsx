import React from 'react'
import Link from 'next/link'
import { Project } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { summaryLexicalContent } from '@/utilities/extractLexical'

export const CardProject: React.FC<{
  props: Project
}> = ({ props: proj }) => {
  return (
    <Link
      key={proj.id}
      href={`/projects/${proj.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-300"
    >
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-200/80">
          <ImageMedia
            resource={
              proj.image?.[0] ||
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85'
            }
            alt={proj.title}
            fill
            size="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            imgClassName="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              {proj.type}
            </span>
            {proj.year && (
              <span className="text-[11px] font-medium text-slate-400">{proj.year}</span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
            {proj.title}
          </h3>

          {proj.description && (
            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2 font-normal">
              {summaryLexicalContent(proj.description)}
            </p>
          )}

          {proj.label && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="truncate max-w-[240px]">{proj.label}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-5 sm:mx-6 pb-5 sm:pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          View Case Study
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <svg
            className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
