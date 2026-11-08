'use client'

import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: { slug: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<any | null>(null)
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [catRes, vehRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/vehicles?category=${encodeURIComponent(params.slug)}&limit=12`),
        ])
        if (mounted) {
          const catData = await catRes.json()
          const vehData = await vehRes.json()
          const found = catData.categories?.find((c: any) => c.slug === params.slug)
          if (!found) {
            notFound()
          }
          setCategory(found)
          setVehicles(vehData.vehicles || [])
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [params.slug])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-72">
            <Skeleton className="h-64 w-full rounded-xl bg-secondaryBg" />
          </div>
          <div className="flex-grow">
            <Skeleton className="h-10 w-1/3 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[420px] w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Category hero */}
      <div className="relative h-[400px] bg-secondaryBg rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 p-8">
          <span className="text-xs font-manrope text-accent-champagne uppercase tracking-wider mb-2 block">
            Category
          </span>
          <h1 className="font-display text-4xl font-bold text-primaryText mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-secondaryText font-manrope max-w-lg">
            {category.description || `Explore our collection of ${category.name.toLowerCase()}.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <p className="text-secondaryText font-manrope">
              {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} available
            </p>
            <Link
              href="/inventory"
              className="text-xs font-manrope text-accent-electric-blue hover:text-accent-champagne transition-colors"
            >
              Browse all inventory →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-secondaryText font-manrope text-lg">
                  No vehicles in this category yet.
                </p>
              </div>
            ) : (
              vehicles.map((v: any) => (
                <div key={v.id}>
                  <div className="glass-panel rounded-xl overflow-hidden h-[420px] flex flex-col border glass-border">
                    <div className="relative w-full h-[280px] bg-secondaryBg">
                      <Skeleton className="absolute inset-0 h-full w-full" />
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
              ))
            )}
          </div>
        </div>

        <aside className="lg:w-72 flex-shrink-0">
          <GlassPanel className="rounded-lg p-5 border glass-border">
            <h3 className="font-manrope font-semibold text-primaryText text-sm mb-4 uppercase tracking-wider">
              Category details
            </h3>
            <div className="space-y-4 text-sm font-manrope">
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-secondaryText">Name</span>
                <span className="text-primaryText">{category.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Description</span>
                <span className="text-primaryText">{category.description || '—'}</span>
              </div>
            </div>
          </GlassPanel>
        </aside>
      </div>
    </div>
  )
}
