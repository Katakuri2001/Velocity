'use client'

import * as React from 'react'
import { GlassPanel } from '@/components/ui/glass-panel'

interface ViewModeToggleProps {}

export function ViewModeToggle() {
  const [mode, setMode] = React.useState<'grid' | 'list'>('grid')

  const baseButton = 'px-3 py-1.5 rounded-md text-xs font-manrope font-semibold transition-colors border'

  return (
    <GlassPanel className="rounded-lg px-4 py-3 border glass-border flex items-center gap-3">
      <span className="text-xs font-manrope font-semibold text-[#a1a1aa] uppercase">
        View:
      </span>
      <div className="flex bg-white/5 rounded-md p-0.5">
        <button
          type="button"
          aria-pressed={mode === 'grid'}
          onClick={() => setMode('grid')}
          className={`${baseButton} ${
            mode === 'grid'
              ? 'border-transparent bg-[#ffffff] text-[#111111]'
              : 'border-[#2a2a2a] bg-[#1f1f1f] text-[#d4d4d8] hover:text-[#ffffff]'
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          aria-pressed={mode === 'list'}
          onClick={() => setMode('list')}
          className={`${baseButton} ${
            mode === 'list'
              ? 'border-transparent bg-[#ffffff] text-[#111111]'
              : 'border-[#2a2a2a] bg-[#1f1f1f] text-[#d4d4d8] hover:text-[#ffffff]'
          }`}
        >
          List
        </button>
      </div>
    </GlassPanel>
  )
}
