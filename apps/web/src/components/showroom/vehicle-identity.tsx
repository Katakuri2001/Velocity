'use client'

import { FadeContent } from '@/components/showroom/fade-content'
import { formatPrice, formatSpec } from '@/lib/presentation'

interface VehicleIdentityProps {
  vehicle: any
  manufacturerName?: string
}

const factRows = (vehicle: any): Array<[string, unknown]> => [
  ['Year', vehicle.year],
  ['Condition', vehicle.condition],
  ['Transmission', vehicle.transmission],
  ['Fuel type', vehicle.fuel_type],
  ['Mileage', vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : null],
  ['Drivetrain', vehicle.drivetrain],
  ['Exterior', vehicle.exterior_color],
  ['Interior', vehicle.interior_color],
  ['Stock reference', vehicle.stock_number],
]

export function VehicleIdentity({ vehicle, manufacturerName }: VehicleIdentityProps) {
  const make = manufacturerName || 'Manufacturer'

  return (
    <FadeContent>
      <div>
        <p className="eyebrow">{make}</p>
        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.06] tracking-[-0.03em] text-primary sm:text-5xl">
          {vehicle.model}
          {vehicle.variant ? ` ${vehicle.variant}` : ''}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
            {formatPrice(vehicle.price)}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted/70">
            {formatSpec(vehicle.availability)}
          </span>
        </div>

        <dl className="mt-10 border-t border-hairline">
          {factRows(vehicle).map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 border-b border-hairline py-3.5">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted/70">{label}</dt>
              <dd className="text-right text-sm text-primary">{formatSpec(value)}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="#enquiry"
            className="focus-ring inline-flex items-center border border-gold px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:border-goldHover hover:text-goldHover"
          >
            Enquire about this vehicle
          </a>
          <a
            href="/inventory"
            className="focus-ring border-b border-hairline pb-1 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-gold hover:text-primary"
          >
            Back to inventory
          </a>
        </div>
      </div>
    </FadeContent>
  )
}
