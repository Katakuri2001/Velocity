'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

/**
 * Flat dark surface. Kept under its original name so shared/admin UI keeps
 * working, but the visual language is now a 1px hairline on #0a0a0a —
 * no glass blur, no gradient, no shadow, no rounded box.
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('glass-panel', className)}
        {...props}
      />
    )
  },
)

GlassPanel.displayName = 'GlassPanel'
