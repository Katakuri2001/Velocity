import type { Metadata } from 'next'
import Link from 'next/link'
import { FilterSidebar } from '@/components/inventory/filter-sidebar'
import { SortControls } from '@/components/inventory/sort-controls'
import { ViewModeToggle } from '@/components/inventory/view-mode-toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { VehicleCardSkeleton } from '@/components/showroom/vehicle-card-skeleton'
import { ImageOptimizer } from '@/components/showroom/image-optimizer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Vehicle Inventory — Browse Our Collection',
  description:
    'Browse our curated collection of luxury vehicles. Filter by manufacturer, category, price, and more. Find your next automobile at Velocity Showroom.',
  openGraph: {
    title: 'Vehicle Inventory — Browse Our Collection',
    description:
      'Browse our curated collection of luxury vehicles. Filter by manufacturer, category, price, and more.',
    type: 'website',
    images: [
      {
        url: 'https://velocity.showroom/images/backgrounds/showroom.jpg',
        width: 1920,
        height: 1080,
        alt: 'Luxury automotive showroom',
      },
    ],
  },
}

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

interface InventoryPageProps {
  searchParams: FilterParams
}

async function getInventoryData(filters: FilterParams) {
  const manufacturer = filters.manufacturer || ''
  const category = filters.category || ''
  const availability = filters.availability || ''
  const minPrice = filters.minPrice || ''
  const maxPrice = filters.maxPrice || ''
  const sort = filters.sort || 'latest'
  const page = parseInt(filters.page || '1', 10)
  const limit = parseInt(filters.limit || '12', 10)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const [manuRes, catRes, vehiclesRes] = await Promise.all([
    fetch(`${baseUrl}/api/manufacturers`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
    fetch(
      `${baseUrl}/api/vehicles?manufacturer=${encodeURIComponent(manufacturer)}&category=${encodeURIComponent(category)}&availability=${encodeURIComponent(availability)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}&sort=${encodeURIComponent(sort)}&page=${page}&limit=${limit}`,
      { cache: 'no-store' },
    ),
  ])

  const manuData = await manuRes.json()
  const catData = await catRes.json()
  const vehData = await vehiclesRes.json()

  return {
    manufacturers: manuData.manufacturers || [],
    categories: catData.categories || [],
    vehicles: vehData.vehicles || [],
    total: vehData.total || 0,
  }
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const { manufacturers, categories, vehicles, total } = await getInventoryData(searchParams)

  const manufacturer = searchParams.manufacturer || ''
  const category = searchParams.category || ''
  const availability = searchParams.availability || ''
  const minPrice = searchParams.minPrice || ''
  const maxPrice = searchParams.maxPrice || ''
  const sort = searchParams.sort || 'latest'

  return (
    <div className="page-container py-10 md:py-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="lg:w-72 lg:flex-shrink-0">
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
              <p className="text-[0.68rem] font-manrope uppercase tracking-[0.32em] text-accentChampagne">
                The collection
              </p>
              <h1 className="mt-2 font-display text-3xl font-normal italic text-primaryText md:text-4xl">
                Inventory
              </h1>
              <p className="text-secondaryText font-manrope">
                {total} vehicle{total !== 1 ? 's' : ''} available
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                <Link
                  href="/inventory"
                  className="focus-ring mt-4 inline-flex rounded-xl bg-accentChampagne px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#241a0c] transition-colors hover:bg-[#e8cfa5]"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <div className="card-grid">
                {vehicles.map((v: any) => (
                  <div key={v.id}>
                    <div className="glass-panel rounded-xl overflow-hidden h-[420px] flex flex-col border glass-border">
                      <div className="relative w-full h-[280px] bg-secondaryBg">
                        {v.image_url ? (
                          <ImageOptimizer
                            src={v.image_url}
                            alt={`${v.manufacturer_id} ${v.model} ${v.year}`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <Skeleton className="absolute inset-0 h-full w-full" />
                        )}
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

          {total > 12 && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="focus-ring rounded-xl border border-glassBorder px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primaryText transition-colors hover:bg-white/5"
              >
                Load more
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
