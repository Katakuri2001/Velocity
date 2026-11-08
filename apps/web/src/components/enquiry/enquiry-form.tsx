'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

interface EnquiryFormProps {
  vehicleId?: string
}

export function EnquiryForm({ vehicleId }: EnquiryFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    preferredContact: 'email',
    message: '',
    testDrive: false,
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.email || !formData.message) {
      setError('Name, email, and message are required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email address')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          vehicle_id: vehicleId,
          preferred_contact: formData.preferredContact,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setSubmitting(false)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit enquiry')
        setSubmitting(false)
      }
    } catch {
      setError('Failed to submit enquiry. Please try again.')
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
          Enquiry submitted
        </h3>
        <p className="text-secondaryText font-manrope mb-6">
          Our team will contact you shortly. Your appointment is not confirmed until the showroom verifies availability.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Submit another
        </Button>
      </div>
    )
  }

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
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Preferred contact method
        </label>
        <select
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.preferredContact}
          onChange={(e) => handleChange('preferredContact', e.target.value)}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us about your interest in this vehicle..."
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.testDrive}
          onChange={(e) => handleChange('testDrive', e.target.checked)}
          className="rounded bg-white/5 border glass-border text-accent-electric-blue focus:ring-0"
        />
        <label className="text-xs font-manrope text-secondaryText">
          I would like to request a test drive
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Submit enquiry'}
      </Button>
    </form>
  )
}
