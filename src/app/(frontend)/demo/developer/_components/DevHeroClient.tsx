'use client'

import { useState } from 'react'

// HUD reticles positioned over the portrait image, toggling active state on click
export function DevHudReticles() {
  const [activeTag, setActiveTag] = useState<string>('architecture')

  return (
    <>
      {/* HUD 1: Systems Design */}
      <div
        onClick={() => setActiveTag('architecture')}
        className={`absolute top-6 right-2 sm:right-6 z-20 cursor-pointer transition-all duration-300 ${
          activeTag === 'architecture' ? 'scale-105' : 'opacity-85 hover:opacity-100'
        }`}
      >
        <div className="relative rounded-lg border-2 border-white bg-white/30 p-2 sm:p-2.5 backdrop-blur-md shadow-lg">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mt-0.5" />
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-md">
                Systems Design
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm">
                Distributed Mesh
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HUD 2: Low Latency */}
      <div
        onClick={() => setActiveTag('throughput')}
        className={`absolute top-36 right-2 sm:right-4 z-20 cursor-pointer transition-all duration-300 ${
          activeTag === 'throughput' ? 'scale-105' : 'opacity-85 hover:opacity-100'
        }`}
      >
        <div className="relative rounded-lg border-2 border-white bg-white/30 p-2 sm:p-2.5 backdrop-blur-md shadow-lg">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mt-0.5" />
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-md">
                Low Latency
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm">
                p99 &lt; 4.2ms
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HUD 3: High Availability */}
      <div
        onClick={() => setActiveTag('infra')}
        className={`absolute bottom-20 left-2 sm:left-6 z-20 cursor-pointer transition-all duration-300 ${
          activeTag === 'infra' ? 'scale-105' : 'opacity-85 hover:opacity-100'
        }`}
      >
        <div className="relative rounded-lg border-2 border-white bg-white/30 p-2 sm:p-2.5 backdrop-blur-md shadow-lg">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mt-0.5" />
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-md">
                High Availability
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-white/90 drop-shadow-sm">
                99.99% Uptime
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Reusable copy-to-clipboard email button
export function CopyEmailButton({
  email,
  label,
  className,
}: {
  email: string
  label: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <button onClick={handleCopy} className={className}>
      {copied ? 'Email disalin!' : label}
    </button>
  )
}
