'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useComparison } from './use-comparison'

interface CompareButtonProps {
  vehicleId: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CompareButton({ vehicleId, size = 'md', className }: CompareButtonProps) {
  const { comparison, toggleComparison, canAdd, isLoaded } = useComparison()

  if (!isLoaded) return null

  const isComp = comparison.includes(vehicleId)
  const atMax = !canAdd && !isComp

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-xl',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleComparison(vehicleId)}
      disabled={atMax}
      className={React.useMemo(
        () =>
          `rounded-full transition-all duration-300 flex items-center justify-center ${
            isComp
              ? 'bg-accent-electric-blue text-primaryBg'
              : atMax
                ? 'bg-white/5 border glass-border text-secondaryText opacity-50 cursor-not-allowed'
                : 'bg-white/5 border glass-border text-secondaryText hover:text-accent-electric-blue hover:bg-white/10'
          } ${sizes[size]} ${className || ''}`,
        [isComp, atMax, size, className],
      )}
      aria-label={isComp ? 'Remove from comparison' : 'Add to comparison'}
      title={atMax ? 'Maximum 4 vehicles in comparison' : undefined}
    >
      <motion.span
        whileHover={{ scale: 1.2 }}
        className={React.useMemo(
          () => `text-center ${isComp || atMax ? '' : 'opacity-50'}`,
          [isComp, atMax],
        )}
      >
        {isComp ? '✓' : '⇌'}
      </motion.span>
    </motion.button>
  )
}
