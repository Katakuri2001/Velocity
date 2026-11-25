'use client'

export function VehicleFeatures({ vehicle }: { vehicle: any }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-normal text-primary">Equipment</h2>
      <p className="mt-5 border-t border-hairline pt-5 text-sm leading-relaxed text-muted">
        A detailed equipment list for this {vehicle.year} {vehicle.model} is to be confirmed by the showroom.
      </p>
    </div>
  )
}
