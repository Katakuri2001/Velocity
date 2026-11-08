'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CategoryForm } from '@/components/admin/category-form'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'

export default function NewCategoryPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: any) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        window.location.href = '/admin/categories'
      } else {
        const err = await res.json()
        setError(err.error || 'Failed to create category')
        setLoading(false)
      }
    } catch {
      setError('Failed to create category. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="outline" size="sm" className="text-xs" onClick={() => {}}>
          <Link href="/admin/categories" className="flex items-center justify-center w-full h-full">
            Back to categories
          </Link>
        </Button>
        <h1 className="font-display text-2xl font-bold text-primaryText">Add Category</h1>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-manrope mb-6">
          {error}
        </div>
      )}

      <GlassPanel className="rounded-xl p-8 border glass-border">
        <CategoryForm onSubmit={handleSubmit} loading={loading} />
      </GlassPanel>
    </div>
  )
}
