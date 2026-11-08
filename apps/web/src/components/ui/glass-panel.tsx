'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export const GlassPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-panel rounded-xl transition-all duration-300',
          className,
        )}
        {...props}
      />
    )
  },
)

GlassPanel.displayName = 'GlassPanel'
