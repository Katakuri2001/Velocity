import Image from 'next/image'
import { notFound } from 'next/navigation'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { ImageOptimizer } from '@/components/showroom/image-optimizer'
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
  const [catRes, vehRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/categories`, { cache: 'no-store' }),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/vehicles?category=${encodeURIComponent(params.slug)}&limit=12`, { cache: 'no-store' }),
  ])

  const catData = await catRes.json()
  const vehData = await vehRes.json()
  const category = catData.categories?.find((c: any) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const vehicles = vehData.vehicles || []

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={`/images/categories/${category.slug}.jpg`}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 p-8">
          <span className="text-xs font-manrope text-accent-champagne uppercase tracking-wider mb-2 block">
            Category
          </span>
          <h1 className="font-display text-4xl font-bold text-primaryText mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-secondaryText font-manrope max-w-lg">
            {category.description || `Explore our collection of ${category.name.toLowerCase()}.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <p className="text-secondaryText font-manrope">
              {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} available
            </p>
            <Link
              href="/inventory"
              className="text-xs font-manrope text-accent-electric-blue hover:text-accent-champagne transition-colors"
            >
              Browse all inventory →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-secondaryText font-manrope text-lg">
                  No vehicles in this category yet.
                </p>
              </div>
            ) : (
              <>
                {vehicles.map((v: any) => (
                  <div key={v.id} className="glass-panel rounded-xl overflow-hidden h-[420px] flex flex-col border glass-border">
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
                ))}
              </>
            )}
          </div>
        </div>

        <aside className="lg:w-72 flex-shrink-0">
          <GlassPanel className="rounded-lg p-5 border glass-border">
            <h3 className="font-manrope font-semibold text-primaryText text-sm mb-4 uppercase tracking-wider">
              Category details
            </h3>
            <div className="space-y-4 text-sm font-manrope">
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-secondaryText">Name</span>
                <span className="text-primaryText">{category.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Description</span>
                <span className="text-primaryText">{category.description || '—'}</span>
              </div>
            </div>
          </GlassPanel>
        </aside>
      </div>
    </div>
  )
}
