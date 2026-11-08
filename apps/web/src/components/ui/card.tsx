'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-panel rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30',
          className,
        )}
        {...props}
      />
    )
  },
)

Card.displayName = 'Card'
