'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ImageOptimizer } from '@/components/showroom/image-optimizer'
import { SpotlightCard } from '@/components/showroom/spotlight-card'
import type { Vehicle } from '@/types/database'

export interface VehicleCardProps {
  vehicle: Vehicle & { image_url?: string }
  showActions?: boolean
}

export function VehicleCard({ vehicle, showActions = true }: VehicleCardProps) {
  const make = vehicle.manufacturer_id || 'Unknown'

  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="h-full">
      <SpotlightCard className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl border-glassBorder">
        <Link
          href={`/inventory/${vehicle.slug}`}
          className="focus-ring relative block aspect-[4/3] w-full overflow-hidden bg-secondaryBg"
          aria-label={`View ${make} ${vehicle.model}`}
        >
          {vehicle.image_url ? (
            <ImageOptimizer
              src={vehicle.image_url}
              alt={`${make} ${vehicle.model} ${vehicle.year}`}
              fill
              className="p-6 transition-transform duration-500 group-hover:scale-[1.03]"
              fit="contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-white/5" />
          )}
          <span className="absolute right-3 top-3 rounded-full border border-glassBorder bg-primaryBg/80 px-2.5 py-1 text-[0.65rem] font-manrope uppercase tracking-widest text-primaryText">
            {vehicle.year}
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-glassBorder bg-primaryBg/80 px-2.5 py-1 text-[0.65rem] font-manrope uppercase tracking-widest text-secondaryText">
            {vehicle.availability}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[0.65rem] font-manrope uppercase tracking-[0.24em] text-accentChampagne">
            {make}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-primaryText">
            <Link href={`/inventory/${vehicle.slug}`} className="focus-ring hover:text-accentChampagne">
              {vehicle.model}
              {vehicle.variant ? ` — ${vehicle.variant}` : ''}
            </Link>
          </h3>
          <p className="mt-3 text-sm font-manrope text-secondaryText">
            {vehicle.price === 0 ? 'Price on enquiry' : vehicle.price.toLocaleString()}
          </p>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs font-manrope text-secondaryText">
            <span>{vehicle.transmission || '—'}</span>
            <span>{vehicle.fuel_type || '—'}</span>
            <span>{vehicle.drivetrain || '—'}</span>
          </div>

          {showActions && (
            <div className="mt-4 flex gap-2 border-t border-glassBorder pt-4">
              <Link
                href={`/inventory/${vehicle.slug}`}
                className="focus-ring flex-1 rounded-lg border border-glassBorder px-3 py-2 text-center text-xs font-manrope text-primaryText transition-colors hover:bg-white/5"
              >
                View details
              </Link>
              <button
                type="button"
                aria-label="Save to favourites"
                className="focus-ring rounded-lg border border-glassBorder px-3 py-2 text-xs text-secondaryText transition-colors hover:text-primaryText"
              >
                ♡
              </button>
            </div>
          )}
        </div>
      </SpotlightCard>
    </motion.article>
  )
}
