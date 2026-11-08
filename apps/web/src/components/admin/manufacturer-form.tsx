'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ImageUploader } from './image-uploader'

interface ManufacturerFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  loading?: boolean
}

export function ManufacturerForm({ initialData, onSubmit, loading = false }: ManufacturerFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    logo_url: initialData?.logo_url || '',
    description: initialData?.description || '',
    is_active: initialData?.is_active === 1 || initialData?.is_active === true,
  })

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      slug: formData.slug,
      logo_url: formData.logo_url || undefined,
      description: formData.description || undefined,
      is_active: formData.is_active,
    })
  }

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, logo_url: url }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Porsche"
        />
      </div>
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Slug
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="porsche"
        />
      </div>
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Logo
        </label>
        <ImageUploader onUpload={handleImageUpload} accept="image/*" />
        {formData.logo_url && (
          <div className="mt-3">
            <img src={formData.logo_url} alt={formData.name} className="h-12 w-auto rounded-md" />
          </div>
        )}
      </div>
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Description
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) => handleChange('is_active', e.target.checked)}
          className="rounded bg-white/5 border glass-border text-accent-electric-blue focus:ring-0"
        />
        <label className="text-xs font-manrope text-secondaryText">
          Active manufacturer
        </label>
      </div>
      <div className="pt-4 border-t glass-border flex gap-3">
        <Button type="submit" size="lg" className="flex-1 bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne disabled:opacity-50" disabled={loading}>
          {loading ? 'Saving...' : 'Save manufacturer'}
        </Button>
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => {}}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
