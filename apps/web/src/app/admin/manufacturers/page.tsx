'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

export default function AdminManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/admin/manufacturers')
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setManufacturers(data.manufacturers || [])
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
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Manufacturers</h1>
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
          <h1 className="font-display text-3xl font-bold text-primaryText">Manufacturers</h1>
          <p className="text-secondaryText font-manrope">
            Manage automotive manufacturers. New brands can be added without code changes.
          </p>
        </div>
        <Link href="/admin/manufacturers/new">
          <Button size="sm">+ Add Manufacturer</Button>
        </Link>
      </div>

      <GlassPanel className="rounded-xl border glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Logo</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase">Name</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Slug</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Vehicle count</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Status</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondaryText">
                    No manufacturers found. Add your first manufacturer to get started.
                  </td>
                </tr>
              ) : (
                manufacturers.map((m: any) => (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-md bg-secondaryBg border border-white/5 overflow-hidden flex items-center justify-center text-xs text-secondaryText">
                        {m.logo_url ? <img src={m.logo_url} alt={m.name} className="h-full w-full object-cover" /> : 'No logo'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/manufacturers/${m.id}`} className="font-medium text-primaryText hover:text-accent-electric-blue transition-colors">
                        {m.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-secondaryText font-manrope">{m.slug}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-manrope text-primaryText">{m.vehicle_count || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-manrope ${
                        m.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {m.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => {}}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:bg-red-500/10" onClick={() => {}}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  )
}
