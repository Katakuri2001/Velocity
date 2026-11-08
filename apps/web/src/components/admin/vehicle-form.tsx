'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

interface VehicleFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  loading?: boolean
}

export function VehicleForm({ initialData, onSubmit, loading = false }: VehicleFormProps) {
  const [formData, setFormData] = React.useState({
    manufacturer_id: initialData?.manufacturer_id || '',
    category_id: initialData?.category_id || '',
    model: initialData?.model || '',
    variant: initialData?.variant || '',
    slug: initialData?.slug || '',
    year: initialData?.year ? String(initialData.year) : '',
    condition: initialData?.condition || 'used',
    price: initialData?.price ? String(initialData.price) : '',
    currency: initialData?.currency || 'USD',
    mileage: initialData?.mileage ? String(initialData.mileage) : '',
    transmission: initialData?.transmission || '',
    fuel_type: initialData?.fuel_type || '',
    engine_capacity: initialData?.engine_capacity || '',
    horsepower: initialData?.horsepower ? String(initialData.horsepower) : '',
    torque: initialData?.torque ? String(initialData.torque) : '',
    acceleration: initialData?.acceleration || '',
    top_speed: initialData?.top_speed || '',
    drivetrain: initialData?.drivetrain || '',
    exterior_color: initialData?.exterior_color || '',
    interior_color: initialData?.interior_color || '',
    description: initialData?.description || '',
    availability: initialData?.availability || 'available',
    featured: initialData?.featured ? true : false,
    new_arrival: initialData?.new_arrival ? true : false,
    stock_number: initialData?.stock_number || '',
    is_demo: initialData?.is_demo ? true : false,
  })

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      year: parseInt(formData.year, 10) || undefined,
      price: parseFloat(formData.price) || undefined,
      mileage: parseInt(formData.mileage, 10) || undefined,
      horsepower: parseInt(formData.horsepower, 10) || undefined,
      torque: parseInt(formData.torque, 10) || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Manufacturer ID
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.manufacturer_id}
            onChange={(e) => handleChange('manufacturer_id', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Model
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.model}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="911 Carrera"
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Variant
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.variant}
            onChange={(e) => handleChange('variant', e.target.value)}
            placeholder="S"
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Slug
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            placeholder="porsche-911-carrera-2024"
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Year
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Condition
          </label>
          <select
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="certified">Certified Pre-Owned</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Price
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Currency
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Mileage (km)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.mileage}
            onChange={(e) => handleChange('mileage', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Transmission
          </label>
          <select
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.transmission}
            onChange={(e) => handleChange('transmission', e.target.value)}
          >
            <option value="">—</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Fuel type
          </label>
          <select
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.fuel_type}
            onChange={(e) => handleChange('fuel_type', e.target.value)}
          >
            <option value="">—</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Engine capacity (L)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.engine_capacity}
            onChange={(e) => handleChange('engine_capacity', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Horsepower
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.horsepower}
            onChange={(e) => handleChange('horsepower', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Torque (Nm)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.torque}
            onChange={(e) => handleChange('torque', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Acceleration 0-100 km/h
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.acceleration}
            onChange={(e) => handleChange('acceleration', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Top speed
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.top_speed}
            onChange={(e) => handleChange('top_speed', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Drivetrain
          </label>
          <select
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.drivetrain}
            onChange={(e) => handleChange('drivetrain', e.target.value)}
          >
            <option value="">—</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
            <option value="FWD">FWD</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Exterior color
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.exterior_color}
            onChange={(e) => handleChange('exterior_color', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Interior color
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.interior_color}
            onChange={(e) => handleChange('interior_color', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Stock number
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.stock_number}
            onChange={(e) => handleChange('stock_number', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
            className="rounded bg-white/5 border glass-border text-accent-electric-blue focus:ring-0"
          />
          <label className="text-xs font-manrope text-secondaryText">
            Featured vehicle
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.new_arrival}
            onChange={(e) => handleChange('new_arrival', e.target.checked)}
            className="rounded bg-white/5 border glass-border text-accent-electric-blue focus:ring-0"
          />
          <label className="text-xs font-manrope text-secondaryText">
            New arrival
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_demo}
            onChange={(e) => handleChange('is_demo', e.target.checked)}
            className="rounded bg-white/5 border glass-border text-accent-electric-blue focus:ring-0"
          />
          <label className="text-xs font-manrope text-secondaryText">
            Demo data
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Description
        </label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className="pt-4 border-t glass-border flex gap-3">
        <Button type="submit" size="lg" className="flex-1 bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne disabled:opacity-50" disabled={loading}>
          {loading ? 'Saving...' : 'Save vehicle'}
        </Button>
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => {}}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
