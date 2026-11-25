import type { Metadata } from 'next'
import Link from 'next/link'
import { FilterSidebar } from '@/components/inventory/filter-sidebar'
import { SortControls } from '@/components/inventory/sort-controls'
import { InventoryCollection } from '@/components/inventory/inventory-collection'

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
  const manufacturerNames: Record<string, string> = manufacturers.reduce(
    (acc: Record<string, string>, m: { id: string; name: string }) => {
      acc[m.id] = m.name
      return acc
    },
    {},
  )

  const manufacturer = searchParams.manufacturer || ''
  const category = searchParams.category || ''
  const availability = searchParams.availability || ''
  const minPrice = searchParams.minPrice || ''
  const maxPrice = searchParams.maxPrice || ''
  const sort = searchParams.sort || 'latest'

  return (
    <div className="page-container section-pad">
      <header className="border-b border-hairline pb-10">
        <p className="eyebrow">The collection</p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-display text-4xl font-normal leading-tight tracking-[-0.03em] text-primary sm:text-5xl">
            Inventory
          </h1>
          <p className="text-sm text-muted">
            {total} vehicle{total !== 1 ? 's' : ''} available
          </p>
        </div>
      </header>

      <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-16">
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

        <main className="min-w-0 flex-grow">
          <div className="mb-8">
            <SortControls currentSort={sort} />
          </div>

          {vehicles.length === 0 ? (
            <div className="border border-hairline bg-surface px-6 py-20 text-center">
              <p className="font-display text-2xl text-primary">Nothing matches just yet</p>
              <p className="mt-3 text-sm text-muted">Try adjusting your filters to see more of the collection.</p>
              <Link
                href="/inventory"
                className="focus-ring mt-8 inline-flex border border-hairline px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-gold/60 hover:text-gold"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <InventoryCollection vehicles={vehicles} manufacturerNames={manufacturerNames} />
          )}
        </main>
      </div>
    </div>
  )
}
