'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onOpenChange, className, children, ...props }, ref) => {
    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
        <div className="relative w-full max-w-lg mx-4 glass-panel rounded-xl p-6 max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    )
  },
)

Dialog.displayName = 'Dialog'
