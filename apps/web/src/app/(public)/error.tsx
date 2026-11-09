'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({ reset }: { reset: () => void }) {
  useEffect(() => {
    // Log error for debugging
    console.error('Showroom error boundary triggered')
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">⚠️</span>
      </div>
      <h1 className="font-display text-3xl font-bold text-primaryText mb-4">
        Something went wrong
      </h1>
      <p className="text-secondaryText font-manrope mb-8 max-w-md mx-auto">
        We encountered an unexpected error. Please try refreshing the page or contact our showroom team.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => reset()} className="w-full sm:w-auto">
          Try again
        </Button>
        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => {}}>
          <Link href="/inventory" className="flex items-center justify-center w-full h-full">
            Browse inventory
          </Link>
        </Button>
      </div>
    </div>
  )
}
