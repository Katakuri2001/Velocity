'use client'

import * as React from 'react'
import { VehicleCard } from '@/components/showroom/vehicle-card'
import { ViewModeToggle } from '@/components/inventory/view-mode-toggle'
import type { Vehicle } from '@/types/database'

interface InventoryCollectionProps {
  vehicles: Array<Vehicle & { image_url?: string }>
  manufacturerNames: Record<string, string>
}

export function InventoryCollection({ vehicles, manufacturerNames }: InventoryCollectionProps) {
  const [mode, setMode] = React.useState<'grid' | 'list'>('grid')

  return (
    <>
      <div className="mb-8 flex justify-end">
        <ViewModeToggle mode={mode} onModeChange={setMode} />
      </div>

      {mode === 'grid' ? (
        <div className="card-grid">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              manufacturerName={manufacturerNames[vehicle.manufacturer_id]}
              layout="grid"
              priority={index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              manufacturerName={manufacturerNames[vehicle.manufacturer_id]}
              layout="list"
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </>
  )
}
