'use client'

import * as React from 'react'

interface ViewModeToggleProps {
  mode?: 'grid' | 'list'
  onModeChange?: (mode: 'grid' | 'list') => void
}

export function ViewModeToggle({ mode: controlledMode, onModeChange }: ViewModeToggleProps) {
  const [internalMode, setInternalMode] = React.useState<'grid' | 'list'>('grid')
  const mode = controlledMode ?? internalMode

  const select = (next: 'grid' | 'list') => {
    if (controlledMode === undefined) setInternalMode(next)
    onModeChange?.(next)
  }

  // Contrast values are deliberately unchanged from PR #2 — do not regress.
  const baseButton = 'px-3 py-1.5 text-xs font-medium transition-colors border'

  return (
    <div className="flex items-center gap-3 border border-hairline bg-surface px-4 py-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#a1a1aa]">
        View:
      </span>
      <div className="flex gap-0.5 bg-[#1f1f1f]">
        <button
          type="button"
          aria-pressed={mode === 'grid'}
          onClick={() => select('grid')}
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
          onClick={() => select('list')}
          className={`${baseButton} ${
            mode === 'list'
              ? 'border-transparent bg-[#ffffff] text-[#111111]'
              : 'border-[#2a2a2a] bg-[#1f1f1f] text-[#d4d4d8] hover:text-[#ffffff]'
          }`}
        >
          List
        </button>
      </div>
    </div>
  )
}
