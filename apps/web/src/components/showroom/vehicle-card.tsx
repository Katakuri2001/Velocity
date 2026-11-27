'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { ImageOptimizer } from '@/components/showroom/image-optimizer'
import { manufacturerName } from '@/lib/manufacturer'
import type { Vehicle } from '@/types/database'

export interface VehicleCardProps {
  vehicle: Vehicle & { image_url?: string }
  showActions?: boolean
}

const PRICE_MISSING = 'To be confirmed'

export function VehicleCard({ vehicle, showActions = true }: VehicleCardProps) {
  const make = manufacturerName(vehicle.manufacturer_id)

  return (
    <article className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#262626] bg-[#141414] transition-[border-color] duration-[400ms] ease-out group-hover:border-[rgba(201,168,106,0.4)]">
        <Link
          href={`/inventory/${vehicle.slug}`}
          className="focus-ring relative block aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]"
          aria-label={`View ${make} ${vehicle.model}`}
        >
          {vehicle.image_url ? (
            <ImageOptimizer
              src={vehicle.image_url}
              alt={`${make} ${vehicle.model} ${vehicle.year}`}
              fill
              className="p-6 transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
              fit="contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-[#141414]" />
          )}
          <span className="absolute right-3 top-3 rounded-full border border-[#262626] bg-[#0a0a0a]/85 px-2.5 py-1 text-[0.65rem] font-manrope uppercase tracking-widest text-[#d4d4d8]">
            {vehicle.year}
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-[#262626] bg-[#0a0a0a]/85 px-2.5 py-1 text-[0.65rem] font-manrope uppercase tracking-widest text-[#a6a39c]">
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
              {vehicle.variant ? ` - ${vehicle.variant}` : ''}
            </Link>
          </h3>
          <p
            className={`mt-3 font-manrope ${
              !vehicle.price
                ? 'text-xs font-semibold uppercase tracking-[0.14em] text-accentChampagne'
                : 'text-sm text-primaryText'
            }`}
          >
            {!vehicle.price ? 'Price on enquiry' : `$${vehicle.price.toLocaleString()}`}
          </p>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs font-manrope text-[#8d8d92]">
            <span>{vehicle.transmission || PRICE_MISSING}</span>
            <span>{vehicle.fuel_type || PRICE_MISSING}</span>
            <span>{vehicle.drivetrain || PRICE_MISSING}</span>
          </div>

          {showActions && (
            <div className="mt-4 flex gap-2 border-t border-[#262626] pt-4">
              <Link
                href={`/inventory/${vehicle.slug}`}
                className="focus-ring flex-1 rounded-lg border border-[#262626] px-3 py-2 text-center text-xs font-manrope text-primaryText transition-colors duration-[400ms] hover:border-[rgba(201,168,106,0.4)]"
              >
                View details
              </Link>
              <button
                type="button"
                aria-label="Save to favourites"
                className="focus-ring rounded-lg border border-[#262626] px-3 py-2 text-[#a6a39c] transition-colors duration-[400ms] hover:text-primaryText"
              >
                <Heart size={14} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
