'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

interface TestDriveFormProps {
  vehicleId?: string
}

export function TestDriveForm({ vehicleId }: TestDriveFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime) {
      setError('All fields are required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email address')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/test-drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_id: vehicleId,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setSubmitting(false)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit test drive request')
        setSubmitting(false)
      }
    } catch {
      setError('Failed to submit test drive request. Please try again.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-panel rounded-xl p-6 border glass-border text-center">
        <div className="w-12 h-12 rounded-full bg-accent-electric-blue text-primaryBg flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="font-display text-xl font-bold text-primaryText mb-2">
          Test drive requested
        </h3>
        <p className="text-secondaryText font-manrope mb-6">
          We will confirm your appointment shortly. Your appointment is not confirmed until the showroom verifies availability.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Request another
        </Button>
      </div>
    )
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-manrope">
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Full name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Phone number
          </label>
          <input
            type="tel"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Preferred date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.preferredDate}
            onChange={(e) => handleChange('preferredDate', e.target.value)}
            min={minDate}
          />
        </div>
        <div>
          <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
            Preferred time
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.preferredTime}
            onChange={(e) => handleChange('preferredTime', e.target.value)}
          />
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Request test drive'}
      </Button>
    </form>
  )
}
