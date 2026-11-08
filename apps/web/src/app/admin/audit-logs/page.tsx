'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/admin/audit-logs')
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setLogs(data.audit_logs || [])
            setTotal(data.total || 0)
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
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Audit Log</h1>
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
          <h1 className="font-display text-3xl font-bold text-primaryText">Audit Log</h1>
          <p className="text-secondaryText font-manrope">
            Activity history for the Velocity showroom.
          </p>
        </div>
        <p className="text-xs text-secondaryText font-manrope">
          {total} total entries
        </p>
      </div>

      <GlassPanel className="rounded-xl border glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Time</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Actor</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-32">Action</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Entity</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase w-24">Entity ID</th>
                <th className="px-6 py-4 text-xs font-manrope font-semibold text-secondaryText uppercase">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondaryText">
                    No activity logged yet.
                  </td>
                </tr>
              ) : (
                logs.map((l: any) => (
                  <tr key={l.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs text-secondaryText font-manrope">
                        {l.created_at ? l.created_at.substring(0, 16) : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondaryText font-manrope">{l.actor}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-primaryText font-manrope">{l.action}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-secondaryText font-manrope">{l.entity_type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-secondaryText font-manrope">{l.entity_id || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondaryText font-manrope">{l.details || '—'}</span>
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
