'use client'

import Link from 'next/link'
import { ImageOptimizer } from '@/components/showroom/image-optimizer'
import { formatPrice, formatSpec } from '@/lib/presentation'
import type { Vehicle } from '@/types/database'

export interface VehicleCardProps {
  vehicle: Vehicle & { image_url?: string }
  manufacturerName?: string
  layout?: 'grid' | 'list'
  showActions?: boolean
  priority?: boolean
}

export function VehicleCard({
  vehicle,
  manufacturerName,
  layout = 'grid',
  showActions = true,
  priority = false,
}: VehicleCardProps) {
  const make = manufacturerName || vehicle.manufacturer_id || 'Manufacturer'
  const isList = layout === 'list'
  const href = `/inventory/${vehicle.slug}`

  return (
    <article
      className={`group h-full border border-hairline bg-card transition-colors duration-[400ms] ease-out hover:border-gold/40 ${
        isList ? 'flex flex-col sm:flex-row' : 'flex h-full flex-col'
      }`}
    >
      <Link
        href={href}
        aria-label={`View ${make} ${vehicle.model}`}
        className={`focus-ring relative block overflow-hidden bg-surface ${
          isList ? 'aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-[38%]' : 'aspect-[4/3] w-full'
        }`}
      >
        {vehicle.image_url ? (
          <ImageOptimizer
            src={vehicle.image_url}
            alt={`${make} ${vehicle.model} ${vehicle.year}`}
            fill
            className="object-center p-5 transition-transform duration-[400ms] ease-out group-hover:scale-[1.02] sm:p-6"
            fit="contain"
            priority={priority}
            sizes={isList ? '(max-width: 640px) 100vw, 38vw' : '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw'}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-muted">
            Image to be confirmed
          </span>
        )}
        <span className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.2em] text-muted/80">
          {vehicle.year}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col ${isList ? 'p-6 sm:p-7' : 'p-6'}`}>
        <p className="eyebrow">{make}</p>
        <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-primary">
          <Link href={href} className="focus-ring transition-colors duration-300 hover:text-gold">
            {vehicle.model}
            {vehicle.variant ? ` ${vehicle.variant}` : ''}
          </Link>
        </h3>

        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted">
          {formatPrice(vehicle.price)}
        </p>

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-6 text-xs text-muted">
          <span>{formatSpec(vehicle.transmission)}</span>
          <span>{formatSpec(vehicle.fuel_type)}</span>
          <span>{formatSpec(vehicle.drivetrain)}</span>
        </div>

        {showActions && (
          <div className="mt-6 flex items-center justify-between border-t border-hairline pt-5">
            <Link
              href={href}
              className="focus-ring text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-gold"
            >
              View details
            </Link>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted/70">
              {formatSpec(vehicle.availability)}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
