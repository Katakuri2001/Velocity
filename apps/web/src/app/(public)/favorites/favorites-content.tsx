'use client'

import React, { useEffect, useState } from 'react'
import { useFavorites } from '@/components/favorites/use-favorites'
import { FavoritesEmpty } from '@/components/favorites/favorites-empty'
import { VehicleCard } from '@/components/showroom/vehicle-card'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'

interface VehicleWithImage {
  id: string
  image_url?: string
  [key: string]: unknown
}

export default function FavoritesContent() {
  const { favorites, isLoaded } = useFavorites()
  const [vehicles, setVehicles] = useState<VehicleWithImage[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoaded || favorites.length === 0) {
      setVehicles([])
      return
    }

    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const fetched = await Promise.all(
          favorites.map(async (id) => {
            try {
              const res = await fetch(`/api/vehicles/${id}`)
              if (res.ok) {
                const data = await res.json()
                return {
                  ...data.vehicle,
                  image_url: data.images?.find((image: any) => image.is_primary === 1)?.url || data.images?.[0]?.url,
                }
              }
            } catch {
              // ignore individual failures
            }
            return null
          }),
        )
        if (mounted) {
          setVehicles(fetched.filter((v) => v !== null) as VehicleWithImage[])
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [favorites, isLoaded])

  if (!isLoaded) {
    return (
      <div className="page-container py-10 md:py-14">
        <h1 className="font-display text-3xl font-bold text-primaryText">Favorites</h1>
        <div className="card-grid mt-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[420px] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="page-container py-10 md:py-14">
        <h1 className="font-display text-3xl font-bold text-primaryText">Favorites</h1>
        <GlassPanel className="mt-8 rounded-2xl border-glassBorder p-6 md:p-10">
          <FavoritesEmpty />
        </GlassPanel>
      </div>
    )
  }

  return (
    <div className="page-container py-10 md:py-14">
      <h1 className="font-display text-3xl font-bold text-primaryText">
        Favorites ({favorites.length})
      </h1>

      {loading && (
        <div className="card-grid mt-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[420px] w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && vehicles.length > 0 && (
        <div className="card-grid mt-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle as any} showActions={false} />
          ))}
        </div>
      )}

      {!loading && vehicles.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-manrope text-lg text-secondaryText">Unable to load favorited vehicles.</p>
        </div>
      )}
    </div>
  )
}
