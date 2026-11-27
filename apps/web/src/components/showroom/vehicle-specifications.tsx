'use client'

import * as React from 'react'

interface VehicleSpecificationsProps {
  specifications: any[]
  vehicle: any
}

interface SpecGroup {
  group: string
  items: { key: string; value: string | null }[]
}

const TBC = 'To be confirmed'

export function VehicleSpecifications({ specifications, vehicle }: VehicleSpecificationsProps) {
  // Group specifications by spec_group
  const groups: SpecGroup[] = []
  specifications.forEach((spec) => {
    let group = groups.find((g) => g.group === spec.spec_group)
    if (!group) {
      group = { group: spec.spec_group, items: [] }
      groups.push(group)
    }
    // NULL / empty spec values stay null and render as "To be confirmed"
    group.items.push({ key: spec.spec_key, value: spec.spec_value || null })
  })

  // Fallback groups from vehicle fields if no specifications table data.
  // Missing values stay null — never rendered as 0 or "?".
  const fallbackGroups: SpecGroup[] = [
    {
      group: 'Engine',
      items: [
        { key: 'Engine type', value: vehicle.engine_capacity ? `${vehicle.engine_capacity}L` : null },
        { key: 'Horsepower', value: vehicle.horsepower ? `${vehicle.horsepower} hp` : null },
        { key: 'Torque', value: vehicle.torque ? `${vehicle.torque} Nm` : null },
        { key: 'Fuel type', value: vehicle.fuel_type || null },
      ],
    },
    {
      group: 'Performance',
      items: [
        { key: 'Acceleration 0-100 km/h', value: vehicle.acceleration || null },
        { key: 'Top speed', value: vehicle.top_speed || null },
        { key: 'Drivetrain', value: vehicle.drivetrain || null },
      ],
    },
    {
      group: 'Transmission',
      items: [{ key: 'Type', value: vehicle.transmission || null }],
    },
    {
      group: 'Vehicle',
      items: [
        { key: 'Body type', value: vehicle.category_id || null },
        { key: 'Exterior color', value: vehicle.exterior_color || null },
        { key: 'Interior color', value: vehicle.interior_color || null },
        { key: 'Seats', value: null },
        { key: 'Doors', value: null },
      ],
    },
    {
      group: 'Other',
      items: [
        { key: 'Mileage', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : null },
        { key: 'Registration year', value: String(vehicle.year) },
        { key: 'Condition', value: vehicle.condition || null },
      ],
    },
  ]

  const displayGroups = groups.length > 0 ? groups : fallbackGroups.filter((g) => g.items.length > 0)

  if (displayGroups.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-primaryText mb-2">
        Technical specifications
      </h2>
      {displayGroups.map((group) => (
        <div key={group.group}>
          <h3 className="text-xs font-manrope font-semibold text-accent-champagne uppercase tracking-wider mb-3">
            {group.group}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.items.map((item) => (
              <div
                key={`${group.group}-${item.key}`}
                className="flex justify-between pb-2 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-secondaryText font-manrope">{item.key}</span>
                {item.value ? (
                  <span className="text-sm text-primaryText">{item.value}</span>
                ) : (
                  <span className="text-sm text-[#8d8d92]">{TBC}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
