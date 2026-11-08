'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

interface FilterSidebarProps {
  manufacturers: any[]
  categories: any[]
  selectedManufacturer: string
  selectedCategory: string
  selectedAvailability: string
  minPrice: string
  maxPrice: string
}

export function FilterSidebar({
  manufacturers,
  categories,
  selectedManufacturer,
  selectedCategory,
  selectedAvailability,
  minPrice,
  maxPrice,
}: FilterSidebarProps) {
  const [expanded, setExpanded] = React.useState(true)

  const buildUrl = (overrides: Record<string, string>): string => {
    const params = new URLSearchParams()
    if (overrides.manufacturer !== undefined) params.set('manufacturer', overrides.manufacturer)
    if (overrides.category !== undefined) params.set('category', overrides.category)
    if (overrides.availability !== undefined) params.set('availability', overrides.availability)
    if (overrides.minPrice !== undefined) params.set('minPrice', overrides.minPrice)
    if (overrides.maxPrice !== undefined) params.set('maxPrice', overrides.maxPrice)
    return `/inventory?${params.toString()}`
  }

  return (
    <GlassPanel className="rounded-lg p-5 border glass-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-manrope font-semibold text-primaryText text-sm uppercase tracking-wider">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-secondaryText hover:text-primaryText"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>

      {!expanded ? null : (
        <div className="space-y-6">
          {/* Manufacturer */}
          <div>
            <h3 className="text-xs font-manrope font-semibold text-secondaryText mb-3 uppercase">
              Manufacturer
            </h3>
            <div className="space-y-2">
              {manufacturers.map((m) => (
                <Link
                  key={m.id}
                  href={buildUrl({ manufacturer: selectedManufacturer === m.id ? '' : m.id })}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-manrope transition-colors ${
                    selectedManufacturer === m.id
                      ? 'bg-white/5 text-accent-electric-blue'
                      : 'text-secondaryText hover:bg-white/5'
                  }`}
                >
                  <span>{m.name}</span>
                  {selectedManufacturer === m.id && <span className="text-xs">✓</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-xs font-manrope font-semibold text-secondaryText mb-3 uppercase">
              Category
            </h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={buildUrl({ category: selectedCategory === c.id ? '' : c.id })}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-manrope transition-colors ${
                    selectedCategory === c.id
                      ? 'bg-white/5 text-accent-electric-blue'
                      : 'text-secondaryText hover:bg-white/5'
                  }`}
                >
                  <span>{c.name}</span>
                  {selectedCategory === c.id && <span className="text-xs">✓</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="text-xs font-manrope font-semibold text-secondaryText mb-3 uppercase">
              Condition
            </h3>
            <div className="space-y-2">
              {['new', 'used', 'certified'].map((cond) => (
                <Link
                  key={cond}
                  href={buildUrl({ availability: selectedAvailability === cond ? '' : cond })}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-manrope transition-colors ${
                    selectedAvailability === cond
                      ? 'bg-white/5 text-accent-electric-blue'
                      : 'text-secondaryText hover:bg-white/5'
                  }`}
                >
                  <span>{cond.charAt(0).toUpperCase() + cond.slice(1)}</span>
                  {selectedAvailability === cond && <span className="text-xs">✓</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h3 className="text-xs font-manrope font-semibold text-secondaryText mb-3 uppercase">
              Price
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondaryText font-manrope">Min</label>
                <input
                  type="number"
                  className="px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
                  value={minPrice}
                  onChange={(e) => {}}
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondaryText font-manrope">Max</label>
                <input
                  type="number"
                  className="px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
                  value={maxPrice}
                  onChange={(e) => {}}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Clear all */}
          <Button variant="outline" size="sm" className="w-full" onClick={() => {}}>
            Clear all filters
          </Button>
        </div>
      )}
    </GlassPanel>
  )
}
