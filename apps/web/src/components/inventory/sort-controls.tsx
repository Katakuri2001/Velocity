'use client'

import * as React from 'react'
import Link from 'next/link'
import { GlassPanel } from '@/components/ui/glass-panel'

interface SortControlsProps {
  currentSort: string
}

const sortOptions = [
  { value: 'latest', label: 'Latest arrivals' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'year_desc', label: 'Newest year' },
  { value: 'mileage_asc', label: 'Lowest mileage' },
  { value: 'horsepower_desc', label: 'Highest horsepower' },
]

export function SortControls({ currentSort }: SortControlsProps) {
  const buildUrl = (sort: string): string => {
    const params = new URLSearchParams()
    params.set('sort', sort)
    return `/inventory?${params.toString()}`
  }

  return (
    <GlassPanel className="min-w-0 flex-1 rounded-lg border border-glassBorder px-4 py-3">
      <span className="mr-3 text-xs font-manrope font-semibold uppercase text-[#e4e4e7]">
        Sort by:
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sortOptions.map((opt) => (
          <Link
            key={opt.value}
            href={buildUrl(opt.value)}
            aria-current={currentSort === opt.value ? 'page' : undefined}
            className={`rounded-md px-3 py-1.5 text-xs font-manrope transition-colors whitespace-nowrap ${
              currentSort === opt.value
                ? 'bg-[#ffffff] font-semibold text-[#111111]'
                : 'text-[#d4d4d8] hover:bg-white/5 hover:text-[#ffffff]'
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>
    </GlassPanel>
  )
}
