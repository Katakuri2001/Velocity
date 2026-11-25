import Link from 'next/link'
import { VehicleCard } from '@/components/showroom/vehicle-card'
import { FadeContent } from '@/components/showroom/fade-content'
import type { Vehicle } from '@/types/database'

interface FeaturedCollectionProps {
  vehicles: Array<Vehicle & { image_url?: string }>
  manufacturerNames: Record<string, string>
}

export function FeaturedCollection({ vehicles, manufacturerNames }: FeaturedCollectionProps) {
  if (vehicles.length === 0) return null

  return (
    <section className="section-pad border-b border-hairline bg-surface">
      <div className="page-container">
        <FadeContent>
          <p className="eyebrow">Selected machines</p>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-primary sm:text-4xl">
              The featured collection.
            </h2>
            <Link
              href="/inventory"
              className="focus-ring w-fit border-b border-hairline pb-1 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-gold hover:text-primary"
            >
              View all vehicles
            </Link>
          </div>
        </FadeContent>

        <div className="card-grid mt-12">
          {vehicles.map((vehicle, index) => (
            <FadeContent key={vehicle.id} delay={index * 0.08}>
              <VehicleCard
                vehicle={vehicle}
                manufacturerName={manufacturerNames[vehicle.manufacturer_id]}
              />
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
