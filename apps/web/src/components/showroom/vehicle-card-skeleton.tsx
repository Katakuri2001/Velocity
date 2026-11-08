'use client'

import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function VehicleCardSkeleton() {
  return (
    <div className="glass-panel rounded-xl overflow-hidden h-[420px] flex flex-col">
      <div className="relative w-full h-[280px] bg-white/5">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="mt-auto flex gap-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      </div>
    </div>
  )
}
