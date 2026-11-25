import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VehicleCard } from '@/components/showroom/vehicle-card'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/categories`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const category = data.categories?.find((c: any) => c.slug === params.slug)
      if (category) {
        return {
          title: `${category.name} — Velocity Showroom`,
          description: category.description ||
            `Explore our collection of ${category.name.toLowerCase()}. Find your next automobile at Velocity Showroom.`,
          openGraph: {
            title: `${category.name} — Velocity Showroom`,
            description: category.description ||
              `Explore our collection of ${category.name.toLowerCase()}.`,
            images: [
              {
                url: `https://velocity.showroom/images/categories/${category.slug}.jpg`,
                width: 1400,
                height: 1000,
                alt: category.name,
              },
            ],
          },
        }
      }
    }
  } catch {
    // Fallback
  }
  return {
    title: 'Category — Velocity Showroom',
    description: 'Explore our vehicle categories.',
    openGraph: {
      title: 'Category — Velocity Showroom',
    },
  }
}

interface CategoryPageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const [catRes, vehRes, manuRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/vehicles?category=${encodeURIComponent(params.slug)}&limit=12`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/manufacturers`, { cache: 'no-store' }),
  ])

  const [catData, vehData, manuData] = await Promise.all([
    catRes.json(),
    vehRes.json(),
    manuRes.json(),
  ])
  const category = catData.categories?.find((c: any) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const vehicles = vehData.vehicles || []
  const manufacturerNames: Record<string, string> = (manuData.manufacturers || []).reduce(
    (acc: Record<string, string>, m: { id: string; name: string }) => {
      acc[m.id] = m.name
      return acc
    },
    {},
  )

  return (
    <div className="page-container section-pad">
      <header className="border-b border-hairline pb-10">
        <p className="eyebrow">Collection</p>
        <h1 className="mt-5 font-display text-4xl font-normal tracking-[-0.03em] text-primary sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {category.description || `Explore our collection of ${category.name.toLowerCase()}.`}
        </p>
      </header>

      <div className="mt-10 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} available
        </p>
        <Link
          href="/inventory"
          className="focus-ring border-b border-hairline pb-1 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-gold hover:text-primary"
        >
          Browse all inventory
        </Link>
      </div>

      <div className="card-grid mt-8">
        {vehicles.length === 0 ? (
          <p className="text-sm text-muted">No vehicles in this category yet.</p>
        ) : (
          vehicles.map((v: any, index: number) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              manufacturerName={manufacturerNames[v.manufacturer_id]}
              priority={index === 0}
            />
          ))
        )}
      </div>
    </div>
  )
}
