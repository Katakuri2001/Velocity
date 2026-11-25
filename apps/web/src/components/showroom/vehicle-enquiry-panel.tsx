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
    setTimeout(() => {
      setSubmitting(false)
      alert('Enquiry submitted successfully. Our team will contact you shortly.')
    }, 1000)
  }

  const inputClass =
    'w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-primary placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-gold/60'

  return (
    <div id="enquiry">
      <p className="eyebrow">Private enquiry</p>
      <h2 className="mt-4 font-display text-2xl font-normal text-primary">Enquire about this vehicle</h2>
      <p className="mt-3 text-sm text-muted">
        Ask about the {vehicle.year} {vehicle.model}. Our showroom will respond personally.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="enquiry-name" className="block text-[11px] uppercase tracking-[0.2em] text-muted/70">
            Full name
          </label>
          <input
            id="enquiry-name"
            type="text"
            className={`mt-2 ${inputClass}`}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="enquiry-phone" className="block text-[11px] uppercase tracking-[0.2em] text-muted/70">
              Phone
            </label>
            <input
              id="enquiry-phone"
              type="tel"
              className={`mt-2 ${inputClass}`}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label htmlFor="enquiry-email" className="block text-[11px] uppercase tracking-[0.2em] text-muted/70">
              Email
            </label>
            <input
              id="enquiry-email"
              type="email"
              className={`mt-2 ${inputClass}`}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="enquiry-message" className="block text-[11px] uppercase tracking-[0.2em] text-muted/70">
            Message
          </label>
          <textarea
            id="enquiry-message"
            rows={3}
            className={`mt-2 ${inputClass}`}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us about your interest"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="enquiry-test-drive"
            type="checkbox"
            checked={formData.testDrive}
            onChange={(e) => handleChange('testDrive', e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          <label htmlFor="enquiry-test-drive" className="text-xs text-muted">
            I would like to request a test drive
          </label>
        </div>
        <Button type="submit" variant="enquiry" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Sending…' : 'Submit enquiry'}
        </Button>
      </form>

      <p className="mt-5 text-xs leading-relaxed text-muted/70">
        Enquiries are reviewed by our team. Availability and appointments are confirmed by the showroom.
      </p>
    </div>
  )
}
