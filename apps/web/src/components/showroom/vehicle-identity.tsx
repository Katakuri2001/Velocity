'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface VehicleIdentityProps {
  vehicle: any
}

export function VehicleIdentity({ vehicle }: VehicleIdentityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-manrope text-accent-champagne uppercase tracking-wider">
          {vehicle.manufacturer_id.substring(0, 8)}
        </span>
        <span className="text-xs font-manrope text-secondaryText">•</span>
        <span className="text-xs font-manrope text-secondaryText">{vehicle.condition}</span>
      </div>

      <h1 className="font-display text-3xl font-bold text-primaryText leading-tight">
        {vehicle.model} {vehicle.variant ? <span className="text-accent-electric-blue">{` - ${vehicle.variant}`}</span> : ''}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-2xl font-bold text-accent-electric-blue">
          ${vehicle.price.toLocaleString()}
        </span>
        <span className="text-sm text-secondaryText font-manrope">{vehicle.currency}</span>
        <span className="px-2 py-1 rounded-md bg-white/5 border glass-border text-xs text-accent-champagne">
          {vehicle.availability}
        </span>
        <span className="text-xs text-secondaryText font-manrope">Stock: {vehicle.stock_number || '—'}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-secondaryText font-manrope">
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Year</span>
          <span className="text-primaryText">{vehicle.year}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Transmission</span>
          <span className="text-primaryText">{vehicle.transmission || '—'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Fuel type</span>
          <span className="text-primaryText">{vehicle.fuel_type || '—'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Mileage</span>
          <span className="text-primaryText">{vehicle.mileage ? vehicle.mileage.toLocaleString() + ' km' : '—'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Drivetrain</span>
          <span className="text-primaryText">{vehicle.drivetrain || '—'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Exterior color</span>
          <span className="text-primaryText">{vehicle.exterior_color || '—'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-secondaryText mb-1">Interior color</span>
          <span className="text-primaryText">{vehicle.interior_color || '—'}</span>
        </div>
      </div>

      <div className="pt-4 border-t glass-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button size="lg" className="w-full sm:w-auto bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne">
            Enquire about this vehicle
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Book a test drive
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => {}}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 3" />
                  </svg>
            </Button>
          <Button variant="ghost" size="sm" onClick={() => {}}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
            </Button>
        </div>
      </div>
    </motion.div>
  )
}
