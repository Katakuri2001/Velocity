'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CinematicRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Slow cinematic reveal: fade + 16px slide-up, 0.8s ease-out, staggered by delay.
 * With prefers-reduced-motion set, content renders instantly with no animation.
 */
export function CinematicReveal({ children, className = '', delay = 0 }: CinematicRevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={`cinematic-reveal ${className}`}>{children}</div>
  }

  return (
    <motion.div
      className={`cinematic-reveal ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
