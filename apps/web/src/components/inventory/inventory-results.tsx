'use client'

import * as React from 'react'
import Link from 'next/link'
import { SortControls } from '@/components/inventory/sort-controls'
import { ViewModeToggle } from '@/components/inventory/view-mode-toggle'
import { ImageOptimizer } from '@/components/showroom/image-optimizer'
import { manufacturerName } from '@/lib/manufacturer'

interface InventoryResultsProps {
  vehicles: any[]
  total: number
  sort: string
}

const CARD_SHELL =
  'overflow-hidden rounded-xl border border-[#262626] bg-[#141414] transition-[border-color] duration-[400ms] ease-out hover:border-[rgba(201,168,106,0.4)]'

function PriceLine({ price, className = '' }: { price: number | null | undefined; className?: string }) {
  if (!price) {
    return (
      <span
        className={`font-manrope text-xs font-semibold uppercase tracking-[0.14em] text-accentChampagne ${className}`}
      >
        Price on enquiry
      </span>
    )
  }
  return <span className={`font-manrope text-sm text-primaryText ${className}`}>${price.toLocaleString()}</span>
}

function SpecLine({ value }: { value: string | null | undefined }) {
  if (value) return <span className="text-[#d4d4d8]">{value}</span>
  return <span className="text-[#8d8d92]">To be confirmed</span>
}

export function InventoryResults({ vehicles, total, sort }: InventoryResultsProps) {
  const [mode, setMode] = React.useState<'grid' | 'list'>('grid')

  return (
    <main className="flex-grow">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-manrope text-[0.68rem] uppercase tracking-[0.32em] text-accentChampagne">
            The collection
          </p>
          <h1 className="mt-2 font-display text-3xl font-normal italic text-primaryText md:text-4xl">
            Inventory
          </h1>
          <p className="font-manrope text-secondaryText">
            {total} vehicle{total !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ViewModeToggle mode={mode} onModeChange={setMode} />
          <SortControls currentSort={sort} />
        </div>
      </div>

      <div className="rounded-xl border border-[#262626] bg-[#0f0f0f] p-6">
        {vehicles.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-manrope text-lg text-secondaryText">
              No vehicles found matching your criteria.
            </p>
            <Link
              href="/inventory"
              className="focus-ring mt-4 inline-flex rounded-xl bg-accentChampagne px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#241a0c] transition-colors hover:bg-[#e8cfa5]"
            >
              Clear all filters
            </Link>
          </div>
        ) : mode === 'grid' ? (
          <div className="card-grid">
            {vehicles.map((v: any) => (
              <div key={v.id} className="group">
                <div className={`flex h-[420px] flex-col ${CARD_SHELL}`}>
                  <Link
                    href={`/inventory/${v.slug}`}
                    className="relative block h-[280px] w-full overflow-hidden bg-[#0a0a0a]"
                    aria-label={`View ${manufacturerName(v.manufacturer_id)} ${v.model}`}
                  >
                    {v.image_url ? (
                      <ImageOptimizer
                        src={v.image_url}
                        alt={`${manufacturerName(v.manufacturer_id)} ${v.model} ${v.year}`}
                        fill
                        className="object-contain p-6 transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
                        fit="contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 animate-pulse bg-[#141414]" />
                    )}
                  </Link>
                  <div className="flex h-[140px] flex-col p-4">
                    <p className="font-manrope text-[0.65rem] uppercase tracking-[0.24em] text-accentChampagne">
                      {manufacturerName(v.manufacturer_id)}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-primaryText">
                      <Link href={`/inventory/${v.slug}`} className="focus-ring hover:text-accentChampagne">
                        {v.model} {v.variant ? `- ${v.variant}` : ''}
                      </Link>
                    </h3>
                    <p className="mt-2 flex flex-wrap items-baseline gap-x-2 font-manrope text-sm text-secondaryText">
                      <span>{v.year}</span>
                      <span aria-hidden="true">•</span>
                      <PriceLine price={v.price} />
                    </p>
                    <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-xs font-manrope">
                      <SpecLine value={v.transmission} />
                      <span className="text-[#8d8d92]" aria-hidden="true">
                        •
                      </span>
                      <SpecLine value={v.fuel_type} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {vehicles.map((v: any) => (
              <Link
                key={v.id}
                href={`/inventory/${v.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-[#262626] bg-[#141414] p-4 transition-[border-color] duration-[400ms] ease-out hover:border-[rgba(201,168,106,0.4)]"
                aria-label={`View ${manufacturerName(v.manufacturer_id)} ${v.model}`}
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#0a0a0a] sm:h-24 sm:w-36">
                  {v.image_url ? (
                    <ImageOptimizer
                      src={v.image_url}
                      alt={`${manufacturerName(v.manufacturer_id)} ${v.model} ${v.year}`}
                      fill
                      className="object-contain p-2 transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
                      fit="contain"
                      sizes="144px"
                    />
                  ) : (
                    <div className="absolute inset-0 animate-pulse bg-[#141414]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-manrope text-[0.65rem] uppercase tracking-[0.24em] text-accentChampagne">
                    {manufacturerName(v.manufacturer_id)}
                  </p>
                  <h3 className="mt-1 truncate font-display text-lg font-semibold text-primaryText">
                    {v.model} {v.variant ? `- ${v.variant}` : ''}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-2 font-manrope text-sm text-secondaryText">
                    <span>{v.year}</span>
                    <span aria-hidden="true">•</span>
                    <PriceLine price={v.price} />
                  </p>
                </div>

                <div className="hidden w-44 shrink-0 flex-col gap-1 text-right font-manrope text-xs md:flex">
                  <span className="text-[#8d8d92] uppercase tracking-[0.16em]">Transmission</span>
                  <SpecLine value={v.transmission} />
                  <span className="mt-1 text-[#8d8d92] uppercase tracking-[0.16em]">Fuel</span>
                  <SpecLine value={v.fuel_type} />
                </div>

                <span className="hidden shrink-0 rounded-full border border-[#262626] px-3 py-1 font-manrope text-[0.65rem] uppercase tracking-widest text-[#a6a39c] sm:block">
                  {v.availability}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {total > 12 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="focus-ring rounded-xl border border-[#262626] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primaryText transition-colors duration-[400ms] hover:border-[rgba(201,168,106,0.4)]"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  )
}
