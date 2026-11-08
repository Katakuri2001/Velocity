'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { VehicleForm } from '@/components/admin/vehicle-form'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'

export default function EditVehiclePage() {
  const router = useRouter()
  const params = useParams()
  const [vehicle, setVehicle] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/vehicles/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setVehicle(data.vehicle || null)
            setLoading(false)
          }
        } else if (res.status === 404) {
          setError('Vehicle not found')
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="glass-panel rounded-xl p-12 border glass-border text-center">
          <div className="animate-pulse h-4 w-1/3 mx-auto bg-white/5 rounded" />
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="glass-panel rounded-xl p-12 border glass-border text-center">
          <h2 className="font-display text-xl font-bold text-primaryText mb-2">
            {error || 'Vehicle not found'}
          </h2>
          <Button onClick={() => router.push('/admin/vehicles')}>
            Back to vehicles
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (data: any) => {
    setError(null)
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/vehicles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        router.push('/admin/vehicles')
      } else {
        const err = await res.json()
        setError(err.error || 'Failed to update vehicle')
        setSaving(false)
      }
    } catch {
      setError('Failed to update vehicle. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/vehicles')}>
          Back to vehicles
        </Button>
        <h1 className="font-display text-2xl font-bold text-primaryText">Edit Vehicle</h1>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-manrope mb-6">
          {error}
        </div>
      )}

      <GlassPanel className="rounded-xl p-8 border glass-border">
        <VehicleForm
          initialData={{
            ...vehicle,
            year: vehicle.year ? String(vehicle.year) : '',
            price: vehicle.price ? String(vehicle.price) : '',
            mileage: vehicle.mileage ? String(vehicle.mileage) : '',
            horsepower: vehicle.horsepower ? String(vehicle.horsepower) : '',
            torque: vehicle.torque ? String(vehicle.torque) : '',
            featured: vehicle.featured === 1,
            new_arrival: vehicle.new_arrival === 1,
            is_demo: vehicle.is_demo === 1,
          }}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </GlassPanel>
    </div>
  )
}
