'use client'

import React, { useEffect, useState } from 'react'
import { useComparison } from '@/components/comparison/use-comparison'
import { ComparisonEmpty } from '@/components/comparison/comparison-empty'
import { ComparisonTable } from '@/components/comparison/comparison-table'
import { GlassPanel } from '@/components/ui/glass-panel'

export default function CompareContent() {
  const { comparison, isLoaded } = useComparison()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoaded || comparison.length === 0) {
      setVehicles([])
      return
    }

    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const fetched = await Promise.all(
          comparison.map(async (id) => {
            try {
              const res = await fetch(`/api/vehicles/${id}`)
              if (res.ok) {
                const data = await res.json()
                return data.vehicle
              }
            } catch {
              // ignore individual failures
            }
            return null
          }),
        )
        if (mounted) {
          setVehicles(fetched.filter((v) => v !== null))
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [comparison, isLoaded])

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Compare</h1>
        <div className="glass-panel rounded-xl p-12 border glass-border text-center">
          <SkeletonLoader />
        </div>
      </div>
    )
  }

  if (comparison.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Compare</h1>
        <ComparisonEmpty />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-primaryText mb-8">
        Vehicle Comparison
      </h1>
      <p className="text-secondaryText font-manrope mb-8">
        Comparing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}. Select up to 4.
      </p>

      {loading ? (
        <GlassPanel className="rounded-xl p-12 border glass-border text-center">
          <div className="animate-pulse h-4 w-1/3 mx-auto bg-white/5 rounded" />
        </GlassPanel>
      ) : (
        <ComparisonTable vehicles={vehicles} />
      )}
    </div>
  )
}

function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 w-full animate-pulse bg-white/5 rounded" />
      ))}
    </div>
  )
}
