'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse rounded-md bg-white/5 bg-gradient-to-r from-white/5 via-white/10 to-white/5 h-full w-full',
          className,
        )}
        {...props}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'
