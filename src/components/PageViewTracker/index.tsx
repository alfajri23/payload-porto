'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const ua = navigator.userAgent.toLowerCase()
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet'
  if (/mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) return 'mobile'
  return 'desktop'
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  const storageKey = 'web_ticket_session_id'
  let id = sessionStorage.getItem(storageKey)
  if (!id) {
    id = 's_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
    sessionStorage.setItem(storageKey, id)
  }
  return id
}

export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return

    const fullPath = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname
    if (lastPathRef.current === fullPath) return
    lastPathRef.current = fullPath

    const refParam = searchParams?.get('ref') || searchParams?.get('utm_source')
    let referrer = 'Direct'
    if (refParam) {
      referrer = `ref:${refParam}`
    } else if (typeof document !== 'undefined' && document.referrer) {
      try {
        const refUrl = new URL(document.referrer)
        if (refUrl.hostname !== window.location.hostname) {
          referrer = refUrl.hostname
        }
      } catch {
        referrer = document.referrer
      }
    }

    const device = getDeviceType()
    const sessionId = getOrCreateSessionId()

    fetch('/api/page-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        referrer,
        device,
        sessionId,
      }),
    }).catch(() => {})
  }, [pathname, searchParams])

  return null
}
