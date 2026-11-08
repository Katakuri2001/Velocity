'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-accent-electric-blue text-primaryBg hover:bg-accent-champagne hover:text-primaryBg transition-colors',
      secondary:
        'bg-elevatedSurface border glass-border text-primaryText hover:bg-white/10 transition-colors',
      outline:
        'border glass-border text-primaryText hover:bg-white/5 hover:border-white/30 transition-colors',
      ghost: 'text-secondaryText hover:text-primaryText hover:bg-white/5 transition-colors',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
