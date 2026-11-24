'use client'

import { GlassPanel } from '@/components/ui/glass-panel'

interface ComparisonTableProps {
  vehicles: any[]
}

const COMPARISON_FIELDS = [
  { key: 'manufacturer', label: 'Manufacturer', display: (v: any) => v.manufacturer_id || '—' },
  { key: 'model', label: 'Model', display: (v: any) => `${v.model} ${v.variant || ''}`.trim() },
  { key: 'year', label: 'Year', display: (v: any) => String(v.year) },
  { key: 'price', label: 'Price', display: (v: any) => (v.price === 0 ? 'Price on enquiry' : `$${v.price.toLocaleString()}`) },
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
    <>
      <div className="grid gap-4 md:hidden">
        {vehicles.map((vehicle) => (
          <GlassPanel key={vehicle.id} className="rounded-2xl p-5">
            <p className="text-[0.65rem] font-manrope uppercase tracking-[0.24em] text-accentChampagne">
              {vehicle.manufacturer_id}
            </p>
            <h2 className="mt-1 font-display text-xl text-primaryText">
              {vehicle.model} {vehicle.variant ? `— ${vehicle.variant}` : ''}
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {COMPARISON_FIELDS.slice(2).map((field) => (
                <div key={field.key} className="border-t border-glassBorder pt-2">
                  <dt className="text-[0.65rem] font-manrope uppercase tracking-wider text-secondaryText">
                    {field.label}
                  </dt>
                  <dd className="mt-1 text-sm font-manrope text-primaryText">{field.display(vehicle)}</dd>
                </div>
              ))}
            </dl>
          </GlassPanel>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-glassBorder md:block">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="sticky left-0 z-10 w-40 bg-secondaryBg px-5 py-4 text-xs font-manrope font-semibold uppercase text-secondaryText">
                Specification
              </th>
              {vehicles.map((v) => (
                <th key={v.id} className="px-5 py-4 text-xs font-manrope font-semibold uppercase text-primaryText">
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
                <tr key={field.key} className="border-b border-white/5 transition-colors hover:bg-white/5">
                  <td className="sticky left-0 z-10 bg-secondaryBg px-5 py-4 text-xs font-manrope text-secondaryText">
                    {field.label}
                  </td>
                  {values.map((val, idx) => (
                    <td
                      key={`${field.key}-${idx}`}
                      className={`px-5 py-4 text-xs font-manrope ${
                        allSame ? 'text-secondaryText' : 'bg-white/5 font-medium text-primaryText'
                      }`}
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
    </>
  )
}
