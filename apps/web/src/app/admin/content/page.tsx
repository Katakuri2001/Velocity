'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

export default function AdminContentPage() {
  const [content, setContent] = useState<any[]>([])
  const [settings, setSettings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/admin/content')
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setContent(data.homepage_content || [])
            setSettings(data.showroom_settings || [])
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
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Content Management</h1>
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
          <h1 className="font-display text-3xl font-bold text-primaryText">Content Management</h1>
          <p className="text-secondaryText font-manrope">
            Manage homepage content and showroom settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassPanel className="rounded-xl p-6 border glass-border">
          <h2 className="font-display text-xl font-bold text-primaryText mb-6">Homepage sections</h2>
          {content.length === 0 ? (
            <p className="text-secondaryText font-manrope text-sm">No homepage content configured.</p>
          ) : (
            <div className="space-y-4">
              {content.map((c: any) => (
                <div key={c.section_key} className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-manrope font-semibold text-accent-electric-blue uppercase">{c.section_key}</span>
                    <span className={`text-xs font-manrope ${c.is_active ? 'text-green-400' : 'text-red-400'}`}>
                      {c.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {c.title && <p className="text-sm font-manrope text-primaryText font-medium">{c.title}</p>}
                  {c.subtitle && <p className="text-xs text-secondaryText font-manrope">{c.subtitle}</p>}
                  {c.content && <p className="text-xs text-secondaryText font-manrope mt-1">{c.content}</p>}
                </div>
              ))}
            </div>
          )}
        </GlassPanel>

        <GlassPanel className="rounded-xl p-6 border glass-border">
          <h2 className="font-display text-xl font-bold text-primaryText mb-6">Showroom settings</h2>
          {settings.length === 0 ? (
            <p className="text-secondaryText font-manrope text-sm">No settings configured.</p>
          ) : (
            <div className="space-y-4">
              {settings.map((s: any) => (
                <div key={s.key} className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-manrope font-semibold text-secondaryText uppercase">{s.key}</span>
                  </div>
                  <p className="text-sm text-secondaryText font-manrope">{s.value || '—'}</p>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  )
}
