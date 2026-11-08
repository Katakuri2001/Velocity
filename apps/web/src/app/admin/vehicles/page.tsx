'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/admin/vehicles')
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setVehicles(data.vehicles || [])
            setLoading(false)
          }
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Vehicles</h1>
        <div className="glass-panel rounded-xl p-12 border glass-border text-center">
          <div className="animate-pulse h-4 w-1/3 mx-auto bg-white/5 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primaryText">Vehicles</h1>
          <p className="text-secondaryText font-manrope">
            Manage your vehicle inventory. All changes are logged.
          </p>
        </div>
        <Link href="/admin/vehicles/new">
          <Button size="sm">+ Add Vehicle</Button>
        </Link>
      </div>

      <GlassPanel className="rounded-xl border glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Image</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase">Vehicle</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Year / Price</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Condition</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Availability</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-20">Featured</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-20">New Arrival</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-secondaryText">
                    No vehicles found. Add your first vehicle to get started.
                  </td>
                </tr>
              ) : (
                vehicles.map((v: any) => (
                  <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-md bg-secondaryBg border border-white/5 overflow-hidden flex items-center justify-center text-xs text-secondaryText">
                        No image
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/vehicles/${v.id}`} className="font-medium text-primaryText hover:text-accent-electric-blue transition-colors">
                        {v.model} {v.variant ? `- ${v.variant}` : ''}
                      </Link>
                      <p className="text-xs text-secondaryText font-manrope mt-1">
                        {v.manufacturer_id?.substring(0, 8) || 'Unknown'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-manrope text-primaryText">{v.year}</p>
                      <p className="text-sm text-secondaryText font-manrope">${v.price?.toLocaleString() || '—'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-manrope ${
                        v.condition === 'new' ? 'bg-green-500/20 text-green-400' :
                        v.condition === 'certified' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-white/10 text-secondaryText'
                      }`}>
                        {v.condition || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-manrope ${
                        v.availability === 'available' ? 'bg-green-500/20 text-green-400' :
                        v.availability === 'reserved' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {v.availability || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`w-4 h-4 rounded-full ${v.featured ? 'bg-accent-electric-blue' : 'bg-white/10'}`} />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`w-4 h-4 rounded-full ${v.new_arrival ? 'bg-accent-electric-blue' : 'bg-white/10'}`} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => {}}>
                          <Link href={`/admin/vehicles/${v.id}`} className="flex items-center justify-center w-full h-full">
                            Edit
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:bg-red-500/10" onClick={() => {}}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  )
}
