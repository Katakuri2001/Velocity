'use client'

import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function HeroBackground() {
  return (
    <div className="relative w-full h-[90vh] min-h-[600px] bg-primaryBg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[30%] bg-accent-electric-blue/10 rounded-full blur-[100px]" />
      <Skeleton className="absolute top-0 left-0 w-full h-full" />
    </div>
  )
}
