'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useFavorites } from './use-favorites'

interface FavoriteButtonProps {
  vehicleId: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function FavoriteButton({ vehicleId, size = 'md', className }: FavoriteButtonProps) {
  const { favorites, toggleFavorite, isLoaded } = useFavorites()

  if (!isLoaded) return null

  const isFavorited = favorites.includes(vehicleId)

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-xl',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleFavorite(vehicleId)}
      className={React.useMemo(
        () =>
          `rounded-full transition-all duration-300 flex items-center justify-center ${
            isFavorited
              ? 'bg-accent-electric-blue text-primaryBg'
              : 'bg-white/5 border glass-border text-secondaryText hover:text-accent-electric-blue hover:bg-white/10'
          } ${sizes[size]} ${className || ''}`,
        [isFavorited, size, className],
      )}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.span
        whileHover={{ scale: 1.2 }}
        className={React.useMemo(
          () => `text-center ${isFavorited ? '' : 'opacity-50'}`,
          [isFavorited],
        )}
      >
        {isFavorited ? '♥' : '♡'}
      </motion.span>
    </motion.button>
  )
}
