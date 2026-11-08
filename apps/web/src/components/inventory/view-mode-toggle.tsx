'use client'

import * as React from 'react'
import { GlassPanel } from '@/components/ui/glass-panel'

interface ViewModeToggleProps {}

export function ViewModeToggle() {
  const [mode, setMode] = React.useState<'grid' | 'list'>('grid')

  return (
    <GlassPanel className="rounded-lg px-4 py-3 border glass-border flex items-center gap-3">
      <span className="text-xs font-manrope font-semibold text-secondaryText uppercase">
        View:
      </span>
      <div className="flex bg-white/5 rounded-md p-0.5">
        <button
          onClick={() => setMode('grid')}
          className={`px-3 py-1.5 rounded-md text-xs font-manrope transition-colors ${
            mode === 'grid'
              ? 'bg-white text-primaryText'
              : 'text-secondaryText hover:text-primaryText'
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setMode('list')}
          className={`px-3 py-1.5 rounded-md text-xs font-manrope transition-colors ${
            mode === 'list'
              ? 'bg-white text-primaryText'
              : 'text-secondaryText hover:text-primaryText'
          }`}
        >
          List
        </button>
      </div>
    </GlassPanel>
  )
}
