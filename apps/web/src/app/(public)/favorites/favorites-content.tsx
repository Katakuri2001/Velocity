'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useFavorites } from '@/components/favorites/use-favorites'
import { FavoritesEmpty } from '@/components/favorites/favorites-empty'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'

export default function FavoritesContent() {
  const { favorites, isLoaded } = useFavorites()
  const [vehicles, setVehicles] = useState<any[]>([])
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
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const fetched = await Promise.all(
          favorites.map(async (id) => {
            try {
              const res = await fetch(`${baseUrl}/api/vehicles/${id}`)
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
  }, [favorites, isLoaded])

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[420px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Favorites</h1>
        <FavoritesEmpty />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-primaryText mb-8">
        Favorites ({favorites.length})
      </h1>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[420px] w-full" />
          ))}
        </div>
      )}

      {!loading && vehicles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v: any) => (
            <div key={v.id}>
              <div className="glass-panel rounded-xl overflow-hidden h-[420px] flex flex-col border glass-border">
                <div className="relative w-full h-[280px] bg-secondaryBg">
                  {v.image_url ? (
                    <img
                      src={v.image_url}
                      alt={`${v.manufacturer_id} ${v.model} ${v.year}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Skeleton className="absolute inset-0 h-full w-full" />
                  )}
                </div>
                <div className="p-4 flex flex-col h-[140px]">
                  <h3 className="font-display font-bold text-primaryText">
                    {v.model} {v.variant ? `- ${v.variant}` : ''}
                  </h3>
                  <p className="text-sm text-secondaryText font-manrope mt-1">
                    {v.year} • {v.price.toLocaleString()}
                  </p>
                  <div className="mt-auto flex gap-2 text-xs text-secondaryText font-manrope">
                    <span>{v.transmission || '—'}</span>
                    <span>•</span>
                    <span>{v.fuel_type || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && vehicles.length === 0 && favorites.length > 0 && (
        <div className="text-center py-20">
          <p className="text-secondaryText font-manrope text-lg">
            Unable to load favorited vehicles.
          </p>
        </div>
      )}
    </div>
  )
}
