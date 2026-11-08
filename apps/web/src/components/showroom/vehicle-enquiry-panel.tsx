'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

interface VehicleEnquiryPanelProps {
  vehicle: any
}

export function VehicleEnquiryPanel({ vehicle }: VehicleEnquiryPanelProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    testDrive: false,
  })
  const [submitting, setSubmitting] = React.useState(false)

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false)
      alert('Enquiry submitted successfully. Our team will contact you shortly.')
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-primaryText mb-2">
        Enquire about this vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Message
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us about your interest..."
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
      <p className="text-xs text-secondaryText font-manrope">
        Your enquiry will be reviewed by our team. We do not confirm appointments until the showroom verifies availability.
      </p>
    </div>
  )
}
