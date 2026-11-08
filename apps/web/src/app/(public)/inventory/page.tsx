'use client'

import React, { useEffect, useState } from 'react'
import { FilterSidebar } from '@/components/inventory/filter-sidebar'
import { SortControls } from '@/components/inventory/sort-controls'
import { ViewModeToggle } from '@/components/inventory/view-mode-toggle'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { VehicleCardSkeleton } from '@/components/showroom/vehicle-card-skeleton'

export const dynamic = 'force-dynamic'

type FilterParams = {
  manufacturer?: string
  category?: string
  availability?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
  page?: string
  limit?: string
}

export default function InventoryPage({ searchParams }: { searchParams: FilterParams }) {
  const [manufacturers, setManufacturers] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const manufacturer = searchParams.manufacturer || ''
  const category = searchParams.category || ''
  const availability = searchParams.availability || ''
  const minPrice = searchParams.minPrice || ''
  const maxPrice = searchParams.maxPrice || ''
  const sort = searchParams.sort || 'latest'
  const page = parseInt(searchParams.page || '1', 10)
  const limit = parseInt(searchParams.limit || '12', 10)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [manuRes, catRes, vehiclesRes] = await Promise.all([
          fetch('/api/manufacturers'),
          fetch('/api/categories'),
          fetch(
            `/api/vehicles?manufacturer=${encodeURIComponent(manufacturer)}&category=${encodeURIComponent(category)}&availability=${encodeURIComponent(availability)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}&sort=${encodeURIComponent(sort)}&page=${page}&limit=${limit}`,
          ),
        ])

        if (mounted) {
          const manuData = await manuRes.json()
          const catData = await catRes.json()
          const vehData = await vehiclesRes.json()
          setManufacturers(manuData.manufacturers || [])
          setCategories(catData.categories || [])
          setVehicles(vehData.vehicles || [])
          setTotal(vehData.total || 0)
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [manufacturer, category, availability, minPrice, maxPrice, sort, page, limit])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-4xl font-bold text-primaryText mb-8">Inventory</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <VehicleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 flex-shrink-0">
          <FilterSidebar
            manufacturers={manufacturers}
            categories={categories}
            selectedManufacturer={manufacturer}
            selectedCategory={category}
            selectedAvailability={availability}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </aside>

        <main className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-primaryText">
                Inventory
              </h1>
              <p className="text-secondaryText font-manrope">
                {total} vehicle{total !== 1 ? 's' : ''} available
              </p>
            </div>

            <div className="flex gap-3">
              <ViewModeToggle />
              <SortControls currentSort={sort} />
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 border glass-border">
            {vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-secondaryText font-manrope text-lg">
                  No vehicles found matching your criteria.
                </p>
                <Button onClick={() => {}}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((v: any) => (
                  <div key={v.id}>
                    <div className="glass-panel rounded-xl overflow-hidden h-[420px] flex flex-col border glass-border">
                      <div className="relative w-full h-[280px] bg-secondaryBg">
                        <Skeleton className="absolute inset-0 h-full w-full" />
                      </div>
                      <div className="p-4 flex flex-col h-[140px]">
                        <h3 className="font-display font-bold text-primaryText">
                          {v.model} {v.variant ? `- ${v.variant}` : ''}
                        </h3>
                        <p className="text-sm text-secondaryText font-manrope mt-1">
                          {v.year} • {v.price.toLocaleString()}
                        </p>
                        <div className="mt-auto flex gap-2 text-xs text-secondaryText font-manrope">
                          <span>{v.transmission || '—'}</span>
                          <span>•</span>
                          <span>{v.fuel_type || '—'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {total > limit && (
            <div className="mt-6 flex justify-center">
              <Button onClick={() => {}}>Load more</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
