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
    <GlassPanel className="rounded-lg px-4 py-3 border glass-border">
      <span className="text-xs font-manrope font-semibold text-secondaryText uppercase mr-3">
        Sort by:
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sortOptions.map((opt) => (
          <Link
            key={opt.value}
            href={buildUrl(opt.value)}
            className={`px-3 py-1.5 rounded-md text-xs font-manrope transition-colors whitespace-nowrap ${
              currentSort === opt.value
                ? 'bg-accent-electric-blue text-primaryBg'
                : 'text-secondaryText hover:text-primaryText hover:bg-white/5'
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>
    </GlassPanel>
  )
}
