'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ImageUploader } from './image-uploader'

interface CategoryFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  loading?: boolean
}

export function CategoryForm({ initialData, onSubmit, loading = false }: CategoryFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    image_url: initialData?.image_url || '',
    description: initialData?.description || '',
    sort_order: initialData?.sort_order ? String(initialData.sort_order) : '0',
  })

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      slug: formData.slug,
      image_url: formData.image_url || undefined,
      description: formData.description || undefined,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    })
  }

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }))
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
          placeholder="Supercars"
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
          placeholder="supercars"
        />
      </div>
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Image
        </label>
        <ImageUploader onUpload={handleImageUpload} accept="image/*" />
        {formData.image_url && (
          <div className="mt-3">
            <img src={formData.image_url} alt={formData.name} className="h-12 w-auto rounded-md" />
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
      <div>
        <label className="block text-xs font-manrope font-semibold text-secondaryText mb-1">
          Sort order
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 rounded-md bg-white/5 border glass-border text-sm text-primaryText focus:outline-none focus:border-accent-electric-blue"
          value={formData.sort_order}
          onChange={(e) => handleChange('sort_order', e.target.value)}
        />
      </div>
      <div className="pt-4 border-t glass-border flex gap-3">
        <Button type="submit" size="lg" className="flex-1 bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne disabled:opacity-50" disabled={loading}>
          {loading ? 'Saving...' : 'Save category'}
        </Button>
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => {}}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
