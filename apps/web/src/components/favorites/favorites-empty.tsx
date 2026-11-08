'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FavoritesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <span className="text-2xl">♡</span>
      </div>
      <h2 className="font-display text-2xl font-bold text-primaryText mb-4">
        No favorites yet
      </h2>
      <p className="text-secondaryText font-manrope mb-8 max-w-md">
        Save vehicles you love by clicking the heart icon on any vehicle card.
      </p>
      <Button size="lg" onClick={() => {}}>
        <Link href="/inventory" className="flex items-center justify-center w-full h-full">
          Browse inventory
        </Link>
      </Button>
    </div>
  )
}
