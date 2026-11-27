import { notFound } from 'next/navigation'
import { VehicleGallery } from '@/components/showroom/vehicle-gallery'
import { VehicleIdentity } from '@/components/showroom/vehicle-identity'
import { VehicleSpecifications } from '@/components/showroom/vehicle-specifications'
import { VehicleFeatures } from '@/components/showroom/vehicle-features'
import { VehicleEnquiryPanel } from '@/components/showroom/vehicle-enquiry-panel'
import { RelatedVehicles } from '@/components/showroom/related-vehicles'
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const [res, manuRes] = await Promise.all([
    fetch(`${baseUrl}/api/vehicles/${params.slug}`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/manufacturers`, { cache: 'no-store' }),
  ])

  if (res.status === 404) {
    notFound()
  }

  const data = await res.json()
  const { vehicle, images, specifications } = data
  const manufacturers = await manuRes.json().catch(() => ({ manufacturers: [] }))
  const manufacturerNames: Record<string, string> = (manufacturers.manufacturers || []).reduce(
    (acc: Record<string, string>, m: { id: string; name: string }) => {
      acc[m.id] = m.name
      return acc
    },
    {},
  )
  const manufacturerName = manufacturerNames[vehicle.manufacturer_id] || 'Manufacturer'

  return (
    <div className="page-container section-pad">
      <nav aria-label="Breadcrumb" className="flex items-center gap-3 border-b border-hairline pb-6 text-[11px] uppercase tracking-[0.2em] text-muted">
        <a href="/inventory" className="focus-ring transition-colors duration-300 hover:text-primary">Inventory</a>
        <span aria-hidden="true" className="text-muted/40">/</span>
        <span className="text-primary">{vehicle.model}</span>
      </nav>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <VehicleGallery images={images} vehicle={vehicle} manufacturerName={manufacturerName} />
        </div>

        <div className="flex flex-col gap-12 lg:col-span-5">
          <VehicleIdentity vehicle={vehicle} manufacturerName={manufacturerName} />
          <section className="border-t border-hairline pt-8">
            <VehicleSpecifications specifications={specifications} vehicle={vehicle} />
          </section>
          <section className="border-t border-hairline pt-8">
            <VehicleFeatures vehicle={vehicle} />
          </section>
          <section className="border-t border-hairline pt-8">
            <VehicleEnquiryPanel vehicle={vehicle} />
          </section>
        </div>
      </div>

      <div className="mt-24 border-t border-hairline pt-12">
        <RelatedVehicles vehicle={vehicle} />
      </div>
    </div>
  )
}
