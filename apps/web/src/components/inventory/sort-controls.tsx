'use client'

import * as React from 'react'
import Link from 'next/link'

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
    <div className="flex flex-col gap-3 border border-hairline bg-surface px-4 py-3 sm:flex-row sm:items-center">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#e4e4e7]">
        Sort by:
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sortOptions.map((opt) => (
          <Link
            key={opt.value}
            href={buildUrl(opt.value)}
            aria-current={currentSort === opt.value ? 'page' : undefined}
            className={`whitespace-nowrap px-3 py-1.5 text-xs transition-colors ${
              currentSort === opt.value
                ? 'bg-[#ffffff] font-semibold text-[#111111]'
                : 'text-[#d4d4d8] hover:bg-white/5 hover:text-[#ffffff]'
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
