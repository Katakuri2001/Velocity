'use client'

import Image from 'next/image'
import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Vehicle } from '@/types/database'

export interface VehicleCardProps {
  vehicle: Vehicle & { image_url?: string }
  showActions?: boolean
}

export function VehicleCard({ vehicle, showActions = true }: VehicleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
    >
      <Link
        href={`/inventory/${vehicle.slug}`}
        className="block h-[420px] glass-panel rounded-xl overflow-hidden border glass-border transition-all duration-300 group-hover:border-white/30"
      >
        <div className="relative w-full h-[280px] bg-secondaryBg overflow-hidden">
          {vehicle.image_url ? (
            <Image
              src={vehicle.image_url}
              alt={`${vehicle.manufacturer_id} ${vehicle.model} ${vehicle.year}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5">
              <div className="absolute inset-0 animate-pulse bg-white/5" />
            </div>
          )}
          <div className="absolute top-4 right-4 glass-panel rounded-lg px-2 py-1">
            <span className="text-xs font-manrope font-medium text-primaryText">
              {vehicle.year}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 glass-panel rounded-lg px-2 py-1">
            <span className="text-xs font-manrope font-medium text-secondaryText">
              {vehicle.availability}
            </span>
          </div>
          <div className="absolute top-4 left-4 glass-panel rounded-lg px-2 py-1">
            <span className="text-xs font-manrope font-medium text-accent-champagne">
              {vehicle.manufacturer_id.substring(0, 8)}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col h-[140px]">
          <div className="flex-1">
            <Link
              href={`/inventory/${vehicle.slug}`}
              className="text-lg font-display font-bold text-primaryText leading-tight group-hover:text-accent-electric-blue transition-colors"
            >
              {vehicle.model} {vehicle.variant ? `- ${vehicle.variant}` : ''}
            </Link>
            <p className="text-sm text-secondaryText font-manrope mt-1">
              {vehicle.manufacturer_id.substring(0, 8)} • {vehicle.year}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-secondaryText font-manrope">
            <span>{vehicle.price.toLocaleString()}</span>
            <span>•</span>
            <span>{vehicle.transmission || '—'}</span>
            <span>•</span>
            <span>{vehicle.fuel_type || '—'}</span>
          </div>

          {showActions && (
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {}}
              >
                View
              </Button>
              <Button variant="ghost" size="sm" aria-label="Add to favorites" onClick={() => {}}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 3"
                  />
                </svg>
              </Button>
              <Button variant="ghost" size="sm" aria-label="Compare" onClick={() => {}}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
