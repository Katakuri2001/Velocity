import { notFound } from 'next/navigation'
import { VehicleGallery } from '@/components/showroom/vehicle-gallery'
import { VehicleIdentity } from '@/components/showroom/vehicle-identity'
import { VehicleSpecifications } from '@/components/showroom/vehicle-specifications'
import { VehicleFeatures } from '@/components/showroom/vehicle-features'
import { VehicleEnquiryPanel } from '@/components/showroom/vehicle-enquiry-panel'
import { RelatedVehicles } from '@/components/showroom/related-vehicles'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/vehicles/${params.slug}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const v = data.vehicle
      if (v) {
        return {
          title: `${v.year} ${v.manufacturer_id} ${v.model}${v.variant ? ` ${v.variant}` : ''} — Velocity Showroom`,
          description: v.description ||
            `Discover the ${v.year} ${v.manufacturer_id} ${v.model}${v.variant ? ` ${v.variant}` : ''}. ${v.condition} condition, ${v.transmission || ''}, ${v.fuel_type || ''}.`,
          openGraph: {
            title: `${v.year} ${v.manufacturer_id} ${v.model}${v.variant ? ` ${v.variant}` : ''}`,
            description: v.description ||
              `A ${v.condition} ${v.year} ${v.manufacturer_id} ${v.model} available at Velocity Showroom.`,
            images: v.images && v.images.length > 0
              ? [{ url: v.images[0].url, width: 1600, height: 1200, alt: `${v.model} ${v.year}` }]
              : [{ url: 'https://velocity.showroom/images/hero/hero-candidate-1.jpg', width: 1920, height: 1080, alt: v.model }],
          },
          twitter: {
            card: 'summary_large_image',
            title: `${v.year} ${v.manufacturer_id} ${v.model}${v.variant ? ` ${v.variant}` : ''}`,
            description: v.description ||
              `A ${v.condition} ${v.year} ${v.manufacturer_id} ${v.model} available at Velocity Showroom.`,
          },
        }
      }
    }
  } catch {
    // Fallback metadata if fetch fails
  }
  return {
    title: 'Vehicle Details — Velocity Showroom',
    description: 'View detailed specifications and information about this vehicle.',
    openGraph: {
      title: 'Vehicle Details — Velocity Showroom',
      images: [{ url: 'https://velocity.showroom/images/hero/hero-candidate-1.jpg', width: 1920, height: 1080, alt: 'Vehicle' }],
    },
  }
}

interface DetailPageProps {
  params: { slug: string }
}

export default async function VehicleDetailPage({ params }: DetailPageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/vehicles/${params.slug}`, {
    cache: 'no-store',
  })

  if (res.status === 404) {
    notFound()
  }

  const data = await res.json()
  const { vehicle, images, specifications } = data

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-secondaryText font-manrope mb-8">
        <a href="/inventory" className="hover:text-primaryText transition-colors">
          Inventory
        </a>
        <span>/</span>
        <span className="text-primaryText">{vehicle.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <VehicleGallery images={images} vehicle={vehicle} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <VehicleIdentity vehicle={vehicle} />

          <GlassPanel className="rounded-xl p-6 border glass-border">
            <VehicleSpecifications specifications={specifications} vehicle={vehicle} />
          </GlassPanel>

          <GlassPanel className="rounded-xl p-6 border glass-border">
            <VehicleFeatures vehicle={vehicle} />
          </GlassPanel>

          <GlassPanel className="rounded-xl p-6 border glass-border">
            <VehicleEnquiryPanel vehicle={vehicle} />
          </GlassPanel>
        </div>
      </div>

      <div className="mt-16">
        <RelatedVehicles vehicle={vehicle} />
      </div>
    </div>
  )
}
