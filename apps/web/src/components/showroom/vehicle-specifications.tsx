'use client'

import { formatSpec } from '@/lib/presentation'

interface VehicleSpecificationsProps {
  specifications: any[]
  vehicle: any
}

/** Standard spec rows. Values come from the record only — never invented. */
const SPEC_GROUPS: Array<{ group: string; rows: Array<{ label: string; key: string; field?: string }> }> = [
  {
    group: 'Engine',
    rows: [
      { label: 'Engine capacity', key: 'engine', field: 'engine_capacity' },
      { label: 'Horsepower', key: 'horsepower', field: 'horsepower' },
      { label: 'Torque', key: 'torque', field: 'torque' },
      { label: 'Fuel type', key: 'fuel_type', field: 'fuel_type' },
    ],
  },
  {
    group: 'Performance',
    rows: [
      { label: 'Acceleration 0–100 km/h', key: 'acceleration', field: 'acceleration' },
      { label: 'Top speed', key: 'top_speed', field: 'top_speed' },
    ],
  },
  {
    group: 'Transmission & handling',
    rows: [
      { label: 'Transmission', key: 'transmission', field: 'transmission' },
      { label: 'Drivetrain', key: 'drivetrain', field: 'drivetrain' },
    ],
  },
  {
    group: 'Vehicle',
    rows: [
      { label: 'Exterior colour', key: 'exterior_color', field: 'exterior_color' },
      { label: 'Interior colour', key: 'interior_color', field: 'interior_color' },
      { label: 'Mileage', key: 'mileage', field: 'mileage' },
      { label: 'Condition', key: 'condition', field: 'condition' },
    ],
  },
]

export function VehicleSpecifications({ specifications, vehicle }: VehicleSpecificationsProps) {
  const stored = new Map<string, string>()
  specifications.forEach((spec) => {
    if (spec?.spec_key && spec?.spec_value !== null && spec?.spec_value !== undefined) {
      stored.set(String(spec.spec_key).trim().toLowerCase(), String(spec.spec_value))
    }
  })

  const valueFor = (key: string, field?: string): unknown => {
    const fromSpecs = stored.get(key.toLowerCase())
    if (fromSpecs !== undefined) return fromSpecs
    const fromVehicle = field ? vehicle?.[field] : undefined
    if (typeof fromVehicle === 'number' && field === 'mileage') return `${fromVehicle.toLocaleString()} km`
    return fromVehicle ?? null
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-normal text-primary">Specifications</h2>
      <div className="mt-8 space-y-10">
        {SPEC_GROUPS.map(({ group, rows }) => (
          <div key={group}>
            <h3 className="eyebrow">{group}</h3>
            <dl className="mt-3 border-t border-hairline">
              {rows.map(({ label, key, field }) => {
                const value = valueFor(key, field)
                const missing = value === null || value === undefined || String(value).trim() === ''
                return (
                  <div key={`${group}-${key}`} className="flex items-baseline justify-between gap-6 border-b border-hairline py-3">
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-muted/70">{label}</dt>
                    <dd className={`text-right text-sm ${missing ? 'text-muted/70' : 'text-primary'}`}>
                      {formatSpec(value)}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
