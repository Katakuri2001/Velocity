'use client'

import * as React from 'react'
import Link from 'next/link'

interface ComparisonTableProps {
  vehicles: any[]
}

const COMPARISON_FIELDS = [
  { key: 'manufacturer', label: 'Manufacturer', display: (v: any) => v.manufacturer_id || '—' },
  { key: 'model', label: 'Model', display: (v: any) => `${v.model} ${v.variant || ''}`.trim() },
  { key: 'year', label: 'Year', display: (v: any) => String(v.year) },
  { key: 'price', label: 'Price', display: (v: any) => `$${v.price.toLocaleString()}` },
  { key: 'mileage', label: 'Mileage', display: (v: any) => (v.mileage ? `${v.mileage.toLocaleString()} km` : '—') },
  { key: 'transmission', label: 'Transmission', display: (v: any) => v.transmission || '—' },
  { key: 'fuel_type', label: 'Fuel type', display: (v: any) => v.fuel_type || '—' },
  { key: 'engine_capacity', label: 'Engine capacity', display: (v: any) => (v.engine_capacity ? `${v.engine_capacity}L` : '—') },
  { key: 'horsepower', label: 'Horsepower', display: (v: any) => (v.horsepower ? `${v.horsepower} hp` : '—') },
  { key: 'torque', label: 'Torque', display: (v: any) => (v.torque ? `${v.torque} Nm` : '—') },
  { key: 'acceleration', label: '0–100 km/h', display: (v: any) => v.acceleration || '—' },
  { key: 'top_speed', label: 'Top speed', display: (v: any) => v.top_speed || '—' },
  { key: 'drivetrain', label: 'Drivetrain', display: (v: any) => v.drivetrain || '—' },
  { key: 'condition', label: 'Condition', display: (v: any) => v.condition || '—' },
  { key: 'availability', label: 'Availability', display: (v: any) => v.availability || '—' },
]

export function ComparisonTable({ vehicles }: ComparisonTableProps) {
  if (vehicles.length === 0) return null

  return (
    <div className="glass-panel rounded-xl overflow-hidden border glass-border">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5">
            <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">
              Specification
            </th>
            {vehicles.map((v) => (
              <th key={v.id} className="px-6 py-4 text-xs font-manrope font-semibold text-primaryText uppercase">
                {v.model} {v.variant ? `(${v.variant})` : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_FIELDS.map((field) => {
            const values = vehicles.map((v) => field.display(v))
            const allSame = values.every((val) => val === values[0])
            return (
              <tr key={field.key} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-xs font-manrope text-secondaryText">
                  {field.label}
                </td>
                {values.map((val, idx) => (
                  <td
                    key={`${field.key}-${idx}`}
                    className={`px-6 py-4 text-xs font-manrope ${
                      allSame ? 'text-secondaryText' : 'text-primaryText font-medium'
                    } ${!allSame ? 'bg-white/5' : ''}`}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
