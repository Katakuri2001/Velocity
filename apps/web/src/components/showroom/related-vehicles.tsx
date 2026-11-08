'use client'

import * as React from 'react'
import Link from 'next/link'
import { GlassPanel } from '@/components/ui/glass-panel'

interface RelatedVehiclesProps {
  vehicle: any
}

export function RelatedVehicles({ vehicle }: RelatedVehiclesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-primaryText">
          Related vehicles
        </h2>
        <Link
          href="/inventory"
          className="text-xs font-manrope text-accent-electric-blue hover:text-accent-champagne transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="glass-panel rounded-xl p-6 border glass-border">
        <div className="flex flex-col gap-4 text-center py-8">
          <p className="text-secondaryText font-manrope">
            Explore similar vehicles in our inventory.
          </p>
        </div>
      </div>
    </div>
  )
}
