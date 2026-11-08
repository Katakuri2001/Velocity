'use client'

import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { VehicleGallery } from '@/components/showroom/vehicle-gallery'
import { VehicleIdentity } from '@/components/showroom/vehicle-identity'
import { VehicleSpecifications } from '@/components/showroom/vehicle-specifications'
import { VehicleFeatures } from '@/components/showroom/vehicle-features'
import { VehicleEnquiryPanel } from '@/components/showroom/vehicle-enquiry-panel'
import { RelatedVehicles } from '@/components/showroom/related-vehicles'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'

export const dynamic = 'force-dynamic'

interface DetailPageProps {
  params: { slug: string }
}

export default function VehicleDetailPage({ params }: DetailPageProps) {
  const [data, setData] = useState<{
    vehicle: any
    images: any[]
    specifications: any[]
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch(`/api/vehicles/${params.slug}`)
        if (res.status === 404) {
          notFound()
        }
        const data = await res.json()
        if (mounted) {
          setData(data)
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="h-[500px] bg-secondaryBg rounded-xl flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-8 w-full mb-6" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return notFound()
  }

  const { vehicle, images, specifications } = data

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-secondaryText font-manrope mb-8">
        <a href="/inventory" className="hover:text-primaryText transition-colors">
          Inventory
        </a>
        <span>/</span>
        <span className="text-primaryText">{vehicle.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery - 8 columns */}
        <div className="lg:col-span-8">
          <VehicleGallery images={images} vehicle={vehicle} />
        </div>

        {/* Details - 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <VehicleIdentity vehicle={vehicle} />

          <GlassPanel className="rounded-xl p-6 border glass-border">
            <VehicleSpecifications specifications={specifications} vehicle={vehicle} />
          </GlassPanel>

          <GlassPanel className="rounded-xl p-6 border glass-border">
            <VehicleFeatures vehicle={vehicle} />
          </GlassPanel>

          <GlassPanel className="rounded-xl p-6 border glass-border">
            <VehicleEnquiryPanel vehicle={vehicle} />
          </GlassPanel>
        </div>
      </div>

      <div className="mt-16">
        <RelatedVehicles vehicle={vehicle} />
      </div>
    </div>
  )
}
