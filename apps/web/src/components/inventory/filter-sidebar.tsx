'use client'

import * as React from 'react'
import Link from 'next/link'

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

  React.useEffect(() => {
    if (window.innerWidth < 1024) setExpanded(false)
  }, [])

  const buildUrl = (overrides: Record<string, string>): string => {
    const params = new URLSearchParams()
    if (overrides.manufacturer !== undefined) params.set('manufacturer', overrides.manufacturer)
    if (overrides.category !== undefined) params.set('category', overrides.category)
    if (overrides.availability !== undefined) params.set('availability', overrides.availability)
    if (overrides.minPrice !== undefined) params.set('minPrice', overrides.minPrice)
    if (overrides.maxPrice !== undefined) params.set('maxPrice', overrides.maxPrice)
    return `/inventory?${params.toString()}`
  }

  const filterLink = (href: string, active: boolean, label: string) => (
    <Link
      key={`${href}-${label}`}
      href={href}
      className={`focus-ring flex items-center justify-between px-3 py-2 text-sm transition-colors duration-300 ${
        active ? 'text-gold' : 'text-muted hover:text-primary'
      }`}
    >
      <span>{label}</span>
      {active && <span className="text-xs text-gold" aria-hidden="true">—</span>}
    </Link>
  )

  return (
    <div className="border border-hairline bg-ink">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
        <h2 className="eyebrow">Filters</h2>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="focus-ring text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary lg:hidden"
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className={`${expanded ? 'block' : 'hidden'} px-5 py-6 lg:block`}>
        <div className="space-y-8">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Manufacturer</h3>
            <div className="mt-3 space-y-0.5">
              {manufacturers.map((m) =>
                filterLink(
                  buildUrl({ manufacturer: selectedManufacturer === m.id ? '' : m.id }),
                  selectedManufacturer === m.id,
                  m.name,
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Category</h3>
            <div className="mt-3 space-y-0.5">
              {categories.map((c) =>
                filterLink(
                  buildUrl({ category: selectedCategory === c.id ? '' : c.id }),
                  selectedCategory === c.id,
                  c.name,
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Condition</h3>
            <div className="mt-3 space-y-0.5">
              {['new', 'used', 'certified'].map((cond) =>
                filterLink(
                  buildUrl({ availability: selectedAvailability === cond ? '' : cond }),
                  selectedAvailability === cond,
                  cond.charAt(0).toUpperCase() + cond.slice(1),
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted/70">Price</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="min-price" className="text-xs text-muted">Min</label>
                <input
                  id="min-price"
                  type="number"
                  className="border border-hairline bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-gold/60"
                  value={minPrice}
                  readOnly
                  placeholder="—"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="max-price" className="text-xs text-muted">Max</label>
                <input
                  id="max-price"
                  type="number"
                  className="border border-hairline bg-surface px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-gold/60"
                  value={maxPrice}
                  readOnly
                  placeholder="—"
                />
              </div>
            </div>
          </div>

          <Link
            href="/inventory"
            className="focus-ring inline-block border-b border-hairline pb-1 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-gold hover:text-primary"
          >
            Clear all filters
          </Link>
        </div>
      </div>
    </div>
  )
}
