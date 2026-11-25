'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'enquiry'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const variants = {
      // Gold outline — the general primary action.
      primary:
        'border border-gold text-gold hover:border-goldHover hover:text-goldHover transition-colors duration-300',
      // Transparent, hairline border, quiet text.
      secondary:
        'border border-hairline bg-transparent text-primary hover:border-muted/60 transition-colors duration-300',
      outline:
        'border border-hairline bg-transparent text-primary hover:border-gold/60 hover:text-gold transition-colors duration-300',
      ghost: 'text-muted hover:text-primary transition-colors duration-300',
      // The single dark-on-gold CTA: main enquiry only.
      enquiry:
        'border border-gold bg-gold text-ink hover:border-goldHover hover:bg-goldHover transition-colors duration-300',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-sm',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium tracking-[0.08em] transition-colors disabled:opacity-50 disabled:pointer-events-none',
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
