'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

type StatCard = {
  title: string
  value: string | number
  subtitle: string
  icon: string
  trend?: string
  trendUp?: boolean
}

const statCards: StatCard[] = [
  {
    title: 'Total vehicles',
    value: '—',
    subtitle: 'Across all manufacturers',
    icon: '🚗',
  },
  {
    title: 'Available',
    value: '—',
    subtitle: 'Ready for sale',
    icon: '✅',
  },
  {
    title: 'Manufacturers',
    value: '—',
    subtitle: 'Active brands',
    icon: '🏭',
  },
  {
    title: 'New enquiries',
    value: '—',
    subtitle: 'Customer messages',
    icon: '✉️',
  },
  {
    title: 'Pending test drives',
    value: '—',
    subtitle: 'Awaiting confirmation',
    icon: '📅',
  },
  {
    title: 'Recently added',
    value: '—',
    subtitle: 'Last 7 days',
    icon: '🆕',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>(statCards)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [vehRes, manuRes, enquiryRes, tdrRes] = await Promise.all([
          fetch('/api/vehicles?limit=1'),
          fetch('/api/manufacturers'),
          fetch('/api/enquiries'),
          fetch('/api/test-drives'),
        ])

        if (mounted) {
          const vehData = await vehRes.json()
          const manuData = await manuRes.json()
          const enquiryData = await enquiryRes.json()
          const tdrData = await tdrRes.json()

          setStats([
            {
              title: 'Total vehicles',
              value: vehData.total || 0,
              subtitle: 'Across all manufacturers',
              icon: '🚗',
            },
            {
              title: 'Available',
              value: vehData.vehicles?.filter((v: any) => v.availability === 'available').length || 0,
              subtitle: 'Ready for sale',
              icon: '✅',
            },
            {
              title: 'Manufacturers',
              value: manuData.manufacturers?.length || 0,
              subtitle: 'Active brands',
              icon: '🏭',
            },
            {
              title: 'New enquiries',
              value: enquiryData.enquiries?.filter((e: any) => e.status === 'new').length || 0,
              subtitle: 'Customer messages',
              icon: '✉️',
            },
            {
              title: 'Pending test drives',
              value: tdrData.test_drive_requests?.filter((t: any) => t.status === 'pending').length || 0,
              subtitle: 'Awaiting confirmation',
              icon: '📅',
            },
            {
              title: 'Recently added',
              value: '—',
              subtitle: 'Last 7 days',
              icon: '🆕',
            },
          ])
          setLoading(false)
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
        <h1 className="font-display text-3xl font-bold text-primaryText mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <GlassPanel key={i} className="p-6 rounded-xl border glass-border">
              <div className="h-8 w-24 animate-pulse bg-white/5 rounded" />
              <div className="mt-4 h-4 w-16 animate-pulse bg-white/5 rounded" />
            </GlassPanel>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primaryText">Dashboard</h1>
          <p className="text-secondaryText font-manrope">
            Welcome back to the Velocity showroom admin console.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/vehicles">
            <Button size="sm">Manage Vehicles</Button>
          </Link>
          <Button size="sm" variant="outline">
            New Vehicle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <GlassPanel key={stat.title} className="p-6 rounded-xl border glass-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-manrope text-secondaryText">{stat.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-display font-bold text-primaryText">{stat.value}</p>
              <p className="text-xs text-secondaryText font-manrope">{stat.subtitle}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassPanel className="rounded-xl p-6 border glass-border flex-1">
          <h2 className="font-display text-xl font-bold text-primaryText mb-4">Quick actions</h2>
          <div className="space-y-3">
            <Link href="/admin/vehicles">
              <Button className="w-full justify-start">Browse all vehicles</Button>
            </Link>
            <Link href="/admin/manufacturers">
              <Button className="w-full justify-start">Manage manufacturers</Button>
            </Link>
            <Link href="/admin/categories">
              <Button className="w-full justify-start">Manage categories</Button>
            </Link>
            <Link href="/admin/enquiries">
              <Button className="w-full justify-start">Review enquiries</Button>
            </Link>
            <Link href="/admin/test-drives">
              <Button className="w-full justify-start">Manage test drives</Button>
            </Link>
            <Link href="/admin/audit-logs">
              <Button className="w-full justify-start">View audit log</Button>
            </Link>
          </div>
        </GlassPanel>

        <GlassPanel className="rounded-xl p-6 border glass-border flex-1">
          <h2 className="font-display text-xl font-bold text-primaryText mb-4">Recent activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-electric-blue/20 flex items-center justify-center text-accent-electric-blue">
                📝
              </div>
              <div className="flex-1">
                <p className="text-sm font-manrope text-primaryText">Demo data seeded</p>
                <p className="text-xs text-secondaryText">10 vehicles added to inventory</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-secondaryText">
                🚗
              </div>
              <div className="flex-1">
                <p className="text-sm font-manrope text-primaryText">Inventory ready</p>
                <p className="text-xs text-secondaryText">Showroom is ready for customers</p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
