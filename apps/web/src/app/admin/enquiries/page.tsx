'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/admin/enquiries')
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setEnquiries(data.enquiries || [])
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
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Enquiries</h1>
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
          <h1 className="font-display text-3xl font-bold text-primaryText">Enquiries</h1>
          <p className="text-secondaryText font-manrope">
            Manage customer enquiries and follow-ups.
          </p>
        </div>
      </div>

      <GlassPanel className="rounded-xl border glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Customer</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Email</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Vehicle</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Status</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Date</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondaryText">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((e: any) => (
                  <tr key={e.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-manrope text-primaryText">{e.name}</p>
                      <p className="text-xs text-secondaryText font-manrope">{e.phone || '—'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondaryText font-manrope">{e.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondaryText font-manrope">{e.vehicle_id ? 'Vehicle #' + e.vehicle_id : 'General'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-manrope ${
                        e.status === 'new' ? 'bg-yellow-500/20 text-yellow-400' :
                        e.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                        e.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                        e.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-secondaryText font-manrope">{e.created_at ? e.created_at.substring(0, 10) : '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => {}}>
                        View details
                      </Button>
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
