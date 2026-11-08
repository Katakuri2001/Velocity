'use client'

import * as React from 'react'
import { GlassPanel } from '@/components/ui/glass-panel'

interface VehicleFeaturesProps {
  vehicle: any
}

const featureCategories = [
  { name: 'Exterior', icon: '🚗' },
  { name: 'Interior', icon: '🪑' },
  { name: 'Safety', icon: '🛡️' },
  { name: 'Technology', icon: '📱' },
  { name: 'Comfort', icon: '🪟' },
  { name: 'Performance', icon: '⚡' },
]

export function VehicleFeatures({ vehicle }: VehicleFeaturesProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-primaryText mb-2">
        Features & equipment
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featureCategories.map((cat) => (
          <GlassPanel
            key={cat.name}
            className="rounded-lg p-4 border glass-border hover:border-white/30 transition-colors"
          >
            <h3 className="text-xs font-manrope font-semibold text-accent-champagne uppercase tracking-wider mb-3">
              {cat.icon} {cat.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs text-secondaryText font-manrope">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-electric-blue" />
                  Feature {i}
                </span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  )
}
