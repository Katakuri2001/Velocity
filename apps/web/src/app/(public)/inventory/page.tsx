import type { Metadata } from 'next'
import { FilterSidebar } from '@/components/inventory/filter-sidebar'
import { InventoryResults } from '@/components/inventory/inventory-results'

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

        <InventoryResults vehicles={vehicles} total={total} sort={sort} />
      </div>
    </div>
  )
}
